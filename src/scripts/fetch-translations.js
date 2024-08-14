const axios = require('axios');
const fs = require('fs');
const path = require('path');

const API_URL = 'http://localhost:8080/api/translations';

async function fetchTranslations() {
  try {
    const response = await axios.get(API_URL);
    const translations = await response.json();

    const translationsByLanguage = {};

    translations.forEach(translation => {
      translation.values.forEach(value => {
        if (!translationsByLanguage[value.languageCode]) {
          translationsByLanguage[value.languageCode] = {};
        }
        translationsByLanguage[value.languageCode][translation.key] = value.value;
      });
    });

    Object.keys(translationsByLanguage).forEach(languageCode => {
      const filePath = path.join(__dirname, `../pubic/locales/${languageCode}.json`);
      fs.writeFileSync(filePath, JSON.stringify(translationsByLanguage[languageCode], null, 2));
    });

    console.log('다국어 패치 및 저장 성공!');
  } catch (error) {
    console.error('다국어 패치 실패:', error);
  }

}

fetchTranslations();