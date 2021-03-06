import {BigNumber} from 'ethers'
import { useCallback } from "react"
import {useTransactionAdder} from '../../state/transactions/hooks'

import useCore from '../useCore'
import { useAddPopup } from '../../state/application/hooks';
import formatErrorMessage from '../../utils/formatErrorMessage';
import { truncateMiddle } from '../../utils'


const useBulkTransfer = (
  tokenAddress: any,
  addresses: any[],
  amount: any[],
  noOfTxsRequired: number = 1
) => {
  const core = useCore();
  const addPopup = useAddPopup();
  const addTransaction = useTransactionAdder();

  const action = useCallback(async (callback?: () => void, setTxHashes?: (txHashes: string[]) => void): Promise<void> => {

    try {
      const gasOptions = core.gasOptions();
      const contract = core.contracts.MahaSender;
      
      let j: number = 0;
      const txHashes: string[] = [];
      for (let i = 0; i < noOfTxsRequired; i++) {
        const response = await contract.bulkTransfer(
          tokenAddress,
          addresses.slice(j, j + 2),
          amount.slice(j, j + 2),
          gasOptions
        );

        
       
        addTransaction(
          response,
          {
            summary:  `Hash ${truncateMiddle(
              response.hash,
              12,
              '...',
            )}`
          }
        )

        j+= 2;
        txHashes.push(response.hash)
      }

      if (setTxHashes) setTxHashes(txHashes)
      if (callback) callback();
    } catch (e: any) {
      addPopup({
        error: {
          message: formatErrorMessage(e?.data?.message || e?.message),
          stack: e?.stack,
        },
      });
    }
  }, [core, amount, noOfTxsRequired, addresses,tokenAddress, addPopup, addTransaction]);

  return action;
}

export default useBulkTransfer;