import Dropzone from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { findIconDefinition } from '@fortawesome/fontawesome-svg-core';

import { useCallback } from 'react';
import './AddRecipePic.css';

interface AddRecipePicProps {
  recipeName: string;
  setImage: (imageUrl: string) => void;
}

const AddRecipePic = ({ recipeName, setImage }: AddRecipePicProps) => {

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = new File([acceptedFiles[0]], `${recipeName}-profilepic`, { type: acceptedFiles[0].type });
    setImage(URL.createObjectURL(file));
  }, [recipeName, setImage]);

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