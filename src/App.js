import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';

function App() {
  const { t, i18n } = useTranslation();
  const [isInitialized, setIsInitialized] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    i18n.on('initialized', () => {
      setIsInitialized(true);
    });
  }, [i18n, t]);

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{t('W0001')}</h1>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('ko')}>한국어</button>
    </div>
  );
}

export default App;