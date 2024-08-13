const axios = require('axios');
const fs = require('fs');
const path = require('path');

const languages = ['en', 'ko'];

const fetchTranslations = async () => {
  for (const lang of languages) {
    const response = await axios.get(`http://localhost:8080/api/translations/${lang}`);
    const translations = response.data.reduce((acc, { key, value }) => {
      acc[key] = value;
      return acc;
    }, {});
    const filePath = path.join(__dirname, `../public/locales/${lang}/translation.json`);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(translations, null, 2));
  }
};

fetchTranslations();