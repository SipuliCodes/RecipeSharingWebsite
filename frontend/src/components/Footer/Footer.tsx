import './Footer.css';
import { FooterProps } from '../../interfaces/props';
import { useTranslation } from 'react-i18next';

const Footer = ({ greenBackground }: FooterProps) => {
  const { t } = useTranslation('translation', {keyPrefix: 'footer'});
  return (
    <footer className={ greenBackground ? 'green-background' : '' }>
      <div className="copyright text">
        &copy; {t('copyright')}
      </div>
      <div className="contacts text">
        {t('contact')}
        <a href="https://gmail.com" target='_blank'><img className='icon' src='./src/pictures/gmail.svg' alt='Gmail icon'/></a>
        <a href="https://twitter.com" target='_blank'><img className='icon' src='./src/pictures/x.svg' alt='X icon' /></a>
        <a href="https://instagram.com" target='_blank'><img className='icon' src='./src/pictures/instagram.svg' alt='Instagram icon'/></a>
      </div>
    </footer>
  );
};

export default Footer;