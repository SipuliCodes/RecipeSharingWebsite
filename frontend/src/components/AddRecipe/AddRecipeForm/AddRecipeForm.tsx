import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { findIconDefinition } from '@fortawesome/fontawesome-svg-core';

import './AddRecipeForm.css';
import { RecipeFormData } from '../../../interfaces/recipeInterfaces';
import useAutosizeTextArea from '../../../hooks/useAutosizeTextarea';

const AddRecipeForm = () => {
  const [value, setValue] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [formData, setFormData] = useState<RecipeFormData>({
    title: '',
    image: '',
    description: '',
    ingredients: [],
    steps: []
  });
  const [addIngredient, setAddIngredient] = useState('');
  const [addStep, setAddStep] = useState('');

  useAutosizeTextArea(textAreaRef.current, value);

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {

    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setValue(value);
  };

  const handleFormDataChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, setFunc: React.Dispatch<React.SetStateAction<string>> ) => {
    const { value } = event.target;
    setFunc(value);
  };

  return (
    <div className='add-recipe-flex add-recipe-container'>
      <div className='add-recipe-flex-row'>
        <form className='add-recipe-inputs add-recipe-flex'>
          <p className='input-box'>
            <input 
              placeholder=""
              value={formData.title}
              onChange={handleFormDataChange }
              name='title'
              className='add-recipe-input'
            />
            <label className='input-placeholder'>Title</label>
          </p>
          <p className='input-box'>
            <input 
              placeholder=""
              value={formData.image}
              onChange={handleFormDataChange }
              name='image'
              className='add-recipe-input'
            />
            <label className='input-placeholder'>Image url</label>
          </p>
          <p className='input-box'>
            <textarea 
              placeholder=""
              value={formData.description}
              onChange={handleTextareaChange}
              name='description'
              ref={textAreaRef}
              rows={3}
              className='add-recipe-input add-recipe-textarea'
            />
            <label className='input-placeholder'>Description</label>
          </p>
          <p className='input-box'>
            <input 
              placeholder=""
              value={addIngredient}
              onChange={(event) => handleInputChange(event, setAddIngredient) }
              name='ingredient'
              className='add-recipe-input'
            />
            <label className='input-placeholder'>Ingredient</label>
          </p>
          <p className='input-box'>
            <input 
              placeholder=""
              value={addStep}
              onChange={(event) => handleInputChange(event, setAddStep)}
              name='step'
              className='add-recipe-input'
            />
            <label className='input-placeholder'>Step</label>
          </p>
        </form>
        <div className='image-box'>
          {formData.image &&
          <img className='add-recipe-pic' src={formData.image} alt='Picture of the food' />
          }
          {!formData.image && 
            <FontAwesomeIcon className='add-recipe-icon add-recipe-default-pic' icon={findIconDefinition({ prefix: 'fas', iconName: 'image' })} />
          }
        </div>
      </div>
    </div>
  );
};

export default AddRecipeForm;