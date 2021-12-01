import { Configuration, POOL } from "./utils/interface"

const CONFIGURATIONS: { [env: string]: Configuration } = {
	rinkeby: {
		baseLaunchDate: new Date(),
		networkName: "Rinkeby",
		chainId: 4,
		etherscanUrl: "https://rinkeby.etherscan.io",
		defaultProvider: "https://rinkeby.infura.io/v3/403238924914456d949289598ceffd80",
		deployments: require("./protocol/deployments/rinkeby.json"),
		refreshInterval: 10000,
		gasLimitMultiplier: 1.1,
		blockchainToken: "ETH",
		blockchainTokenName: "Ethereum",
		blockchainTokenDecimals: 18,
		defaultToken: "USDC",
		networkSetupDocLink: "https://gist.github.com/tschubotz/8047d13a2d2ac8b2a9faa3a74970c7ef"
	},
	// ethereum: {
	// 	networkName: "Ethereum Mainnet",
	// 	chainId: 1,
	// 	etherscanUrl: "https://etherscan.io",
	// 	defaultProvider: "https://mainnet.infura.io/v3/747e9d3bface477cb469aafb2e9642a9",
	// 	deployments: require("./protocol/deployments/ethereum.json"),
	// 	refreshInterval: 10000,
	// 	gasLimitMultiplier: 1.1,
	// 	blockchainToken: "ETH",
	// 	blockchainTokenName: "ETHEREUM",
	// 	blockchainTokenDecimals: 18,
	// 	defaultToken: "ETH"
	// },
	maticMumbai: {
		networkName: "Matic Mumbai Testnet",
		chainId: 80001,
		etherscanUrl: "https://mumbai.polygonscan.com",
		defaultProvider: "https://matic-mumbai.chainstacklabs.com",
		deployments: require("./protocol/deployments/maticMumbai.json"),
		refreshInterval: 10000,
		gasLimitMultiplier: 1.1,
		blockchainToken: "MATIC",
		blockchainTokenName: "MATIC",
		defaultToken: "ETH",
		blockchainTokenDecimals: 18,
		networkSetupDocLink: "https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/"
	}
	// matic: {
	// 	networkName: "Matic Mainnet",
	// 	chainId: 137,
	// 	etherscanUrl: "https://polygonscan.com",
	// 	defaultProvider: "https://polygon-rpc.com/",
	// 	deployments: require("./protocol/deployments/matic.json"),
	// 	refreshInterval: 10000,
	// 	gasLimitMultiplier: 1.1,
	// 	blockchainToken: "MATIC",
	// 	blockchainTokenName: "MATIC",
	// 	defaultToken: "ETH",
	// 	blockchainTokenDecimals: 18,
	// 	networkSetupDocLink: "https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/"
	// }
}

export const POOLS: POOL[] = [
	{
		token1: "USDC",
		token2: "USDT",
		platform: "DFYN",
		lpToken: "USDTUSDCLP"
	}
]

export const EARN_FARMS: string[] = [ "USDC" ]

export default CONFIGURATIONS[process.env.REACT_APP_NETWORK || "rinkeby"]
