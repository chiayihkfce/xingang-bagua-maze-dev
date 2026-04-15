import emailjs from '@emailjs/browser';

/**
 * 自動發送付款成功通知 Email (詳細款項收訖)
 * submissionRow 索引對應：
 * 2: 姓名, 3: 電話, 4: Email, 5: 場次名稱, 6: 數量, 7: 人數, 8: 總金額, 11: 預約時間, 12: 取件地點
 */
export const sendPaymentSuccessEmail = async (submissionRow: any[]) => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || serviceId === 'your_service_id') {
    console.warn('EmailJS Service ID 未設定，跳過發信');
    return;
  }

  try {
    const templateParams = {
      to_email: submissionRow[4],
      name: submissionRow[2],
      phone: submissionRow[3],
      session: submissionRow[5],
      pickupTime: submissionRow[11],
      players: submissionRow[7],
      quantity: submissionRow[6],
      amount: submissionRow[8],
      pickupLocation: submissionRow[12]
    };

    await emailjs.send(serviceId, templateId, templateParams, publicKey);
    console.log(`[系統] 已向 ${submissionRow[2]} 發送詳細款項收訖通知`);
  } catch (error) {
    console.error('發送詳細通知信失敗:', error);
    throw error;
  }
};
