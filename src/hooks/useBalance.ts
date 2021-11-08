import { useWallet } from 'use-wallet';

import useBalanceOf from './useBalanceOf';

const useBalance = () => {
  const { account } = useWallet();

  return useBalanceOf(account);
};

export default useBalance;
