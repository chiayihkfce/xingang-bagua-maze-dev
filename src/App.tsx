import { registerLocale } from "react-datepicker";
import { zhTW } from './utils/dateUtils'
import { useAppController } from './hooks/useAppController'

// 註冊語系
registerLocale('zh', zhTW as any);

import SuccessPage from './pages/SuccessPage'
import AdminPage from './pages/AdminPage'
import RegistrationPage from './pages/RegistrationPage'

function App() {
  const app = useAppController();
  const { SECRET_ADMIN_PATH, currentPath, submitted } = app;

  if (SECRET_ADMIN_PATH && SECRET_ADMIN_PATH !== '/' && currentPath === SECRET_ADMIN_PATH) {
    return <AdminPage {...app} />;
  }

  if (submitted) {
    return <SuccessPage {...app} />;
  }

  return <RegistrationPage {...app} />;
}
export default App
