import { BigNumber } from "ethers"

import Protocol from "../protocol"

export type BasicState = {
	isLoading: boolean
	value: BigNumber
}

export type IABIS = {
	[key: string]: any[]
}

export type Deployments = {
	[contractName: string]: {
		address: string
		abi: string
	}
}

export type EthereumConfig = {
	testing: boolean
	autoGasMultiplier: number
	defaultConfirmations: number
	defaultGas: string
	defaultGasPrice: string
	ethereumNodeTimeout: number
}

export type Configuration = {
	chainId: number
	baseLaunchDate?: Date
	networkName: string
	etherscanUrl: string
	config?: EthereumConfig
	defaultProvider: string
	deployments: Deployments
	blockchainToken: "MATIC" | "ETH" | "BNB"
	refreshInterval: number
	gasLimitMultiplier: number
	blockchainTokenName: string
	blockchainTokenDecimals: number
	defaultToken: string
	networkSetupDocLink?: string
}

export interface IMulticallInput {
	key: string
	target: string
	call: (string | number)[]
	convertResult: (val: any) => any
}

export type PopupContent = {
	txn?: {
		hash: string
		success: boolean
		loading?: boolean
		summary?: string
	}
	error?: {
		message: string
		stack: string
	}
}

export type PopupList = Array<{
	key: string
	show: boolean
	content: PopupContent
	removeAfterMs: number | null
}>

export interface ApplicationState {
	blockNumber: { [chainId: number]: number }
	popupList: PopupList
	walletModalOpen: boolean
	settingsMenuOpen: boolean
}

export interface TransactionDetails {
	hash: string
	approval?: { tokenAddress: string; spender: string }
	summary?: string
	receipt?: SerializableTransactionReceipt
	lastCheckedBlockNumber?: number
	addedTime: number
	confirmedTime?: number
	from: string
}

export interface TransactionState {
	[chainId: number]: {
		[txHash: string]: TransactionDetails
	}
}

export interface SerializableTransactionReceipt {
	to: string
	from: string
	contractAddress: string
	transactionIndex: number
	blockHash: string
	transactionHash: string
	blockNumber: number
	status?: number
}

export interface ModalsContext {
	content?: React.ReactNode
	isOpen?: boolean
	onPresent: (content: React.ReactNode) => void
	onDismiss: () => void
}

export interface ProtocolContext {
	core: Protocol
}

export type POOL = {
	token1: string
	token2: string
	platform: string
	lpToken: string
}

export interface IEarnModalProps {
	token: string
	openModal: boolean
	onClose: () => void
	onSuccess: () => void
}

export interface IEarnCardProps {
	toolTipTitle?: string
	history?: any
	onSupplyClick?: () => void
	onWithdrawClick: () => void
	onClaimClick: () => void
	tokenSymbol: string
}

export interface IDashboardCardProps {
	pool: POOL
	onModalClick?: () => void
}

export type Price = { price: BigNumber; token: string }
export type GeckoPrice = { [currency: string]: { usd: Number; eth: Number } }
export type ApprovalOf = { bal: BigNumber; from: string; to: string }
export type BalanceOf = { bal: BigNumber; who: string; token: string }

export interface TokenState {
	balanceOf: {
		[token: string]: {
			[who: string]: BigNumber
		}
	}
	approvals: {
		[token: string]: {
			[who: string]: {
				[to: string]: BigNumber
			}
		}
	}
}

export interface PriceState {
	price: {
		[token: string]: BigNumber
	}
}

export interface TokenBorrowMemo {
	isLoading: boolean
	token1Borrow: BigNumber
	token2Borrow: BigNumber
}

export interface TokenFactor {
	borrowFactor: BigNumber
	collateralFactor: BigNumber
	liqIncentive: BigNumber
}

export interface TokenFactorState {
	isLoading: boolean
	value: TokenFactor
}

export interface DashboardSupplyDebtStat {
	collateralValue: BigNumber
	debtValue: BigNumber
}

export interface DashboardSupplyDebtStatState {
	isLoading: boolean
	value: DashboardSupplyDebtStat
}
export interface PositionsState {
	id: BigNumber
	underlyingToken: string
	collateralValue: BigNumber
	collateralCredit: BigNumber
	borrowCredit: BigNumber
	debtRatio: BigNumber
	borrowValue: BigNumber
	owner: string
}
export interface AllPositionsState {
	isLoading: boolean
	value: PositionsState[]
}

export interface IAllPositionPorps {
	pool: POOL
	position: PositionsState
	onLiquidateClick: () => void
}

export interface IYourPositionPorps {
	pool: POOL
	position: PositionsState
	onAddClick: () => void
	onRemoveClick: () => void
	onHarvestClick: () => void
}
