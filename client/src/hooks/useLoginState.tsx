import {useOutletContext} from 'react-router-dom';

import type {LoginState} from '../shared/types/appTypes';

export function useLoginState() {
  return useOutletContext<LoginState>();
}
