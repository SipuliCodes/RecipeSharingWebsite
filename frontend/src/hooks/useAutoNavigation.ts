import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Token } from '../interfaces/contextTypes';

const useAutoNavigation = (path: string, token: Token, isToken: boolean) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isToken) {
      if (token) navigate(path);
    } else {
      if (!token) navigate(path);
    }

  });
};

export default useAutoNavigation;