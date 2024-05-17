import { useState } from 'react';
import Footer from '../Footer/Footer';
import './LandingPage.css';
import SignUpForm from '../SignUpForm/SignUpForm';
const LandingPage = () => {
  const [rightContent, setRightContent] = useState('feed');

  return (
    <div className="landingpage-grid-container background">
      <header> <h1 className='logo'> Reciphare </h1></header>
      <div className="content content-grid-container">
        <div className='left-content'>
          <h1 className='motto'> <span className='motto-background'>Share,</span> <br></br> <span className='motto-background'>find and</span> <br></br> <span className='motto-background'>enjoy great recipes</span></h1>
          <button>Log in</button>
          <button onClick={() => setRightContent('signup')}>Sign up</button>
        </div>
        <div className='right-content'>
          {rightContent === 'feed' && <h1>Coming up picture of feed or live feed</h1>}
          {rightContent === 'signup' && <SignUpForm />}
        </div>
      </div>
      <Footer />
    </div>
  );

};

export default LandingPage;