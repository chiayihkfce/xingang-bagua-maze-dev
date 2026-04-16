import { useEffect } from 'react';
import { FormData } from '../types';

interface UseAppEffectsProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

/**
 * 處理應用程式內部的全域連動副作用邏輯
 */
export const useAppEffects = ({
  formData,
  setFormData
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

};
