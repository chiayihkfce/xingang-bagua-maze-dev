/**
 * 繪製數位成就證書 (清朝古風書法版 - 佈局修復)
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

  canvas.width = 1200;
  canvas.height = 848;

  // 1. 背景底色
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, '#1c1c1c');
  gradient.addColorStop(1, '#0f0f0f');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. 繪製背景水印 (太極八卦)
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.08)';
  ctx.lineWidth = 3;
  const r = 100;
  ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.stroke();
  ctx.beginPath(); ctx.arc(0, -r/2, r/2, Math.PI * 1.5, Math.PI * 0.5); ctx.arc(0, r/2, r/2, Math.PI * 1.5, Math.PI * 0.5, true); ctx.stroke();
  const trigrams = [ [1, 1, 1], [0, 1, 1], [1, 0, 1], [0, 0, 1], [1, 1, 0], [0, 1, 0], [1, 0, 0], [0, 0, 0] ];
  const dist = 160, lineW = 80, lineH = 12, gap = 12, midGap = 10;
  trigrams.forEach((lines, i) => {
    ctx.save(); ctx.rotate(i * Math.PI / 4);
    lines.forEach((isSolid, j) => {
      const y = dist + (j * (lineH + gap));
      if (isSolid) { ctx.strokeRect(-lineW/2, y, lineW, lineH); } 
      else { ctx.strokeRect(-lineW/2, y, lineW/2 - midGap/2, lineH); ctx.strokeRect(midGap/2, y, lineW/2 - midGap/2, lineH); }
    });
    ctx.restore();
  });
  ctx.restore();

  // 3. 邊框與四角裝飾
  ctx.strokeStyle = '#d4af37'; ctx.lineWidth = 15; ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);
  ctx.lineWidth = 2; ctx.strokeRect(55, 55, canvas.width - 110, canvas.height - 110);
  const cornerSize = 100; ctx.lineWidth = 5;
  [ [30, 30, 1, 1], [canvas.width-30, 30, -1, 1], [30, canvas.height-30, 1, -1], [canvas.width-30, canvas.height-30, -1, -1] ].forEach(([x, y, dx, dy]) => {
    ctx.beginPath(); ctx.moveTo(x, y + (dy * cornerSize)); ctx.lineTo(x, y); ctx.lineTo(x + (dx * cornerSize), y); ctx.stroke();
  });

  // 4. 文字內容
  const centerX = canvas.width / 2;
  const fontAntique = '"STXingkai", "華文行楷", "LiSu", "隸書", "STKaiti", "KaiTi", "標楷體", serif';
  const fontMain = '"Noto Sans TC", "Microsoft JhengHei", sans-serif';

  const drawBrushText = (text: string, x: number, y: number, font: string, color: string, isCenter: boolean = true) => {
    ctx.save();
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.textAlign = isCenter ? 'center' : 'left';
    ctx.shadowBlur = 2;
    ctx.shadowColor = color;
    ctx.fillText(text, x, y);
    ctx.restore();
  };

  // 標題與抬頭
  ctx.shadowBlur = 15; ctx.shadowColor = 'rgba(212, 175, 55, 0.5)';
  drawBrushText(data.t.certTitle || '數位成就證書', centerX, 210, `bold 100px ${fontAntique}`, '#d4af37');
  ctx.shadowBlur = 0;
  drawBrushText(data.t.certSubtitle || 'Xingang Bagua Maze Achievement', centerX, 270, `30px ${fontMain}`, 'rgba(212, 175, 55, 0.7)');
  drawBrushText(data.t.certPresentedTo || '頒發給', centerX, 370, `38px ${fontAntique}`, '#ffffff');
  
  // 姓名
  drawBrushText(data.name || '參加者', centerX, 510, `bold 130px ${fontAntique}`, '#ffffff');
  ctx.strokeStyle = '#d4af37'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(centerX - 160, 535); ctx.lineTo(centerX + 160, 535); ctx.stroke();

  // 說明文字：恭喜完成 [新港八卦謎蹤] 挑戰！
  const textPrefix = '恭喜完成 ';
  const textCore = '新港八卦謎蹤';
  const textSuffix = ' 挑戰！';
  const normalSize = 34, coreSize = 55;

  ctx.font = `${normalSize}px ${fontAntique}`;
  const prefixW = ctx.measureText(textPrefix).width;
  ctx.font = `bold ${coreSize}px ${fontAntique}`;
  const coreW = ctx.measureText(textCore).width;
  ctx.font = `${normalSize}px ${fontAntique}`;
  const suffixW = ctx.measureText(textSuffix).width;

  const totalW = prefixW + coreW + suffixW + 20;
  const startX = centerX - (totalW / 2);

  // 確保繪製時座標精確
  drawBrushText(textPrefix, startX, 630, `${normalSize}px ${fontAntique}`, 'rgba(255, 255, 255, 0.9)', false);
  drawBrushText(textCore, startX + prefixW + 5, 630, `bold ${coreSize}px ${fontAntique}`, '#d4af37', false);
  drawBrushText(textSuffix, startX + prefixW + coreW + 15, 630, `${normalSize}px ${fontAntique}`, 'rgba(255, 255, 255, 0.9)', false);

  // 活動場次文字 (確保不跑掉)
  const sessionName = data.session ? data.session.split(' (')[0] : '一般預約';
  ctx.save();
  ctx.font = `24px ${fontAntique}`; // 改用書法體維持風格統一
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.textAlign = 'center';
  ctx.shadowBlur = 0; // 確保不被之前的陰影干擾
  ctx.fillText(`活動場次：${sessionName}`, centerX, 700);
  ctx.restore();

  // 日期與底部資訊
  drawBrushText(`${data.date} | ${data.t.foundationName || '新港文教基金會'}`, centerX, 775, `26px ${fontAntique}`, 'rgba(255, 255, 255, 0.6)');

  // 5. 數位印章
  ctx.save();
  ctx.translate(canvas.width - 200, canvas.height - 180);
  ctx.rotate(-0.1);
  ctx.strokeStyle = 'rgba(192, 57, 43, 0.8)';
  ctx.lineWidth = 4;
  ctx.strokeRect(0, 0, 100, 100);
  ctx.fillStyle = 'rgba(192, 57, 43, 0.8)';
  ctx.font = 'bold 22px "Microsoft JhengHei"';
  ctx.textAlign = 'center';
  ctx.fillText('新港文教', 50, 45);
  ctx.fillText('基金會印', 50, 75);
  ctx.restore();

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
