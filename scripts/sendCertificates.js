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
 * 繪製預覽縮圖 (定死低體積規格，視覺對齊原圖)
 */
async function drawCertificateImage(data) {
  const width = 800, height = 565; 
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // 1. 背景 (米白宣紙色)
  const bgGrad = ctx.createRadialGradient(width/2, height/2, 100, width/2, height/2, width);
  bgGrad.addColorStop(0, '#f9f7f0'); bgGrad.addColorStop(1, '#eeeae0');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. 完整太極八卦水印 (路徑合併消除色差)
  ctx.save();
  ctx.translate(width / 2, height / 2);
  ctx.strokeStyle = 'rgba(184, 134, 11, 0.12)';
  const r = 130; 
  ctx.lineCap = 'round'; ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.moveTo(0, -r);
  ctx.arc(0, -r/2, r/2, Math.PI * 1.5, Math.PI * 0.5);
  ctx.arc(0, r/2, r/2, Math.PI * 1.5, Math.PI * 0.5, true);
  ctx.stroke();
  // 魚眼
  ctx.fillStyle = ctx.strokeStyle;
  ctx.beginPath(); ctx.arc(0, -r/2, 15, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(0, r/2, 15, 0, Math.PI * 2); ctx.fill();
  const trigrams = [ [1,1,1], [0,1,1], [1,0,1], [0,0,1], [1,1,0], [0,1,0], [1,0,0], [0,0,0] ];
  trigrams.forEach((lines, i) => {
    ctx.save(); ctx.rotate(i * Math.PI / 4);
    lines.forEach((isSolid, j) => {
      const y = 110 + (j * 8);
      if (isSolid) ctx.strokeRect(-22, y, 44, 5);
      else { ctx.strokeRect(-22, y, 20, 5); ctx.strokeRect(2, y, 20, 5); }
    });
    ctx.restore();
  });
  ctx.restore();

  // 3. 邊框與四角裝飾
  ctx.strokeStyle = '#d4af37'; ctx.lineWidth = 8; ctx.strokeRect(20, 20, width-40, height-40);
  const cs = 50; ctx.lineWidth = 3;
  [ [20, 20, 1, 1], [width-20, 20, -1, 1], [20, height-20, 1, -1], [width-20, height-20, -1, -1] ].forEach(([x, y, dx, dy]) => {
    ctx.beginPath(); ctx.moveTo(x, y + (dy*cs)); ctx.lineTo(x, y); ctx.lineTo(x + (dx*cs), y); ctx.stroke();
  });

  const fontAntique = 'serif';
  const centerX = width / 2;
  
  // 4. 文字樣式 (米白版適配)
  ctx.fillStyle = '#856d28'; ctx.font = `bold 52px ${fontAntique}`; ctx.textAlign = 'center';
  ctx.fillText('數位成就證書', centerX, 110);
  ctx.fillStyle = 'rgba(184, 134, 11, 0.7)'; ctx.font = `italic 14px serif`;
  ctx.fillText('XINGANG BAGUA MYSTERY ACHIEVEMENT', centerX, 140);

  ctx.fillStyle = '#666666'; ctx.font = `20px serif`; ctx.fillText('頒 發 給', centerX, 200);
  ctx.fillStyle = '#222222'; ctx.font = `bold 75px ${fontAntique}`; ctx.fillText(data.name || '參加者', centerX, 285);
  ctx.strokeStyle = 'rgba(133, 109, 40, 0.4)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(centerX-120, 300); ctx.lineTo(centerX+120, 300); ctx.stroke();

  // 6. 祝賀詞 (精確對稱排版)
  const t1 = '恭喜完成 ', t2 = '【新港八卦謎蹤】', t3 = ' 挑戰！';
  const gap = 12; ctx.font = `24px serif`;
  const w1 = ctx.measureText(t1).width, w2 = ctx.measureText(t2).width, w3 = ctx.measureText(t3).width;
  const sx = centerX - (w1 + w2 + w3 + (gap*2)) / 2;
  ctx.textAlign = 'left'; ctx.fillStyle = 'rgba(34,34,34,0.8)';
  ctx.fillText(t1, sx, 365);
  ctx.fillStyle = '#856d28'; ctx.font = `bold 28px serif`; ctx.fillText(t2, sx+w1+gap, 365);
  ctx.fillStyle = 'rgba(34,34,34,0.8)'; ctx.font = `24px serif`; ctx.fillText(t3, sx+w1+w2+(gap*2), 365);

  // 7. 底部資訊
  ctx.textAlign = 'center'; ctx.font = `14px serif`; ctx.fillStyle = 'rgba(0,0,0,0.4)';
  ctx.fillText(`活動場次：${data.session ? data.session.split('(')[0].trim() : '一般場次'}`, centerX, 415);
  ctx.font = `16px ${fontAntique}`; ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.fillText(`${data.date} | 新港文教基金會`, centerX, 460);

  // 8. 朱紅官印 (鏤空圓角版)
  ctx.save(); ctx.translate(width - 150, height - 150); ctx.rotate(-0.01);
  const s = 110, rad = 15; ctx.globalAlpha = 0.7; ctx.globalCompositeOperation = 'multiply';
  ctx.strokeStyle = 'rgba(160, 40, 30, 1)'; ctx.lineWidth = 6;
  ctx.beginPath(); ctx.moveTo(rad, 0); ctx.lineTo(s-rad, 0); ctx.quadraticCurveTo(s,0,s,rad); ctx.lineTo(s,s-rad); ctx.quadraticCurveTo(s,s,s-rad,s); ctx.lineTo(rad,s); ctx.quadraticCurveTo(0,s,0,s-rad); ctx.lineTo(0,rad); ctx.quadraticCurveTo(0,0,rad,0); ctx.stroke();
  ctx.fillStyle = 'rgba(160, 40, 30, 1)'; ctx.font = 'bold 22px serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('新港文教', s/2, s/2 - 18); ctx.fillText('基金會印', s/2, s/2 + 18); ctx.restore();

  // 定死品質 0.3。體積保證在 20-30KB。
  return canvas.toBuffer('image/jpeg', { quality: 0.3 }).toString('base64');
}

async function run() {
  const now = new Date();
  const todayStart = now.toISOString().split('T')[0];

  console.log(`[自動任務] 正在掃描歷史紀錄，補發 ${todayStart} 以前尚未發送的證書...`);

  try {
    const snapshot = await db.collection('registrations')
      .where('status', '==', '通過')
      .where('pickupTime', '<', todayStart)
      .get();

    console.log(`[自動任務] 資料庫搜尋結果：找到 ${snapshot.size} 筆潛在合格資料`);

    let successCount = 0;

    for (const doc of snapshot.docs) {
      const data = doc.data();
      if (data.certSent === true) continue;

      const playDate = data.pickupTime ? data.pickupTime.split(' ')[0] : '未知日期';
      console.log(`正在補寄給：${data.name} (${playDate})...`);
      
      const base64Image = await drawCertificateImage({ 
        name: data.name, 
        session: data.session || '一般場次', 
        date: playDate 
      });

      // 呼叫 EmailJS (使用 GitHub Pages 網址，加入預設主題參數)
      const certUrl = `https://chiayihkfce.github.io/xingang-bagua-maze-test/?certId=${doc.id}&theme=light`; 
      
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
            content: base64Image,
            cert_url: certUrl
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
