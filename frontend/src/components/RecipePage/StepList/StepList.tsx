import { StepListProps } from '../../../interfaces/props';
import Step from './Step/Step';

const StepList = ({ steps, t }: StepListProps) => {
  return (<div className='recipe-steps-container'>
    <h2 className='recipe-instructions-h2'>{t('stepList.steps') }</h2>
    <ol className='recipe-steps-list'>
      {steps.map((step, index) => <Step key={index} step={step} />)}
    </ol>
  </div>);
};

export default StepList;