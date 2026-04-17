/**
 * 繪製數位成就證書 (大師級 4K 藝術版)
 */
export const generateCertificate = async (data: {
  name: string;
  session: string;
  date: string;
  lang: string;
  t: any;
}) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  // 1. 設定極致解析度 (維持 16:9 比例)
  const w = 3200, h = 1800;
  canvas.width = w;
  canvas.height = h;

  // 2. 背景構建：暖黑底色 + 宣紙紋理 + 中心光暈
  const bgGrad = ctx.createRadialGradient(w/2, h/2, 200, w/2, h/2, w);
  bgGrad.addColorStop(0, '#1a1a1a');
  bgGrad.addColorStop(1, '#020202');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  // 宣紙/絲絹紋理 (纖維感強化)
  ctx.save();
  ctx.globalAlpha = 0.05;
  for (let i = 0; i < 5000; i++) {
    ctx.strokeStyle = Math.random() > 0.5 ? '#d4af37' : '#ffffff';
    ctx.beginPath();
    const x = Math.random() * w;
    const y = Math.random() * h;
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.random() * 20 - 10, y + Math.random() * 20 - 10);
    ctx.lineWidth = 0.3;
    ctx.stroke();
  }
  ctx.restore();

  // 3. 完整太極八卦水印 (主體強化：提升透明度、粗細與能量感)
  ctx.save();
  ctx.translate(w / 2, h / 2);
  const ritualGrad = ctx.createRadialGradient(0, 0, 100, 0, 0, 800);
  ritualGrad.addColorStop(0, 'rgba(212, 175, 55, 0.25)'); // 提升透明度
  ritualGrad.addColorStop(0.5, 'rgba(212, 175, 55, 0.12)');
  ritualGrad.addColorStop(1, 'rgba(212, 175, 55, 0)');
  ctx.strokeStyle = ritualGrad;
  
  // 繪製多重同心圓與放射結構
  [280, 300, 320, 650, 700, 750].forEach((radius, idx) => {
    ctx.lineWidth = idx > 2 ? 2 : 6;
    ctx.beginPath(); ctx.arc(0, 0, radius, 0, Math.PI * 2); ctx.stroke();
  });

  // 太極圓 (加粗清晰化)
  const r = 320;
  ctx.lineWidth = 10;
  ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.stroke();
  ctx.lineWidth = 5;
  ctx.beginPath(); ctx.arc(0, -r/2, r/2, Math.PI * 1.5, Math.PI * 0.5); ctx.arc(0, r/2, r/2, Math.PI * 1.5, Math.PI * 0.5, true); ctx.stroke();
  
  // 八卦爻位 (顯著加粗並加入微弱金光)
  const trigrams = [ [1,1,1], [0,1,1], [1,0,1], [0,0,1], [1,1,0], [0,1,0], [1,0,0], [0,0,0] ];
  ctx.shadowColor = 'rgba(212, 175, 55, 0.5)';
  ctx.shadowBlur = 15;
  trigrams.forEach((lines, i) => {
    ctx.save();
    ctx.rotate(i * Math.PI / 4);
    lines.forEach((isSolid, j) => {
      const y = 450 + (j * 50);
      ctx.lineWidth = 20; // 再次加粗
      if (isSolid) {
        ctx.beginPath(); ctx.moveTo(-120, y); ctx.lineTo(120, y); ctx.stroke();
      } else {
        ctx.beginPath(); ctx.moveTo(-120, y); ctx.lineTo(-18, y); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(18, y); ctx.lineTo(120, y); ctx.stroke();
      }
    });
    ctx.restore();
  });
  ctx.restore();

  // 4. 高級雲紋邊框 (修正凸出問題)
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 20; ctx.strokeRect(60, 60, w-120, h-120);
  ctx.lineWidth = 4; ctx.strokeRect(100, 100, w-200, h-200);
  
  const drawCloud = (x: number, y: number, r1: number) => {
    ctx.save(); ctx.translate(x, y); ctx.rotate(r1); ctx.beginPath();
    ctx.arc(40, 40, 60, Math.PI, Math.PI * 1.5); // 調整圓弧半徑與位置，使其貼合內部
    ctx.stroke(); ctx.restore();
  };
  [[100,100,0], [w-100,100,Math.PI/2], [100,h-100,-Math.PI/2], [w-100,h-100,Math.PI]].forEach(([x,y,r]) => drawCloud(x,y,r));

  // 5. 文字樣式與配置
  const centerX = w / 2;
  const fontAntique = '"STXingkai", "華文行楷", "LiSu", "隸書", "STKaiti", "Songti TC", serif';
  const fontStandard = '"Noto Serif CJK TC", "Songti TC", serif';
  const fontEng = '"Times New Roman", serif'; // 弱化英文，使用傳統字體

  const drawGoldenText = (text: string, x: number, y: number, font: string, size: number, isBold: boolean = false) => {
    ctx.save();
    ctx.textAlign = 'center';
    ctx.font = `${isBold ? 'bold ' : ''}${size}px ${font}`;
    
    // 製作立體鎏金陰影 (多層次深度感)
    ctx.shadowColor = 'rgba(0, 0, 0, 1)';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 6;
    ctx.shadowOffsetY = 6;

    // 極致複雜金屬漸層 (深古銅 -> 亮金 -> 耀眼白金 -> 暗金)
    const textGrad = ctx.createLinearGradient(x, y - size, x, y + size/4);
    textGrad.addColorStop(0, '#4a3b12');   // 深古銅
    textGrad.addColorStop(0.2, '#856d28'); // 飽和金
    textGrad.addColorStop(0.4, '#f1c40f'); // 亮黃金
    textGrad.addColorStop(0.5, '#ffffff'); // 高光白金
    textGrad.addColorStop(0.6, '#f1c40f'); // 亮黃金
    textGrad.addColorStop(0.8, '#d4af37'); // 典雅金
    textGrad.addColorStop(1, '#5d4a1b');   // 暗金
    
    ctx.fillStyle = textGrad;
    ctx.fillText(text, x, y);
    
    // 加入物理雕刻感的內陰影模擬
    ctx.globalCompositeOperation = 'source-atop';
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillText(text, x - 3, y - 3);
    
    // 加入高品質外發光 (模擬金屬光澤散射)
    ctx.globalCompositeOperation = 'lighter';
    ctx.shadowColor = 'rgba(212, 175, 55, 0.5)';
    ctx.shadowBlur = 35;
    ctx.fillText(text, x, y);
    ctx.restore();
  };

  // 主標題 (數位成就證書)
  drawGoldenText('數位成就證書', centerX, 320, fontAntique, 170, true);
  
  // 英文副標 (極致弱化：極淡、斜體、拉大字距)
  ctx.save();
  ctx.globalAlpha = 0.25;
  ctx.fillStyle = 'rgba(212, 175, 55, 0.4)';
  ctx.font = `italic 28px ${fontEng}`;
  ctx.textAlign = 'center';
  ctx.letterSpacing = '12px';
  ctx.fillText('XINGANG BAGUA MYSTERY ACHIEVEMENT', centerX, 390);
  ctx.restore();

  // C. 受獎人姓名 (核心視覺 - 氣勢匾額大字)
  ctx.save();
  ctx.textAlign = 'center';
  ctx.font = `bold 280px ${fontAntique}`;
  
  // 製作多層次匾額雕刻感 (深色投影 -> 實體文字 -> 淡金描邊)
  ctx.shadowColor = 'rgba(0, 0, 0, 1)';
  ctx.shadowBlur = 20;
  ctx.shadowOffsetX = 10;
  ctx.shadowOffsetY = 10;
  
  ctx.fillStyle = '#ffffff';
  ctx.fillText(data.name || '挑戰者', centerX, 850);
  
  // 加上一層超薄的淡金描邊提升質感
  ctx.globalCompositeOperation = 'source-over';
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
  ctx.lineWidth = 2;
  ctx.strokeText(data.name || '挑戰者', centerX, 850);
  ctx.restore();
  
  // 名字下方的承托金線 (精緻雙線)
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 5;
  ctx.beginPath(); ctx.moveTo(centerX - 450, 890); ctx.lineTo(centerX + 450, 890); ctx.stroke();
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(centerX - 450, 905); ctx.lineTo(centerX + 450, 905); ctx.stroke();

  // D. 恭賀說明文字
  const challengeTitle = '【新港八卦謎蹤】';
  ctx.font = `75px ${fontStandard}`;
  const wPrefix = ctx.measureText('恭喜完成 ').width;
  ctx.font = `bold 85px ${fontStandard}`;
  const wTitle = ctx.measureText(challengeTitle).width;
  ctx.font = `75px ${fontStandard}`;
  const wSuffix = ctx.measureText(' 挑戰！').width;
  
  const startT = centerX - (wPrefix + wTitle + wSuffix) / 2;

  ctx.textAlign = 'left';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.font = `75px ${fontStandard}`;
  ctx.fillText('恭喜完成 ', startT, 1080);
  
  ctx.fillStyle = '#f1c40f'; // 燙金黃強調
  ctx.font = `bold 85px ${fontStandard}`;
  ctx.fillText(challengeTitle, startT + wPrefix, 1080);
  
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.font = `75px ${fontStandard}`;
  ctx.fillText(' 挑戰！', startT + wPrefix + wTitle, 1080);

  // E. 底部資訊 (縮小比例追求精緻)
  ctx.textAlign = 'center';
  const sessionLabel = `活動場次：${data.session ? data.session.split('(')[0].trim() : '一般場次'}`;
  ctx.font = `42px ${fontStandard}`;
  ctx.fillStyle = 'rgba(212, 175, 55, 0.5)';
  ctx.fillText(sessionLabel, centerX, 1280, w - 400);
  
  ctx.font = `55px ${fontAntique}`;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.fillText(`${data.date} ｜ 新港文教基金會`, centerX, 1380);

  // 7. 朱紅方形印章 (終極藝術化：破碎邊緣、印泥噴點、疊印感)
  const drawSeal = (x: number, y: number) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(-0.05);
    
    const sealSize = 240;
    ctx.globalCompositeOperation = 'multiply';
    
    // 繪製帶有隨機破碎感的印泥背景
    ctx.fillStyle = 'rgba(192, 57, 43, 0.95)';
    ctx.beginPath();
    ctx.moveTo(Math.random()*6, Math.random()*6);
    ctx.lineTo(sealSize - Math.random()*6, Math.random()*6);
    ctx.lineTo(sealSize + Math.random()*6, sealSize - Math.random()*6);
    ctx.lineTo(Math.random()*6, sealSize + Math.random()*6);
    ctx.closePath();
    ctx.fill();
    
    // 加入印泥顆粒感 (墨色不均)
    ctx.fillStyle = 'rgba(150, 0, 0, 0.4)';
    for(let i=0; i<600; i++) {
      ctx.fillRect(Math.random()*sealSize, Math.random()*sealSize, 2, 2);
    }

    // 印章邊框 (加粗且破碎)
    ctx.strokeStyle = 'rgba(192, 57, 43, 1)';
    ctx.lineWidth = 18;
    ctx.strokeRect(15, 15, sealSize - 30, sealSize - 30);

    // 印章文字
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = 'bold 54px "Microsoft JhengHei"';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('新港文教', sealSize/2, sealSize/3 + 8);
    ctx.fillText('基金會印', sealSize/2, (sealSize/3)*2 + 20);
    
    ctx.restore();
  };
  drawSeal(w - 500, h - 480);

  return canvas.toDataURL('image/png');
};

/**
 * 下載證書
 */
export const downloadCertificate = (dataUrl: string, fileName: string) => {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
