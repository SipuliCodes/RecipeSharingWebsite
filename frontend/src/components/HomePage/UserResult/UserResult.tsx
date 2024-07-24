import { UserResultProps } from '../../../interfaces/props';
import './UserResult.css';
import { sendFriendRequest } from '../../../services/userService';
import { useContext } from 'react';
import { UserDetailsContext, UserSetDetailsContext, UserTokenContext } from '../../../contexts/userContext';
import { useNavigate } from 'react-router-dom';

const UserResult = ({ setSearch, setUsers, user }: UserResultProps) => {
  const navigate = useNavigate();

  const meUser = useContext(UserDetailsContext);
  const setMeUser = useContext(UserSetDetailsContext);
  const token = useContext(UserTokenContext);

  const sendRequest = () => {
    sendFriendRequest(user.username, token);
    const refreshedUser = { ...meUser, sentRequests: meUser.sentRequests?.concat(user) };
    setMeUser(refreshedUser);
  };

  const showRecipes = () => {
    navigate(`/${user.id}/recipes`);
    setUsers([]);
    setSearch('');
  };

  return (
    <div className="user-result-grid">
      <div className="user-result-details">
        <h3 className="user-result-username"> {user.username}</h3>
        <h4 className="user-result-name"> {user.firstName} {user.lastName}</h4>
      </div>
      {!(meUser.sentRequests?.map(user => user.id).includes(user.id)) && !(meUser.friends?.map(user => user.id).includes(user.id)) &&
        <button onClick={sendRequest} className="user-result-send-request"> Send request</button>
      }
      {(meUser.sentRequests?.map(user => user.id).includes(user.id)) && !(meUser.friends?.map(user => user.id).includes(user.id)) &&
        <h4 className='user-result-request-sent'>Request sent!</h4>}
      {(meUser.friends?.map(user => user.id).includes(user.id)) && 
      <button onClick={showRecipes} className="user-result-send-request"> Show recipes</button>}
    </div>
  );
};

export default UserResult;