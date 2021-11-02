import { BigNumber } from 'ethers';
import { useCallback } from 'react';
import { useTransactionAdder } from '../../state/transactions/hooks';

import useCore from '../useCore';
import { useAddPopup } from '../../state/application/hooks';
import { getDisplayBalance } from '../../utils/formatBalance';
import formatErrorMessage from '../../utils/formatErrorMessage';

const useLockMAHA = (
  amount: BigNumber,
  unlockTimestampInS: number
) => {
  const core = useCore();
  const addPopup = useAddPopup();
  const addTransaction = useTransactionAdder();

  const action = useCallback(async (callback?: () => void): Promise<void> => {
    try {
      const gasOptions = core.gasOptions();
      const contract = core.contracts.VotingEscrow;

      const response = await contract.create_lock(
        amount,
        unlockTimestampInS,
        gasOptions
      );

      addTransaction(
        response,
        {
          summary: `Lock ${Number(getDisplayBalance(amount, 18, 3)).toLocaleString('en-US', { minimumFractionDigits: 3 })} MAHA.`
        }
      );

      if (callback) callback();
    } catch (e: any) {
      addPopup({
        error: {
          message: formatErrorMessage(e?.data?.message || e?.message),
          stack: e?.stack,
        },
      });
    }
  }, [core, amount, addPopup, unlockTimestampInS, addTransaction]);

  return action;
}

export default useLockMAHA;
