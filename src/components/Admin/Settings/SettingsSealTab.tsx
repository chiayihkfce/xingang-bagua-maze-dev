import React from 'react';
import { SealConfig, SealType } from '../../../types';

interface SettingsSealTabProps {
  sealConfig: SealConfig;
  updateSealConfig: (type: SealType) => Promise<void>;
}

const SettingsSealTab: React.FC<SettingsSealTabProps> = ({
  sealConfig,
  updateSealConfig
}) => {
  return (
    <div
      className="seal-settings-section"
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
          📜 數位證書官印設定
        </h4>
        <p
          style={{
            color: 'var(--text-muted)',
            fontSize: '0.85rem',
            marginBottom: '1.5rem'
          }}
        >
          選擇下載證書時所使用的印章樣式（全系統同步生效）
        </p>

        <div
          className="seal-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1rem'
          }}
        >
          {sealConfig?.activeSeal &&
            [
              {
                id: 'full-yang',
                name: '滿漢合璧・陽刻 (RL)',
                desc: '傳統清代官印格式'
              },
              {
                id: 'full-yin',
                name: '滿漢合璧・陰刻 (RL)',
                desc: '厚重古樸蓋印感'
              },
              {
                id: 'zh-vert-rl-yang',
                name: '純漢文・直排右起・陽刻',
                desc: '九疊篆傳統佈局'
              },
              {
                id: 'zh-vert-rl-yin',
                name: '純漢文・直排右起・陰刻',
                desc: '九疊篆白文風格'
              },
              {
                id: 'zh-vert-lr-yang',
                name: '純漢文・直排左起・陽刻',
                desc: '現代直排閱讀順序'
              },
              {
                id: 'zh-vert-lr-yin',
                name: '純漢文・直排左起・陰刻',
                desc: '現代直排白文風格'
              },
              {
                id: 'zh-horiz-lr-yang',
                name: '純漢文・橫排左起・陽刻',
                desc: '現代匾額橫式排版'
              },
              {
                id: 'zh-horiz-lr-yin',
                name: '純漢文・橫排左起・陰刻',
                desc: '現代橫式白文風格'
              }
            ].map((seal) => (
              <div
                key={seal.id}
                onClick={() => updateSealConfig(seal.id as SealType)}
                style={{
                  padding: '1rem',
                  borderRadius: '10px',
                  border: `2px solid ${sealConfig?.activeSeal === seal.id ? 'var(--primary-gold)' : 'var(--border-subtle)'}`,
                  background:
                    sealConfig?.activeSeal === seal.id
                      ? 'rgba(241, 196, 15, 0.1)'
                      : 'rgba(255,255,255,0.02)',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.4rem'
                  }}
                >
                  <span
                    style={{
                      fontWeight: 'bold',
                      color:
                        sealConfig?.activeSeal === seal.id
                          ? 'var(--primary-gold)'
                          : 'var(--text-light)'
                    }}
                  >
                    {seal.name}
                  </span>
                  {sealConfig?.activeSeal === seal.id && (
                    <span style={{ fontSize: '0.8rem' }}>✅ 已選用</span>
                  )}
                </div>
                <div
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)'
                  }}
                >
                  {seal.desc}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsSealTab;
