import { useState } from 'react';
import { collection, query, where, limit, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { AdminAccount } from '../types';
import { formatFullDateTime } from '../utils/dateUtils';

interface UseAdminAuthProps {
  showAlert: (message: string) => void;
  addLog: (type: string, details: string, operatorOverride?: string) => Promise<void>;
  setIsDataLoading: (val: boolean) => void;
}

/**
 * 處理管理員身分驗證與登入邏輯
 */
export const useAdminAuth = (props?: UseAdminAuthProps) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminUser, setAdminUser] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [currentAdmin, setCurrentAdmin] = useState<AdminAccount | null>(null);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!props) return;
    const { showAlert, addLog, setIsDataLoading } = props;

    setIsDataLoading(true);
    try {
      if (!adminUser) {
        showAlert('請輸入帳號');
        setIsDataLoading(false);
        return;
      }

      const q = query(
        collection(db, "admins"), 
        where("username", "==", adminUser),
        where("password", "==", adminPassword),
        limit(1)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const adminDoc = querySnapshot.docs[0];
        const adminData = { id: adminDoc.id, ...adminDoc.data() } as AdminAccount;

        setCurrentAdmin(adminData);
        setIsAdmin(true);

        await updateDoc(doc(db, "admins", adminDoc.id), {
          lastLogin: formatFullDateTime(new Date())
        });

        addLog('系統', `管理者 [${adminData.nickname || adminData.username}] 登入成功`, adminData.nickname || adminData.username);
      } else {
        showAlert('帳號或密碼錯誤');
      }
    } catch (error) {
      console.error("Login error:", error);
      showAlert('登入過程中發生錯誤');
    } finally {
      setIsDataLoading(false);
    }
  };

  return {
    isAdmin,
    setIsAdmin,
    adminUser,
    setAdminUser,
    adminPassword,
    setAdminPassword,
    currentAdmin,
    setCurrentAdmin,
    handleAdminLogin
  };
};
