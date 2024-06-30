import { useContext } from 'react';

import useAutoNavigation from '../../../hooks/useAutoNavigation';
import { UserDetailsContext, UserTokenContext } from '../../../contexts/userContext';
import './FriendsPage.css';

const FriendsPage = () => {
  const user = useContext(UserDetailsContext);
  const token = useContext(UserTokenContext);

  useAutoNavigation('/', token, false);

  return (
    <div className='friends-page'>
      <div className='friends-page-friends-box'>
        <h1 className='friends-page-h1'>Friends</h1>
        <div className='friends-page-friends-list'>
          {user.friends.map(friend => <p>{friend.username}</p> )}
        </div>
      </div>
      <div className='friends-page-friend-requests-box'>
        <h1 className='friends-page-h1'>Friend Requests</h1>
      </div>
    </div>
  );
};

export default FriendsPage;