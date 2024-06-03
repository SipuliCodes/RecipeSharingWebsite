import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { findIconDefinition } from '@fortawesome/fontawesome-svg-core';

import './AddRecipeForm.css';
import { RecipeFormData } from '../../../interfaces/recipeInterfaces';
import useAutosizeTextArea from '../../../hooks/useAutosizeTextarea';
import { useNavigate } from 'react-router-dom';
import { addRecipe } from '../../../services/recipeService';

const AddRecipeForm = () => {
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<RecipeFormData>({
    title: '',
    image: '',
    description: '',
    ingredients: [],
    steps: []
  });
  const [addIngredient, setAddIngredient] = useState('');
  const [addStep, setAddStep] = useState('');

  useAutosizeTextArea(descriptionRef.current, formData.description);

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

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = event.currentTarget;
    if (name === 'ingredient' && addIngredient) {
      formData.ingredients.push(addIngredient);
      setAddIngredient('');
    }
    if (name === 'step' && addStep) {
      formData.steps.push(addStep);
      setAddStep('');
    }
  };


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      console.log('hi');
      if (formData.title && formData.image && formData.description && formData.ingredients && formData.steps) {
        addRecipe(formData);
        navigate('/home');
      }
    } catch (error) {
      console.error;
    }
  };

  return (
    <div className='add-recipe-flex add-recipe-container'>
      <h1 className='add-recipe-form-h1'>Add recipe</h1>
      <div className='add-recipe-flex-row'>
        <div className='add-recipe-inputs-box'>
          <form onSubmit={handleSubmit} className='add-recipe-inputs'>
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
                onChange={handleFormDataChange}
                name='description'
                ref={descriptionRef}
                rows={2}
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
                className='add-recipe-input add-recipe-input-extra'
              />
              <label className='input-placeholder'>Ingredient</label>
              <button type='button' name='ingredient' onClick={handleClick} className='add-button'>Add</button>
            </p>
            {formData.ingredients &&
            <p className='add-recipe-ingredients'> 
              {formData.ingredients.map((ingredient, index) => { return (`${index > 0 ? ', ' : ''}${ingredient}`); })}
            </p> }
            <p className='input-box'>
              <input 
                placeholder=""
                value={addStep}
                onChange={(event) => handleInputChange(event, setAddStep)}
                name='step'
                className='add-recipe-input add-recipe-input-extra'
              />
              <label className='input-placeholder'>Step</label>
              <button type='button' name='step' onClick={handleClick} className='add-button'>Add</button>
            </p>
            {formData.steps &&
              <ol className='add-recipe-steps'> 
                {formData.steps.map((step, index) => <li key={index}>{step}</li>)}
              </ol> }
            <div className='add-recipe-form-button-box'>
              <button onClick={() => navigate('/home')} className='add-recipe-button cancel-button'>Cancel</button>
              <button type='submit' className='add-recipe-button save-button'>Save recipe</button>
            </div>
          </form>
        </div>
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