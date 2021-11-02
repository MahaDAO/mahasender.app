import { BigNumber } from 'ethers';
import { useCallback } from 'react';
import { useTransactionAdder } from '../../state/transactions/hooks';

import useCore from '../useCore';
import { useAddPopup } from '../../state/application/hooks';
import { getDisplayBalance } from '../../utils/formatBalance';
import formatErrorMessage from '../../utils/formatErrorMessage';

const useLockMoreMAHA = (
  amount: BigNumber
) => {
  const core = useCore();
  const addPopup = useAddPopup();
  const addTransaction = useTransactionAdder();

  const action = useCallback(async (callback?: () => void): Promise<void> => {
    try {
      const gasOptions = core.gasOptions();
      const contract = core.contracts.VotingEscrow;
      const response = await contract.increase_amount(
        amount,
        gasOptions
      );

      addTransaction(
        response,
        {
          summary: `Add ${Number(getDisplayBalance(amount, 18, 3)).toLocaleString('en-US', { minimumFractionDigits: 3 })} MAHA to Lock.`
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
  }, [core, amount, addPopup, addTransaction]);

  return action;
}

export default useLockMoreMAHA;
