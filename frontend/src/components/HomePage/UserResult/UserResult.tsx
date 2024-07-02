import { UserResultProps } from '../../../interfaces/props';
import './UserResult.css';

const UserResult = ({ user }: UserResultProps) => {

  return (
    <div className="user-result-grid">
      <div className="user-result-details">
        <h3 className="user-result-username"> {user.username}</h3>
        <h4 className="user-result-name"> {user.firstName} {user.lastName}</h4>
      </div>
      <button className="user-result-send-request"> Send request</button>
    </div>
  );
};

export default UserResult;