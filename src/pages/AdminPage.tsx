import React from 'react';
import CustomCursor from '../components/UI/CustomCursor';
import AdminDashboard from '../components/Admin/AdminDashboard';
import AdminLogin from '../components/Admin/AdminLogin';
import SystemModal from '../components/UI/SystemModal';
import { Session, TimeslotConfig, DashboardStats, PaymentMethod, AdminAccount } from '../types';

interface AdminPageProps {
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  adminTab: 'sessions' | 'submissions' | 'timeslots' | 'logs' | 'payments';
  setAdminTab: (tab: any) => void;
  currentAdmin: AdminAccount | null;
  setCurrentAdmin: (admin: any) => void;
  dashboardStats: DashboardStats;
  logs: any[][];
  sessions: Session[];
  startEditSession: (session: Session) => void;
  handleDeleteSession: (name: string, id?: string) => Promise<void>;
  newSession: any;
  setNewSession: (data: any) => void;
  handleAddSession: () => Promise<void>;
  isSubmitting: boolean;
  toggleFixedTime: (time: string, isEdit: boolean) => void;
  specialTimeSlots: string[];
  totalRows: number;
  handleDownloadExcel: () => void;
  handleImportExcel: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleImportSessionsExcel: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  adminFilterDate: Date | null;
  handleDateFilter: (date: Date | null) => void;
  adminSearchKeyword: string;
  setAdminSearchKeyword: (kw: string) => void;
  showColumnFilter: boolean;
  setShowShowColumnFilter: (val: boolean) => void;
  submissions: any[][];
  visibleColumns: number[];
  toggleColumn: (index: number) => void;
  currentPage: number;
  isDataLoading: boolean;
  loadPage: (page: number) => void;
  handleSort: (index: number) => void;
  sortConfig: any;
  setAuditTarget: (target: any) => void;
  setShowAuditModal: (val: boolean) => void;
  showAuditModal: boolean;
  auditTarget: any;
  handleVerifyPayment: (rowIndex: number, status: string) => Promise<void>;
  startEditSubmission: (row: any[], index: number) => void;
  isEditing: boolean;
  setIsEditing: (val: boolean) => void;
  editData: any;
  setEditData: (data: any) => void;
  handleUpdateSubmission: (e: React.FormEvent) => Promise<void>;
  handleDeleteSubmission: (rowIndex: number) => Promise<void>;
  isEditingSession: boolean;
  setIsEditingSession: (val: boolean) => void;
  editingSession: any;
  setEditingSession: (data: any) => void;
  handleUpdateSession: (e: React.FormEvent) => Promise<void>;
  timeslotConfig: TimeslotConfig;
  setTimeslotConfig: (config: any) => void;
  generalTimeSlots: string[];
  setGeneralTimeSlots: (slots: string[]) => void;
  setSpecialTimeSlots: (slots: string[]) => void;
  generateTimeSlots: (start: string, end: string, interval: number) => string[];
  newManualTime: string;
  setNewManualTime: (time: string) => void;
  handleManualTimeAdd: (type: 'general' | 'special') => void;
  removeTimeSlot: (type: 'general' | 'special', slot: string) => void;
  saveTimeSlotsConfig: (type: 'general' | 'special', config: TimeslotConfig, slots: string[]) => Promise<void>;
  formatFullDateTime: (date: Date) => string;
  deletedSubmissions: any[][];
  showRecycleBin: boolean;
  setShowRecycleBin: (val: boolean) => void;
  handleRestoreSubmission: (rowIndex: number) => Promise<void>;
  dbStatus: any;
  paymentMethods: PaymentMethod[];
  addPaymentMethod: (data: any) => Promise<void>;
  deletePaymentMethod: (method: PaymentMethod) => Promise<void>;
  handleClearLogs: () => Promise<void>;
  handleClearRecycleBin: () => Promise<void>;
  showAlert: (message: string) => void;
  showConfirm: (message: string, onConfirm: () => void) => void;
  sysModal: any;
  t: any;
  theme: string;
  toggleTheme: () => void;
  adminUser: string;
  setAdminUser: (u: string) => void;
  adminPassword: string;
  setAdminPassword: (p: string) => void;
  handleAdminLogin: (e: React.FormEvent) => Promise<void>;
  navigate: (to: string) => void;
}

const AdminPage: React.FC<AdminPageProps> = (props) => {
  const { 
    isAdmin, t, theme, toggleTheme, setIsAdmin, 
    adminTab, setAdminTab, currentAdmin, setCurrentAdmin, dashboardStats, 
    logs, sessions, startEditSession, handleDeleteSession, newSession, 
    setNewSession, handleAddSession, isSubmitting, toggleFixedTime, 
    specialTimeSlots, totalRows, handleDownloadExcel, handleImportExcel, 
    handleImportSessionsExcel, adminFilterDate, handleDateFilter, 
    adminSearchKeyword, setAdminSearchKeyword, showColumnFilter, 
    setShowShowColumnFilter, submissions, visibleColumns, toggleColumn, 
    currentPage, isDataLoading, loadPage, handleSort, sortConfig, 
    setAuditTarget, setShowAuditModal, showAuditModal, auditTarget, 
    handleVerifyPayment, startEditSubmission, isEditing, setIsEditing, 
    editData, setEditData, handleUpdateSubmission, handleDeleteSubmission, 
    isEditingSession, setIsEditingSession, editingSession, setEditingSession, 
    handleUpdateSession, timeslotConfig, setTimeslotConfig, generalTimeSlots, 
    setGeneralTimeSlots, setSpecialTimeSlots, generateTimeSlots, 
    newManualTime, setNewManualTime, handleManualTimeAdd, removeTimeSlot, 
    saveTimeSlotsConfig, formatFullDateTime, deletedSubmissions, 
    showRecycleBin, setShowRecycleBin, handleRestoreSubmission, 
    dbStatus, paymentMethods, addPaymentMethod, deletePaymentMethod, 
    handleClearLogs, handleClearRecycleBin, showAlert, showConfirm, sysModal,
    adminUser, setAdminUser, adminPassword, setAdminPassword, handleAdminLogin, navigate
  } = props as any;

  if (isAdmin) {
    return (
      <>
        <CustomCursor />
        <AdminDashboard 
          {...{ t, theme, toggleTheme, setIsAdmin: (val: boolean) => { setIsAdmin(val); if(!val) navigate('/'); }, adminTab, setAdminTab, currentAdmin, setCurrentAdmin, dashboardStats, logs, sessions, startEditSession, handleDeleteSession, newSession, setNewSession, handleAddSession, isSubmitting, toggleFixedTime, specialTimeSlots, totalRows, handleDownloadExcel, handleImportExcel, handleImportSessionsExcel, adminFilterDate, handleDateFilter, adminSearchKeyword, setAdminSearchKeyword, showColumnFilter, setShowShowColumnFilter, submissions, visibleColumns, toggleColumn, currentPage, isDataLoading, loadPage, handleSort, sortConfig, setAuditTarget, setShowAuditModal, showAuditModal, auditTarget, handleVerifyPayment, startEditSubmission, isEditing, setIsEditing, editData, setEditData, handleUpdateSubmission, handleDeleteSubmission, isEditingSession, setIsEditingSession, editingSession, setEditingSession, handleUpdateSession, timeslotConfig, setTimeslotConfig, generalTimeSlots, setGeneralTimeSlots, setSpecialTimeSlots, generateTimeSlots, newManualTime, setNewManualTime, handleManualTimeAdd, removeTimeSlot, saveTimeSlotsConfig, formatFullDateTime, deletedSubmissions, showRecycleBin, setShowRecycleBin, handleRestoreSubmission, dbStatus, paymentMethods, addPaymentMethod, deletePaymentMethod, handleClearLogs, handleClearRecycleBin, showAlert, showConfirm }}
        />
        <SystemModal 
          show={sysModal.show}
          type={sysModal.type}
          title={sysModal.title}
          message={sysModal.message}
          onConfirm={sysModal.onConfirm}
          onCancel={sysModal.onCancel}
          confirmText={sysModal.confirmText}
          cancelText={sysModal.cancelText}
        />
      </>
    );
  }
  
  return (
    <div className="admin-only-page">
      <CustomCursor />
      <AdminLogin {...{ t, showAdminLogin: true, setShowAdminLogin: () => navigate('/'), adminUser, setAdminUser, adminPassword, setAdminPassword, handleAdminLogin, isDataLoading }} />
      <SystemModal 
        show={sysModal.show}
        type={sysModal.type}
        title={sysModal.title}
        message={sysModal.message}
        onConfirm={sysModal.onConfirm}
        onCancel={sysModal.onCancel}
        confirmText={sysModal.confirmText}
        cancelText={sysModal.cancelText}
      />
    </div>
  );
};

export default AdminPage;
