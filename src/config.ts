import { Configuration, PROJECTS } from "./utils/interface"

const configurations: { [env: string]: Configuration } = {
	bscTestnet: {
		networkName: "BSC Testnet",
		chainId: 97,
		etherscanUrl: "https://testnet.bscscan.com",
		defaultProvider: "https://data-seed-prebsc-1-s1.binance.org:8545/",
		deployments: require("./protocol/deployments/bscTestnet.json"),
		refreshInterval: 10000,
		gasLimitMultiplier: 1.1,
		blockchainToken: "BNB",
		blockchainTokenName: "BNB",
		blockchainTokenDecimals: 18,
		modalCloseIntervals: 3 * 1000
	},
	bsc: {
		networkName: "BSC Mainnet",
		chainId: 56,
		etherscanUrl: "https://bscscan.com",
		defaultProvider: "https://bsc-dataseed.binance.org/",
		deployments: require("./protocol/deployments/bscTestnet.json"),
		refreshInterval: 10000,
		gasLimitMultiplier: 1.1,
		blockchainToken: "BNB",
		blockchainTokenName: "BNB",
		blockchainTokenDecimals: 18,
		modalCloseIntervals: 3 * 1000
	}
}

export const projects: PROJECTS = {
	scallop: "SCLP"
}

export default configurations[process.env.REACT_APP_NETWORK || "bscTestnet"]
