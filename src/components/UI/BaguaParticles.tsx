import React, { useEffect, useRef } from 'react';

const BaguaParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let clouds: Cloud[] = [];
    const particleCount = 35; // 大幅削減，解決卡頓
    const cloudCount = 8;     // 大幅削減
    const symbols = [
      '☰', '☱', '☲', '☳', '☴', '☵', '☶', '☷', 
      '🥕', '🥕', '🥕', 
      '🥚', '🥚', '🥚', 
      '🪶', '🪶', '🪶', '🪶', '🪶'
    ];

    class Cloud {
      x: number;
      y: number;
      baseRadius: number;
      blobs: { ox: number, oy: number, r: number, o: number }[];
      speedX: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.baseRadius = Math.random() * 100 + 80;
        this.speedX = Math.random() * 0.08 + 0.02;
        
        // 減少內部圓球數量 (對效能影響最大)，降至 6 個
        this.blobs = Array.from({ length: 6 }).map(() => ({
          ox: Math.random() * 160 - 80,
          oy: Math.random() * 50 - 25,
          r: Math.random() * 0.8 + 0.5,
          o: Math.random() * 0.02 + 0.01
        }));
      }

      update() {
        this.x += this.speedX;
        if (this.x - 400 > canvas!.width) {
          this.x = -400;
          this.y = Math.random() * canvas!.height;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        this.blobs.forEach(b => {
          const r = this.baseRadius * b.r;
          const gx = this.x + b.ox;
          const gy = this.y + b.oy;
          const gradient = ctx.createRadialGradient(gx, gy, 0, gx, gy, r);
          
          // 雲朵層次：純白色漸變疊加
          gradient.addColorStop(0, `rgba(255, 255, 255, ${b.o})`);
          gradient.addColorStop(0.6, `rgba(255, 255, 255, ${b.o * 0.3})`);
          gradient.addColorStop(1, 'transparent');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(gx, gy, r, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.restore();
      }
    }

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      symbol: string;
      opacity: number;
      rotation: number;
      rotationSpeed: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 25 + 20; // 增大尺寸
        this.speedX = Math.random() * 0.6 - 0.3;
        this.speedY = Math.random() * 0.6 - 0.3;
        this.symbol = symbols[Math.floor(Math.random() * symbols.length)];
        this.opacity = Math.random() * 0.15 + 0.05; // 調高透明度
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = Math.random() * 0.02 - 0.01;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;

        if (this.x > canvas!.width) this.x = 0;
        if (this.x < 0) this.x = canvas!.width;
        if (this.y > canvas!.height) this.y = 0;
        if (this.y < 0) this.y = canvas!.height;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = '#d4af37';
        ctx.font = `${this.size}px serif`;
        ctx.fillText(this.symbol, 0, 0);
        ctx.restore();
      }
    }

    const init = () => {
      particles = [];
      clouds = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
      for (let i = 0; i < cloudCount; i++) {
        clouds.push(new Cloud());
      }
    };

    let taijiRotation = 0;
    const drawTaijiBase = () => {
      if (!ctx) return;
      const size = Math.min(canvas.width, canvas.height) * 0.8;
      const x = canvas.width / 2;
      const y = canvas.height / 2;
      const r = size / 2;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(taijiRotation);
      ctx.globalAlpha = 0.04;

      // 1. 底色與外框 (金色)
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.stroke();

      // 2. 左側白色半圓 (陽)
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(0, 0, r, Math.PI / 2, Math.PI * 1.5);
      ctx.fill();

      // 3. 右側黑色半圓 (陰)
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(0, 0, r, Math.PI * 1.5, Math.PI / 2);
      ctx.fill();

      // 4. 上下中圓形成 S 曲線
      // 上方白色中圓
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(0, -r / 2, r / 2, 0, Math.PI * 2);
      ctx.fill();
      // 下方黑色中圓
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(0, r / 2, r / 2, 0, Math.PI * 2);
      ctx.fill();

      // 5. 魚眼 (兩側小圓點)
      // 上方黑色魚眼 (在白色中圓內)
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(0, -r / 2, r / 8, 0, Math.PI * 2);
      ctx.fill();
      // 下方白色魚眼 (在黑色中圓內)
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(0, r / 2, r / 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
      taijiRotation += 0.0015;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // 1. 第一層：部分八卦粒子 (背景層)
      particles.slice(0, particleCount / 2).forEach(p => {
        p.update();
        p.draw();
      });

      // 2. 第二層：雲霧層 (淡白色疊加)
      clouds.forEach(c => {
        c.update();
        c.draw();
      });
      
      // 3. 第三層：剩餘八卦粒子 (前景層)
      particles.slice(particleCount / 2).forEach(p => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    animate();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: -2,
          opacity: 0.6
        }}
      />
      {/* 背景中央太極基座 (同步 EntryAnimation 樣式) */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: -3,
        pointerEvents: 'none'
      }}>
        <div style={{
          width: 'min(80vw, 80vh)',
          height: 'min(80vw, 80vh)',
          opacity: 0.03, // 極淡
          borderRadius: '50%',
          overflow: 'hidden',
          border: '2px solid var(--primary-gold)',
          animation: 'taijiRotate 60s linear infinite',
          position: 'relative'
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to right, #fff 50%, #000 50%)',
            position: 'relative'
          }}>
            {/* 陽魚眼 */}
            <div style={{
              position: 'absolute', top: 0, left: '25%', width: '50%', height: '50%',
              background: '#fff', borderRadius: '50%',
              display: 'flex', justifyContent: 'center', alignItems: 'center'
            }}>
              <div style={{ width: '20%', height: '20%', background: '#000', borderRadius: '50%' }}></div>
            </div>
            {/* 陰魚眼 */}
            <div style={{
              position: 'absolute', bottom: 0, left: '25%', width: '50%', height: '50%',
              background: '#000', borderRadius: '50%',
              display: 'flex', justifyContent: 'center', alignItems: 'center'
            }}>
              <div style={{ width: '20%', height: '20%', background: '#fff', borderRadius: '50%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BaguaParticles;
