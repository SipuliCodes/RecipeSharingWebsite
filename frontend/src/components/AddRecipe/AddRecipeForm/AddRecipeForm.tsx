import { useRef, useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import Select from 'react-select';

import './AddRecipeForm.css';
import { RecipeFormData } from '../../../interfaces/recipeInterfaces';
import useAutosizeTextArea from '../../../hooks/useAutosizeTextarea';
import { useNavigate } from 'react-router-dom';
import { addRecipe } from '../../../services/recipeService';
import { UserTokenContext } from '../../../contexts/userContext';

const AddRecipeForm = () => {
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();
  const token = useContext(UserTokenContext); 

  const [formData, setFormData] = useState<RecipeFormData>({
    title: '',
    image: '',
    description: '',
    ingredients: [],
    mealCategory: [],
    steps: []
  });

  const categoryOptions = [
    { value: 'breakfast', label: 'breakfast' },
    { value: 'lunch', label: 'lunch' },
    { value: 'dinner', label: 'dinner' },
    { value: 'snack', label: 'snack' },
    { value: 'dessert', label: 'dessert'}
  ];

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

  const handleCategoryChange = (selectedOptions:string[]) => {
    setFormData({
      ...formData,
      ['mealCategory']: selectedOptions,
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, setFunc: React.Dispatch<React.SetStateAction<string>> ) => {
    const { value } = event.target;
    setFunc(value);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) => {
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
        addRecipe(formData, token);
        navigate('/home');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const preventEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.key === 'Enter' && event.preventDefault();
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') { event.preventDefault(), handleClick(event);}
  };

  console.log(formData);

  return (
    <div className='add-recipe-flex add-recipe-container'>
      <h1 className='add-recipe-form-h1'>Add recipe</h1>
      <div className='add-recipe-flex-row'>
        <div className='add-recipe-inputs-box'>
          <form onSubmit={handleSubmit} className='add-recipe-inputs'>
            <p className='input-box'>
              <input 
                onKeyDown={preventEnter}
                placeholder=""
                value={formData.title}
                onChange={handleFormDataChange }
                name='title'
                className='add-recipe-input'
              />
              <label className='input-placeholder'>Title</label>
            </p>
            <p className='input-box'>
              <textarea 
                placeholder=""
                value={formData.description}
                onChange={handleFormDataChange}
                name='description'
                ref={descriptionRef}
                rows={3}
                className='add-recipe-input add-recipe-textarea'
              />
              <label className='input-placeholder'>Description</label>
            </p>
            <Select
              onChange={(selected) => handleCategoryChange(selected.map(select => select.value))}
              styles={{
                control: (base, state) => ({
                  ...base,
                  border: state.isFocused ? '2px solid black' : '1px solid #ccc',
                  boxShadow: 'none',
                  '&:hover': {
                    border: state.isFocused ? '2px solid black' : '1px solid #ccc',
                  }
                })
              }}
              placeholder="Category"
              isMulti
              name="mealCategory"
              options={categoryOptions}
              className='input-category-selection add-recipe-input'
            />
            <p className='input-box'>
              <input
                onKeyDown={handleEnter}
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
                onKeyDown={handleEnter}
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
        <div className='image-flex-container'>
          <div className='image-box'>
            {formData.image &&
          <img className='add-recipe-pic' src={formData.image} alt='Picture of the food' />
            }
            {!formData.image && 
            <FontAwesomeIcon className='add-recipe-icon add-recipe-default-pic' icon={findIconDefinition({ prefix: 'fas', iconName: 'image' })} />
            }
          </div>
          <p className='input-box'>
            <input
              onKeyDown={preventEnter}
              placeholder=""
              value={formData.image}
              onChange={handleFormDataChange }
              name='image'
              className='add-recipe-input'
            />
            <label className='input-placeholder'>Image url</label>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddRecipeForm;