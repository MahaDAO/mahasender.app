import { BigNumber } from 'ethers';
import { useCallback, useEffect, useState } from 'react';

import useCore from './useCore';
import { BasicState } from '../utils/interface';
import { useBlockNumber } from '../state/application/hooks';
import { LOADING_DEFAULT_BASIC_STATE, NON_LOADING_DEFAULT_BASIC_STATE } from '../utils/constants';

const useBalanceOf = (address: string | null) => {
  const [balance, setBalance] = useState<BasicState>(LOADING_DEFAULT_BASIC_STATE);

  const core = useCore();
  const blockNumber = useBlockNumber();

  const fetchBalance = useCallback(async () => {
    if (!address) {
      setBalance(NON_LOADING_DEFAULT_BASIC_STATE);
      return;
    }

    const bal: BigNumber = await core.provider.getBalance(address);
    setBalance({ isLoading: false, value: bal });
  }, [core, address]);

  useEffect(() => {
    if (core && address) {
      fetchBalance().catch((err) => {
        console.error(
          `Failed to fetch token balance of ${address}: ${err.stack} `,
        );
      });
    } else {
      setBalance(NON_LOADING_DEFAULT_BASIC_STATE);
    }
  }, [address, blockNumber, core, fetchBalance]);

  return balance;
};

export default useBalanceOf;
