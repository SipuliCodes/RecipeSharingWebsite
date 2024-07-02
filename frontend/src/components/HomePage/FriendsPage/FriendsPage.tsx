import { useContext } from 'react';

import useAutoNavigation from '../../../hooks/useAutoNavigation';
import { UserDetailsContext, UserTokenContext } from '../../../contexts/userContext';
import './FriendsPage.css';
import { Friend } from '../../../interfaces/userInterfaces';
import FriendCard from './FriendCard/FriendCard';

const FriendsPage = () => {
  const user = useContext(UserDetailsContext);
  const token = useContext(UserTokenContext);

  console.log(user);
  
  useAutoNavigation('/', token, false);

  const friendFriends: Friend[] = [
    {
      username: 'Zorro',
      firstName: 'John',
      lastName: 'Melton',
      id: '1'
    },
    {
      username: 'Batman',
      firstName: 'Greg',
      lastName: 'Maloni',
      id: '2'
    },
    {
      username: 'Batman',
      firstName: 'Greg',
      lastName: 'Maloni',
      id: '6'
    },
    {
      username: 'Batman',
      firstName: 'Greg',
      lastName: 'Maloni',
      id: '7'
    },
    {
      username: 'Batman',
      firstName: 'Greg',
      lastName: 'Maloni',
      id: '8'
    }
  ];

  const friends: Friend[] = [
    {
      username: 'Zorro',
      firstName: 'John',
      lastName: 'Melton',
      id: '1'
    },
    {
      username: 'Batman',
      firstName: 'Greg',
      lastName: 'Maloni',
      id: '2'
    },
    {
      username: 'Batman',
      firstName: 'Greg',
      lastName: 'Maloni',
      id: '3'
    },
    {
      username: 'Batman',
      firstName: 'Greg',
      lastName: 'Maloni',
      id: '4'
    },
    {
      username: 'Batman',
      firstName: 'Greg',
      lastName: 'Maloni',
      id: '5'
    },
    {
      username: 'Batman',
      firstName: 'Greg',
      lastName: 'Maloni',
      id: '6'
    },
    {
      username: 'Batman',
      firstName: 'Greg',
      lastName: 'Maloni',
      id: '7'
    },
    {
      username: 'Batman',
      firstName: 'Greg',
      lastName: 'Maloni',
      id: '8'
    }
  ];

  return (
    <div className='friends-page'>
      <div className='friends-page-friends-box'>
        <h1 className='friends-page-h1'>Friends</h1>
        <div className='friends-page-friends-list'>
          {friends.map(friend => <FriendCard key={friend.id} friend={friend} requestType='none' />)}
        </div>
      </div>
      <div className='friends-page-friend-requests-box'>
        <h1 className='friends-page-h1'>Friend Requests</h1>
        <div className='friends-page-friend-requests-divider'>
          <div className='friends-page-friends-request-list'>
            <h2 className='friends-page-h2'>Received</h2>
            {friendFriends.map(friend => <FriendCard key={friend.id} friend={friend} requestType='incoming' />)}
          </div>
          <div></div>
          <div className='friends-page-friends-request-list'>
            <h2 className='friends-page-h2'>Sent</h2>
            {friendFriends.map(friend => <FriendCard key={friend.id} friend={friend} requestType='pending' />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;