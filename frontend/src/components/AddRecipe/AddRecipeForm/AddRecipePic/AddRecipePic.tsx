import Dropzone from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { findIconDefinition } from '@fortawesome/fontawesome-svg-core';

import { useCallback, useContext } from 'react';
import './AddRecipePic.css';
import { UserDetailsContext } from '../../../../contexts/userContext';

interface AddRecipePicProps {
  recipeName: string;
  setImage: (imageUrl: string) => void;
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
}

const AddRecipePic = ({ recipeName, setImage, setFile }: AddRecipePicProps) => {
  const user = useContext(UserDetailsContext);

  const removeSpaces = (line: string) => {
    const words = line.split(' ');
    const wordsWithBigFirstLetter = words.map((word, index) => index != 0 ? word.charAt(0).toUpperCase() + word.toLowerCase().slice(1) : word.toLowerCase());

    return wordsWithBigFirstLetter.join('');
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = new File([acceptedFiles[0]], `${removeSpaces(recipeName)}-${user.username}-profilepic`, { type: acceptedFiles[0].type });
    setImage(URL.createObjectURL(file));
    setFile(file);
  }, [recipeName, setImage, user, setFile]);

  return (
    <div className='add-recipe-pic-drag-and-drop'>
      <Dropzone accept={{ 'image/*': ['.png', '.jpeg', '.jpg'] }} onDrop={onDrop}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()} className='add-recipe-pic-drag-and-drop'>
              <input {...getInputProps()} />
              <FontAwesomeIcon className='add-recipe-pic-default-pic' icon={findIconDefinition({ prefix: 'fas', iconName: 'image' })} />
              <p> Drag and drop or choose a recipe photo </p>
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  );
};

export default AddRecipePic;