import Footer from '../Footer/Footer';
import './LandingPage.css';
const LandingPage = () => {

  return (
    <div className="landingpage-grid-container background">
      <header> <h1 className='logo'> Reciphare </h1></header>
      <div className="content content-grid-container">
        <div className='left-content'>
          <h1 className='motto'>Share, <br></br> find and <br></br> enjoy great recipes</h1>
          <button>Log in</button>
          <button>Sign up</button>
        </div>
        <div className='right-content'>
          <h1>Coming up picture of feed or live feed</h1>
        </div>
      </div>
      <Footer />
    </div>
  );

};

export default LandingPage;