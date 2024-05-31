import ReactDOM from 'react-dom/client';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import App from './App.tsx';
import './index.css';

library.add(fas);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
);
