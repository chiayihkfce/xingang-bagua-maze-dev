import React from 'react';
import CustomCursor from '../components/UI/CustomCursor';
import EntryAnimation from '../components/Registration/EntryAnimation';
import ConfirmationModal from '../components/Registration/ConfirmationModal';
import Header from '../components/UI/Header';
import StorySection from '../components/Registration/StorySection';
import EventInfo from '../components/Registration/EventInfo';
import RegistrationForm from '../components/Registration/RegistrationForm';
import SocialButtons from '../components/UI/SocialButtons';
import Footer from '../components/UI/Footer';
import SystemModal from '../components/UI/SystemModal';
import { Session, FormData, FormErrors, PaymentMethod, Lang, Theme } from '../types';

interface RegistrationPageProps {
  t: any;
  lang: Lang;
  setLang: (lang: any) => void;
  theme: Theme;
  toggleTheme: () => void;
  formData: FormData;
  formErrors: FormErrors;
  sessionType: string;
  setSessionType: (type: any) => void;
  sessions: Session[];
  timeslotConfig: any;
  generalTimeSlots: string[];
  specialTimeSlots: string[];
  handleInputChange: (e: React.ChangeEvent<any>) => void;
  handleCheckboxChange: (e: React.ChangeEvent<any>) => void;
  handleDateChange: (date: Date | null) => void;
  handleCopyAccount: (accountNumber?: string) => Promise<void>;
  handleSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  calculatedTotal: number;
  getSessionDisplayName: (chineseName: string) => string;
  getPickupLocationDisplay: (location: string) => string;
  getPaymentMethodDisplay: (method: string) => string;
  paymentMethods: PaymentMethod[];
  isEntryAnimating: boolean;
  shouldRenderEntry: boolean;
  showConfirmation: boolean;
  setShowConfirmation: (val: boolean) => void;
  handleConfirmSubmit: () => Promise<void>;
  sysModal: any;
}

const RegistrationPage: React.FC<RegistrationPageProps> = (props) => {
  const {
    t, lang, setLang, theme, toggleTheme, formData, formErrors, sessionType, 
    setSessionType, sessions, timeslotConfig, generalTimeSlots, specialTimeSlots, 
    handleInputChange, handleCheckboxChange, handleDateChange, handleCopyAccount, 
    handleSubmit, isSubmitting, calculatedTotal, getSessionDisplayName, 
    getPickupLocationDisplay, getPaymentMethodDisplay, paymentMethods, 
    isEntryAnimating, shouldRenderEntry, showConfirmation, setShowConfirmation, 
    handleConfirmSubmit, sysModal
  } = props;

  return (
    <div className="container">
      <CustomCursor />
      <EntryAnimation {...{ t, isEntryAnimating, shouldRenderEntry }} />
      <ConfirmationModal 
        {...{ 
          t, lang, showConfirmation, setShowConfirmation, formData, 
          calculatedTotal, handleConfirmSubmit, isSubmitting, 
          getSessionDisplayName, getPickupLocationDisplay, getPaymentMethodDisplay 
        }} 
      />
      <Header {...{ lang, setLang, theme, toggleTheme, t }} />
      <main className="main-content">
        <div className="poster-container">
          <img src="poster.jpg" alt="Poster" className="poster-image" />
        </div>
        <StorySection t={t} />
        <EventInfo t={t} />
        <RegistrationForm 
          {...{ 
            t, lang, formData, formErrors, sessionType, setSessionType, 
            sessions, timeslotConfig, generalTimeSlots, specialTimeSlots, 
            handleInputChange, handleCheckboxChange, handleDateChange, 
            handleCopyAccount, handleSubmit, isSubmitting, calculatedTotal, 
            getSessionDisplayName, paymentMethods 
          }} 
        />
      </main>
      <SocialButtons t={t} />
      <Footer t={t} />
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

export default RegistrationPage;
