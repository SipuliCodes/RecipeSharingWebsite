import './Footer.css';
import { FooterProps } from '../../interfaces/props';
import { useTranslation } from 'react-i18next';

import Gmail from '../../pictures/gmail.svg';
import X from '../../pictures/x.svg';
import Instagram from '../../pictures/instagram.svg';

const Footer = ({ greenBackground }: FooterProps) => {
  const { t } = useTranslation('translation', {keyPrefix: 'footer'});
  return (
    <footer className={ greenBackground ? 'green-background' : '' }>
      <div className="copyright text">
        &copy; {t('copyright')}
      </div>
      <div className="contacts text">
        {t('contact')}
        <a href="https://gmail.com" target='_blank'><img className='icon' src={Gmail} alt='Gmail icon'/></a>
        <a href="https://twitter.com" target='_blank'><img className='icon' src={X} alt='X icon' /></a>
        <a href="https://instagram.com" target='_blank'><img className='icon' src={Instagram} alt='Instagram icon'/></a>
      </div>
    </footer>
  );
};

export default Footer;