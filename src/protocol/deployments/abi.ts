import IERC20 from './abi/IERC20.json';
import MahaToken from './abi/MahaToken.json';
import { IABIS } from '../../utils/interface';
import VotingEscrow from './abi/VotingEscrow.json';

const abis: IABIS = {
  IERC20,
  MahaToken,
  VotingEscrow
};

export default abis;
