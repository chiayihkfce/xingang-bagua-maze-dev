import { FormData, FormErrors } from '../types';

interface UseRegistrationActionsProps {
  formData: FormData;
  formErrors: FormErrors;
  sessionType: '一般預約' | '特別預約' | '';
  showAlert: (message: string) => void;
  setShowConfirmation: (val: boolean) => void;
}

/**
 * 處理報名流程中的各項行為邏輯 (提交、存檔、更新末五碼)
 */
export const useRegistrationActions = ({
  formData,
  formErrors,
  sessionType,
  showAlert,
  setShowConfirmation
}: UseRegistrationActionsProps) => {

  /**
   * 報名表單初步送出 (驗證並開啟確認視窗)
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. 檢查是否有驗證紅字
    if (formErrors.email || formErrors.phone || formErrors.name) {
      showAlert('請修正表單中的錯誤紅字後再試。');
      return;
    }

    // 2. 檢查必填欄位
    const requiredFields = [
      { key: 'name', label: '姓名' }, 
      { key: 'phone', label: '電話' }, 
      { key: 'email', label: 'Email' }
    ];

    for (const field of requiredFields) {
      const value = formData[field.key as keyof typeof formData];
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        showAlert(`請填寫${field.label}`);
        return;
      }
    }

    // 3. 檢查場次與類型
    if (sessionType === '') {
      showAlert('請選擇場次類型');
      return;
    }
    if (!formData.session) {
      showAlert('尚未選定場次');
      return;
    }
    if (!formData.pickupTime) {
      showAlert('請選擇日期時間');
      return;
    }

    // 4. 通過初步驗證，開啟確認視窗
    setShowConfirmation(true);
  };

  return {
    handleSubmit
  };
};
