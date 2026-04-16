import { useState } from 'react';
import { AdminAccount } from '../types';

/**
 * 處理管理員身分驗證與登入基礎狀態
 */
export const useAdminAuth = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminUser, setAdminUser] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [currentAdmin, setCurrentAdmin] = useState<AdminAccount | null>(null);

  return {
    isAdmin,
    setIsAdmin,
    adminUser,
    setAdminUser,
    adminPassword,
    setAdminPassword,
    currentAdmin,
    setCurrentAdmin
  };
};
