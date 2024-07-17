import Dropzone from 'react-dropzone';

import './AddProfilePic.css';
import { useCallback, useContext, useState } from 'react';
import { UserDetailsContext, UserTokenContext } from '../../../../contexts/userContext';
import { changeProfilePic } from '../../../../services/userService';

interface AddProfilePicProps {
  setProfilePic: React.Dispatch<React.SetStateAction<string>>;
}

const AddProfilePic = ({ setProfilePic }: AddProfilePicProps) => {
  const user = useContext(UserDetailsContext);
  const token = useContext(UserTokenContext);

  const [succesfulChange, setSuccesfulChange] = useState<boolean | undefined>(undefined);
  const succesMessage = succesfulChange ? 'Picture changed' : succesfulChange === false ? 'Picture change failed' : '';

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = new File([acceptedFiles[0]], `${user.username}-profilepic`, { type: acceptedFiles[0].type });
    setProfilePic(URL.createObjectURL(file));
    changeProfilePic(file, token)
      .then((response) => {
        setSuccesfulChange(response);
        setTimeout(() => {
          setSuccesfulChange(undefined);
        }, 5000);
      })
      .catch(error => console.log(error));
  }, [user.username, setProfilePic, token]);

  return (
    <div>
      {succesMessage && <p className={succesfulChange ? 'add-profile-pic-success' : 'add-profile-pic-error' }>{succesMessage}</p>}
      {!succesMessage &&
        <Dropzone accept={{ 'image/*': ['.png', '.jpeg', '.jpg'] }} onDrop={onDrop}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p className='add-profile-pic'>Add profile pic</p>
              </div>
            </section>
          )}
        </Dropzone>}
    </div>
  );
};

export default AddProfilePic;