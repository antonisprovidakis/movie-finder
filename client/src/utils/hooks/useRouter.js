import React from 'react';
import { __RouterContext as RouterContext } from 'react-router-dom';

export default function useRouter() {
  return React.useContext(RouterContext);
}
