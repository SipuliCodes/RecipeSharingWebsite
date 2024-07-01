

import { FriendCardProps } from '../../../../interfaces/props';
import './FriendCard.css';

const FriendCard = ({friend, requestType}:FriendCardProps) => {

  return (
    <div className={ requestType !== 'none' ? 'friend-card friend-request-card' : 'friend-card' }>
      <h1 className='friend-card-h1'>{friend.username}</h1>
      <h4 className='friend-card-h4'>{friend.firstName} {friend.lastName}</h4>
      {requestType !== 'pending' &&
        <div className={requestType === 'incoming' ? 'friend-request-card-button-bar' : 'friend-card-button-bar'}>
          <button className='friend-card-button show'> {requestType === 'incoming' ? 'Accept' : 'Show recipes'}</button>
          <button className='friend-card-button remove'> {requestType === 'incoming' ? 'Decline' : 'Remove friend'}</button>
        </div>
      }
      {requestType === 'pending' &&
        <h4 className='friend-card-h4'> Waiting... </h4>
      }
    </div>
  );
};

export default FriendCard;