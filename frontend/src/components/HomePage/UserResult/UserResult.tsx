import { UserResultProps } from '../../../interfaces/props';
import './UserResult.css';
import { sendFriendRequest } from '../../../services/userService';
import { useContext } from 'react';
import { UserTokenContext } from '../../../contexts/userContext';

const UserResult = ({ user }: UserResultProps) => {
  const token = useContext(UserTokenContext);

  const sendRequest = () => {
    sendFriendRequest(user.username, token);
  };

  return (
    <div className="user-result-grid">
      <div className="user-result-details">
        <h3 className="user-result-username"> {user.username}</h3>
        <h4 className="user-result-name"> {user.firstName} {user.lastName}</h4>
      </div>
      <button onClick={sendRequest} className="user-result-send-request"> Send request</button>
    </div>
  );
};

export default UserResult;