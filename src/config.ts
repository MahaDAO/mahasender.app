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
	ethereum: {
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
		defaultToken: "USDC"
	}
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
