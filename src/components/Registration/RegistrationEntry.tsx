import React, { useState } from 'react';
import BaguaQuiz from './BaguaQuiz';
import BagModal, { ChestIcon } from './BagModal';
import StatusLookupModal from './StatusLookupModal';
import { useAppContext } from '../../context/AppContext';

interface RegistrationEntryProps {
  t: any;
  lang: string;
  isFlashlightOn: boolean;
  setViewMode: (mode: 'choice' | 'form') => void;
  setShowGames: (show: boolean) => void;
}

const RegistrationEntry: React.FC<RegistrationEntryProps> = ({
  t,
  lang,
  isFlashlightOn,
  setViewMode,
  setShowGames
}) => {
  const { 
    hasFlashlight, hasPoetrySlip, hasTigerSeal, hasDuckSoup, hasCandy,
    setIsFlashlightOn, 
    isBagOpen, setIsBagOpen,
    triggerBaguaBox
  } = useAppContext();

  const [isLookupOpen, setIsLookupOpen] = useState(false);
  const [isScrollOpen, setIsScrollOpen] = useState(false);

  return (
    <section className="registration-section entry-choice-section" style={{ position: 'relative' }}>
      <h2 className="choice-title">{t.chooseAction}</h2>
      
      <div className="entry-cards-container">
        {/* ... (其餘按鈕保持不變) */}
        <button 
          onClick={() => setViewMode('form')}
          className="entry-card primary-card"
          style={{ flex: '1 1 280px' }}
        >
          <span className="entry-icon">📜</span>
          <span className="entry-title">{t.startRegistration}</span>
          <span className="entry-desc">{t.regEntryDesc}</span>
        </button>

        <button 
          onClick={() => setIsLookupOpen(true)}
          className="entry-card primary-card"
          style={{ flex: '1 1 280px' }}
        >
          <span className="entry-icon">🔍</span>
          <span className="entry-title">{t.checkStatus}</span>
          <span className="entry-desc">{t.lookupEntryDesc}</span>
        </button>

        <BaguaQuiz t={t} lang={lang} />

        <button 
          onClick={() => setShowGames(true)}
          className="entry-card primary-card"
          style={{ width: '100%', flex: '1 1 100%', marginTop: '15px' }}
        >
          <span className="entry-icon" style={{ 
            fontSize: '2.8rem', 
            filter: 'sepia(1) saturate(5) hue-rotate(-10deg) drop-shadow(0 0 5px rgba(212, 175, 55, 0.5))' 
          }}>🧭</span>
          <span className="entry-title">陣法挑戰</span>
          <span className="entry-desc">在進入迷宮前，先試著感應八卦氣息吧！</span>
        </button>

        <button 
          onClick={() => setIsBagOpen(true)}
          className="entry-card primary-card"
          style={{ 
            width: '100%', 
            flex: '1 1 100%', 
            marginTop: '15px'
          }}
        >
          <span className="entry-icon"><ChestIcon size={50} /></span>
          <span className="entry-title">我的道具箱</span>
          <span className="entry-desc">存放著您在冒險中獲得的神祕寶物</span>
        </button>

        <div style={{ 
          width: '100%', 
          textAlign: 'center', 
          marginTop: '30px', 
          fontSize: '0.85rem', 
          color: 'var(--primary-gold)', 
          opacity: isFlashlightOn ? 1 : 0,
          transition: 'all 0.5s ease',
          fontStyle: 'italic',
          letterSpacing: '1px',
          textShadow: '0 0 10px rgba(212,175,55,0.8)',
          transform: isFlashlightOn ? 'translateY(0)' : 'translateY(-10px)'
        }}>
          {isFlashlightOn ? '—— 陣法已開，試著感應「培桂堂」之氣 ——' : ''}
        </div>
      </div>

      {/* 道具箱彈窗 */}
      <BagModal 
        isOpen={isBagOpen} 
        onClose={() => setIsBagOpen(false)} 
        hasFlashlight={hasFlashlight}
        hasPoetrySlip={hasPoetrySlip}
        hasTigerSeal={hasTigerSeal}
        hasDuckSoup={hasDuckSoup}
        hasCandy={hasCandy}
        isFlashlightOn={isFlashlightOn}
        onToggleFlashlight={() => {
          const nextState = !isFlashlightOn;
          setIsFlashlightOn(nextState);
          if (nextState) setIsBagOpen(false);
        }}
        showMysticScroll={() => setIsScrollOpen(true)}
        triggerBaguaBox={triggerBaguaBox}
      />

      {/* 詩籤彈窗 */}
      {isScrollOpen && (
        <div className="modal-overlay" style={{ zIndex: 200000 }} onClick={() => setIsScrollOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ 
            background: '#0f0f0a', 
            border: '2px solid var(--primary-gold)', 
            padding: '50px 30px', 
            borderRadius: '8px', 
            textAlign: 'center', 
            maxWidth: '450px', 
            width: '85%',
            boxShadow: '0 0 60px rgba(0, 0, 0, 0.9), 0 0 30px rgba(212, 175, 55, 0.2)', 
            position: 'relative',
            backgroundImage: 'radial-gradient(circle at center, #1a1a12 0%, #0a0a05 100%)'
          }}>
            <div style={{ color: 'var(--primary-gold)', fontSize: '1.6rem', marginBottom: '35px', letterSpacing: '8px', fontWeight: 'bold' }}>📜 神祕詩籤 📜</div>
            <div style={{ color: '#ececec', fontSize: '1.25rem', lineHeight: '2.8', letterSpacing: '5px', marginBottom: '40px', fontFamily: "'Noto Serif TC', serif" }}>
              <p>新港街頭八卦生</p>
              <p>培桂堂前影自橫</p>
              <p>乾位尋真坤位引</p>
              <p>萬象歸宗見太平</p>
            </div>
            <button className="submit-btn" onClick={() => setIsScrollOpen(false)} style={{ background: 'transparent', border: '1px solid var(--primary-gold)', color: 'var(--primary-gold)', padding: '10px 40px', borderRadius: '25px' }}>
              領悟
            </button>
          </div>
        </div>
      )}

      <StatusLookupModal isOpen={isLookupOpen} onClose={() => setIsLookupOpen(false)} lang={lang} />
    </section>
  );
};

export default RegistrationEntry;
