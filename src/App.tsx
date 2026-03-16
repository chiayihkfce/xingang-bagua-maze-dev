import { useState } from 'react'
import './App.css'

function App() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    packs: 1,
    session: '一般場次',
    payment: 'ATM轉帳'
  });

  const pricePerPack = 650;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('提交報名資料:', formData);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <div className="container">
        <div className="success-screen">
          <div className="check-icon">✓</div>
          <h1>報名已送出！</h1>
          <p>感謝您的參與，<strong>{formData.name}</strong>。</p>
          <p>我們已收到您的報名資訊，請依照後續指示完成繳費。</p>
          <div className="summary-box">
            <p>訂單總額：NT$ {formData.packs * pricePerPack}</p>
            <p>付款方式：{formData.payment}</p>
          </div>
          <button onClick={() => setSubmitted(false)} className="cta-button">返回首頁</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <header className="header">
        <div className="era-badge">清領 x 昭和</div>
        <h1>新港八卦迷蹤</h1>
        <p className="subtitle">實境解謎遊戲：在文化與故事交織中尋找真相</p>
      </header>

      <main className="main-content">
        <div className="bagua-container">
          <div className="bagua-shape">
            <div className="bagua-inner">
              <span className="yin-yang">☯</span>
            </div>
          </div>
        </div>

        <section className="story-section">
          <div className="story-box">
            <h2>故事背景</h2>
            <div className="story-text">
              <p>昭和九年。</p>
              <p>一場疫病肆虐新港。</p>
              <p>診療所裡人滿為患，哀嚎與咳嗽聲交織成一片不安。</p>
              <p>——然而這一切，對白鸞卿來說，都不該存在。</p>
              <p>身為清朝縣丞，他原在勘查新港水脈與風水。</p>
              <p>卻在卦相異動之際，頭暈目眩——</p>
              <p>醒來時，已置身七十餘年後的日治時期。</p>
              <p>陌生的年號、陌生的語言、陌生的疫病。</p>
              <p>他發現——</p>
              <p>新港的卦象錯亂，守護神失蹤</p>
              <p>八卦動盪，時空重疊</p>
              <p>清朝與昭和，交錯於此</p>
              <p>若不修正卦象，他將永遠困在這個不屬於他的年代。</p>
              <p>你，能協助他找出真相嗎？</p>
            </div>
          </div>
        </section>

        <section className="intro-text">
          <p>準備好踏上一場神秘又刺激的冒險了嗎？</p>
          <p>跟著線索解開層層謎團，揪上夥伴一起組隊挑戰，用觀察力與智慧破解八卦迷局，等你來解鎖！✨</p>
        </section>

        <section className="game-details-grid">
          <div className="detail-card">
            <h3>► 解謎包</h3>
            <p>定價 $650</p>
            <small>(配合限定活動、團體享有特別優惠&遊程)</small>
          </div>
          <div className="detail-card">
            <h3>► 遊玩方式</h3>
            <p>隨買隨玩</p>
            <small>(建議1份解謎包1-4人使用)</small>
          </div>
          <div className="detail-card">
            <h3>► 解謎時間</h3>
            <p>約 2 小時內</p>
            <small>(依個人解謎速度而定)</small>
          </div>
          <div className="detail-card">
            <h3>► 內容物</h3>
            <p>解謎道具、特製伴手禮</p>
            <small>(1包1份)</small>
          </div>
        </section>

        <section className="registration-section" id="register">
          <div className="form-container-premium">
            <div className="form-header-premium">
              <span className="form-icon">📜</span>
              <h2>預約報名系統</h2>
              <div className="form-divider"></div>
              <p className="form-subtitle-premium">一盒最多 4 人遊玩，超過 4 人建議購買 2 盒或以上</p>
            </div>
            
            <form onSubmit={handleSubmit} className="reg-form-premium">
              <div className="form-grid-premium">
                <div className="form-group-premium">
                  <label><span className="label-icon">👤</span> 聯絡人姓名</label>
                  <div className="input-wrapper">
                    <input 
                      type="text" 
                      name="name" 
                      required 
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="請輸入姓名"
                    />
                    <div className="input-focus-line"></div>
                  </div>
                </div>

                <div className="form-group-premium">
                  <label><span className="label-icon">📞</span> 行動電話</label>
                  <div className="input-wrapper">
                    <input 
                      type="tel" 
                      name="phone" 
                      required 
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="0912-345-678"
                    />
                    <div className="input-focus-line"></div>
                  </div>
                </div>

                <div className="form-group-premium">
                  <label><span className="label-icon">✉️</span> 電子郵件</label>
                  <div className="input-wrapper">
                    <input 
                      type="email" 
                      name="email" 
                      required 
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="example@mail.com"
                    />
                    <div className="input-focus-line"></div>
                  </div>
                </div>

                <div className="form-group-premium">
                  <label><span className="label-icon">📦</span> 謎題包數量</label>
                  <div className="input-wrapper">
                    <input 
                      type="number" 
                      name="packs" 
                      min="1" 
                      max="10"
                      value={formData.packs}
                      onChange={handleInputChange}
                    />
                    <div className="input-focus-line"></div>
                  </div>
                </div>

                <div className="form-group-premium">
                  <label><span className="label-icon">📅</span> 預約場次</label>
                  <div className="input-wrapper">
                    <select name="session" value={formData.session} onChange={handleInputChange}>
                      <option value="一般場次">一般場次 (隨買隨玩)</option>
                      <option value="NPC互動場">特別 NPC 互動場次</option>
                    </select>
                    <div className="input-focus-line"></div>
                  </div>
                </div>

                <div className="form-group-premium">
                  <label><span className="label-icon">💳</span> 付款方式預選</label>
                  <div className="input-wrapper">
                    <select name="payment" value={formData.payment} onChange={handleInputChange}>
                      <option value="ATM轉帳">ATM 轉帳 / 匯款</option>
                      <option value="現場付款">現場付費取件</option>
                    </select>
                    <div className="input-focus-line"></div>
                  </div>
                </div>
              </div>

              <div className="total-panel-premium">
                <div className="total-info">
                  <span className="total-label">結算總額</span>
                  <span className="total-currency">NT$</span>
                  <span className="total-amount-large">{formData.packs * pricePerPack}</span>
                </div>
                <button type="submit" className="submit-btn-premium">
                  <span>立即確認預約</span>
                  <div className="btn-shine"></div>
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-links">
          <p>集合/取件地點：新港文教基金會 或 培桂堂</p>
          <p>＊培桂堂週一、二休館</p>
          <p>指導單位：新港文教基金會</p>
        </div>
        <p className="copyright">&copy; 2024 新港八卦迷蹤 製作團隊</p>
      </footer>
    </div>
  )
}

export default App
