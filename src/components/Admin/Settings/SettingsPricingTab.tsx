import React, { useState } from 'react';
import { IdentityPricing } from '../../../types';

interface SettingsPricingTabProps {
  identityPricings: IdentityPricing[];
  saveIdentityPricing: (config: Partial<IdentityPricing>) => Promise<void>;
  deleteIdentityPricing: (id: string, name: string) => Promise<void>;
  showAlert: (message: string, title?: string) => void;
}

const SettingsPricingTab: React.FC<SettingsPricingTabProps> = ({
  identityPricings,
  saveIdentityPricing,
  deleteIdentityPricing,
  showAlert
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingIp, setEditingIp] = useState<Partial<IdentityPricing> | null>(
    null
  );
  const [ipName, setIpName] = useState('');
  const [ipPrice, setIpPrice] = useState<number | string>('');

  const handleStartEditIp = (ip: IdentityPricing) => {
    setEditingIp(ip);
    setIpName(ip.name);
    setIpPrice(ip.price);
  };

  const handleCancelEditIp = () => {
    setEditingIp(null);
    setIpName('');
    setIpPrice('');
  };

  const handleSaveIp = async () => {
    if (!ipName) {
      showAlert('請輸入身分名稱');
      return;
    }
    setIsSubmitting(true);
    try {
      await saveIdentityPricing({
        id: editingIp?.id,
        name: ipName,
        price: Number(ipPrice) || 0,
        enabled: editingIp ? (editingIp as IdentityPricing).enabled : true
      });
      handleCancelEditIp();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="pricing-settings-section"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
      }}
    >
      <div
        style={{
          background: 'rgba(241, 196, 15, 0.05)',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid rgba(241, 196, 15, 0.2)'
        }}
      >
        <h4
          style={{
            color: 'var(--primary-gold)',
            marginBottom: '0.5rem'
          }}
        >
          💰 特定身分優待費率管理
        </h4>
        <p
          style={{
            color: 'var(--text-muted)',
            fontSize: '0.85rem',
            marginBottom: '1.5rem'
          }}
        >
          您可以新增多種身分（如：志工、教職員、在地居民），並為其設定獨立的固定單價。
        </p>

        {/* 新增/編輯表單 */}
        <div
          style={{
            background: 'rgba(255,255,255,0.03)',
            padding: '1.2rem',
            borderRadius: '10px',
            border: '1px dashed rgba(241, 196, 15, 0.3)',
            marginBottom: '1.5rem'
          }}
        >
          <h5 style={{ color: 'var(--text-light)', marginBottom: '1rem' }}>
            {editingIp ? '✨ 編輯身分費率' : '➕ 新增身分費率'}
          </h5>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr auto',
              gap: '10px',
              alignItems: 'flex-end'
            }}
          >
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)'
                }}
              >
                身分名稱
              </label>
              <input
                type="text"
                value={ipName}
                onChange={(e) => setIpName(e.target.value)}
                placeholder="例如：志工"
                style={{
                  width: '100%',
                  padding: '0.6rem',
                  borderRadius: '6px',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--input-bg)',
                  color: 'var(--text-light)'
                }}
              />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)'
                }}
              >
                固定單價 (NT$)
              </label>
              <input
                type="number"
                value={ipPrice}
                onChange={(e) => setIpPrice(e.target.value)}
                placeholder="650"
                style={{
                  width: '100%',
                  padding: '0.6rem',
                  borderRadius: '6px',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--input-bg)',
                  color: 'var(--text-light)'
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: '5px' }}>
              <button
                onClick={handleSaveIp}
                disabled={isSubmitting || !ipName}
                style={{
                  padding: '0.6rem 1.2rem',
                  borderRadius: '6px',
                  background: 'var(--primary-gold)',
                  color: 'black',
                  fontWeight: 'bold',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {editingIp ? '更新' : '新增'}
              </button>
              {editingIp && (
                <button
                  onClick={handleCancelEditIp}
                  style={{
                    padding: '0.6rem 1rem',
                    borderRadius: '6px',
                    background: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  取消
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 費率列表 */}
        <div
          className="pricing-list"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}
        >
          {identityPricings.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '2rem',
                color: 'var(--text-muted)',
                fontSize: '0.9rem'
              }}
            >
              尚未設定任何特殊身分費率
            </div>
          ) : (
            identityPricings.map((ip) => (
              <div
                key={ip.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem',
                  background: 'rgba(255,255,255,0.02)',
                  borderRadius: '8px',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px'
                  }}
                >
                  <div
                    onClick={() =>
                      saveIdentityPricing({
                        ...ip,
                        enabled: !ip.enabled
                      })
                    }
                    style={{
                      width: '40px',
                      height: '20px',
                      borderRadius: '10px',
                      background: ip.enabled ? 'var(--primary-gold)' : '#333',
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                  >
                    <div
                      style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        background: 'white',
                        position: 'absolute',
                        top: '2px',
                        left: ip.enabled ? '22px' : '2px',
                        transition: 'all 0.3s'
                      }}
                    />
                  </div>
                  <div>
                    <div
                      style={{
                        fontWeight: 'bold',
                        color: ip.enabled
                          ? 'var(--text-light)'
                          : 'var(--text-muted)'
                      }}
                    >
                      {ip.name}
                      {!ip.enabled && (
                        <span
                          style={{
                            marginLeft: '8px',
                            fontSize: '0.7rem',
                            color: '#ff4d4d'
                          }}
                        >
                          (已停用)
                        </span>
                      )}
                    </div>
                    <div
                      style={{
                        fontSize: '0.85rem',
                        color: 'var(--primary-gold)'
                      }}
                    >
                      NT$ {ip.price} / 每份
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => handleStartEditIp(ip)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#3498db',
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}
                  >
                    編輯
                  </button>
                  <button
                    onClick={() => deleteIdentityPricing(ip.id, ip.name)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#ff4d4d',
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}
                  >
                    刪除
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPricingTab;
