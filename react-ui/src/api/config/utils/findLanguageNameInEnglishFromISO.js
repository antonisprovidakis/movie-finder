import languages from '../constants/languages';

export default function findLanguageNameInEnglishFromISO(iso) {
  const language = languages.find(lang => lang.iso_639_1 === iso);
  return language ? language.english_name : undefined;
}
