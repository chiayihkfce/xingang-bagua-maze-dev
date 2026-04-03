import { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import './App.css'

function App() {
  // --- 1. 狀態與變數定義 ---

  const [lang, setLang] = useState<'zh' | 'en'>('zh');
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
  });

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const translations = {
    zh: {
      themeToggle: '切換配色',
      submitSuccess: '報名已送出！',
      thanks: '感謝您的參與，',
      received: '我們已收到您的報名資訊，請確認以下明細並完成繳費。',
      session: '報名場次：',
      playTime: '預計遊玩時間：',
      orderTotal: '訂單總額：',
      paymentMethod: '付款方式：',
      bankInfo: '匯款銀行：新港鄉農會 (代碼 617)',
      account: '帳號：00817220606250',
      copyAccount: '複製帳號',
      accountCopied: '匯款帳號已複製！',
      linePayInfo: '請點擊下方連結完成 Line Pay 付款：',
      toLinePay: '前往 Line Pay 付款 ➔',
      backToHome: '返回首頁',
      openingBagua: '正在開啟八卦時空',
      traversingTime: '穿越光緒與昭和的交界...',
      adminLogin: '管理員登入',
      passwordPlaceholder: '請輸入管理密碼',
      loadingData: '資料讀取中',
      cancel: '取消',
      login: '登入',
      verifying: '驗證中...',
      confirmTitle: '確認報名資訊',
      registrant: '報名人：',
      phone: '聯絡電話：',
      email: 'Email：',
      qty: '份數：',
      playerCount: '當天遊玩人數：',
      expectedTime: '預計遊玩日期時間：',
      pickupLoc: '領取地點：',
      total: '估計總額：',
      notes: '備註：',
      backToEdit: '返回修改',
      confirmSubmit: '確認送出',
      submitting: '正在送出...',
      kitVal: '份',
      eraBadge: '光緒 x 昭和',
      mainTitle: '【新港八卦謎蹤】',
      subTitle: '實境解謎 活動報名',
      storyTitle: '故事背景',
      storyPara1: '昭和九年。一場疫病肆虐新港。',
      storyPara2: '診療所裡人滿為患，哀嚎與咳嗽聲交織成一片不安。',
      storyPara3: '——然而這一切，對白鸞卿來說，都不該存在。',
      storyPara4: '身為清朝縣丞，他原在勘查新港水脈與風水。卻在卦相異動之際，頭暈目眩——',
      storyPara5: '醒來時，已置身七十餘年後的日治時期。陌生的年號、陌生的語言、陌生的疫病。他看到印著不明政策的公文，聽到祈求平安的廟宇喧囂。',
      storyPara6: '他發現——新港的卦象錯亂，守護神失蹤。八卦動盪，時空重疊，光緒與昭和，交錯於此。',
      storyPara7: '若不修正卦象，他將永遠困在這個不屬於他的年代；若不找出疫病源頭，百姓將持續凋零。',
      storyHighlight: '你，能協助他找出真相嗎？',
      eventTitle: '活動內容',
      eventIntro: '準備好踏上一場神秘又刺激的冒險了嗎？這場解謎將帶你穿梭在新港的巷弄間，解開織進文化與歷史中的謎團。',
      itemPrice: '► 解謎包定價',
      itemPriceVal: '$650 (配合活動享優惠)',
      itemPlayers: '► 建議人數',
      itemPlayersVal: '1份解謎包 1-4 人使用',
      itemTime: '► 遊玩時間',
      itemTimeVal: '約 2 小時',
      itemContent: '► 內容物',
      itemContentVal: '解謎道具、特製伴手禮',
      basicInfo: '基本資料',
      nameLabel: '報名人 姓名',
      namePlaceholder: '請輸入姓名',
      phoneLabel: '聯絡電話(手機為主)',
      phonePlaceholder: '0912345678',
      emailLabel: 'Email (會寄送行前通知)',
      emailPlaceholder: '您的電子郵件',
      regInfo: '報名資訊',
      sessionType: '【場次類型】',
      sessionTypePlaceholder: '-------請選擇場次類型--------',
      generalReg: '📅 一般預約 (自由選擇遊玩時段)',
      specialReg: '✨ 特別預約 (固定日期與特定時段)',
      detailSession: '【詳細場次】',
      autoSelected: '系統已自動選定：',
      calculating: '正在計算中...',
      discountHint: '★ 優惠提醒：一般預約滿 5 份(含)以上可享有團體優惠價唷!!!!!!',
      loading: '載入中...',
      quantity: '份數',
      playersLabel: '當天遊玩人數 (每份解謎包建議 1-4 人)',
      playersVal: '人',
      paymentCard: '繳費與取件',
      paymentMethodLabel: '繳費方式',
      payInPerson: '親至新港文教基金會繳費',
      bankTransfer: '銀行轉帳/ATM',
      bankName: '匯款銀行：新港鄉農會 (代碼 617)',
      bankAcc: '帳號：00817220606250',
      copy: '複製',
      bankLast5: '轉帳帳戶後五碼',
      bankLast5Placeholder: '請輸入後五碼數字',
      expectedDate: (start: string, end: string) => `預計遊玩日期 & 時間 (開放日 ${start}-${end}，週一二不開放)`,
      fixedSessionHint: (date: string, times: string) => `★ 此場次固定於 ${date}，開放時段：${times}`,
      conflictNotice: (times: string) => `★ 提醒：您目前選擇的日期有特別場，特別場次時段：${times} 不開放一般場次預約，如有這些時段需求請選擇特別場次。`,
      datepickerPlaceholder: '請選擇遊玩時間',
      timeCaption: '時間',
      pickupLocation: '領取地點',
      locFoundation: '新港文教基金會(閱讀館)',
      locPeiGui: '培桂堂(建議選此處，此處為解謎起點)',
      other: '其他',
      referralLabel: '如何得知本活動內容? (可多選)',
      referrals: ['基金會FB', '基金會LINE', '基金會電子報', '活動現場', '親友介紹', '其他FB社團', '海報/摺頁'],
      notesLabel: '其他/備註',
      submitBtn: '送出報名表單',
      callTitle: '撥打電話諮詢 (分機 73)',
      fbTitle: '前往臉書查看更多',
      igTitle: '前往 IG 查看更多',
      locTitle: '查看活動地點',
      contactInfo: '聯絡資訊',
      foundationName: '新港文教基金會',
      address: '616嘉義縣新港鄉新中路305號',
      phoneFull: '電話：05-3745074 分機 73 林先生',
      refundTitle: '退費說明：',
      refund1: '活動前 30 日取消：全額退費（扣除手續費 30 元）',
      refund2: '活動前 7 日取消：退費 80%（扣除手續費 30 元）',
      refund3: '活動當日取消：不予退費',
      footerCopy: '© 2026 新港文教基金會 | 新港八卦謎蹤 製作團隊',
      errorEmail: '請輸入正確的 Email 格式',
      errorPhone: '請輸入有效的電話號碼',
      errorName: '姓名長度太短',
      countryCodeLabel: '國碼',
      countryNames: {
        '+886': '台灣 (+886)',
        '+852': '香港 (+852)',
        '+853': '澳門 (+853)',
        '+65': '新加坡 (+65)',
        '+60': '馬來西亞 (+60)',
        'landline': '市內電話'
      }
    },
    en: {
      submitSuccess: 'Registration Confirmed!',
      thanks: 'Thank you for joining us, ',
      received: 'We have received your registration details. Please review your order below and complete the payment process.',
      session: 'Selected Session:',
      playTime: 'Expected Arrival Time:',
      orderTotal: 'Total Amount:',
      paymentMethod: 'Payment Method:',
      bankInfo: 'Bank: Hsinkang Township Farmers\' Association (Code: 617)',
      account: 'Account No: 00817220606250',
      copyAccount: 'Copy Account No.',
      accountCopied: 'Account number copied to clipboard!',
      linePayInfo: 'Please click the link below to complete your payment via Line Pay:',
      toLinePay: 'Pay via Line Pay ➔',
      backToHome: 'Return to Homepage',
      openingBagua: 'Opening the Bagua Gateway',
      traversingTime: 'Crossing the boundaries of time...',
      adminLogin: 'Administrator Login',
      passwordPlaceholder: 'Enter admin password',
      loadingData: 'Retrieving records...',
      cancel: 'Cancel',
      login: 'Login',
      verifying: 'Authenticating...',
      confirmTitle: 'Review Registration',
      registrant: 'Primary Registrant:',
      phone: 'Phone Number:',
      email: 'Email Address:',
      qty: 'Number of Kits:',
      playerCount: 'Total Players:',
      expectedTime: 'Expected Date & Time:',
      pickupLoc: 'Pickup Location:',
      total: 'Grand Total:',
      notes: 'Additional Remarks:',
      backToEdit: 'Back to Edit',
      confirmSubmit: 'Confirm & Submit',
      submitting: 'Processing...',
      kitVal: 'kits',
      eraBadge: 'Qing Dynasty x Showa Era',
      mainTitle: '【Xingang Bagua: The Mystery Trail】',
      subTitle: 'Immersive Mystery Game Registration',
      storyTitle: 'The Story',
      storyPara1: 'The year is 1934 (Showa 9). A mysterious shadow falls over the town of Xingang as an unknown plague begins to spread.',
      storyPara2: 'Clinics overflow with the afflicted, their cries and heavy coughs echoing through the restless air.',
      storyPara3: '—Yet for Bai Luan-qing, this is a world that shouldn’t exist.',
      storyPara4: 'A Qing Dynasty official tasked with surveying the town’s ley lines, he was suddenly struck by a wave of dizziness as the Bagua shifted—plunging him into the unknown.',
      storyPara5: 'He awoke over seventy years in the future, trapped in the peak of the Japanese Colonial Era. A world of foreign tongues, enigmatic decrees, and a terrifying disease. Through the haze, he hears the clamor of local temples where thousands pray for salvation.',
      storyPara6: 'The spiritual alignment of Xingang is in turmoil; the town’s guardian deity has vanished. History has fractured, weaving the Guangxu and Showa eras into a single, unstable reality.',
      storyPara7: 'Unless the Bagua is mended, he will be lost in time forever. Unless the source of the plague is found, the people of Xingang will continue to wither away.',
      storyHighlight: 'Can you help him uncover the truth?',
      eventTitle: 'Event Details',
      eventIntro: 'Are you ready for an immersive adventure? Navigate the historic back-alleys of Xingang and unravel the secrets woven into the town’s cultural and spiritual tapestry.',
      itemPrice: '► Puzzle Kit Price',
      itemPriceVal: 'NT$650 (Special discounts available)',
      itemPlayers: '► Group Size',
      itemPlayersVal: '1 kit recommended for 1-4 players',
      itemTime: '► Est. Duration',
      itemTimeVal: 'Approx. 2 hours',
      itemContent: '► Kit Contents',
      itemContentVal: 'Puzzle tools and exclusive local souvenirs',
      basicInfo: 'Primary Contact',
      nameLabel: 'Full Name',
      namePlaceholder: 'Enter your name',
      phoneLabel: 'Phone Number (Mobile preferred)',
      phonePlaceholder: '0912345678',
      emailLabel: 'Email Address (For pre-event notifications)',
      emailPlaceholder: 'email@example.com',
      regInfo: 'Booking Details',
      sessionType: '【Booking Type】',
      sessionTypePlaceholder: '--- Select your booking type ---',
      generalReg: '📅 General Booking (Flexible schedule)',
      specialReg: '✨ Special Event (Fixed dates only)',
      detailSession: '【Available Sessions】',
      autoSelected: 'System Assigned Session:',
      calculating: 'Calculating...',
      discountHint: '★ Group Discount: Special rates apply for orders of 5 or more kits!',
      loading: 'Loading...',
      quantity: 'Number of Kits',
      playersLabel: 'Total Players (1-4 players per kit recommended)',
      playersVal: ' people',
      paymentCard: 'Payment & Pickup',
      paymentMethodLabel: 'Payment Method',
      payInPerson: 'Pay in person at Hsinkang Foundation of Culture and Education Office',
      bankTransfer: 'Bank Transfer / ATM',
      bankName: 'Bank: Hsinkang Township Farmers\' Association (Code: 617)',
      bankAcc: 'Account: 00817220606250',
      copy: 'Copy',
      bankLast5: 'Last 5 Digits of Your Account',
      bankLast5Placeholder: 'Enter 5 digits',
      expectedDate: (start: string, end: string) => `Preferred Pickup Date & Time (Open Wed-Sun, ${start}-${end})`,
      fixedSessionHint: (date: string, times: string) => `★ This session is exclusive to ${date}. Available times: ${times}`,
      conflictNotice: (times: string) => `★ Note: A Special Event is scheduled for this date at ${times}. General booking is restricted during these hours.`,
      datepickerPlaceholder: 'Select your time',
      timeCaption: 'Time',
      pickupLocation: 'Pickup Location',
      locFoundation: 'Hsinkang Foundation of Culture and Education Office (Reading Room)',
      locPeiGui: 'Pei-Gui Hall (Recommended - visit the historic site)',
      other: 'Other Details',
      referralLabel: 'How did you hear about us? (Select all that apply)',
      referrals: ['Foundation Facebook', 'Foundation LINE', 'Email Newsletter', 'At an Event', 'Friends/Family', 'Other Facebook Groups', 'Poster/Flyer'],
      notesLabel: 'Additional Remarks / Requests',
      submitBtn: 'Submit Registration',
      callTitle: 'Call for Inquiry (Ext. 73)',
      fbTitle: 'Follow us on Facebook',
      igTitle: 'Follow us on Instagram',
      locTitle: 'View Event Location',
      contactInfo: 'Contact Information',
      foundationName: 'Hsinkang Foundation of Culture and Education',
      address: 'No. 305, Xinzhong Rd., Xingang Township, Chiayi County 616, Taiwan',
      phoneFull: 'Tel: 05-3745074 Ext. 73 (Mr. Lin)',
      refundTitle: 'Refund Policy:',
      refund1: '30+ days before event: Full refund (minus NT$30 processing fee)',
      refund2: '7-29 days before event: 80% refund (minus NT$30 processing fee)',
      refund3: 'Same-day cancellation: No refund',
      footerCopy: '© 2026 Hsinkang Foundation of Culture and Education | Xingang Bagua Mystery Production Team',
      errorEmail: 'Please enter a valid email address',
      errorPhone: 'Please enter a valid phone number',
      errorName: 'Name is too short',
      themeToggle: 'Toggle Theme',
      countryCodeLabel: 'Code',
      countryNames: {
        '+886': 'Taiwan (+886)',
        '+852': 'Hong Kong (+852)',
        '+853': 'Macau (+853)',
        '+65': 'Singapore (+65)',
        '+60': 'Malaysia (+60)',
        'landline': 'Landline'
      }
    }
  };

  const t = translations[lang];

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sessions, setSessions] = useState<{name: string, price: number, fixedDate?: string, fixedTime?: string, enName?: string}[]>([]);
  
  // 進場動畫相關狀態
  const [isEntryAnimating, setIsEntryAnimating] = useState(true); 
  const [shouldRenderEntry, setShouldRenderEntry] = useState(true);

  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [submissions, setSubmissions] = useState<any[][]>([]);
  const [adminTab, setAdminTab] = useState<'sessions' | 'submissions' | 'timeslots'>('sessions');
  const [newSession, setNewSession] = useState({ name: '', price: '', fixedDate: '', fixedTime: '', isSpecial: false });
  const [isEditing, setIsEditing] = useState(false);
  const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null);
  const [editData, setEditData] = useState<any>(null);
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [auditTarget, setAuditTarget] = useState<{index: number, row: any[]} | null>(null);

  // --- 時間段管理相關狀態 ---
  const [generalTimeSlots, setGeneralTimeSlots] = useState<string[]>(['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00']);
  const [specialTimeSlots, setSpecialTimeSlots] = useState<string[]>(['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00']);
  const [timeslotConfig, setTimeslotConfig] = useState({
    generalStart: '09:00', generalEnd: '15:00', generalInterval: 30,
    specialStart: '09:00', specialEnd: '15:00', specialInterval: 30
  });
  const [newManualTime, setNewManualTime] = useState('');

  const [sessionType, setSessionType] = useState<'一般預約' | '特別預約' | ''>('');

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    countryCode: '+886',
    phone: '',
    contactEmail: '',
    session: '',
    quantity: '1',
    players: '1',
    totalAmount: '',
    paymentMethod: '親至新港文教基金會繳費',
    bankLast5: '',
    pickupTime: '',
    pickupLocation: '新港文教基金會(閱讀館)',
    referral: ['基金會FB'] as string[],
    notes: '',
    hp_field: '' // 陷阱欄位 (Honeypot)
  });

  const [formErrors, setFormErrors] = useState({
    email: '',
    phone: '',
    name: ''
  });

  const validateField = (name: string, value: string, code?: string) => {
    let error = '';
    const currentCode = code || formData.countryCode;

    if (name === 'email') {
      if (value && !value.includes('@')) {
        error = t.errorEmail;
      }
    } else if (name === 'phone') {
      if (value) {
        const rules: { [key: string]: number[] } = {
          '+886': [9, 10],
          '+852': [8],
          '+853': [8],
          '+60': [9, 10, 11],
          '+65': [8],
          'landline': [9, 10]
        };
        const allowedLengths = rules[currentCode] || [6, 15];
        if (!allowedLengths.includes(value.length) || (currentCode === 'landline' && !value.startsWith('0'))) {
          error = t.errorPhone;
        }
      }
    } else if (name === 'name') {
      if (value && value.length < 2) {
        error = t.errorName;
      }
    }
    setFormErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleCopyAccount = () => {
    const accountNumber = '00817220606250';
    navigator.clipboard.writeText(accountNumber).then(() => {
      alert(t.accountCopied);
    }).catch(err => {
      console.error('無法複製帳號: ', err);
    });
  };

  const [calculatedTotal, setCalculatedTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [loadTime] = useState(Date.now()); // 紀錄頁面載入時間
  const [adminFilterDate, setAdminFilterDate] = useState<Date | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: number, direction: 'asc' | 'desc' } | null>(null);
  const [visibleColumns, setVisibleColumns] = useState<number[]>([]);
  const [showColumnFilter, setShowShowColumnFilter] = useState(false);

  // 當份數改變時，確保遊玩人數不會超過上限 (份數 * 4)
  useEffect(() => {
    const qty = parseInt(formData.quantity) || 1;
    const players = parseInt(formData.players) || 0;
    const maxPlayers = qty * 4;
    
    if (players > maxPlayers || players === 0) {
      setFormData(prev => ({ ...prev, players: '1' }));
    }
  }, [formData.quantity]);

  // 初始化可見欄位 (預設全選)
  useEffect(() => {
    if (submissions.length > 0 && visibleColumns.length === 0) {
      setVisibleColumns(submissions[0].map((_, i) => i));
    }
  }, [submissions]);

  const toggleColumn = (index: number) => {
    setVisibleColumns(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index].sort((a, b) => a - b)
    );
  };

  const handleDownloadExcel = () => {
    if (submissions.length === 0) return;
    
    // 建立 CSV 內容
    const csvRows = submissions.map(row => 
      row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')
    );
    const csvString = csvRows.join('\n');
    
    // 加入 BOM 以確保 Excel 正確辨識 UTF-8 中文
    const BOM = '\uFEFF';
    const blob = new Blob([BOM + csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `新港八卦謎蹤_報名清單_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 請在此處填入您部署後的 Google Apps Script URL
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzOdLH2XHxJR7wEcCJYsPne_ZjciEPBKbZr7OmaafuG3l1VQrUtLzhlD2aADa-gOSZ1/exec';

  // --- 2. 工具與常數 ---
  const pad = (n: number) => String(n).padStart(2, '0');

  // --- 時間段管理工具函數 ---
  const generateTimeSlots = (start: string, end: string, interval: number) => {
    const slots = [];
    let current = new Date(`2026-01-01T${start}:00`);
    const last = new Date(`2026-01-01T${end}:00`);
    while (current <= last) {
      slots.push(`${pad(current.getHours())}:${pad(current.getMinutes())}`);
      current.setMinutes(current.getMinutes() + interval);
    }
    return slots;
  };

  const handleManualTimeAdd = (type: 'general' | 'special') => {
    if (!newManualTime || !/^([01]\d|2[0-3]):([0-5]\d)$/.test(newManualTime)) {
      alert('請輸入正確的時間格式 (HH:mm)');
      return;
    }
    if (type === 'general') {
      if (generalTimeSlots.includes(newManualTime)) return;
      setGeneralTimeSlots([...generalTimeSlots, newManualTime].sort());
    } else {
      if (specialTimeSlots.includes(newManualTime)) return;
      setSpecialTimeSlots([...specialTimeSlots, newManualTime].sort());
    }
    setNewManualTime('');
  };

  const removeTimeSlot = (type: 'general' | 'special', slot: string) => {
    if (type === 'general') {
      setGeneralTimeSlots(generalTimeSlots.filter(s => s !== slot));
    } else {
      setSpecialTimeSlots(specialTimeSlots.filter(s => s !== slot));
    }
  };

  const saveTimeSlotsConfig = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        action: 'saveTimeSlots',
        pw: adminPassword,
        config: timeslotConfig,
        generalSlots: generalTimeSlots,
        specialSlots: specialTimeSlots
      };
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(payload)
      });
      alert('時間段設定已儲存');
    } catch (err) {
      alert('儲存失敗');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 格式 A: 2026-03-11 13:26:05 (用於時間戳記)
  const formatFullDateTime = (date: Date) => {
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
           `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  };

  // 格式 B: 2026-03-14 14:00 (用於預計遊玩時間)
  const formatDateTimeMinute = (date: Date) => {
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
           `${pad(date.getHours())}:${pad(date.getMinutes())}`;
  };

  // 找出最近一個可用的遊玩時段 (考慮營業時間、休館日、特別場衝突、動態時段配置)
  const findEarliestSlot = (currentSessions: any[]) => {
    let checkDate = new Date();
    const startH = parseInt(timeslotConfig.generalStart.split(':')[0]);
    const endH = parseInt(timeslotConfig.generalEnd.split(':')[0]);
    
    // 1. 基礎時間調整
    if (checkDate.getHours() >= endH) {
      // 超過結束時間，移到隔天開始時間
      checkDate.setDate(checkDate.getDate() + 1);
      checkDate.setHours(startH, 0, 0, 0);
    } else if (checkDate.getHours() < startH) {
      // 早於開始時間，設定為今天開始時間
      checkDate.setHours(startH, 0, 0, 0);
    } else {
      // 在營業時間內，四捨五入到下一個 30 分鐘間隔
      const mins = checkDate.getMinutes();
      if (mins > 0 && mins <= 30) {
        checkDate.setMinutes(30, 0, 0);
      } else if (mins > 30) {
        checkDate.setHours(checkDate.getHours() + 1, 0, 0, 0);
      }
    }

    // 安全搜尋限制 (最多往後找 30 天)
    for (let i = 0; i < 1440; i++) { 
      const day = checkDate.getDay();
      
      // 2. 休館日避開 (週一 1, 週二 2)
      if (day === 1 || day === 2) {
        checkDate.setDate(checkDate.getDate() + (day === 1 ? 2 : 1));
        checkDate.setHours(startH, 0, 0, 0);
        continue;
      }

      // 3. 營業時間範圍檢查
      const hours = checkDate.getHours();
      const mins = checkDate.getMinutes();
      if (hours > endH || (hours === endH && mins > 0)) {
        checkDate.setDate(checkDate.getDate() + 1);
        checkDate.setHours(startH, 0, 0, 0);
        continue;
      }

      // 4. 動態時段檢查
      const dateStr = `${checkDate.getFullYear()}-${pad(checkDate.getMonth() + 1)}-${pad(checkDate.getDate())}`;
      const timeStr = `${pad(checkDate.getHours())}:${pad(checkDate.getMinutes())}`;
      
      // 判斷該日期是否有「特別場次」佔用全天或特定時段
      const isTakenBySpecial = sessions.some(s => {
        let sDate = s.fixedDate || '';
        if (sDate.includes('T')) sDate = sDate.split('T')[0];
        return sDate === dateStr;
      });

      // 根據是否有特別場次，決定使用哪種時段列表
      const allowedSlots = isTakenBySpecial ? specialTimeSlots : generalTimeSlots;
      
      if (!allowedSlots.includes(timeStr)) {
        // 不在允許時段內，往後跳 30 分鐘
        checkDate.setMinutes(checkDate.getMinutes() + 30);
        continue;
      }

      // 5. 特別場次衝突檢查
      const hasConflict = currentSessions.some(s => {
        let sDate = s.fixedDate || '';
        if (sDate.includes('T')) sDate = sDate.split('T')[0];
        return sDate === dateStr && s.fixedTime?.split(',').includes(timeStr);
      });

      if (!hasConflict) {
        return formatDateTimeMinute(checkDate);
      }

      // 有衝突，往後跳 30 分鐘繼續找
      checkDate.setMinutes(checkDate.getMinutes() + 30);
    }
    return '';
  };

  // 根據語言獲取場次顯示名稱
  const getSessionDisplayName = (chineseName: string) => {
    if (lang === 'zh') return chineseName;
    const session = sessions.find(s => s.name === chineseName);
    return session?.enName || chineseName;
  };

  // 1. 初始載入場次 (優化進場動畫邏輯)
  useEffect(() => {
    const minEntryTime = 2500; // 恢復為 2.5 秒，確保動畫完整呈現
    const startTime = Date.now();
    let isTransitionStarted = false; // 防止重複觸發退場

    const triggerExitAnimation = () => {
      if (isTransitionStarted) return;
      
      const elapsedTime = Date.now() - startTime;
      // 只有當「資料已就緒」且「時間也過了大於等於 minEntryTime」才真正開始退場
      // 如果資料先到，會在這裡計算剩餘時間並等待
      if (elapsedTime >= minEntryTime) {
        isTransitionStarted = true;
        setIsEntryAnimating(false); // 觸發 CSS 淡出
        setTimeout(() => setShouldRenderEntry(false), 800); // 動畫結束後移除
      } else {
        // 如果資料早到，則預排在 2.5 秒整點觸發
        const remainingTime = minEntryTime - elapsedTime;
        setTimeout(() => {
          if (!isTransitionStarted) {
            isTransitionStarted = true;
            setIsEntryAnimating(false);
            setTimeout(() => setShouldRenderEntry(false), 800);
          }
        }, remainingTime);
      }
    };
    
    const fetchSessions = async () => {
      console.time('🚀 [Performance] 初始載入場次與時段');
      
      // 優先從快取讀取
      const cachedSessions = localStorage.getItem('bagua_maze_sessions');
      const cachedSlots = localStorage.getItem('bagua_maze_slots');
      
      if (cachedSessions) setSessions(JSON.parse(cachedSessions));
      if (cachedSlots) {
        const slots = JSON.parse(cachedSlots);
        if (slots.general) setGeneralTimeSlots(slots.general);
        if (slots.special) setSpecialTimeSlots(slots.special);
        if (slots.config) setTimeslotConfig(slots.config);
      }

      try {
        // 同步抓取場次與時段設定
        const [resSessions, resSlots] = await Promise.all([
          fetch(`${GOOGLE_SCRIPT_URL}?action=getSessions`),
          fetch(`${GOOGLE_SCRIPT_URL}?action=getTimeSlots`)
        ]);

        const newData = await resSessions.json();
        const newSlots = await resSlots.json();

        if (Array.isArray(newData) && newData.length > 0) {
          setSessions(newData);
          localStorage.setItem('bagua_maze_sessions', JSON.stringify(newData));
        }

        if (newSlots && newSlots.general) {
          setGeneralTimeSlots(newSlots.general);
          setSpecialTimeSlots(newSlots.special);
          setTimeslotConfig(newSlots.config);
          localStorage.setItem('bagua_maze_slots', JSON.stringify(newSlots));
        }
      } catch (err) {
        console.error('❌ [Error] 抓取失敗:', err);
      } finally {
        triggerExitAnimation();
        console.timeEnd('🚀 [Performance] 初始載入場次與時段');
      }
    };
    fetchSessions();
  }, []);

  // 2. 價格與場次聯動邏輯
  useEffect(() => {
    const qty = parseInt(formData.quantity) || 0;
    const sessionObj = sessions.find(s => s.name === formData.session);
    
    // 修正：如果沒有選擇場次(sessionType === '')，價格為 0；否則若找不到 sessionObj 則預設 650
    const price = sessionType === '' ? 0 : (sessionObj ? sessionObj.price : 650);
    
    setCalculatedTotal(qty * price);
  }, [formData.quantity, formData.session, sessions, sessionType]);

  const [isDataLoading, setIsDataLoading] = useState(false);

  // 3.1 根據日期篩選報名資料
  const handleDateFilter = async (date: Date | null) => {
    setAdminFilterDate(date);
    if (!date) {
      loadPage(1); // 如果清除日期，回歸分頁顯示
      return;
    }
    
    setIsDataLoading(true);
    // 統一搜尋格式為 YYYY-MM-DD (例如 2026-03-18) 以符合目前的 pickupTime 存儲格式
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    
    try {
      const res = await fetch(`${GOOGLE_SCRIPT_URL}?action=getSubmissionsByDate&pw=${adminPassword}&date=${formattedDate}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setSubmissions(data);
        setTotalRows(data.length - 1); // 扣掉標題列
      }
    } catch (err) {
      alert('篩選失敗');
    } finally {
      setIsDataLoading(false);
    }
  };

  // 3.6 排序邏輯
  const handleSort = (index: number) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === index && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: index, direction });

    const header = submissions[0];
    const data = submissions.slice(1);

    const sortedData = [...data].sort((a, b) => {
      let valA = a[index];
      let valB = b[index];

      // 1. 針對時間戳記 (第 0 欄) 進行日期排序
      if (index === 0) {
        const dateA = new Date(valA).getTime();
        const dateB = new Date(valB).getTime();
        return direction === 'asc' ? dateA - dateB : dateB - dateA;
      }

      // 2. 數值型排序處理
      if (!isNaN(Number(valA)) && !isNaN(Number(valB))) {
        return direction === 'asc' ? Number(valA) - Number(valB) : Number(valB) - Number(valA);
      }

      // 字串型排序處理
      valA = String(valA).toLowerCase();
      valB = String(valB).toLowerCase();
      if (valA < valB) return direction === 'asc' ? -1 : 1;
      if (valA > valB) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setSubmissions([header, ...sortedData]);
  };

  // 3. 管理員登入
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDataLoading(true);
    try {
      const res = await fetch(`${GOOGLE_SCRIPT_URL}?action=adminLogin&pw=${adminPassword}`);
      const result = await res.json();
      
      if (result.submissions) {
        setSubmissions(result.submissions);
        // 如果目前已經有場次資料且後端傳回的場次資料一致，則不強制更新
        if (result.sessions && result.sessions.length > 0) {
          setSessions(result.sessions);
          localStorage.setItem('bagua_maze_sessions', JSON.stringify(result.sessions));
        }
        
        // --- 新增：將後端存儲的時間段設定同步到前端狀態 ---
        if (result.timeSlots) {
          if (result.timeSlots.general && result.timeSlots.general.length > 0) {
            setGeneralTimeSlots(result.timeSlots.general);
          }
          if (result.timeSlots.special && result.timeSlots.special.length > 0) {
            setSpecialTimeSlots(result.timeSlots.special);
          }
          if (result.timeSlots.config && result.timeSlots.config.generalStart) {
            setTimeslotConfig(result.timeSlots.config);
          }
        }

        setTotalRows(result.totalRows);
        setCurrentPage(1);
        setIsAdmin(true);
        setShowAdminLogin(false);
      } else {
        alert('密碼錯誤');
      }
    } catch (err) {
      console.error('登入偵錯資訊:', err);
      alert('登入失敗，可能是後端腳本未更新或密碼錯誤。');
    } finally {
      setIsDataLoading(false);
    }
  };

  // 3.5 載入特定分頁
  const loadPage = async (page: number) => {
    setIsDataLoading(true);
    try {
      const res = await fetch(`${GOOGLE_SCRIPT_URL}?action=getSubmissionsPage&pw=${adminPassword}&page=${page}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        if (page === 1) {
          setSubmissions(data);
        } else {
          setSubmissions([submissions[0], ...data]);
        }
        setCurrentPage(page);
      }
    } catch (err) {
      alert('無法載入分頁資料');
    } finally {
      setIsDataLoading(false);
    }
  };

  // --- 管理員操作功能 ---

  // 7. 管理操作：開啟修改視窗 (報名資料)
  const startEditSubmission = (row: any[], index: number) => {
    setEditingRowIndex(index);
    let rawTime = row[11] || ''; // 15 欄位架構中，第 12 欄 (Index 11) 為領取時間
    if (typeof rawTime === 'string' && rawTime.includes('T')) {
      rawTime = formatDateTimeMinute(new Date(rawTime));
    }
    setEditData({
      timestamp: row[0], 
      status: row[1], 
      name: row[2], 
      phone: row[3], 
      email: row[4], 
      session: row[5], 
      quantity: row[6], 
      players: row[7], 
      totalAmount: row[8], 
      paymentMethod: row[9], 
      bankLast5: row[10], 
      pickupTime: rawTime, 
      pickupLocation: row[12], 
      referral: row[13], 
      notes: row[14]
    });
    setIsEditing(true);
  };

  // 8. 管理操作：送出修改 (報名資料)
  const handleUpdateSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingRowIndex === null) return;
    
    setIsSubmitting(true);
    try {
      // 找出該資料在原始 submissions 中的位置 (如果是過濾狀態，index 可能不同)
      // 這裡直接傳送 rowIndex，GAS 端應處理 +1 的邏輯
      const payload = { 
        action: 'updateSubmission', 
        pw: adminPassword, 
        rowIndex: editingRowIndex, 
        ...editData 
      };

      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(payload)
      });

      // 同步本地狀態，確保畫面立刻更新
      const newSubmissions = [...submissions];
      newSubmissions[editingRowIndex] = [
        editData.timestamp, 
        editData.status, 
        editData.name, 
        editData.phone, 
        editData.email,
        editData.session, 
        editData.quantity, 
        editData.players, 
        editData.totalAmount, 
        editData.paymentMethod, 
        editData.bankLast5, 
        editData.pickupTime, 
        editData.pickupLocation, 
        editData.referral, 
        editData.notes
      ];
      
      setSubmissions(newSubmissions);
      setIsEditing(false);
      alert('修改成功 (資料已同步至試算表)');
    } catch (err) {
      console.error('更新失敗:', err);
      alert('更新失敗，請檢查網路連線');
    } finally {
      setIsSubmitting(false);
    }
  };

  const [isEditingSession, setIsEditingSession] = useState(false);
  const [editingSession, setEditingSession] = useState({ 
    oldName: '', newName: '', newPrice: '', fixedDate: '', fixedTime: '', isSpecial: false 
  });

  // 管理操作：切換固定時間多選
  const toggleFixedTime = (time: string, isEdit: boolean) => {
    if (isEdit) {
      const currentTimes = editingSession.fixedTime ? editingSession.fixedTime.split(',').filter(Boolean) : [];
      const newTimes = currentTimes.includes(time) 
        ? currentTimes.filter(t => t !== time) 
        : [...currentTimes, time].sort();
      setEditingSession({ ...editingSession, fixedTime: newTimes.join(',') });
    } else {
      const currentTimes = newSession.fixedTime ? newSession.fixedTime.split(',').filter(Boolean) : [];
      const newTimes = currentTimes.includes(time) 
        ? currentTimes.filter(t => t !== time) 
        : [...currentTimes, time].sort();
      setNewSession({ ...newSession, fixedTime: newTimes.join(',') });
    }
  };

  // 4. 管理操作：新增場次
  const handleAddSession = async () => {
    if (!newSession.name || !newSession.price) return;
    setIsSubmitting(true);
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({ 
          action: 'addSession', 
          pw: adminPassword, 
          ...newSession 
        })
      });
      const res = await fetch(`${GOOGLE_SCRIPT_URL}?action=getSessions`);
      const data = await res.json();
      setSessions(data);
      setNewSession({ name: '', price: '', fixedDate: '', fixedTime: '', isSpecial: false });
      alert('新增成功');
    } catch (err) {
      alert('新增失敗');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 4.5 管理操作：開啟修改場次視窗
  const startEditSession = (session: any) => {
    // 清理可能存在的亂碼 (1899... 或 轉錯的 23:30)
    const cleanedTime = (session.fixedTime || '').split(',').map((t: string) => {
      const p = t.trim();
      if (p.includes('T')) return p.split('T')[1].substring(0, 5);
      if (p.length > 10) {
        const m = p.match(/(\d{2}:\d{2})/);
        return m ? m[1] : "";
      }
      return p;
    }).filter((t: string) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(t) && t !== "23:30").join(',');

    setEditingSession({ 
      oldName: session.name, 
      newName: session.name, 
      newPrice: String(session.price),
      fixedDate: session.fixedDate || '',
      fixedTime: cleanedTime,
      isSpecial: !!(session.fixedDate || cleanedTime)
    });
    setIsEditingSession(true);
  };

  // 4.6 管理操作：送出修改場次
  const handleUpdateSession = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({ 
          action: 'updateSession', 
          pw: adminPassword, 
          ...editingSession 
        })
      });
      const res = await fetch(`${GOOGLE_SCRIPT_URL}?action=getSessions`);
      const data = await res.json();
      setSessions(data);
      setIsEditingSession(false);
      alert('修改成功');
    } catch (err) {
      alert('修改失敗');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 5. 管理操作：刪除場次
  const handleDeleteSession = async (name: string, isSpecial: boolean) => {
    if (!window.confirm(`確定要刪除場次「${name}」嗎？`)) return;
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({ 
          action: 'deleteSession', 
          pw: adminPassword, 
          name,
          isSpecial // 告知後端是哪種類型，以便搜尋正確的試算表分頁
        })
      });
      setSessions(prev => prev.filter(s => s.name !== name));
      alert('刪除要求已送出');
    } catch (err) {
      console.error('刪除失敗:', err);
      alert('刪除失敗，請檢查網路連線');
    }
  };

  // 6. 管理操作：刪除報名資料
  const handleDeleteSubmission = async (rowIndex: number) => {
    if (!window.confirm('確定要刪除這筆報名資料嗎？此操作不可復原！')) return;
    setIsDataLoading(true);
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({ action: 'deleteSubmission', pw: adminPassword, rowIndex })
      });
      setSubmissions(prev => prev.filter((_, i) => i !== rowIndex));
      setTotalRows(prev => prev - 1);
      alert('已刪除');
    } catch (err) {
      alert('刪除失敗');
    } finally {
      setIsDataLoading(false);
    }
  };

  // 6.5 管理操作：審核付款
  const handleVerifyPayment = async (rowIndex: number, status: string) => {
    if (!window.confirm(`確定要將此筆報名標記為「${status}」嗎？`)) return;
    setIsDataLoading(true);
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({ action: 'verifyPayment', pw: adminPassword, rowIndex, status })
      });
      
      const newSubmissions = [...submissions];
      // 修正：狀態欄位在 Index 1
      newSubmissions[rowIndex][1] = status;
      
      setSubmissions(newSubmissions);
      alert('審核狀態已更新');
    } catch (err) {
      alert('審核失敗');
    } finally {
      setIsDataLoading(false);
    }
  };

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // 姓名欄位：僅過濾掉數字
    if (name === 'name') {
      const filteredValue = value.replace(/[0-9]/g, '');
      if (filteredValue.length > 20) return;
      setFormData(prev => ({ ...prev, [name]: filteredValue }));
      validateField(name, filteredValue);
      return;
    }

    // 銀行轉帳末五碼：僅允許 5 碼數字
    if (name === 'bankLast5') {
      const filteredValue = value.replace(/\D/g, '').slice(0, 5);
      setFormData(prev => ({ ...prev, [name]: filteredValue }));
      return;
    }

    // 當份數改變時，如果是一般預約，自動切換場次
    if (name === 'quantity') {
      const qty = parseInt(value) || 0;
      setFormData(prev => {
        let updatedSession = prev.session;
        if (sessionType === '一般預約') {
          const filtered = sessions.filter(s => !s.fixedDate && !s.fixedTime);
          if (qty >= 5) {
            const groupSession = filtered.find(s => s.name.includes('團體優惠')) || filtered[0];
            updatedSession = groupSession?.name || '';
          } else {
            // 優先找包含「單人」、「個人」或「一般」的場次，若都沒有則選第一個
            const soloSession = filtered.find(s => s.name.includes('單人') || s.name.includes('個人') || s.name.includes('一般')) || filtered[0];
            updatedSession = soloSession?.name || '';
          }
        }
        return { ...prev, quantity: value, session: updatedSession };
      });
      return;
    }

    // 當場次改變時 (主要是特別預約手動切換)
    if (name === 'session') {
      const selectedSession = sessions.find(s => s.name === value);
      
      // 1. 根據場次類型決定預設時間
      let newPickupTime = ''; 

      // 情況 A：如果是「固定特別場次」，帶入該場次的固定時間
      if (selectedSession?.fixedDate) {
        const times = selectedSession.fixedTime ? selectedSession.fixedTime.split(',') : [];
        let timeToUse = times.length > 0 ? times[0] : '09:00';
        // 強制補零：如果是 "9:00" 則變為 "09:00"
        if (timeToUse.length === 4 && timeToUse.includes(':')) {
          timeToUse = '0' + timeToUse;
        }
        newPickupTime = `${selectedSession.fixedDate} ${timeToUse}`;
      } else if (selectedSession?.fixedTime) {
        // 如果只有固定時間（無固定日期），且目前只有一個時段時才自動帶入
        const times = selectedSession.fixedTime.split(',');
        if (times.length === 1) {
          let timeToUse = times[0];
          if (timeToUse.length === 4 && timeToUse.includes(':')) {
            timeToUse = '0' + timeToUse;
          }
          const todayStr = new Date().toISOString().split('T')[0];
          newPickupTime = `${todayStr} ${timeToUse}`;
        }
      } else {
        // 情況 B：如果是「一般預約場次」 (沒有 fixedDate/fixedTime)，自動計算最早可用時段
        newPickupTime = findEarliestSlot(sessions);
      }

      setFormData(prev => ({ ...prev, session: value, pickupTime: newPickupTime }));
      return;
    }

    if (name === 'countryCode') {
      setFormData(prev => ({ ...prev, [name]: value }));
      validateField('phone', formData.phone, value);
      return;
    }

    if (name === 'phone') {
      const filteredValue = value.replace(/\D/g, '');
      const rules: { [key: string]: number } = {
        '+886': 10,
        '+852': 8,
        '+853': 8,
        '+60': 11,
        '+65': 8,
        'landline': 10
      };
      const maxLen = rules[formData.countryCode] || 15;
      if (filteredValue.length > maxLen) return;
      setFormData(prev => ({ ...prev, [name]: filteredValue }));
      validateField(name, filteredValue);
      return;
    }

    if (name === 'email') {
      setFormData(prev => ({ ...prev, [name]: value }));
      validateField(name, value);
      return;
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const day = date.getDay();
      if (day === 1 || day === 2) return;
      
      const startH = parseInt(timeslotConfig.generalStart.split(':')[0]);
      const endH = parseInt(timeslotConfig.generalEnd.split(':')[0]);
      
      const hours = date.getHours();
      if (hours < startH || hours > endH) date.setHours(startH, 0, 0);
      
      // 改用不含秒的時間格式處理器 (YYYY-MM-DD HH:mm)
      const formattedDate = formatDateTimeMinute(date); 
      setFormData(prev => ({ ...prev, pickupTime: formattedDate }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      const newReferral = checked 
        ? [...prev.referral, value]
        : prev.referral.filter(item => item !== value);
      return { ...prev, referral: newReferral };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 檢查即時驗證錯誤
    if (formErrors.email || formErrors.phone || formErrors.name) {
      alert('【送出失敗】請修正表單中的錯誤紅字後再試。');
      return;
    }

    // --- JavaScript 硬性驗證 (防範 F12 惡意修改 HTML) ---
    const requiredFields = [
      { key: 'name', label: '【報名人姓名】' },
      { key: 'phone', label: '【聯絡電話】' },
      { key: 'email', label: '【Email】' }
    ];

    // 1. 檢查基本資料
    for (const field of requiredFields) {
      const value = formData[field.key as keyof typeof formData];
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        alert(`【送出失敗】請填寫${field.label}，此為必填欄位。`);
        return;
      }
    }

    // 2. 檢查場次類型
    if (sessionType === '') {
      alert('【送出失敗】請先選擇【場次類型】');
      return;
    }

    // 3. 檢查詳細場次與時間
    if (!formData.session || formData.session.trim() === '') {
      alert('【送出失敗】尚未選定詳細場次。');
      return;
    }

    if (!formData.pickupTime || formData.pickupTime.trim() === '') {
      alert('【送出失敗】請選擇【預計遊玩日期與時間】');
      return;
    }

    // 4. 新增：檢查銀行轉帳末五碼 (如果選中了銀行轉帳)
    if (formData.paymentMethod === '銀行轉帳/ATM') {
      if (!formData.bankLast5 || formData.bankLast5.trim() === '' || formData.bankLast5.length !== 5) {
        alert('【送出失敗】選擇「銀行轉帳/ATM」時，必須填寫完整的「帳戶末五碼」(5位數字)。');
        return;
      }
    }

    setShowConfirmation(true);
  };

  // 根據語言獲取領取地點顯示名稱
  const getPickupLocationDisplay = (location: string) => {
    if (lang === 'zh') return location;
    if (location.includes('新港文教基金會')) return t.locFoundation;
    if (location.includes('培桂堂')) return t.locPeiGui;
    return location;
  };

  const handleConfirmSubmit = async () => {
    // --- 機器人驗證 (Honeypot & Speed Check) ---
    if (formData.hp_field !== '') {
      console.warn('機器人行為檢測：陷阱欄位被填寫，值為:', formData.hp_field);
      alert('檢測到異常行為（可能是自動填寫功能干擾），請重新整理頁面再試一次。');
      return; 
    }

    const timeDiff = (Date.now() - loadTime) / 1000;
    if (timeDiff < 3) { // 將 5 秒放寬到 3 秒
      alert('【送出失敗】填表速度過快，請稍候再按送出。');
      return;
    }

    // --- 原有的二次驗證邏輯 ---
    const qty = parseInt(formData.quantity) || 0;
    const players = parseInt(formData.players) || 0;
    const maxPlayers = qty * 4;

    if (qty <= 0) {
      alert('【報名失敗】份數必須至少為 1 份。');
      setShowConfirmation(false);
      return;
    }

    if (players <= 0 || players > maxPlayers) {
      alert(`【報名失敗】遊玩人數不符規定。\n目前報名 ${qty} 份，遊玩人數上限應為 ${maxPlayers} 人。\n請檢查後重新輸入。`);
      setShowConfirmation(false);
      return;
    }
    // ------------------

    setIsSubmitting(true);
    setShowConfirmation(false);

    const bankLast5 = formData.paymentMethod === '銀行轉帳/ATM' ? formData.bankLast5 : '無';
    
    // 合併電話與國碼/標籤
    const displayCountryName = formData.countryCode === 'landline' ? '市內電話' : formData.countryCode;
    const combinedPhone = `${displayCountryName} ${formData.phone}`;

    const submissionData: any = {
      ...formData,
      phone: combinedPhone, // 使用合併後的電話資訊覆蓋原有的 phone 欄位
      players: formData.players.trim() || '1',
      notes: formData.notes.trim() || '無',
      paymentMethod: formData.paymentMethod.split(' (')[0],
      bankLast5: bankLast5,
      totalAmount: calculatedTotal,
      referral: formData.referral.join(', '),
      timestamp: formatFullDateTime(new Date()), // 使用包含秒數的完整格式
      action: 'addRegistration'
    };

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('提交失敗:', error);
      alert('報名失敗，請檢查網路連線或稍後再試。');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 根據語言獲取繳費方式顯示名稱
  const getPaymentMethodDisplay = (method: string) => {
    if (lang === 'zh') return method.split(' (')[0];
    if (method.includes('親至新港文教基金會')) return t.payInPerson;
    if (method.includes('銀行轉帳')) return t.bankTransfer;
    if (method.includes('Line Pay')) return 'Line Pay';
    return method;
  };

  const resetForm = () => {
    setFormData({
      email: '', 
      name: '', 
      countryCode: '+886',
      phone: '', 
      contactEmail: '', 
      session: sessions[0]?.name || '',
      quantity: '1', 
      players: '1', 
      totalAmount: '', 
      paymentMethod: '親至新港文教基金會繳費',
      bankLast5: '', 
      pickupTime: '', 
      pickupLocation: '新港文教基金會(閱讀館)',
      referral: [] as string[], 
      notes: '', 
      hp_field: ''
    });
    setFormErrors({ email: '', phone: '', name: '' });
    setSubmitted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 管理員後台 UI
  if (isAdmin) {
    return (
      <div className="container admin-dashboard">
        {showAuditModal && auditTarget && (
          <div className="modal-overlay">
            <div className="admin-login-modal form-card" style={{maxWidth: '500px', padding: '2.5rem'}}>
              <h2 className="form-section-title" style={{textAlign: 'center', fontSize: '1.5rem', marginBottom: '2rem'}}>報名資料審核</h2>
              
              <div className="audit-details" style={{textAlign: 'left', marginBottom: '2rem'}}>
                <div style={{background: 'rgba(255,255,255,0.05)', padding: '1.2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)'}}>
                  <p style={{margin: '0 0 0.8rem 0', display: 'flex', justifyContent: 'space-between'}}>
                    <span style={{color: 'var(--text-muted)'}}>報名人：</span>
                    <strong style={{color: 'white', fontSize: '1.1rem'}}>{auditTarget.row[2]}</strong>
                  </p>
                  <p style={{margin: '0 0 0.8rem 0', display: 'flex', justifyContent: 'space-between'}}>
                    <span style={{color: 'var(--text-muted)'}}>報名場次：</span>
                    <span style={{textAlign: 'right'}}>{auditTarget.row[5]}</span>
                  </p>
                  <p style={{margin: '0 0 0.8rem 0', display: 'flex', justifyContent: 'space-between'}}>
                    <span style={{color: 'var(--text-muted)'}}>份數 / 人數：</span>
                    <span>{auditTarget.row[6]} 份 / {auditTarget.row[7]} 人</span>
                  </p>
                  <p style={{margin: '0 0 0.8rem 0', display: 'flex', justifyContent: 'space-between', paddingTop: '0.8rem', borderTop: '1px solid rgba(255,255,255,0.1)'}}>
                    <span style={{color: 'var(--text-muted)'}}>付款方式：</span>
                    <strong style={{color: 'var(--primary-gold)'}}>{auditTarget.row[9]}</strong>
                  </p>
                  
                  {/* 修正：只要付款方式包含「銀行轉帳」，就顯示末五碼 (Index 10) */}
                  {(String(auditTarget.row[9]).includes('銀行轉帳') || String(auditTarget.row[9]).includes('ATM')) && (
                    <p style={{margin: '0.5rem 0 0 0', background: 'rgba(230, 126, 34, 0.15)', padding: '0.8rem', borderRadius: '8px', border: '1px dashed var(--accent-orange)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                      <span style={{color: 'var(--accent-orange)', fontWeight: 'bold'}}>帳戶末五碼：</span>
                      <strong style={{color: 'var(--accent-orange)', fontSize: '1.2rem', letterSpacing: '2px'}}>{auditTarget.row[10] || '未提供'}</strong>
                    </p>
                  )}
                </div>

                <div style={{marginTop: '1.5rem', padding: '0 0.5rem'}}>
                  <p style={{margin: '0 0 0.5rem 0', display: 'flex', justifyContent: 'space-between'}}>
                    <span style={{color: 'var(--text-muted)'}}>訂單總額：</span>
                    <strong style={{color: 'var(--primary-gold)', fontSize: '1.3rem'}}>NT$ {auditTarget.row[8]}</strong>
                  </p>
                  <p style={{margin: '0', display: 'flex', justifyContent: 'space-between'}}>
                    <span style={{color: 'var(--text-muted)'}}>目前狀態：</span>
                    <span style={{
                      padding: '0.2rem 0.8rem', 
                      borderRadius: '50px', 
                      background: auditTarget.row[1] === '通過' ? 'rgba(39, 174, 96, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                      color: auditTarget.row[1] === '通過' ? '#2ecc71' : '#bbb',
                      fontSize: '0.85rem'
                    }}>{auditTarget.row[1] || '待審核'}</span>
                  </p>
                </div>
              </div>

              <div className="modal-actions" style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <button 
                  onClick={() => {
                    handleVerifyPayment(auditTarget.index, '通過');
                    setShowAuditModal(false);
                  }} 
                  className="submit-btn audit-confirm-btn" 
                  style={{
                    width: '100%', 
                    height: '50px', 
                    background: '#27ae60', 
                    fontWeight: 'bold',
                    borderRadius: '12px',
                    boxShadow: '0 4px 15px rgba(39, 174, 96, 0.2)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    whiteSpace: 'nowrap'
                  }}
                >
                  確認付款完成
                </button>
                <button 
                  onClick={() => setShowAuditModal(false)} 
                  className="cancel-btn audit-cancel-btn" 
                  style={{
                    width: '100%', 
                    height: '50px', 
                    background: 'rgba(255,255,255,0.05)', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#ccc',
                    fontWeight: 'bold',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  關閉
                </button>
              </div>
            </div>
          </div>
        )}

        {isEditing && (
          <div className="modal-overlay">
            <div className="admin-login-modal form-card admin-edit-modal" style={{maxWidth: '800px', width: '95%'}}>
              <h2 className="form-section-title">修改報名資料</h2>
              <form onSubmit={handleUpdateSubmission}>
                <div className="edit-form-grid">
                  <div className="form-group">
                    <label>審核狀態</label>
                    <select value={editData.status} onChange={e => setEditData({...editData, status: e.target.value})}>
                      <option value="待審核">待審核</option>
                      <option value="通過">通過</option>
                      <option value="不通過">不通過</option>
                    </select>
                  </div>
                  <div className="form-group"><label>填表姓名</label><input type="text" value={editData.name} onChange={e => setEditData({...editData, name: e.target.value})} /></div>
                  <div className="form-group"><label>聯絡電話</label><input type="text" value={editData.phone} onChange={e => setEditData({...editData, phone: e.target.value})} /></div>
                  <div className="form-group"><label>Email</label><input type="email" value={editData.email} onChange={e => setEditData({...editData, email: e.target.value})} /></div>
                  <div className="form-group"><label>報名場次</label>
                    <select value={editData.session} onChange={e => setEditData({...editData, session: e.target.value})}>
                      {sessions.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                    </select>
                  </div>
                  <div className="form-group"><label>份數</label><input type="number" value={editData.quantity} onChange={e => setEditData({...editData, quantity: e.target.value})} /></div>
                  <div className="form-group"><label>遊玩人數</label><input type="text" value={editData.players} onChange={e => setEditData({...editData, players: e.target.value})} /></div>
                  <div className="form-group"><label>總金額</label><input type="number" value={editData.totalAmount} onChange={e => setEditData({...editData, totalAmount: e.target.value})} /></div>
                  <div className="form-group"><label>繳費方式</label>
                    <select value={editData.paymentMethod} onChange={e => setEditData({...editData, paymentMethod: e.target.value})}>
                      <option value="親至新港文教基金會繳費">親至新港文教基金會繳費</option>
                      <option value="銀行轉帳/ATM">銀行轉帳/ATM</option>
                      <option value="Line Pay">Line Pay</option>
                    </select>
                  </div>
                  {editData.paymentMethod === '銀行轉帳/ATM' && (
                    <div className="form-group"><label>轉帳帳戶(末五碼) *</label>
                      <input 
                        type="text" 
                        maxLength={5}
                        inputMode="numeric"
                        pattern="\d*"
                        required
                        value={editData.bankLast5} 
                        onChange={e => {
                          const val = e.target.value.replace(/\D/g, '').slice(0, 5);
                          setEditData({...editData, bankLast5: val});
                        }} 
                      />
                    </div>
                  )}                  <div className="form-group"><label>遊玩日期時間</label><input type="text" value={editData.pickupTime} onChange={e => setEditData({...editData, pickupTime: e.target.value})} /></div>
                  <div className="form-group"><label>領取地點</label>
                    <select value={editData.pickupLocation} onChange={e => setEditData({...editData, pickupLocation: e.target.value})}>
                      <option value="新港文教基金會(閱讀館)">新港文教基金會(閱讀館)</option>
                      <option value="培桂堂(建議選此處，此處為解謎起點)">培桂堂</option>
                    </select>
                  </div>
                  <div className="form-group" style={{gridColumn: '1 / -1'}}><label>如何得知本活動內容?</label><input type="text" value={editData.referral} onChange={e => setEditData({...editData, referral: e.target.value})} /></div>
                  <div className="form-group" style={{gridColumn: '1 / -1'}}><label>備註</label>
                    <textarea value={editData.notes} onChange={e => setEditData({...editData, notes: e.target.value})} rows={2}></textarea>
                  </div>
                </div>
                
                <div className="modal-actions admin-login-actions">
                  <button type="button" onClick={() => setIsEditing(false)} className="cancel-btn">取消</button>
                  <button type="submit" className="submit-btn" disabled={isSubmitting}>儲存修改</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isEditingSession && (
          <div className="modal-overlay">
            <div className="admin-login-modal form-card" style={{maxWidth: '500px'}}>
              <h2 className="form-section-title">修改場次資訊</h2>
              <form onSubmit={handleUpdateSession}>
                <div className="form-group">
                  <label>場次名稱</label>
                  <input type="text" value={editingSession.newName} onChange={e => setEditingSession({...editingSession, newName: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>價格</label>
                  <input type="number" value={editingSession.newPrice} onChange={e => setEditingSession({...editingSession, newPrice: e.target.value})} />
                </div>
                <div className="form-group" style={{gridColumn: '1 / -1'}}>
                  <label>場次分組 (決定儲存分頁) *</label>
                  <select 
                    value={editingSession.isSpecial ? 'special' : 'general'} 
                    onChange={e => setEditingSession({...editingSession, isSpecial: e.target.value === 'special'})}
                  >
                    <option value="general">📅 一般預約場次 (存入「一般場次」分頁)</option>
                    <option value="special">✨ 固定特別場次 (存入「特別場次」分頁)</option>
                  </select>
                </div>
                {editingSession.isSpecial && (
                  <>
                    <div className="form-group">
                      <label>固定日期</label>
                      <DatePicker
                        selected={editingSession.fixedDate ? new Date(editingSession.fixedDate) : null}
                        onChange={(date: Date | null) => {
                          if (date) {
                            const formatted = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                            setEditingSession({...editingSession, fixedDate: formatted});
                          } else {
                            setEditingSession({...editingSession, fixedDate: ''});
                          }
                        }}
                        dateFormat="yyyy-MM-dd"
                        className="date-picker-input"
                        placeholderText="點擊選擇日期"
                        isClearable
                      />
                    </div>
                    <div className="form-group" style={{gridColumn: '1 / -1'}}>
                      <label>固定開放時段 (可多選，不選則代表全時段開放)</label>
                      <div className="time-slot-grid">
                        {specialTimeSlots.map(t => (
                          <button 
                            key={t} 
                            type="button"
                            className={`time-slot-btn ${editingSession.fixedTime.split(',').includes(t) ? 'active' : ''}`}
                            onClick={() => toggleFixedTime(t, true)}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                <div className="modal-actions admin-login-actions">
                  <button type="button" onClick={() => setIsEditingSession(false)} className="cancel-btn">取消</button>
                  <button type="submit" className="submit-btn" disabled={isSubmitting}>儲存修改</button>
                </div>
              </form>
            </div>
          </div>
        )}

        <header className="header">
          <div className="lang-switcher">
            <button className="theme-toggle" onClick={toggleTheme} title={t.themeToggle}>
              {theme === 'dark' ? '🌙' : '☀️'}
            </button>
          </div>
          <h1>管理後台</h1>
          <div className="admin-nav">
            <button onClick={() => setAdminTab('sessions')} className={adminTab === 'sessions' ? 'active' : ''}>場次管理</button>
            <button onClick={() => setAdminTab('timeslots')} className={adminTab === 'timeslots' ? 'active' : ''}>時間段管理</button>
            <button onClick={() => setAdminTab('submissions')} className={adminTab === 'submissions' ? 'active' : ''}>報名清單</button>
            <button onClick={() => setIsAdmin(false)}>登出後台</button>
          </div>
        </header>

        {adminTab === 'sessions' ? (
          <section className="admin-section form-card">
            <h3 className="form-section-title">目前場次管理</h3>
            <div className="session-list">
              {sessions.map(s => (
                <div key={s.name} className="session-item">
                  <span style={{color: 'var(--text-light)', flex: 1}}>{s.name} - ${s.price}</span>
                  <div className="action-cell">
                    <button onClick={() => startEditSession(s)} className="edit-btn">修改</button>
                    <button 
                      onClick={() => handleDeleteSession(s.name, !!(s.fixedDate || s.fixedTime))} 
                      className="delete-btn"
                    >
                      刪除
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="add-session-form">
              <h3 className="form-section-title">新增場次</h3>
              <div className="edit-form-grid">
                <div className="form-group">
                  <label>場次名稱</label>
                  <input type="text" placeholder="例如：5/2(六)市集場" value={newSession.name} onChange={e => setNewSession({...newSession, name: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>價格</label>
                  <input type="number" placeholder="650" value={newSession.price} onChange={e => setNewSession({...newSession, price: e.target.value})} />
                </div>
                <div className="form-group" style={{gridColumn: '1 / -1'}}>
                  <label>場次分組 (決定儲存分頁) *</label>
                  <select 
                    value={newSession.isSpecial ? 'special' : 'general'} 
                    onChange={e => setNewSession({...newSession, isSpecial: e.target.value === 'special'})}
                  >
                    <option value="general">📅 一般預約場次 (存入「一般場次」分頁)</option>
                    <option value="special">✨ 固定特別場次 (存入「特別場次」分頁)</option>
                  </select>
                </div>
                {newSession.isSpecial && (
                  <>
                    <div className="form-group">
                      <label>固定日期</label>
                      <DatePicker
                        selected={newSession.fixedDate ? new Date(newSession.fixedDate) : null}
                        onChange={(date: Date | null) => {
                          if (date) {
                            const formatted = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                            setNewSession({...newSession, fixedDate: formatted});
                          } else {
                            setNewSession({...newSession, fixedDate: ''});
                          }
                        }}
                        dateFormat="yyyy-MM-dd"
                        className="date-picker-input"
                        placeholderText="點擊選擇日期"
                        isClearable
                      />
                    </div>
                    <div className="form-group" style={{gridColumn: '1 / -1'}}>
                      <label>固定開放時段 (可多選，不選則代表全時段開放)</label>
                      <div className="time-slot-grid">
                        {specialTimeSlots.map(t => (
                          <button 
                            key={t} 
                            type="button"
                            className={`time-slot-btn ${newSession.fixedTime.split(',').includes(t) ? 'active' : ''}`}
                            onClick={() => toggleFixedTime(t, false)}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
              <button onClick={handleAddSession} disabled={isSubmitting} className="submit-btn" style={{width: '100%', marginTop: '1rem'}}>
                確認新增場次
              </button>
            </div>
          </section>
        ) : adminTab === 'submissions' ? (
          <section className="admin-section form-card submissions-table-container">
            <div className="admin-section-header">
              <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <h3 className="form-section-title" style={{margin: 0}}>報名清單 (共 {totalRows} 筆)</h3>
                <div className="admin-filter-bar" style={{display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--input-bg)', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--input-border)'}}>
                  <button 
                    onClick={handleDownloadExcel} 
                    className="submit-btn icon-btn" 
                    title="下載 Excel 檔案"
                    style={{
                      background: '#27ae60', padding: '0.5rem 1rem', 
                      display: 'flex', alignItems: 'center', gap: '6px',
                      borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem'
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    下載 Excel
                  </button>
                  <div style={{width: '1px', height: '24px', background: 'var(--input-border)', margin: '0 0.5rem'}}></div>
                  <span title="依遊玩日期篩選" style={{display: 'flex', alignItems: 'center', color: 'var(--primary-gold)'}}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                      <path d="M10 14l2 2 4-4"></path>
                    </svg>
                  </span>
                  <DatePicker
                    selected={adminFilterDate}
                    onChange={(date: Date | null) => handleDateFilter(date)}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="選擇日期"
                    className="date-picker-input"
                    isClearable
                  />
                  {adminFilterDate && (
                    <button 
                      onClick={() => handleDateFilter(null)} 
                      className="cancel-btn icon-btn" 
                      title="清除篩選"
                      style={{padding: '0.3rem', display: 'flex', alignItems: 'center'}}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  )}
                  
                  <div className="column-filter-container" style={{position: 'relative', marginLeft: 'auto'}}>
                    <button 
                      onClick={() => setShowShowColumnFilter(!showColumnFilter)} 
                      className="edit-btn icon-btn" 
                      title="顯示欄位設定"
                      style={{
                        background: 'var(--card-bg)', border: '1px solid var(--input-border)', padding: '0.5rem', 
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        borderRadius: '4px', cursor: 'pointer', transition: 'all 0.2s'
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="3"></circle>
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                      </svg>
                    </button>
                    {showColumnFilter && (
                      <div className="column-filter-dropdown" style={{
                        position: 'absolute', top: '100%', right: 0, zIndex: 100,
                        background: 'var(--card-bg)', border: '1px solid var(--input-border)', borderRadius: '8px',
                        padding: '1rem', width: '180px', boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                        marginTop: '0.5rem'
                      }}>
                        <div style={{display: 'flex', flexDirection: 'column', gap: '0.6rem', maxHeight: '300px', overflowY: 'auto'}}>
                          {submissions[0]?.map((h: any, i: number) => (
                            <label key={i} style={{display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', cursor: 'pointer', color: 'var(--text-light)'}}>
                              <input type="checkbox" checked={visibleColumns.includes(i)} onChange={() => toggleColumn(i)} />
                              {h}
                            </label>
                          ))}
                        </div>
                        <button 
                          onClick={() => setShowShowColumnFilter(false)} 
                          className="submit-btn icon-btn" 
                          title="關閉選單"
                          style={{width: '100%', marginTop: '1rem', padding: '0.4rem', display: 'flex', justifyContent: 'center'}}
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {!adminFilterDate && (
                <div className="pagination">
                  <button onClick={() => loadPage(currentPage - 1)} disabled={currentPage === 1 || isDataLoading}>上一頁</button>
                  <span className="copy" style={{color: 'var(--primary-gold)'}}>第 {currentPage} 頁 / 共 {Math.ceil(totalRows / 50)} 頁</span>
                  <button onClick={() => loadPage(currentPage + 1)} disabled={currentPage >= Math.ceil(totalRows / 50) || isDataLoading}>下一頁</button>
                </div>
              )}
            </div>
            <table className="submissions-table">
              <thead>
                <tr>
                  <th>操作</th>
                  {submissions[0]?.map((h: any, i: number) => visibleColumns.includes(i) && (
                    <th key={i}>
                      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        {h}
                        <button 
                          className={`sort-btn ${sortConfig?.key === i ? 'active' : ''}`} 
                          onClick={() => handleSort(i)}
                          title="點擊排序"
                        >
                          {sortConfig?.key === i ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '↕'}
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {submissions.slice(1).map((row, i) => (
                  <tr key={i}>
                    <td className="action-cell">
                      <button onClick={() => { setAuditTarget({index: i + 1, row}); setShowAuditModal(true); }} className="edit-btn" style={{background: '#f39c12', color: 'white'}}>審核</button>
                      <button onClick={() => startEditSubmission(row, i + 1)} className="edit-btn">修改</button>
                      <button onClick={() => handleDeleteSubmission(i + 1)} className="delete-btn">刪除</button>
                    </td>
                    {row.map((cell: any, j: number) => visibleColumns.includes(j) && (
                      <td key={j}>
                        {j === 0 && cell 
                          ? formatFullDateTime(new Date(cell)) 
                          : (j === 1 ? (
                              <span style={{
                                padding: '0.3rem 0.8rem', 
                                borderRadius: '50px', 
                                fontSize: '0.8rem',
                                fontWeight: 'bold',
                                background: cell === '通過' ? 'rgba(39, 174, 96, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                                color: cell === '通過' ? '#2ecc71' : '#bbb'
                              }}>
                                {cell || '待審核'}
                              </span>
                            ) : cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        ) : (
          <section className="admin-section form-card">
            <h3 className="form-section-title">開放時間段管理</h3>
            <div className="timeslot-admin-grid">
              <div className="timeslot-config-box">
                <h4>📅 一般預約時段</h4>
                <div className="generator-box">
                    <input type="time" className="admin-time-input" value={timeslotConfig.generalStart} onChange={e => setTimeslotConfig({...timeslotConfig, generalStart: e.target.value})} />
                  <span>至</span>
                  <input type="time" className="admin-time-input" value={timeslotConfig.generalEnd} onChange={e => setTimeslotConfig({...timeslotConfig, generalEnd: e.target.value})} />
                  <span>間隔時間 : </span>
                  <input type="number" className="admin-time-input" style={{ width: '100px' }} placeholder="間隔(分)" value={timeslotConfig.generalInterval} onChange={e => setTimeslotConfig({...timeslotConfig, generalInterval: parseInt(e.target.value)})} />
                  <button onClick={() => setGeneralTimeSlots(generateTimeSlots(timeslotConfig.generalStart, timeslotConfig.generalEnd, timeslotConfig.generalInterval))}>自動新增</button>
                </div>
                <div className="manual-add">
                  <input type="text" placeholder="HH:mm" value={newManualTime} onChange={e => setNewManualTime(e.target.value)} />
                  <button onClick={() => handleManualTimeAdd('general')}>手動新增</button>
                </div>
                <div className="slot-list">
                  {generalTimeSlots.map(s => (
                    <span key={s} className="slot-tag">{s} <i onClick={() => removeTimeSlot('general', s)}>×</i></span>
                  ))}
                </div>
              </div>

              <div className="timeslot-config-box">
                <h4>✨ 特別預約時段</h4>
                <div className="generator-box">
                  <input type="time" className="admin-time-input" value={timeslotConfig.specialStart} onChange={e => setTimeslotConfig({...timeslotConfig, specialStart: e.target.value})} />
                  <span>至</span>
                  <input type="time" className="admin-time-input" value={timeslotConfig.specialEnd} onChange={e => setTimeslotConfig({...timeslotConfig, specialEnd: e.target.value})} />
                  <span>間隔時間 : </span>
                  <input type="number" placeholder="間隔(分)" value={timeslotConfig.specialInterval} onChange={e => setTimeslotConfig({...timeslotConfig, specialInterval: parseInt(e.target.value)})} />
                  <button onClick={() => setSpecialTimeSlots(generateTimeSlots(timeslotConfig.specialStart, timeslotConfig.specialEnd, timeslotConfig.specialInterval))}>自動新增</button>
                </div>
                <div className="manual-add">
                  <input type="text" placeholder="HH:mm" value={newManualTime} onChange={e => setNewManualTime(e.target.value)} />
                  <button onClick={() => handleManualTimeAdd('special')}>手動新增</button>
                </div>
                <div className="slot-list">
                  {specialTimeSlots.map(s => (
                    <span key={s} className="slot-tag">{s} <i onClick={() => removeTimeSlot('special', s)}>×</i></span>
                  ))}
                </div>
              </div>
            </div>
            <button onClick={saveTimeSlotsConfig} className="submit-btn" style={{width: '100%', marginTop: '2rem'}}>儲存所有時間段設定</button>
          </section>
        )}
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="container">
        <div className="success-screen">
          <div className="check-icon">✓</div>
          <h1>{t.submitSuccess}</h1>
          <p>{t.thanks} <strong>{formData.name}</strong>。</p>
          <p>{t.received}</p>
          <div className="summary-box">
            <p><strong>{t.session}</strong> {getSessionDisplayName(formData.session)}</p>
            <p><strong>{t.playTime}</strong> {formData.pickupTime}</p>
            <p><strong>{t.orderTotal}</strong> NT$ {calculatedTotal}</p>
            <p><strong>{t.paymentMethod}</strong> {getPaymentMethodDisplay(formData.paymentMethod)}</p>
            {formData.paymentMethod === '銀行轉帳/ATM' && (
              <div className="bank-info" style={{marginTop: '1rem'}}>
                <p>{t.bankInfo}</p>
                <div className="account-container">
                  <span>{t.account}</span>
                  <button onClick={handleCopyAccount} className="copy-btn">{t.copyAccount}</button>
                </div>
              </div>
            )}
            {formData.paymentMethod.includes('Line Pay') && (
              <div className="linepay-box">
                <p>{t.linePayInfo}</p>
                <a href="https://qrcodepay.line.me/qr/payment/t1pM7jY1P9C5oOEJ7gc7o%252FnGCvoXh75q7xD7BSn4lKJxf9hIkbwGfT9i8EeGD2QC" target="_blank" rel="noopener noreferrer" className="linepay-btn">
                  {t.toLinePay}
                </a>
              </div>
            )}
          </div>
          <button onClick={resetForm} className="cta-button">{t.backToHome}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {/* 進場動畫 Overlay */}
      {shouldRenderEntry && (
        <div className={`entry-animation-overlay ${!isEntryAnimating ? 'exit' : ''}`}>
          <div className="thematic-loading">
            <div className="bagua-spinner-container">
              <div className="bagua-spinner">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className={`trigram trigram-${i}`} style={{ '--i': i } as any}></div>
                ))}
                <div className="bagua-center">
                  <div className="taiji"></div>
                </div>
              </div>
              <div className="loading-glow"></div>
            </div>
            <div className="loading-text-container">
              <p className="loading-main-text">{t.openingBagua}</p>
              <p className="loading-sub-text">{t.traversingTime}</p>
            </div>
          </div>
        </div>
      )}

      {showAdminLogin && (
        <div className="modal-overlay">
          <div className="admin-login-modal form-card">
            <h2 className="form-section-title admin-login-title">管理員登入</h2>
            <form onSubmit={handleAdminLogin}>
              <div className="form-group">
                <input type="password" placeholder="請輸入管理密碼" value={adminPassword} onChange={e => setAdminPassword(e.target.value)} autoFocus />
              </div>
              
              {isDataLoading && <div className="loading-overlay">資料讀取中</div>}
              
              <div className="modal-actions admin-login-actions">
                <button type="button" onClick={() => setShowAdminLogin(false)} className="cancel-btn">
                  取消
                </button>
                <button type="submit" className="submit-btn" disabled={isDataLoading}>
                  {isDataLoading ? '驗證中...' : '登入'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showConfirmation && (
        <div className="modal-overlay">
          <div className="admin-login-modal form-card" style={{maxWidth: '600px', width: '90%'}}>
            <h2 className="form-section-title">{t.confirmTitle}</h2>
            <div className="confirmation-details" style={{textAlign: 'left', marginBottom: '2rem', lineHeight: '1.8'}}>
              <p><strong>{t.registrant}</strong>{formData.name}</p>
              <p><strong>{t.phone}</strong>{formData.countryCode} {formData.phone}</p>
              <p><strong>{t.email}</strong>{formData.email}</p>
              <p><strong>{t.session}</strong>{getSessionDisplayName(formData.session)}</p>
              <p><strong>{t.qty}</strong>{formData.quantity} {t.kitVal}</p>
              <p><strong>{t.playerCount}</strong>{formData.players} {t.playersVal}</p>
              <p><strong>{t.expectedTime}</strong> {formData.pickupTime}</p>
              <p><strong>{t.pickupLoc}</strong> {getPickupLocationDisplay(formData.pickupLocation)}</p>
              <p><strong>{t.paymentMethod}</strong> {getPaymentMethodDisplay(formData.paymentMethod)}</p>
              <p><strong>{t.total}</strong><span style={{color: 'var(--primary-gold)', fontWeight: 'bold', fontSize: '1.2rem'}}>NT$ {calculatedTotal}</span></p>
              {formData.notes && <p><strong>{t.notes}</strong>{formData.notes}</p>}
            </div>
            <div className="modal-actions admin-login-actions">
              <button type="button" onClick={() => setShowConfirmation(false)} className="cancel-btn">
                {t.backToEdit}
              </button>
              <button type="button" onClick={handleConfirmSubmit} className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? t.submitting : t.confirmSubmit}
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="header">
        <div className="lang-switcher">
          <button 
            className={lang === 'zh' ? 'active' : ''} 
            onClick={() => setLang('zh')}
          >
            中
          </button>
          <button 
            className={lang === 'en' ? 'active' : ''} 
            onClick={() => setLang('en')}
          >
            EN
          </button>
          <button className="theme-toggle" onClick={toggleTheme} title={t.themeToggle}>
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
        </div>
        <div className="era-badge">{t.eraBadge}</div>
        <h1>{t.mainTitle}</h1>
        <h2 className="main-title">{t.subTitle}</h2>
      </header>

      <main className="main-content">
        <div className="poster-container">
          <img src="poster.jpg" alt="Poster" className="poster-image" />
        </div>

        <section className="story-section">
          <div className="story-box">
            <h2 className="section-title">{t.storyTitle}</h2>
            <div className="story-text">
              <p>{t.storyPara1}</p>
              <p>{t.storyPara2}</p>
              <p>{t.storyPara3}</p>
              <p>{t.storyPara4}</p>
              <p>{t.storyPara5}</p>
              <p>{t.storyPara6}</p>
              <p>{t.storyPara7}</p>
              <p className="highlight">{t.storyHighlight}</p>
            </div>
          </div>
        </section>

        <section className="event-info">
          <h2 className="section-title">{t.eventTitle}</h2>
          <p className="intro-p">{t.eventIntro}</p>
          <div className="info-grid">
            <div className="info-item">
              <strong>{t.itemPrice}</strong>
              <span>{t.itemPriceVal}</span>
            </div>
            <div className="info-item">
              <strong>{t.itemPlayers}</strong>
              <span>{t.itemPlayersVal}</span>
            </div>
            <div className="info-item">
              <strong>{t.itemTime}</strong>
              <span>{t.itemTimeVal}</span>
            </div>
            <div className="info-item">
              <strong>{t.itemContent}</strong>
              <span>{t.itemContentVal}</span>
            </div>
          </div>
        </section>

        <section className="registration-section">
          <form onSubmit={handleSubmit} className="reg-form">
            {/* 陷阱欄位 (Honeypot) - 機器人會填寫，人類看不到 */}
            <div style={{ display: 'none' }} aria-hidden="true">
              <input 
                type="text" 
                name="hp_field" 
                value={formData.hp_field} 
                onChange={handleInputChange} 
                tabIndex={-1} 
                autoComplete="off" 
              />
            </div>

            <div className="form-card">
              <h3 className="form-section-title">{t.basicInfo}</h3>
              <div className="form-group">
                <label>
                  {t.nameLabel}
                  <span className="required-mark">*</span>
                </label>
                <input type="text" name="name" required value={formData.name} onChange={handleInputChange} placeholder={t.namePlaceholder} />
                {formErrors.name && <span className="error-msg">{formErrors.name}</span>}
              </div>
              <div className="form-group">
                <label>
                  {t.phoneLabel}
                  <span className="required-mark">*</span>
                </label>
                <div style={{ 
                  display: 'flex', 
                  width: '100%',
                  background: 'var(--input-bg)',
                  border: '1px solid var(--input-border)',
                  borderRadius: '8px',
                  transition: 'all .3s ease',
                  boxSizing: 'border-box'
                }}>
                  <select 
                    name="countryCode" 
                    value={formData.countryCode} 
                    onChange={handleInputChange}
                    style={{ 
                      width: 'auto', 
                      minWidth: '130px',
                      flexShrink: 0,
                      background: 'transparent',
                      border: 'none',
                      borderRight: '1px solid var(--input-border)',
                      color: 'var(--input-text)',
                      padding: '1rem',
                      cursor: 'pointer',
                      fontSize: '16px',
                      outline: 'none',
                      appearance: 'none',
                      WebkitAppearance: 'none'
                    }}
                  >
                    <option value="+886" style={{ color: 'var(--text-light)', background: 'var(--card-bg)' }}>{t.countryNames['+886']}</option>
                    <option value="+852" style={{ color: 'var(--text-light)', background: 'var(--card-bg)' }}>{t.countryNames['+852']}</option>
                    <option value="+853" style={{ color: 'var(--text-light)', background: 'var(--card-bg)' }}>{t.countryNames['+853']}</option>
                    <option value="+65" style={{ color: 'var(--text-light)', background: 'var(--card-bg)' }}>{t.countryNames['+65']}</option>
                    <option value="+60" style={{ color: 'var(--text-light)', background: 'var(--card-bg)' }}>{t.countryNames['+60']}</option>
                    <option value="landline" style={{ color: 'var(--text-light)', background: 'var(--card-bg)' }}>{t.countryNames['landline']}</option>
                  </select>
                  <input 
                    type="tel" 
                    name="phone" 
                    required 
                    value={formData.phone} 
                    onChange={handleInputChange} 
                    placeholder={(() => {
                      const placeholders: { [key: string]: string } = {
                        '+886': '0912345678',
                        '+852': '91234567',
                        '+853': '61234567',
                        '+65': '91234567',
                        '+60': '0123456789',
                        'landline': '053745074'
                      };
                      return placeholders[formData.countryCode] || t.phonePlaceholder;
                    })()}
                    style={{ 
                      flex: 1,
                      background: 'transparent',
                      border: 'none',
                      padding: '1rem',
                      color: 'var(--input-text)',
                      fontSize: '16px',
                      outline: 'none',
                      width: '100%'
                    }}
                  />
                </div>
                {formErrors.phone && <span className="error-msg">{formErrors.phone}</span>}
              </div>
              <div className="form-group">
                <label>
                  {t.emailLabel}
                  <span className="required-mark">*</span>
                </label>
                <input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder={t.emailPlaceholder} />
                {formErrors.email && <span className="error-msg">{formErrors.email}</span>}
              </div>
            </div>

            <div className="form-card">
              <h3 className="form-section-title">{t.regInfo}</h3>
              
              <div className="form-group">
                <label>
                  {t.sessionType}
                  <span className="required-mark">*</span>
                </label>
                <select 
                  value={sessionType} 
                  required
                  onChange={(e) => {
                    const newType = e.target.value as '一般預約' | '特別預約' | '';
                    setSessionType(newType);
                    
                    if (newType === '') {
                      setFormData(prev => ({ ...prev, session: '', pickupTime: '' }));
                      return;
                    }

                    // 切換類型後，過濾出該類型的場次
                    const filtered = sessions.filter(s => 
                      newType === '特別預約' ? (s.fixedDate || s.fixedTime) : (!s.fixedDate && !s.fixedTime)
                    );
                    
                    if (filtered.length > 0) {
                      let targetValue = filtered[0].name;
                      
                      // 如果是一般預約，根據目前的份數自動選擇場次
                      if (newType === '一般預約') {
                        const qty = parseInt(formData.quantity) || 0;
                        if (qty >= 5) {
                          targetValue = filtered.find(s => s.name.includes('團體優惠'))?.name || targetValue;
                        } else {
                          targetValue = filtered.find(s => s.name.includes('單人') || s.name.includes('個人') || s.name.includes('一般'))?.name || targetValue;
                        }
                      }
                      
                      // 更新場次，並觸發連動邏輯
                      handleInputChange({ 
                        target: { name: 'session', value: targetValue } 
                      } as any);
                    }
                  }}
                >
                  <option value="" disabled>{t.sessionTypePlaceholder}</option>
                  <option value="一般預約">{t.generalReg}</option>
                  <option value="特別預約">{t.specialReg}</option>
                </select>
              </div>

              {/* 選定場次類型後才展開後續表單 */}
              {sessionType !== '' && (
                <>
                  <div className="form-group">
                    <label>
                      {t.detailSession}
                      <span className="required-mark">*</span>
                    </label>
                    {sessionType === '一般預約' ? (
                      <div className="general-session-info" style={{ 
                        padding: '1rem', 
                        background: 'rgba(212, 175, 55, 0.1)', 
                        border: '1px solid var(--primary-gold)', 
                        borderRadius: '8px',
                        color: 'var(--primary-gold)',
                        fontSize: '0.95rem',
                        lineHeight: '1.6'
                      }}>
                        <p style={{ margin: 0, fontWeight: 'bold' }}>
                          {t.autoSelected} {getSessionDisplayName(formData.session) || t.calculating}
                        </p>
                        <div className="discount-hint" style={{ marginTop: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                          {t.discountHint}
                        </div>
                      </div>
                    ) : (
                      <select 
                        name="session" 
                        value={formData.session} 
                        onChange={handleInputChange}
                        required
                      >
                        {sessions.length > 0 ? (
                          sessions
                            .filter(s => (s.fixedDate || s.fixedTime))
                            .map(s => <option key={s.name} value={s.name}>{lang === 'en' ? (s.enName || s.name) : s.name} (${s.price})</option>)
                        ) : (
                          <option disabled>{t.loading}</option>
                        )}
                      </select>
                    )}
                  </div>
                  <div className="form-group">
                    <label>
                      {t.quantity}
                      <span className="required-mark">*</span>
                    </label>
                    <input type="number" name="quantity" min="1" required value={formData.quantity} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>
                      {t.playersLabel}
                      <span className="required-mark">*</span>
                    </label>
                    <select name="players" value={formData.players} onChange={handleInputChange}>
                      {Array.from({ length: Number(formData.quantity) * 4 }, (_, i) => i + 1).map(num => (
                        <option key={num} value={num}>{num} {t.playersVal}</option>
                      ))}
                    </select>
                  </div>
                </>
              )}
            </div>

            {sessionType !== '' && (
              <>
                <div className="form-card">
                  <h3 className="form-section-title">{t.paymentCard}</h3>
                  <div className="form-group">
                    <label>
                      {t.paymentMethodLabel}
                      <span className="required-mark">*</span>
                    </label>
                    <div className="radio-group">
                      <label><input type="radio" name="paymentMethod" value="親至新港文教基金會繳費" checked={formData.paymentMethod === '親至新港文教基金會繳費'} onChange={handleInputChange} /> {t.payInPerson}</label>
                      <label><input type="radio" name="paymentMethod" value="銀行轉帳/ATM" checked={formData.paymentMethod === '銀行轉帳/ATM'} onChange={handleInputChange} /> {t.bankTransfer}</label>
                      <label>
                        <input type="radio" name="paymentMethod" value="Line Pay (https://qrcodepay.line.me/qr/payment/t1pM7jY1P9C5oOEJ7gc7o%252FnGCvoXh75q7xD7BSn4lKJxf9hIkbwGfT9i8EeGD2QC)" checked={formData.paymentMethod.includes('Line Pay')} onChange={handleInputChange} /> 
                        Line Pay
                      </label>
                    </div>
                  </div>

                  {formData.paymentMethod === '銀行轉帳/ATM' && (
                    <div className="form-group bank-info">
                      <p>{t.bankName}</p>
                      <div className="account-container" style={{display: 'flex', alignItems: 'center', gap: '10px', margin: '0.5rem 0'}}>
                        <p style={{margin: 0}}>{t.bankAcc}</p>
                        <button type="button" onClick={handleCopyAccount} className="copy-btn">{t.copy}</button>
                      </div>
                      <label>
                        {t.bankLast5}
                        <span className="required-mark">*</span>
                      </label>
                      <input 
                        type="text" 
                        name="bankLast5" 
                        maxLength={5}
                        inputMode="numeric"
                        pattern="\d*"
                        value={formData.bankLast5} 
                        onChange={handleInputChange} 
                        placeholder={t.bankLast5Placeholder} 
                      />
                    </div>
                  )}

                  <div className="form-group">
                    <label>
                      {t.expectedDate(timeslotConfig.generalStart, timeslotConfig.generalEnd)}
                      <span className="required-mark">*</span>
                    </label>
                    
                    {/* 顯示固定場次或衝突告示 */}
                    {(() => {
                      const selectedSession = sessions.find(s => s.name === formData.session);
                      const currentDateStr = formData.pickupTime.split(' ')[0];

                      // 情況 A：目前選的就是特別場次 -> 顯示固定資訊
                      if (selectedSession?.fixedDate || selectedSession?.fixedTime) {
                        let displayDate = selectedSession.fixedDate || '不限日期';
                        if (displayDate.includes('T')) displayDate = displayDate.split('T')[0];
                        return (
                          <div className="fixed-session-hint">
                            {t.fixedSessionHint(displayDate, selectedSession.fixedTime ? selectedSession.fixedTime.replace(/,/g, '、') : '全時段')}
                          </div>
                        );
                      }

                      // 情況 B：目前選的是普通場次，但選中的日期有特別場次 -> 顯示衝突告示
                      if (currentDateStr) {
                        const conflicts = sessions.filter(s => {
                          let sDate = s.fixedDate || '';
                          if (sDate.includes('T')) sDate = sDate.split('T')[0];
                          return sDate === currentDateStr;
                        });
                        
                        if (conflicts.length > 0) {
                          const conflictTimes = conflicts.map(c => c.fixedTime?.replace(/,/g, '、')).join(' ; ');
                          return (
                            <div className="conflict-notice">
                              {t.conflictNotice(conflictTimes)}
                            </div>
                          );
                        }
                      }
                      return null;
                    })()}

                    <DatePicker
                      selected={formData.pickupTime ? new Date(formData.pickupTime) : null}
                      onChange={handleDateChange}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={30}
                      timeCaption={t.timeCaption}
                      dateFormat="yyyy-MM-dd HH:mm"
                      className="date-picker-input"
                      placeholderText={t.datepickerPlaceholder}
                      required
                      minDate={(() => {
                        const now = new Date();
                        const endHour = parseInt(timeslotConfig.generalEnd.split(':')[0]);
                        if (now.getHours() >= endHour) {
                          now.setDate(now.getDate() + 1);
                        }
                        return now;
                      })()}
                      maxDate={sessions.find(s => s.name === formData.session)?.fixedDate 
                        ? new Date(sessions.find(s => s.name === formData.session)!.fixedDate!) 
                        : undefined}
                      filterDate={(date) => {
                        const selectedSession = sessions.find(s => s.name === formData.session);
                        if (selectedSession?.fixedDate) {
                          const fixedDate = new Date(selectedSession.fixedDate);
                          return date.getFullYear() === fixedDate.getFullYear() &&
                                 date.getMonth() === fixedDate.getMonth() &&
                                 date.getDate() === fixedDate.getDate();
                        }
                        return date.getDay() !== 1 && date.getDay() !== 2;
                      }}
                      // 修正：確保 minTime/maxTime 抓到的是選定日期的邊界
                      minTime={(() => {
                        const d = formData.pickupTime ? new Date(formData.pickupTime) : new Date();
                        const [h, m] = (sessionType === '特別預約' ? timeslotConfig.specialStart : timeslotConfig.generalStart).split(':');
                        d.setHours(parseInt(h), parseInt(m), 0);
                        return d;
                      })()}
                      maxTime={(() => {
                        const d = formData.pickupTime ? new Date(formData.pickupTime) : new Date();
                        const [h, m] = (sessionType === '特別預約' ? timeslotConfig.specialEnd : timeslotConfig.generalEnd).split(':');
                        d.setHours(parseInt(h), parseInt(m), 0);
                        return d;
                      })()}
                      filterTime={(time) => {
                        const now = new Date();
                        if (time.getTime() < now.getTime()) return false;

                        const timeStr = `${pad(time.getHours())}:${pad(time.getMinutes())}`;
                        const selectedSession = sessions.find(s => s.name === formData.session);
                        
                        // 1. 如果是固定日期的特別場次，只顯示該場次指定的 fixedTime
                        if (selectedSession?.fixedDate && selectedSession?.fixedTime) {
                          return selectedSession.fixedTime.split(',').includes(timeStr);
                        }
                        
                        // 2. 根據目前場次類型選擇對應的「開放時段陣列」
                        const allowedSlots = sessionType === '特別預約' ? specialTimeSlots : generalTimeSlots;
                        if (!allowedSlots.includes(timeStr)) return false;

                        // 3. 額外檢查：如果是「一般預約」，要避開該日期被其他「特別場次」佔用的時段
                        if (sessionType === '一般預約') {
                          const currentDateStr = formData.pickupTime.split(' ')[0];
                          const isTakenByOtherSpecial = sessions.some(s => {
                            let sDate = s.fixedDate || '';
                            if (sDate.includes('T')) sDate = sDate.split('T')[0];
                            return sDate === currentDateStr && s.fixedTime?.split(',').includes(timeStr);
                          });
                          if (isTakenByOtherSpecial) return false;
                        }

                        return true;
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      {t.pickupLocation}
                      <span className="required-mark">*</span>
                    </label>
                    <select name="pickupLocation" value={formData.pickupLocation} onChange={handleInputChange}>
                      <option value="新港文教基金會(閱讀館)">{t.locFoundation}</option>
                      <option value="培桂堂(建議選此處，此處為解謎起點)">{t.locPeiGui}</option>
                    </select>
                  </div>
                </div>

                <div className="form-card">
                  <h3 className="form-section-title">{t.other}</h3>
                  <div className="form-group">
                    <label>{t.referralLabel}</label>
                    <div className="checkbox-grid">
                      {t.referrals.map((item, index) => (
                        <label key={item}>
                          <input 
                            type="checkbox" 
                            value={translations.zh.referrals[index]} 
                            checked={formData.referral.includes(translations.zh.referrals[index])} 
                            onChange={handleCheckboxChange} 
                          /> 
                          {item}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="form-group">
                    <label>{t.notesLabel}</label>
                    <textarea name="notes" value={formData.notes} onChange={handleInputChange} rows={3}></textarea>
                  </div>
                </div>

                <div className="submit-container">
                  <div className="total-display">
                    <span>{t.total}</span>
                    <span className="amount">NT$ {calculatedTotal}</span>
                  </div>
                  <button type="submit" className="submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? t.submitting : t.submitBtn}
                  </button>
                </div>
              </>
            )}
          </form>
        </section>
      </main>

      {/* 社交媒體浮動按鈕 - 八卦主題 */}
      <div className="social-float-container">
        <a 
          href="tel:053745074,,73" 
          className="social-btn" 
          title={t.callTitle}
        >
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.21 6.59 6.65l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
        </a>
        <a 
          href="https://www.facebook.com/share/1DtGCBFnms/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="social-btn" 
          title={t.fbTitle}
        >
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z"/>
          </svg>
        </a>
        <a
          href="https://www.instagram.com/hkfce1987?igsh=MXE4M3MxYnFobGh4OA=="
          target="_blank"
          rel="noopener noreferrer"
          className="social-btn"
          title={t.igTitle}
        >
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.074 4.771 4.85 0 1.266.012 1.645.07 4.85.012 3.204.012 3.584.07 4.85-.148 3.252-1.074 4.771-4.85 4.771-1.266 0-1.645.012-4.85.07-3.204-.012-3.584-.012-4.85-.07-3.252-.148-4.771-1.074-4.771-4.85 0-1.266-.012-1.645-.07-4.85-.012-3.204-.012-3.584-.07-4.85.148-3.252 1.074-4.771 4.85-4.771 1.266 0 1.645-.012 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-5.838 2.435-5.838 5.838s2.435 5.838 5.838 5.838 5.838-2.435 5.838-5.838-2.435-5.838-5.838-5.838zm0 9.674c-2.119 0-3.836-1.717-3.836-3.836s1.717-3.836 3.836-3.836 3.836 1.717 3.836 3.836-1.717 3.836-3.836 3.836zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </a>
        <a
          href="https://maps.app.goo.gl/SKwXeuuAbr4DzCqQ8"
          target="_blank"
          rel="noopener noreferrer"
          className="social-btn"
          title={t.locTitle}
        >
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        </a>      </div>

      <footer className="footer">
        <div className="footer-content">
          <h3>{t.contactInfo}</h3>
          <p>{t.foundationName}</p>
          <p>
            <a 
              href="https://www.google.com.tw/maps/place/%E8%B2%A1%E5%9C%98%E6%B3%95%E4%BA%BA%E6%96%B0%E6%B8%AF%E6%96%87%E6%95%99%E5%9F%BA%E9%87%91%E6%9C%83/@23.5600241,120.3436242,17z/data=!4m5!3m4!1s0x346ebd52d25d3f79:0xee3b4c7708b19c2e!8m2!3d23.5598989!4d120.3437709?hl=zh-TW&shorturl=1" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="address-link"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '6px', verticalAlign: 'middle'}}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              {t.address}
            </a>
          </p>
          <p>{t.phoneFull}</p>
          <div className="refund-policy">
            <h4>{t.refundTitle}</h4>
            <ul>
              <li>{t.refund1}</li>
              <li>{t.refund2}</li>
              <li>{t.refund3}</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="admin-trigger" onClick={() => setShowAdminLogin(true)}>
            <img src="footer-logo.svg" alt="Hsinkang Foundation Logo" className="footer-admin-logo" />
          </div>
          <p className="copy">{t.footerCopy}</p>
        </div>
      </footer>
    </div>
  )
}
export default App

