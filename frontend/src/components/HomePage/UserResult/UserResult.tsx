import { UserResultProps } from '../../../interfaces/props';
import './UserResult.css';
import { sendFriendRequest } from '../../../services/userService';
import { useContext } from 'react';
import { UserDetailsContext, UserSetDetailsContext, UserTokenContext } from '../../../contexts/userContext';

const UserResult = ({ user }: UserResultProps) => {
  const meUser = useContext(UserDetailsContext);
  const setMeUser = useContext(UserSetDetailsContext);
  const token = useContext(UserTokenContext);

  const sendRequest = () => {
    sendFriendRequest(user.username, token);
    const refreshedUser = { ...meUser, sentRequests: meUser.sentRequests?.concat(user) };
    setMeUser(refreshedUser);
  };

  return (
    <div className="user-result-grid">
      <div className="user-result-details">
        <h3 className="user-result-username"> {user.username}</h3>
        <h4 className="user-result-name"> {user.firstName} {user.lastName}</h4>
      </div>
      {!(meUser.sentRequests?.map(user => user.id).includes(user.id)) &&
        <button onClick={sendRequest} className="user-result-send-request"> Send request</button>
      }
      {(meUser.sentRequests?.map(user => user.id).includes(user.id)) &&
      <h4 className='user-result-request-sent'>Request sent!</h4> }
    </div>
  );
};

export default UserResult;