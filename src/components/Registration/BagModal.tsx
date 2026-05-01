import React from 'react';

/**
 * 寶箱 SVG 圖示組件
 */
export const ChestIcon: React.FC<{ size?: number }> = ({ size = 50 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 9V17C20 18.1046 19.1046 19 18 19H6C4.89543 19 4 18.1046 4 17V9H20Z"
      stroke="var(--primary-gold)"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M20 9V7C20 5.89543 19.1046 5 18 5H6C4.89543 5 4 5.89543 4 7V9H20Z"
      stroke="var(--primary-gold)"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <rect
      x="10"
      y="8"
      width="4"
      height="4"
      rx="1"
      fill="#000"
      stroke="var(--primary-gold)"
      strokeWidth="1"
    />
    <circle cx="12" cy="10" r="0.5" fill="var(--primary-gold)" />
    <path
      d="M8 5V19"
      stroke="var(--primary-gold)"
      strokeWidth="1"
      strokeDasharray="2 2"
      opacity="0.5"
    />
    <path
      d="M16 5V19"
      stroke="var(--primary-gold)"
      strokeWidth="1"
      strokeDasharray="2 2"
      opacity="0.5"
    />
  </svg>
);

/**
 * 卷軸 SVG 圖示組件 (用於開始報名)
 */
export const ScrollIcon: React.FC<{ size?: number }> = ({ size = 50 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ filter: 'drop-shadow(0 0 5px rgba(212, 175, 55, 0.4))' }}
  >
    <path
      d="M4 19V5C4 3.89543 4.89543 3 6 3H18C19.1046 3 20 3.89543 20 5V19M4 19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19M4 19C4 17.8954 4.89543 17 6 17H20M10 7H16M10 11H16M10 15H14"
      stroke="var(--primary-gold)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M6 17C7.10457 17 8 17.8954 8 19C8 20.1046 7.10457 21 6 21"
      stroke="var(--primary-gold)"
      strokeWidth="1.5"
    />
  </svg>
);

/**
 * 放大鏡 SVG 圖示組件 (用於查詢進度)
 */
export const SearchIcon: React.FC<{ size?: number }> = ({ size = 50 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ filter: 'drop-shadow(0 0 5px rgba(212, 175, 55, 0.4))' }}
  >
    <circle
      cx="11"
      cy="11"
      r="7"
      stroke="var(--primary-gold)"
      strokeWidth="2"
    />
    <path
      d="M20 20L16 16"
      stroke="var(--primary-gold)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M9 8C9 8 9.5 7 11 7"
      stroke="var(--primary-gold)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * 指南針 SVG 圖示組件 (用於陣法挑戰)
 */
export const CompassIcon: React.FC<{ size?: number }> = ({ size = 50 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.5))' }}
  >
    {/* 外圈裝飾 */}
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="var(--primary-gold)"
      strokeWidth="0.5"
      strokeDasharray="1 2"
      opacity="0.5"
    />
    <circle
      cx="12"
      cy="12"
      r="8.5"
      stroke="var(--primary-gold)"
      strokeWidth="1.5"
    />

    {/* 指針背景 */}
    <path
      d="M12 4L13.5 12L12 20L10.5 12L12 4Z"
      fill="rgba(212, 175, 55, 0.1)"
    />

    {/* 北方指針 */}
    <path
      d="M12 4L14.5 12L12 11L9.5 12L12 4Z"
      fill="var(--primary-gold)"
      stroke="var(--primary-gold)"
      strokeWidth="0.5"
    />
    {/* 南方指針 */}
    <path
      d="M12 20L9.5 12L12 13L14.5 12L12 20Z"
      fill="none"
      stroke="var(--primary-gold)"
      strokeWidth="1"
    />

    {/* 中心軸 */}
    <circle cx="12" cy="12" r="1" fill="#000" stroke="var(--primary-gold)" />

    {/* 刻度 */}
    <path d="M12 2V3.5" stroke="var(--primary-gold)" strokeWidth="1" />
    <path d="M12 20.5V22" stroke="var(--primary-gold)" strokeWidth="1" />
    <path d="M2 12H3.5" stroke="var(--primary-gold)" strokeWidth="1" />
    <path d="M20.5 12H22" stroke="var(--primary-gold)" strokeWidth="1" />
  </svg>
);

interface BagModalProps {
  isOpen: boolean;
  onClose: () => void;
  hasFlashlight: boolean;
  hasPoetrySlip: boolean;
  hasTigerSeal: boolean;
  hasDuckSoup: boolean;
  hasCandy: boolean;
  isFlashlightOn: boolean;
  onToggleFlashlight: () => void;
  showMysticScroll: () => void;
  triggerBaguaBox: () => void;
  showAlert: (message: string, title?: string) => void;
  setIsEasterEggActive?: (active: boolean) => void;
}

/**
 * 🎒 我的道具箱彈窗
 */
const BagModal: React.FC<BagModalProps> = ({
  isOpen,
  onClose,
  hasFlashlight,
  hasPoetrySlip,
  hasTigerSeal,
  hasDuckSoup,
  hasCandy,
  isFlashlightOn,
  onToggleFlashlight,
  showMysticScroll,
  triggerBaguaBox,
  showAlert,
  setIsEasterEggActive
}) => {
  // 輔助函式：檢查目前是否集齊五個信物
  const checkIsCollected = () => 
    hasFlashlight && hasPoetrySlip && hasTigerSeal && hasDuckSoup && hasCandy;

  if (!isOpen) return null;

  const handleClose = () => {
    // 檢查是否已集齊，且尚未觸發過彩蛋 (避免重複播放干擾)
    const isCollected = checkIsCollected();
    const hasTriggered = localStorage.getItem('luanqing_egg_triggered') === 'true';

    if (isCollected && !hasTriggered && setIsEasterEggActive) {
      setIsEasterEggActive(true);
      localStorage.setItem('luanqing_egg_triggered', 'true');
    }
    
    onClose();
  };

  const showDuckSoupInfo = () => {
    showAlert(
      '「新港鴨肉羹」是造訪新港奉天宮必嚐的在地美食。其靈魂在於將鴨肉與洋蔥、蔥段在大火中快速爆炒，鎖住肉質鮮甜並產生迷人的「鑊氣」（焦香味），隨後加入清脆筍絲與大骨高湯勾芡而成。湯頭微酸微甜，口感層次分明，搭配特製的「五印醋」更能勾勒出鮮味。',
      '🍜 關於新港鴨肉羹'
    );
  };

  const showCandyInfo = () => {
    showAlert(
      '「新港飴」創始於清光緒年間。創始人盧其代先生原本是在奉天宮前販賣「庚仔粩」（一種以糯米與芋頭製成的傳統麻粩）及花生糖。某次因連日陰雨，花生糖受潮變軟，他不忍浪費，便將其與糖漿、麵粉重新揉捏熬煮，意外創造出Q彈不黏牙的新口感。因最初外型像小老鼠，被稱為「老鼠糖」或「雙仁糖」，是新港最具代表性的百年傳統甜點。',
      '🍬 關於新港飴'
    );
  };

  return (
    <div className="modal-overlay" onClick={handleClose} style={{ zIndex: 10000 }}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '450px', width: '90%' }}
      >
        <div
          className="modal-header"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
            paddingBottom: '15px'
          }}
        >
          <ChestIcon size={30} />
          <h2 style={{ color: 'var(--primary-gold)', margin: 0 }}>
            我的道具箱
          </h2>
        </div>

        <div
          className="modal-body"
          style={{
            padding: '20px 10px',
            textAlign: 'center',
            maxHeight: '70vh',
            overflowY: 'auto'
          }}
        >
          <p
            style={{
              color: 'var(--text-muted)',
              fontSize: '0.85rem',
              marginBottom: '25px'
            }}
          >
            點擊道具以使用或查看
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '30px 10px',
              justifyItems: 'center',
              paddingBottom: '20px'
            }}
          >
            {/* 1. 手電筒 */}
            <div
              onClick={
                hasFlashlight
                  ? onToggleFlashlight
                  : () => showAlert('前往「陣法挑戰」破除迷陣，即可獲得此照明神器。', '🔍 獲取線索')
              }
              title={hasFlashlight ? '點擊開關手電筒' : '尚未獲得：需破除陣法'}
              style={{
                width: '80px',
                height: '80px',
                background: hasFlashlight
                  ? isFlashlightOn
                    ? 'var(--primary-gold)'
                    : 'rgba(212, 175, 55, 0.1)'
                  : 'rgba(255,255,255,0.05)',
                border: `2px solid ${hasFlashlight ? (isFlashlightOn ? '#fff' : 'var(--primary-gold)') : '#444'}`,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                opacity: hasFlashlight ? 1 : 0.5,
                boxShadow:
                  hasFlashlight && isFlashlightOn
                    ? '0 0 20px var(--primary-gold)'
                    : 'none',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
            >
              <span style={{ fontSize: '2.2rem' }}>
                {hasFlashlight ? '🔦' : '🔒'}
              </span>
              <span
                style={{
                  position: 'absolute',
                  bottom: '-22px',
                  fontSize: '0.7rem',
                  color: hasFlashlight ? 'var(--primary-gold)' : '#888',
                  whiteSpace: 'nowrap',
                  fontWeight: 'bold'
                }}
              >
                {hasFlashlight ? '手電筒' : '未獲得'}
              </span>
            </div>
            {/* 2. 詩籤 */}
            <div
              onClick={
                hasPoetrySlip
                  ? showMysticScroll
                  : () => showAlert('感應先人足跡... 試著在下方輸入這座古蹟的名字。', '🔍 獲取線索')
              }
              title={hasPoetrySlip ? '點擊查看詩籤內容' : '尚未獲得：需感應地靈'}
              style={{
                width: '80px',
                height: '80px',
                background: hasPoetrySlip
                  ? 'rgba(212, 175, 55, 0.1)'
                  : 'rgba(255,255,255,0.05)',
                border: `2px solid ${hasPoetrySlip ? 'var(--primary-gold)' : '#444'}`,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                opacity: hasPoetrySlip ? 1 : 0.5,
                cursor: 'pointer'
              }}
            >
              <span style={{ fontSize: '2.2rem' }}>
                {hasPoetrySlip ? '📜' : '🔒'}
              </span>
              <span
                style={{
                  position: 'absolute',
                  bottom: '-22px',
                  fontSize: '0.7rem',
                  color: hasPoetrySlip ? 'var(--primary-gold)' : '#888',
                  whiteSpace: 'nowrap',
                  fontWeight: 'bold'
                }}
              >
                {hasPoetrySlip ? '神祕詩籤' : '未獲得'}
              </span>
            </div>
            {/* 3. 虎爺 */}
            <div
              onClick={
                hasTigerSeal
                  ? () => {
                      handleClose();
                      triggerBaguaBox();
                    }
                  : () => showAlert('感悟天地之理。試著在下方輸入這場冒險的核心「兩個字」。', '🔍 獲取線索')
              }
              title={hasTigerSeal ? '點擊啟動符令' : '尚未獲得：需感悟八卦'}
              style={{
                width: '80px',
                height: '80px',
                background: hasTigerSeal
                  ? 'rgba(212, 175, 55, 0.1)'
                  : 'rgba(255,255,255,0.05)',
                border: `2px solid ${hasTigerSeal ? 'var(--primary-gold)' : '#444'}`,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                opacity: hasTigerSeal ? 1 : 0.5,
                cursor: 'pointer'
              }}
            >
              <span style={{ fontSize: '2.2rem' }}>
                {hasTigerSeal ? '🐯' : '🔒'}
              </span>
              <span
                style={{
                  position: 'absolute',
                  bottom: '-22px',
                  fontSize: '0.7rem',
                  color: hasTigerSeal ? 'var(--primary-gold)' : '#888',
                  whiteSpace: 'nowrap',
                  fontWeight: 'bold'
                }}
              >
                {hasTigerSeal ? '虎爺符令' : '未獲得'}
              </span>
            </div>
            {/* 4. 鴨肉羹 */}
            <div
              onClick={
                hasDuckSoup
                  ? showDuckSoupInfo
                  : () => showAlert('聞到了大火爆炒的香氣... 在下方輸入這道美食的名字。', '🔍 獲取線索')
              }
              title={hasDuckSoup ? '點擊查看美食知識' : '尚未獲得：需尋訪美味'}
              style={{
                width: '80px',
                height: '80px',
                background: hasDuckSoup
                  ? 'rgba(212, 175, 55, 0.1)'
                  : 'rgba(255,255,255,0.05)',
                border: `2px solid ${hasDuckSoup ? 'var(--primary-gold)' : '#444'}`,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                opacity: hasDuckSoup ? 1 : 0.5,
                cursor: 'pointer'
              }}
            >
              <span style={{ fontSize: '2.2rem' }}>
                {hasDuckSoup ? '🍜' : '🔒'}
              </span>
              <span
                style={{
                  position: 'absolute',
                  bottom: '-22px',
                  fontSize: '0.7rem',
                  color: hasDuckSoup ? 'var(--primary-gold)' : '#888',
                  whiteSpace: 'nowrap',
                  fontWeight: 'bold'
                }}
              >
                {hasDuckSoup ? '鴨肉羹' : '未獲得'}
              </span>
            </div>
            {/* 5. 新港飴 */}
            <div
              onClick={
                hasCandy
                  ? showCandyInfo
                  : () => showAlert('傳承百年的甜蜜回憶，輸入它的正式名稱或趣味暱稱來獲得。', '🔍 獲取線索')
              }
              title={hasCandy ? '點擊查看甜點知識' : '尚未獲得：需尋訪甜蜜'}
              style={{
                width: '80px',
                height: '80px',
                background: hasCandy
                  ? 'rgba(212, 175, 55, 0.1)'
                  : 'rgba(255,255,255,0.05)',
                border: `2px solid ${hasCandy ? 'var(--primary-gold)' : '#444'}`,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                opacity: hasCandy ? 1 : 0.5,
                cursor: 'pointer'
              }}
            >
              <span style={{ fontSize: '2.2rem' }}>
                {hasCandy ? '🍬' : '🔒'}
              </span>
              <span
                style={{
                  position: 'absolute',
                  bottom: '-22px',
                  fontSize: '0.7rem',
                  color: hasCandy ? 'var(--primary-gold)' : '#888',
                  whiteSpace: 'nowrap',
                  fontWeight: 'bold'
                }}
              >
                {hasCandy ? '新港飴' : '未獲得'}
              </span>
            </div>
          </div>

          <div
            style={{
              marginTop: '50px',
              borderTop: '1px dashed rgba(212, 175, 55, 0.3)',
              paddingTop: '20px'
            }}
          >
            <p
              style={{
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                marginBottom: '10px'
              }}
            >
              —— 輸入感應到的密令 ——
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                id="secret-input"
                type="text"
                placeholder="在此輸入密令..."
                style={{
                  flex: 1,
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid #444',
                  borderRadius: '20px',
                  padding: '8px 15px',
                  color: '#fff',
                  fontSize: '0.9rem'
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const val = (e.currentTarget.value || '')
                      .toLowerCase()
                      .trim();
                    window.dispatchEvent(
                      new KeyboardEvent('keydown', { key: val[0] })
                    );
                    const event = new CustomEvent('secret-command', {
                      detail: val
                    });
                    window.dispatchEvent(event);
                    e.currentTarget.value = '';
                  }
                }}
              />
            </div>
          </div>
        </div>

        <div className="modal-actions" style={{ marginTop: '20px' }}>
          <button
            className="submit-btn"
            onClick={handleClose}
            style={{
              width: '100%',
              background: 'transparent',
              border: '1px solid var(--primary-gold)',
              color: 'var(--primary-gold)'
            }}
          >
            關閉
          </button>
        </div>
      </div>
    </div>
  );
};

export default BagModal;
