import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Token } from '../interfaces/contextTypes';

const useAutoNavigation = (path: string, token: Token) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate(path);
  });
};

export default useAutoNavigation;