import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Footer from '../Footer/Footer';
import './LandingPage.css';
import SignUpForm from './SignUpForm/SignUpForm';
import LoginForm from './LoginForm/LoginForm';
import Logo from '../Logo/Logo';

const LandingPage = () => {
  const [leftContent, setLeftContent] = useState('buttons');
  const { t } = useTranslation('translation', {keyPrefix: 'landingPage'});

  return (
    <div className="landingpage-grid-container background">
      <div className="content content-flex-container">
        <div className='left-content-background'>
          <div className='left-content'>
            <Logo />
            {leftContent === 'buttons' &&
              <>
                <h1 className='motto landingpage-h1'>{t('motto')}</h1>
                <div className='button-box'>
                  <button className='basic-button' onClick={() => setLeftContent('login')}>{t('login') }</button>
                  <button className='basic-button' onClick={() => setLeftContent('signup')}>{t('signup') }</button>
                </div> 
              </>}
            {leftContent === 'signup' && <SignUpForm setLeftContent={setLeftContent}/>}
            {leftContent === 'login' && <LoginForm setLeftContent={setLeftContent} />}
          </div>
        </div>
        <div className='right-content'>
        </div>
      </div>
      <Footer greenBackground={true} />
    </div>
  );

};

export default LandingPage;