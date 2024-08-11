import Select from 'react-select';
import i18next from 'i18next';
import { useContext } from 'react';

import './LanguageDropdown.css';
import { LanguageContext, SetLanguageContext } from '../../contexts/languageContext';
import { setLanguageLocalStorage } from '../../utils/localStorage';

const LanguageDropdown = () => {
  const setLanguage = useContext(SetLanguageContext);
  const language = useContext(LanguageContext);

  const languageOptions = [
    { value: 'en', label: 'En' },
    { value: 'fi', label: 'Fi' },
    { value: 'sv', label: 'Sv' }
  ];

  const handleFilterChange = (value: string) => {
    setLanguageLocalStorage(value);
    i18next.changeLanguage(value);
    setLanguage(value);
  };

  return (
    <div className='language-dropdown-box'>
      <Select
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary25: '#c9c9c9',
            primary: '#006909',
          },
        })}
        onChange={filter => handleFilterChange(filter!.value)}
        options={languageOptions}
        defaultValue={languageOptions.find(languageOption => languageOption.value === language)}
      />
    </div>
  );

};

export default LanguageDropdown;