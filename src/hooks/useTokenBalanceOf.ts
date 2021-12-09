import { BigNumber } from "ethers"
import { useWallet } from "use-wallet"
import { useCallback, useEffect, useState } from "react"

import useCore from "./useCore"
import ERC20 from "../protocol/ERC20"
import { BasicState } from "../utils/interface"
// import { useBlockNumber } from '../state/application/hooks';
import { LOADING_DEFAULT_BASIC_STATE, NON_LOADING_DEFAULT_BASIC_STATE } from "../utils/constants"

const useTokenBalanceOf = (token: ERC20, address: string) => {
	const [ balance, setBalance ] = useState<BasicState>(LOADING_DEFAULT_BASIC_STATE)

	const core = useCore()
	const { account } = useWallet()
	// const blockNumber = useBlockNumber();

	const fetchBalance = useCallback(
		async () => {
			/*if (!account) {
      setBalance(NON_LOADING_DEFAULT_BASIC_STATE);
      return;
    }*/

			const bal: BigNumber = await token.balanceOf(address)
			setBalance({ isLoading: false, value: bal })
		},
		[ account, token, address ]
	)

	useEffect(
		() => {
			if (core && address) {
				fetchBalance().catch((err) => {
					setBalance(NON_LOADING_DEFAULT_BASIC_STATE)
					console.error(`Failed to fetch token balance of ${address} for ${token?.address}: ${err.stack} `)
				})
			} else {
				setBalance(NON_LOADING_DEFAULT_BASIC_STATE)
			}
		},
		[ address, core, fetchBalance, token ]
	)

	return balance
}

export default useTokenBalanceOf
