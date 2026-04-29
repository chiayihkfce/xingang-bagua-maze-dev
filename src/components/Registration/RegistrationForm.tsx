import React, { useState } from 'react';
import { Session, FormData, FormErrors, TimeslotConfig, PaymentMethod, IdentityPricing } from '../../types';
import { translations } from '../../locales/translations';
import StatusLookupModal from './StatusLookupModal';
import RegistrationEntry from './RegistrationEntry';
import RegistrationPersonalFields from './RegistrationPersonalFields';
import RegistrationSessionFields from './RegistrationSessionFields';
import RegistrationPaymentFields from './RegistrationPaymentFields';
import { useAppContext } from '../../context/AppContext';
// import { useEasterEggs } from '../../hooks/useEasterEggs';

interface RegistrationFormProps {
  t: any;
  lang: string;
  formData: FormData;
  formErrors: FormErrors;
  sessionType: string;
  setSessionType: (type: any) => void;
  sessions: Session[];
  timeslotConfig: TimeslotConfig;
  generalTimeSlots: string[];
  specialTimeSlots: string[];
  handleInputChange: (e: any) => void;
  handlePlayerInfoChange: (index: number, field: 'name' | 'email', value: string) => void;
  handleCheckboxChange: (e: any) => void;
  handleDateChange: (date: Date | null) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  calculatedTotal: number;
  getSessionDisplayName: (name: string) => string;
  paymentMethods: PaymentMethod[];
  identityPricings: IdentityPricing[];
  showAlert: (message: string, title?: string, onConfirm?: () => void, confirmText?: string) => void;
  setShowGames: (show: boolean) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  t,
  lang,
  formData,
  formErrors,
  sessionType,
  setSessionType,
  sessions,
  timeslotConfig,
  generalTimeSlots,
  specialTimeSlots,
  handleInputChange,
  handlePlayerInfoChange,
  handleCheckboxChange,
  handleDateChange,
  handleSubmit,
  isSubmitting,
  calculatedTotal,
  getSessionDisplayName,
  paymentMethods,
  identityPricings,
  showAlert,
  setShowGames
}) => {
  const { isFlashlightOn } = useAppContext();
  const [isLookupOpen, setIsLookupOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'choice' | 'form'>('choice'); 

  // 1. 入口選擇畫面
  if (viewMode === 'choice') {
    return (
      <RegistrationEntry 
        t={t}
        lang={lang}
        isFlashlightOn={isFlashlightOn}
        setViewMode={setViewMode}
        setShowGames={setShowGames}
      />
    );
  }

  // 2. 報名表單畫面
  return (
    <section className="registration-section">
      <div style={{ marginBottom: '2rem' }}>
        <button 
          onClick={() => setViewMode('choice')}
          style={{ background: 'none', border: 'none', color: '#d4af37', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          {t.backToChoice}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="reg-form">
        <div style={{ display: 'none' }} aria-hidden="true">
          <input 
            type="text" 
            name="hp_field" 
            value={formData.hp_field} 
            onChange={handleInputChange} 
            tabIndex={-1} 
            autoComplete="off" 
          />
        </div>

        <RegistrationPersonalFields 
          t={t}
          formData={formData}
          formErrors={formErrors}
          handleInputChange={handleInputChange}
        />

        <RegistrationSessionFields
          t={t}
          lang={lang}
          formData={formData}
          sessionType={sessionType}
          setSessionType={setSessionType}
          sessions={sessions}
          handleInputChange={handleInputChange}
          handlePlayerInfoChange={handlePlayerInfoChange}
          identityPricings={identityPricings}
          getSessionDisplayName={getSessionDisplayName}
          showAlert={showAlert}
        />

        {sessionType !== '' && (
          <>
            <RegistrationPaymentFields
              t={t}
              lang={lang}
              formData={formData}
              sessionType={sessionType}
              sessions={sessions}
              paymentMethods={paymentMethods}
              handleInputChange={handleInputChange}
              handleDateChange={handleDateChange}
              timeslotConfig={timeslotConfig}
              generalTimeSlots={generalTimeSlots}
              specialTimeSlots={specialTimeSlots}
            />

            <div className="form-card">
              <h3 className="form-section-title">{t.other}</h3>
              <div className="form-group">
                <label>{t.referralLabel}</label>
                <div className="checkbox-grid">
                  {t.referrals.map((item: string, index: number) => {
                    const stableKey = translations.zh.referrals[index];
                    return (
                      <label key={stableKey}>
                        <input 
                          type="checkbox" 
                          value={stableKey} 
                          checked={formData.referral.includes(stableKey)} 
                          onChange={handleCheckboxChange} 
                        /> 
                        {item}
                      </label>
                    );
                  })}
                </div>
              </div>
              <div className="form-group">
                <label>{t.notesLabel}</label>
                <textarea name="notes" value={formData.notes} onChange={handleInputChange} rows={3}></textarea>
              </div>
            </div>

            <div className="submit-container">
              <div className="total-display">
                <span>{t.total}</span>
                <span className="amount">NT$ {calculatedTotal}</span>
              </div>
              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? t.submitting : t.submitBtn}
              </button>
            </div>
          </>
        )}
      </form>

      <StatusLookupModal isOpen={isLookupOpen} onClose={() => setIsLookupOpen(false)} lang={lang} />

    </section>
  );
};

export default RegistrationForm;
