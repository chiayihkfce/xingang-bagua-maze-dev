import React, { useState } from 'react';
import { AdminAccount } from '../../../types';
import { db } from '../../../firebase';
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp
} from 'firebase/firestore';

interface SettingsAdminListTabProps {
  currentAdmin: AdminAccount | null;
  admins: AdminAccount[];
  fetchAdmins: () => Promise<void>;
  showAlert: (message: string, title?: string) => void;
  showConfirm: (
    message: string,
    onConfirm: () => void,
    onCancel?: () => void,
    title?: string
  ) => void;
}

const SettingsAdminListTab: React.FC<SettingsAdminListTabProps> = ({
  currentAdmin,
  admins,
  fetchAdmins,
  showAlert,
  showConfirm
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newNickname, setNewNickname] = useState('');

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername || !newPassword) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'admins'), {
        username: newUsername,
        password: newPassword,
        nickname: newNickname || newUsername,
        role: 'admin',
        createdAt: serverTimestamp()
      });
      showAlert('新增管理者成功');
      setNewUsername('');
      setNewPassword('');
      setNewNickname('');
      await fetchAdmins();
    } catch (e) {
      showAlert('新增失敗');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAdmin = async (id: string, name: string) => {
    if (id === currentAdmin?.id) {
      showAlert('無法刪除目前登入的帳號');
      return;
    }

    showConfirm(`確定要刪除管理者「${name}」嗎？`, async () => {
      try {
        await deleteDoc(doc(db, 'admins', id));
        showAlert('刪除成功');
        await fetchAdmins();
      } catch (e) {
        showAlert('刪除失敗');
      }
    });
  };

  return (
    <div className="admin-list-section">
      {currentAdmin?.role === 'super' && (
        <form
          onSubmit={handleAddAdmin}
          className="add-admin-form"
          style={{
            background: 'rgba(241, 196, 15, 0.05)',
            padding: '1.5rem',
            borderRadius: '12px',
            marginBottom: '2rem',
            border: '1px dashed var(--primary-gold)'
          }}
        >
          <h4
            style={{
              marginBottom: '1rem',
              color: 'var(--primary-gold)'
            }}
          >
            ✨ 新增管理員帳號
          </h4>
          <div className="add-admin-grid">
            <input
              type="text"
              placeholder="帳號"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              required
              style={{
                padding: '0.8rem',
                borderRadius: '8px',
                border: '1px solid var(--border-subtle)',
                background: 'var(--container-bg)',
                color: 'var(--text-light)'
              }}
            />
            <input
              type="password"
              placeholder="密碼"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              style={{
                padding: '0.8rem',
                borderRadius: '8px',
                border: '1px solid var(--border-subtle)',
                background: 'var(--container-bg)',
                color: 'var(--text-light)'
              }}
            />
          </div>
          <input
            type="text"
            placeholder="暱稱 (選填)"
            value={newNickname}
            onChange={(e) => setNewNickname(e.target.value)}
            style={{
              marginTop: '1rem',
              width: '100%',
              padding: '0.8rem',
              borderRadius: '8px',
              border: '1px solid var(--border-subtle)',
              background: 'var(--container-bg)',
              color: 'var(--text-light)'
            }}
          />
          <button
            type="submit"
            className="submit-btn"
            style={{
              marginTop: '1.5rem',
              width: '100%',
              borderRadius: '10px'
            }}
            disabled={isSubmitting}
          >
            ＋ 建立新帳號
          </button>
        </form>
      )}

      <div
        className="admin-table-wrapper"
        style={{
          maxHeight: '300px',
          overflowY: 'auto',
          borderRadius: '12px',
          border: '1px solid var(--border-subtle)'
        }}
      >
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '0.9rem'
          }}
        >
          <thead>
            <tr
              style={{
                textAlign: 'left',
                background: 'rgba(255,255,255,0.05)'
              }}
            >
              <th style={{ padding: '1rem', color: 'var(--text-light)' }}>
                暱稱 / 帳號
              </th>
              <th style={{ padding: '1rem', color: 'var(--text-light)' }}>
                權限
              </th>
              <th style={{ padding: '1rem', color: 'var(--text-light)' }}>
                最後登入
              </th>
              <th
                style={{
                  padding: '1rem',
                  textAlign: 'center',
                  color: 'var(--text-light)'
                }}
              >
                操作
              </th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr
                key={admin.id}
                style={{
                  borderBottom: '1px solid var(--border-subtle)'
                }}
              >
                <td style={{ padding: '1rem' }}>
                  <div
                    style={{
                      fontWeight: 'bold',
                      color: 'var(--text-light)'
                    }}
                  >
                    {admin.nickname || admin.username}
                  </div>
                  <small style={{ color: 'var(--text-muted)' }}>
                    @{admin.username}
                  </small>
                </td>
                <td style={{ padding: '1rem' }}>
                  <span
                    style={{
                      padding: '2px 8px',
                      borderRadius: '4px',
                      background:
                        admin.role === 'super'
                          ? 'var(--primary-gold)'
                          : 'rgba(255,255,255,0.1)',
                      color:
                        admin.role === 'super'
                          ? '#000000'
                          : 'var(--text-light)',
                      fontSize: '0.75rem',
                      fontWeight: 'bold'
                    }}
                  >
                    {admin.role === 'super' ? '超級' : '一般'}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>
                  <small style={{ color: 'var(--text-muted)' }}>
                    {admin.lastLogin ? admin.lastLogin : '尚未登入'}
                  </small>
                </td>
                <td style={{ padding: '1rem', textAlign: 'center' }}>
                  {currentAdmin?.role === 'super' &&
                  admin.role !== 'super' &&
                  admin.id !== currentAdmin?.id ? (
                    <button
                      onClick={() =>
                        handleDeleteAdmin(admin.id, admin.username)
                      }
                      style={{
                        background: 'rgba(231, 76, 60, 0.1)',
                        border: 'none',
                        color: '#ff4d4d',
                        cursor: 'pointer',
                        padding: '5px 10px',
                        borderRadius: '6px'
                      }}
                    >
                      刪除
                    </button>
                  ) : (
                    <small style={{ color: 'var(--text-muted)' }}>-</small>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SettingsAdminListTab;
