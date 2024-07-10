import {useOutletContext} from 'react-router-dom';

import type {LoginState} from '../types/app';

export function useLoginState() {
  return useOutletContext<LoginState>();
}
