import { Session } from '../types';

/**
 * 取得場次顯示名稱 (中/英)
 */
export const getSessionDisplayName = (chineseName: string, lang: string, sessions: Session[]) => {
  if (lang === 'zh') return chineseName;
  const session = sessions.find(s => s.name === chineseName);
  return session?.enName || chineseName;
};

/**
 * 取得取件地點顯示名稱 (中/英)
 */
export const getPickupLocationDisplay = (location: string, lang: string, t: any) => {
  if (lang === 'zh') return location;
  if (location.includes('新港文教基金會')) return t.locFoundation;
  if (location.includes('培桂堂')) return t.locPeiGui;
  return location;
};

/**
 * 取得付款方式顯示名稱 (中/英)
 */
export const getPaymentMethodDisplay = (method: string, lang: string, t: any) => {
  if (lang === 'zh') return method.split(' (')[0];
  if (method.includes('現金支付')) return t.payInPerson;
  if (method.includes('銀行轉帳')) return t.bankTransfer;
  if (method.includes('電子支付')) return 'Digital Payment';
  return method;
};

/**
 * 複製文字到剪貼簿
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('無法複製文字: ', err);
    return false;
  }
};

