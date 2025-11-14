import { useTranslation } from 'react-i18next';
import './App.scss';

function App() {
  const { t } = useTranslation('app');

  return (
    <>
      <p>{t('app')}</p>
    </>
  );
}

export default App;
