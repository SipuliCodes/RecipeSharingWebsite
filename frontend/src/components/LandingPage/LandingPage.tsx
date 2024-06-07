import { useState } from 'react';
import { useContext } from 'react';

import Footer from '../Footer/Footer';
import './LandingPage.css';
import SignUpForm from '../SignUpForm/SignUpForm';
import LoginForm from '../LoginForm/LoginForm';
import Logo from '../Logo/Logo';
import { UserTokenContext} from '../../contexts/userContext';
import useAutoNavigation from '../../hooks/useAutoNavigation';

const LandingPage = () => {
  const [leftContent, setLeftContent] = useState('buttons');
  const token = useContext(UserTokenContext);

  useAutoNavigation('/home', token);

  return (
    <div className="landingpage-grid-container background">
      <div className="content content-flex-container">
        <div className='left-content-background'>
          <div className='left-content'>
            <Logo />
            {leftContent === 'buttons' &&
              <>
                <h1 className='motto landingpage-h1'> Share and find great recipes</h1>
                <div className='button-box'>
                  <button className='basic-button' onClick={() => setLeftContent('login')}>Log in</button>
                  <button className='basic-button' onClick={() => setLeftContent('signup')}>Sign up</button>
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