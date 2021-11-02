import { Configuration } from "./utils/interface"

const configurations: { [env: string]: Configuration } = {
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
		blockchainTokenDecimals: 18
	},
	rinkeby: {
		networkName: "Rinkeby",
		chainId: 4,
		etherscanUrl: "https://rinkeby.etherscan.io",
		defaultProvider: "https://late-shy-snowflake.quiknode.pro/eb01229dc5e334ee30623ca3236b8156f3f38af6/",
		deployments: require("./protocol/deployments/rinkeby.json"),
		refreshInterval: 10000,
		gasLimitMultiplier: 1.1,
		blockchainToken: "ETH",
		blockchainTokenName: "Ethereum",
		blockchainTokenDecimals: 18
	},
	matic: {
		networkName: "Matic Mainnet",
		chainId: 137,
		etherscanUrl: "https://polygonscan.com",
		defaultProvider: "https://polygon-rpc.com/",
		deployments: require("./protocol/deployments/matic.json"),
		refreshInterval: 10000,
		gasLimitMultiplier: 1.1,
		blockchainToken: "MATIC",
		blockchainTokenName: "MATIC",
		blockchainTokenDecimals: 18
	}
}

export default configurations[process.env.REACT_APP_NETWORK || "rinkeby"]

// import { Configuration, PROJECTS } from "./utils/interface"

// const configurations: { [env: string]: Configuration } = {
// 	bscTestnet: {
// 		networkName: "BSC Testnet",
// 		chainId: 97,
// 		etherscanUrl: "https://testnet.bscscan.com",
// 		defaultProvider: "https://data-seed-prebsc-1-s1.binance.org:8545/",
// 		deployments: require("./protocol/deployments/bscTestnet.json"),
// 		refreshInterval: 10000,
// 		gasLimitMultiplier: 1.1,
// 		blockchainToken: "BNB",
// 		blockchainTokenName: "BNB",
// 		blockchainTokenDecimals: 18,
// 		modalCloseIntervals: 3 * 1000
// 	},
// 	bsc: {
// 		networkName: "BSC Mainnet",
// 		chainId: 56,
// 		etherscanUrl: "https://bscscan.com",
// 		defaultProvider: "https://bsc-dataseed.binance.org/",
// 		deployments: require("./protocol/deployments/bscTestnet.json"),
// 		refreshInterval: 10000,
// 		gasLimitMultiplier: 1.1,
// 		blockchainToken: "BNB",
// 		blockchainTokenName: "BNB",
// 		blockchainTokenDecimals: 18,
// 		modalCloseIntervals: 3 * 1000
// 	}
// }

// export const projects: PROJECTS = {
// 	scallop: "SCLP"
// }

// export default configurations[process.env.REACT_APP_NETWORK || "bscTestnet"]
