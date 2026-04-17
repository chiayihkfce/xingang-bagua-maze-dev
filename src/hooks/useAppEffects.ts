import { useEffect } from 'react';
import { FormData, Session } from '../types';

interface UseAppEffectsProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  sessions: Session[];
  sessionType: string;
  setCalculatedTotal: (total: number) => void;
  sysModalShow: boolean;
  showConfirmation: boolean;
  isSubmitting: boolean;
  isDataLoading: boolean;
  showAuditModal: boolean;
  isEditing: boolean;
  isEditingSession: boolean;
  showRecycleBin: boolean;
  shouldRenderEntry: boolean;
}

/**
 * 處理應用程式內部的全域連動副作用邏輯
 */
export const useAppEffects = ({
  formData,
  setFormData,
  sessions,
  sessionType,
  setCalculatedTotal,
  sysModalShow,
  showConfirmation,
  isSubmitting,
  isDataLoading,
  showAuditModal,
  isEditing,
  isEditingSession,
  showRecycleBin,
  shouldRenderEntry
}: UseAppEffectsProps) => {

  /**
   * 副作用 1：當購買份數改變時，自動校正遊玩人數
   */
  useEffect(() => {
    const qty = parseInt(formData.quantity) || 1;
    const players = parseInt(formData.players) || 0;
    const maxPlayers = qty * 4;

    if (players > maxPlayers || players === 0) {
      setFormData(prev => ({ ...prev, players: '1' }));
    }
  }, [formData.quantity, formData.players, setFormData]);

  /**
   * 副作用 2：計算總金額
   */
  useEffect(() => {
    const qty = parseInt(formData.quantity) || 0;
    const sessionObj = sessions.find(s => s.name === formData.session);
    const price = sessionType === '' ? 0 : (sessionObj ? sessionObj.price : 650);
    setCalculatedTotal(qty * price);
  }, [formData.quantity, formData.session, sessions, sessionType, setCalculatedTotal]);

  /**
   * 副作用 3：當彈窗或載入畫面顯示時，禁止背景滑動
   */
  useEffect(() => {
    const isAnyModalOpen = 
      sysModalShow || 
      showConfirmation || 
      isSubmitting || 
      isDataLoading || 
      showAuditModal || 
      isEditing || 
      isEditingSession || 
      showRecycleBin || 
      shouldRenderEntry;

    if (isAnyModalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => document.body.classList.remove('modal-open');
  }, [
    sysModalShow, 
    showConfirmation, 
    isSubmitting, 
    isDataLoading, 
    showAuditModal, 
    isEditing, 
    isEditingSession, 
    showRecycleBin, 
    shouldRenderEntry
  ]);

};


