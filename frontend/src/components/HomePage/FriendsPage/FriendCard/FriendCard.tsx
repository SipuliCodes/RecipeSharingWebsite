

import { useContext } from 'react';
import { FriendCardProps } from '../../../../interfaces/props';
import { handleFriendRequest, removeFriend } from '../../../../services/userService';
import './FriendCard.css';
import { UserDetailsContext, UserSetDetailsContext, UserTokenContext } from '../../../../contexts/userContext';
import { useNavigate } from 'react-router-dom';

const FriendCard = ({ friend, requestType }: FriendCardProps) => {
  const navigate = useNavigate();

  const user = useContext(UserDetailsContext);
  const setUserContext = useContext(UserSetDetailsContext);
  const token = useContext(UserTokenContext);
  
  const handleRequest = (isAccepted: boolean) => {
    handleFriendRequest(isAccepted, friend.username, token);
    if (isAccepted) {
      const refreshedUser = { ...user, friends: user.friends.concat(friend), receivedRequests: user.receivedRequests?.filter((request) => request.username !== friend.username) };
      setUserContext(refreshedUser);
    } else {
      const refreshedUser = { ...user, receivedRequests: user.receivedRequests?.filter((request) => request.username !== friend.username) };
      setUserContext(refreshedUser);
    }
  };

  const showRecipes = () => {
    navigate(`/${friend.id}/recipes`);
  };

  const deleteFriend = () => {
    const confirmed = window.confirm(`Are you sure you want to remove ${friend.username} from your friends?`);
    if (confirmed) {
      removeFriend(friend.username, token);
      const refreshedUser = { ...user, friends: user.friends?.filter((request) => request.username !== friend.username) };
      setUserContext(refreshedUser);
    }
  };

  return (
    <div className={ requestType !== 'none' ? 'friend-card friend-request-card' : 'friend-card' }>
      <h1 className='friend-card-h1'>{friend.username}</h1>
      <h4 className='friend-card-h4'>{friend.firstName} {friend.lastName}</h4>
      {requestType !== 'pending' &&
        <div className={requestType === 'incoming' ? 'friend-request-card-button-bar' : 'friend-card-button-bar'}>
          <button onClick={requestType === 'incoming' ? () => handleRequest(true) : showRecipes} className='friend-card-button show'> {requestType === 'incoming' ? 'Accept' : 'Show recipes'}</button>
          <button onClick={requestType === 'incoming' ? () => handleRequest(false) : deleteFriend} className='friend-card-button remove'> {requestType === 'incoming' ? 'Decline' : 'Remove friend'}</button>
        </div>
      }
      {requestType === 'pending' &&
        <h4 className='friend-card-h4'> Waiting... </h4>
      }
    </div>
  );
};

export default FriendCard;