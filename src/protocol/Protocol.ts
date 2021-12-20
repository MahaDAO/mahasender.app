import { BigNumber, Contract, ethers, Overrides } from 'ethers';

import ERC20 from './ERC20';
import ABIS from './deployments/abi';
import { Configuration } from '../utils/interface';
import { getDefaultProvider } from '../utils/provider';

/**
 * An API module of ARTH contracts.
 * All contract-interacting domain logic should be defined in here.
 */
export class Protocol {
  myAccount!: string;
  signer?: ethers.Signer;
  config: Configuration;
  contracts: { [name: string]: Contract };
  provider: ethers.providers.BaseProvider;
  ARTH: ERC20;
  MAHA: ERC20;
  // SCLP: ERC20;

  tokens: {
    [name: string]: ERC20;
  };

  constructor(cfg: Configuration) {
    const { deployments } = cfg;
    const provider = getDefaultProvider(cfg);

    this.contracts = {};
    for (const [name, deployment] of Object.entries(deployments)) {
      if (!deployment.abi) continue;
      this.contracts[name] = new Contract(deployment.address, ABIS[deployment.abi], provider);
    }

    this.ARTH = new ERC20(deployments.ARTHStablecoin.address, provider, 'ARTH', 18);
    this.MAHA = new ERC20(deployments.MahaToken.address, provider, 'MAHA', 18);
    // this.SCLP = new ERC20(deployments.Scallop.address, provider, 'SLP', 18);

    this.tokens = {
      ARTH: this.ARTH,
      MAHA: this.MAHA,
      // SCLP: this.SCLP
    };

    this.config = cfg;
    this.provider = provider;
  };

  /**
   * @param provider From an unlocked wallet. (e.g. Metamask)
   * @param account An address of unlocked wallet account.
   */
  unlockWallet(provider: any, account: string) {
    const newProvider = new ethers.providers.Web3Provider(provider, this.config.chainId);

    this.signer = newProvider.getSigner(0);
    this.myAccount = account;
    for (const [name, contract] of Object.entries(this.contracts)) {
      this.contracts[name] = contract.connect(this.signer);
    }

    const tokens = [
      this.MAHA,
      // this.SCLP,
      this.ARTH
    ];

    for (const token of tokens) {
      if (token && token.address) {
        token.connect(this.signer);
      }
    }

  };

  get isUnlocked(): boolean {
    return !!this.myAccount;
  };

  gasOptions(gas: BigNumber = BigNumber.from('6000000')): Overrides {
    const multiplied = Math.floor(gas.toNumber() * this.config.gasLimitMultiplier);
    return {
      gasLimit: BigNumber.from(multiplied),
    };
  };
}
