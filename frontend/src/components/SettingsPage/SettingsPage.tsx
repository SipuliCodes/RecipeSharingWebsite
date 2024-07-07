import { useContext } from 'react';

import { UserDetailsContext } from '../../contexts/userContext';

const SettingsPage = () => {
  const user = useContext(UserDetailsContext);

  return (
    <div>
      <h1>Settings</h1>
      <h2>{user.username}</h2>
    </div>
  );

};

export default SettingsPage;