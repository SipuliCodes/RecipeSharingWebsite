import { useContext } from 'react';

import useAutoNavigation from '../../../hooks/useAutoNavigation';
import { UserDetailsContext, UserTokenContext } from '../../../contexts/userContext';
import './FriendsPage.css';
import FriendCard from './FriendCard/FriendCard';

const FriendsPage = () => {
  const user = useContext(UserDetailsContext);
  const token = useContext(UserTokenContext);
  
  useAutoNavigation('/', token, false);

  return (
    <div className='friends-page'>
      <div className='friends-page-friends-box'>
        <h1 className='friends-page-h1'>Friends</h1>
        <div className='friends-page-friends-list'>
          {user.friends.map(friend => <FriendCard key={friend.id} friend={friend} requestType='none' />)}
        </div>
      </div>
      <div className='friends-page-friend-requests-box'>
        <h1 className='friends-page-h1'>Friend Requests</h1>
        <div className='friends-page-friend-requests-divider'>
          <div className='friends-page-friends-request-list'>
            <h2 className='friends-page-h2'>Received</h2>
            {user.receivedRequests?.map(friend => <FriendCard key={friend.id} friend={friend} requestType='incoming' />)}
          </div>
          <div className='friends-page-friends-request-list'>
            <h2 className='friends-page-h2'>Sent</h2>
            {user.sentRequests?.map(friend => <FriendCard key={friend.id} friend={friend} requestType='pending' />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;