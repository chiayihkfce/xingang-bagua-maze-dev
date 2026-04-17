import admin from 'firebase-admin';
import canvasModule from 'canvas';
const { createCanvas } = canvasModule;
import fetch from 'node-fetch';

// 1. 初始化 Firebase Admin
if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
  console.error('缺少 FIREBASE_SERVICE_ACCOUNT 環境變數');
  process.exit(1);
}
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
if (!admin.apps.length) {
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
}
const db = admin.firestore();

/**
 * 繪製證書圖片並回傳 Base64
 */
async function drawCertificateImage(data) {
  const width = 1200, height = 848;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // 背景
  const grad = ctx.createLinearGradient(0, 0, 0, height);
  grad.addColorStop(0, '#1c1c1c'); grad.addColorStop(1, '#0f0f0f');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // 八卦水印
  ctx.save();
  ctx.translate(width / 2, height / 2);
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.08)'; ctx.lineWidth = 3;
  const r = 100;
  ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.stroke();
  const trigrams = [ [1,1,1], [0,1,1], [1,0,1], [0,0,1], [1,1,0], [0,1,0], [1,0,0], [0,0,0] ];
  trigrams.forEach((lines, i) => {
    ctx.save(); ctx.rotate(i * Math.PI / 4);
    lines.forEach((isSolid, j) => {
      const y = 160 + (j * 24);
      if (isSolid) ctx.strokeRect(-40, y, 80, 12);
      else { ctx.strokeRect(-40, y, 35, 12); ctx.strokeRect(5, y, 35, 12); }
    });
    ctx.restore();
  });
  ctx.restore();

  // 邊框
  ctx.strokeStyle = '#d4af37'; ctx.lineWidth = 15; ctx.strokeRect(30, 30, width-60, height-60);
  
  // 文字 (使用 Ubuntu 內建楷體或預設 serif)
  const fontAntique = 'serif';
  ctx.textAlign = 'center';
  
  ctx.fillStyle = '#d4af37'; ctx.font = `bold 80px ${fontAntique}`;
  ctx.fillText('數位成就證書', width/2, 210);

  ctx.fillStyle = '#ffffff'; ctx.font = `bold 110px ${fontAntique}`;
  ctx.fillText(data.name, width/2, 500);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'; ctx.font = `32px ${fontAntique}`;
  ctx.fillText(`恭喜完成 新港八卦謎蹤 挑戰！`, width/2, 630);

  ctx.font = `22px sans-serif`; ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.fillText(`活動場次：${data.session.split(' (')[0]}`, width/2, 700);

  ctx.font = `24px ${fontAntique}`; ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.fillText(`${data.date} | 新港文教基金會`, width/2, 770);

  // 紅印章
  ctx.save();
  ctx.translate(width - 200, height - 180); ctx.rotate(-0.1);
  ctx.strokeStyle = 'rgba(192, 57, 43, 0.8)'; ctx.lineWidth = 4; ctx.strokeRect(0, 0, 100, 100);
  ctx.fillStyle = 'rgba(192, 57, 43, 0.8)'; ctx.font = 'bold 20px serif';
  ctx.fillText('新港文教', 50, 45); ctx.fillText('基金會印', 50, 75);
  // ... (上方的繪圖邏輯保持不變)

  return canvas.toBuffer('image/jpeg', { quality: 0.7 }).toString('base64');
  }

  async function run() {
  const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
  const dateStr = yesterday.toISOString().split('T')[0];

  console.log(`[自動任務] 檢查日期：${dateStr}`);

  try {
    const snapshot = await db.collection('registrations')
      .where('pickupTime', '>=', dateStr)
      .where('pickupTime', '<', `${dateStr} \uf8ff`)
      .where('status', '==', '通過')
      .get();

    for (const doc of snapshot.docs) {
      const data = doc.data();
      if (data.certSent === true) continue;

      console.log(`正在處理：${data.name}...`);
      const base64Image = await drawCertificateImage({ 
        name: data.name, 
        session: data.session || '一般場次', 
        date: dateStr 
      });

      // 呼叫 EmailJS
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: process.env.VITE_EMAILJS_SERVICE_ID || process.env.EMAILJS_SERVICE_ID,
          template_id: process.env.EMAILJS_CERT_TEMPLATE_ID,
          user_id: process.env.VITE_EMAILJS_PUBLIC_KEY || process.env.EMAILJS_PUBLIC_KEY,
          accessToken: process.env.EMAILJS_PRIVATE_KEY,
          template_params: {
            to_email: data.email,
            name: data.name,
            content: base64Image // 這是壓縮後的 JPEG Base64
          }
        })
      });

      if (response.ok) {
        console.log(`成功發送！`);
        await doc.ref.update({ certSent: true });
      } else {
        const errText = await response.text();
        console.error(`發送失敗 (${data.name}):`, errText);
      }
    }
  } catch (err) { console.error('執行報錯:', err); }
  }


run();
