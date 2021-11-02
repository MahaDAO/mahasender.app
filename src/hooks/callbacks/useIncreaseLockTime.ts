import { useCallback } from 'react';
import { useTransactionAdder } from '../../state/transactions/hooks';

import useCore from '../useCore';
import { DAY_IN_MS } from '../../utils/constants';
import { useAddPopup } from '../../state/application/hooks';
import formatErrorMessage from '../../utils/formatErrorMessage';

const useIncreaseLockTime = (unlockTimestampInS: number) => {
  const core = useCore();
  const addPopup = useAddPopup();
  const addTransaction = useTransactionAdder();

  const action = useCallback(async (callback?: () => void): Promise<void> => {
    try {
      const gasOptions = core.gasOptions();
      const contract = core.contracts.VotingEscrow;

      const currentTimestamp = Date.now();
      const roundedDAYTimestamp = Math.floor(currentTimestamp / DAY_IN_MS) * DAY_IN_MS;
      const timestampDiff = currentTimestamp - roundedDAYTimestamp;

      const response = await contract.increase_unlock_time(
        unlockTimestampInS + Math.floor(timestampDiff / 1000),
        gasOptions
      );

      addTransaction(
        response,
        {
          summary: `Increase lock time.`
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
  }, [core, addPopup, unlockTimestampInS, addTransaction]);

  return action;
}

export default useIncreaseLockTime;
