import { Configuration } from "./utils/interface"

const CONFIGURATIONS: { [env: string]: Configuration } = {
	4: {
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
	80001: {
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
}

export const getConfig = (chainId: number) => CONFIGURATIONS[chainId]
export const getSupportedChains = (): number[] => Object.keys(CONFIGURATIONS).map((i) => Number(i))

export default CONFIGURATIONS[4]
