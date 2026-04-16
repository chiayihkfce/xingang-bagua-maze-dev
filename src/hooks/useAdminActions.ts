import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { sendPaymentSuccessEmail } from "../utils/emailUtils";

interface UseAdminActionsProps {
  submissions: any[][];
  deletedSubmissions: any[][];
  showConfirm: (message: string, onConfirm: () => void) => void;
  showAlert: (message: string) => void;
  setIsDataLoading: (val: boolean) => void;
  setIsSubmitting: (val: boolean) => void;
  setShowRecycleBin: (val: boolean) => void;
  addLog: (type: string, details: string) => Promise<void>;
}

/**
 * 處理管理員的各項寫入操作邏輯
 */
export const useAdminActions = ({
  submissions,
  deletedSubmissions,
  showConfirm,
  showAlert,
  setIsDataLoading,
  setIsSubmitting,
  setShowRecycleBin,
  addLog
}: UseAdminActionsProps) => {

  /**
   * 審核付款狀態
   */
  const handleVerifyPayment = async (rowIndex: number, status: string) => {
    const target = submissions[rowIndex];
    const docId = target[15];
    const currentStatus = target[1];
    
    if (!docId) return;

    showConfirm(`確定要將此筆報名標記為「${status}」嗎？`, async () => {
      setIsDataLoading(true);
      try {
        const docRef = doc(db, "registrations", docId);
        await updateDoc(docRef, { status });
        await addLog('審核付款', `將「${target[2]}」的狀態由 [${currentStatus}] 變更為 [${status}]`);
        
        if (status === '通過' && currentStatus !== '通過') {
          await sendPaymentSuccessEmail(target);
        }
        
        showAlert('審核狀態已更新');
      } catch (err) {
        console.error(err);
        showAlert('審核失敗');
      } finally {
        setIsDataLoading(false);
      }
    });
  };

  /**
   * 將報名資料移至回收桶
   */
  const handleDeleteSubmission = async (rowIndex: number) => {
    const target = submissions[rowIndex];
    const docId = target[15];
    if (!docId) return;
    
    showConfirm('確定要將這筆報名資料移至回收桶嗎？', async () => {
      setIsDataLoading(true);
      try {
        const docRef = doc(db, "registrations", docId);
        await updateDoc(docRef, { deleted: true });
        await addLog('刪除報名', `將「${target[2]}」移至回收桶`);
        showAlert('已移至回收桶');
      } catch (err) {
        showAlert('操作失敗');
      } finally {
        setIsDataLoading(false);
      }
    });
  };

  /**
   * 從回收桶還原報名資料
   */
  const handleRestoreSubmission = async (rowIndex: number) => {
    const target = deletedSubmissions[rowIndex];
    const docId = target[15];
    if (!docId) return;
    
    setIsSubmitting(true);
    try {
      const docRef = doc(db, "registrations", docId);
      await updateDoc(docRef, { deleted: false });
      await addLog('還原報名', `從回收桶還原了「${target[2]}」的紀錄`);
      showAlert('資料已還原');
      setShowRecycleBin(false);
    } catch (err) {
      showAlert('還原失敗');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleVerifyPayment,
    handleDeleteSubmission,
    handleRestoreSubmission
  };
};


