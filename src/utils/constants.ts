import { BigNumber } from "ethers"
import { BasicState, ApplicationState, TransactionState, EthereumConfig } from "./interface"

export const DAY = 86400
export const DAY_IN_MS = 86400000

export const YEAR = 365 * 86400
export const YEAR_IN_MS = YEAR * 1000

export const MONTH = 31 * 24 * 60 * 60
export const MONTH_IN_MS = MONTH * 1000

export const WEEK = 7 * 86400
export const WEEK_IN_MS = 7 * 86400000

export const MAXTIME = 4 * 365 * 86400
export const MAXTIME_IN_MS = 4 * 365 * 86400000

export const LOADING_DEFAULT_BASIC_STATE: BasicState = {
	isLoading: true,
	value: BigNumber.from(0)
}

export const NON_LOADING_DEFAULT_BASIC_STATE: BasicState = {
	isLoading: false,
	value: BigNumber.from(0)
}

export const DEFAULT_ETHEREUM_CONFIG: EthereumConfig = {
	testing: false,
	autoGasMultiplier: 1.5,
	defaultConfirmations: 1,
	defaultGas: "6000000",
	defaultGasPrice: "1000000000000",
	ethereumNodeTimeout: 10000
}

export const DECIMALS_18 = BigNumber.from(10).pow(18)

export const INITIAL_APP_STATE: ApplicationState = {
	blockNumber: {},
	popupList: [],
	walletModalOpen: false,
	settingsMenuOpen: false
}

export const INITIAL_TRANSACTION_STATE: TransactionState = {}

export const noOp = () => {}

export const handleDate = (date: any) => {
	return new Date(date.setHours(0, 0, 0, 0))
}

export const addDays = (date: Date, no: number = 1) => {
	return handleDate(new Date(date.getTime() + DAY_IN_MS * no))
}

export const addWeeks = (date: Date, no: number = 1) => {
	return handleDate(new Date(date.getTime() + WEEK_IN_MS * no))
}

export const addMonths = (date: Date, no: number = 1) => {
	return handleDate(new Date(date.getTime() + MONTH_IN_MS * no))
}

export const addYears = (date: Date, no: number = 1) => {
	return handleDate(new Date(date.getTime() + YEAR_IN_MS * no))
}
