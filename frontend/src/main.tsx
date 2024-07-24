import ReactDOM from 'react-dom/client';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import App from './App.tsx';
import './index.css';

library.add(fas, far);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
);
