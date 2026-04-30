import React, { useState, useEffect } from 'react';
import { AdminAccount } from '../../../types';
import { db } from '../../../firebase';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';

interface SettingsProfileTabProps {
  currentAdmin: AdminAccount | null;
  setCurrentAdmin: (admin: AdminAccount | null) => void;
  showAlert: (message: string, title?: string) => void;
  fetchAdmins: () => Promise<void>;
}

const SettingsProfileTab: React.FC<SettingsProfileTabProps> = ({
  currentAdmin,
  setCurrentAdmin,
  showAlert,
  fetchAdmins
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nickname, setNickname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [lineUid, setLineUid] = useState('');
  const [showLineGuide, setShowLineGuide] = useState(false);

  useEffect(() => {
    if (currentAdmin) {
      setNickname((prev) =>
        prev !== (currentAdmin.nickname || currentAdmin.username)
          ? currentAdmin.nickname || currentAdmin.username
          : prev
      );
      setUsername((prev) =>
        prev !== currentAdmin.username ? currentAdmin.username : prev
      );
      setPassword((prev) =>
        prev !== (currentAdmin.password || '')
          ? currentAdmin.password || ''
          : prev
      );
      setLineUid((prev) =>
        prev !== (currentAdmin.lineUid || '')
          ? currentAdmin.lineUid || ''
          : prev
      );
    }
  }, [currentAdmin]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentAdmin || !username || !password) return;

    setIsSubmitting(true);
    try {
      const adminRef = doc(db, 'admins', currentAdmin.id);
      const updateData = {
        username,
        password,
        nickname: nickname || username,
        lineUid: lineUid.trim(),
        updatedAt: serverTimestamp()
      };

      await updateDoc(adminRef, updateData);
      setCurrentAdmin({ ...currentAdmin, ...updateData });
      showAlert('個人設定已更新');
      fetchAdmins();
    } catch (e) {
      showAlert('更新失敗');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleUpdateProfile}
      className="settings-form"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
      }}
    >
      <div className="form-group">
        <label
          style={{
            display: 'block',
            marginBottom: '0.5rem',
            color: 'var(--text-muted)',
            fontSize: '0.9rem'
          }}
        >
          顯示暱稱
        </label>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="輸入暱稱"
          style={{
            width: '100%',
            padding: '0.8rem',
            borderRadius: '8px',
            border: '1px solid var(--border-subtle)',
            background: 'var(--input-bg, rgba(255,255,255,0.05))',
            color: 'var(--text-light)'
          }}
        />
      </div>
      <div className="form-group">
        <label
          style={{
            display: 'block',
            marginBottom: '0.5rem',
            color: 'var(--text-muted)',
            fontSize: '0.9rem'
          }}
        >
          管理員帳號
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '0.8rem',
            border: '1px solid var(--border-subtle)',
            borderRadius: '8px',
            background: 'var(--input-bg, rgba(255,255,255,0.05))',
            color: 'var(--text-light)',
            boxSizing: 'border-box'
          }}
        />
      </div>
      <div className="form-group">
        <label
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '0.5rem',
            color: 'var(--text-muted)',
            fontSize: '0.9rem'
          }}
        >
          <span>LINE 使用者 ID (lineUid)</span>
          <span
            onClick={() => setShowLineGuide(!showLineGuide)}
            style={{
              fontSize: '0.75rem',
              color: 'var(--primary-gold)',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            💡 {showLineGuide ? '點擊關閉教學' : '點擊查看獲取教學'}
          </span>
        </label>

        {showLineGuide && (
          <div
            style={{
              background: 'rgba(241, 196, 15, 0.05)',
              padding: '1.2rem',
              borderRadius: '12px',
              border: '1px solid rgba(241, 196, 15, 0.2)',
              marginBottom: '1.2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <p
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--primary-gold)',
                  fontWeight: 'bold',
                  marginBottom: '0.8rem'
                }}
              >
                步驟 1：掃描下方 QR Code 加入機器人好友
              </p>
              <img
                src="./line-qr.png"
                alt="Step 1"
                style={{
                  width: '180px',
                  borderRadius: '12px',
                  border: '2px solid white'
                }}
              />
            </div>
            <div style={{ textAlign: 'center' }}>
              <p
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--primary-gold)',
                  fontWeight: 'bold',
                  marginBottom: '0.8rem'
                }}
              >
                步驟 2：對話框中輸入「取得ID」即可獲得專屬代碼
              </p>
              <img
                src="./line-step2.png"
                alt="Step 2"
                style={{
                  width: '100%',
                  maxWidth: '280px',
                  borderRadius: '12px',
                  border: '2px solid white'
                }}
              />
            </div>
          </div>
        )}

        <input
          type="text"
          value={lineUid}
          onChange={(e) => setLineUid(e.target.value)}
          placeholder="Uxxxxxxxxxxxxxxx..."
          style={{
            width: '100%',
            padding: '0.8rem',
            border: '1px solid var(--border-subtle)',
            borderRadius: '8px',
            background: 'var(--input-bg, rgba(255,255,255,0.05))',
            color: 'var(--text-light)',
            fontFamily: 'monospace',
            boxSizing: 'border-box'
          }}
        />
      </div>
      <div className="form-group">
        <label
          style={{
            display: 'block',
            marginBottom: '0.5rem',
            color: 'var(--text-muted)',
            fontSize: '0.9rem'
          }}
        >
          修改密碼
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '0.8rem',
            border: '1px solid var(--border-subtle)',
            borderRadius: '8px',
            background: 'var(--input-bg, rgba(255,255,255,0.05))',
            color: 'var(--text-light)',
            boxSizing: 'border-box'
          }}
        />
      </div>
      <button
        type="submit"
        className="submit-btn"
        disabled={isSubmitting}
        style={{
          marginTop: '1rem',
          padding: '1rem',
          borderRadius: '12px',
          background: 'var(--primary-gold)',
          color: '#000000',
          fontWeight: 'bold',
          fontSize: '1rem',
          boxShadow: '0 4px 15px rgba(241, 196, 15, 0.3)',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        {isSubmitting ? '儲存中...' : '確認修改內容'}
      </button>
    </form>
  );
};

export default SettingsProfileTab;
