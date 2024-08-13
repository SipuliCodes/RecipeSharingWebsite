import { useContext} from 'react';

import { UserDetailsContext} from '../../../contexts/userContext';
import './FriendsPage.css';
import FriendCard from './FriendCard/FriendCard';
import { useTranslation } from 'react-i18next';

const FriendsPage = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'homePage.friendsPage' });
  const user = useContext(UserDetailsContext);

  return (
    <div className='friends-page'>
      <div className='friends-page-friends-box'>
        <h1 className='friends-page-h1'>{t('friends') }</h1>
        <div className='friends-page-friends-list'>
          {user.friends.map(friend => <FriendCard key={friend.id} friend={friend} requestType='none' t={t} />)}
        </div>
      </div>
      <div className='friends-page-friend-requests-box'>
        <h1 className='friends-page-h1'>{t('friendRequests') }</h1>
        <div className='friends-page-friend-requests-divider'>
          <div className='friends-page-friends-request-list'>
            <h2 className='friends-page-h2'>{t('received')}</h2>
            {user.receivedRequests?.map(friend => <FriendCard key={friend.id} friend={friend} requestType='incoming' t={t} />)}
          </div>
          <div className='friends-page-friends-request-list'>
            <h2 className='friends-page-h2'>{t('sent')}</h2>
            {user.sentRequests?.map(friend => <FriendCard key={friend.id} friend={friend} requestType='pending' t={t} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;