import { StepListProps } from '../../../interfaces/props';
import Step from './Step/Step';

const StepList = ({ steps }: StepListProps) => {
  return (<div className='recipe-steps-container'>
    <h2 className='recipe-instructions-h2'> Steps </h2>
    <ol className='recipe-steps-list'>
      {steps.map((step) => <Step step={step} />)}
    </ol>
  </div>);
};

export default StepList;