/**
 * 表單輸入格式化工具
 */

/**
 * 格式化姓名：移除數字並限制最大長度
 */
export const formatName = (value: string, maxLength: number = 20): string => {
  const filtered = value.replace(/[0-9]/g, '');
  return filtered.slice(0, maxLength);
};

/**
 * 格式化銀行末五碼：僅保留數字並限制 5 碼
 */
export const formatBankLast5 = (value: string): string => {
  return value.replace(/\D/g, '').slice(0, 5);
};

/**
 * 格式化電話：僅保留數字並根據國碼限制長度
 */
export const formatPhone = (value: string, countryCode: string): string => {
  const filtered = value.replace(/\D/g, '');
  const rules: { [key: string]: number } = { 
    '+886': 10, 
    '+852': 8, 
    '+853': 8, 
    '+60': 11, 
    '+65': 8, 
    'landline': 10 
  };
  const maxLen = rules[countryCode] || 15;
  return filtered.slice(0, maxLen);
};
