import { useState } from 'react';

import './Step.css';
import { StepProps } from '../../../../interfaces/props';

const Step = ({ step }: StepProps) => {
  const [done, setDone] = useState(false);

  return (
    <li onClick={() => setDone(!done)} className={done ? 'recipe-step-done recipe-step' : 'recipe-step'  }> <input onChange={() => setDone(!done)} checked={done ? true : false} type='checkbox' className='step-checkbox'></input>{step}</li>
  );
};

export default Step;