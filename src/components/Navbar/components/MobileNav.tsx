import styled from 'styled-components';
import { useWallet } from "use-wallet";
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useMediaQuery } from "react-responsive";

import Button from "../../Button";
import { BackgroundAbsolute } from "../../Selector";
import MobileWalletInfo from "./modal/WalletInfo/MobileWalletInfo";

import IconLoader from "../../IconLoader";
import { truncateMiddle } from "../../../utils";

interface props {
  openMenu: boolean;
  isMainnet: boolean;
  showWarning: boolean;
  onClick: () => void;
  onWalletClick: () => void;
}

const MobileNav = (props: props) => {
  const isMobile = useMediaQuery({ maxWidth: '600px' });
  const { account, connect } = useWallet();
  const [showWalletInfo, setShowWalletInfo] = useState<boolean>(false);

  return (
    <div>
      <MobileWalletInfo
        modalOpen={showWalletInfo && isMobile}
        onClose={() => setShowWalletInfo(false)}
      />

      {props.openMenu && <BackgroundAbsolute onClick={() => props.onClick()} />}
      <StyledNav style={{ width: props.openMenu ? '100%' : '0%', opacity: props.openMenu ? 1 : 0 }}>
        {/* <TopMenu className="bottom-divider">
          <StyledLink exact activeClassName="activeSidebar" onClick={props.onClick} to="/locker">
            Locker
          </StyledLink>
          <StyledLink
            exact
            activeClassName="activeSidebar"
            to="/vote"
            isActive={(match, location) => {
              if (match || location.pathname.includes('/vote')) return true;
              else return false
            }}
            onClick={props.onClick}
          >
            Vote
          </StyledLink>
          <StyledLink exact activeClassName="activeSidebar" onClick={props.onClick} to="/gaugeWeightVote">
            Inflation Vote
          </StyledLink>
          <StyledLink exact activeClassName="activeSidebar" onClick={props.onClick} to="/gauge-boost">
            Reward Calculator
          </StyledLink>
          <StyledLink exact activeClassName="activeSidebar" onClick={props.onClick} to="/minter">
            Minter
          </StyledLink>
          <StyledLink exact activeClassName="activeSidebar" onClick={props.onClick} to="/MAHAXStaking">
            MahaX Staking
          </StyledLink>
          <StyledLink exact activeClassName="activeSidebar" onClick={props.onClick} to="/reward-vesting">
            Reward Vesting
          </StyledLink>
          {config.networkName === "Matic Mumbai Testnet" &&
            <StyledLink exact activeClassName="activeSidebar" onClick={props.onClick} to="/faucet">
              Faucet
            </StyledLink>
          }
        </TopMenu>*/}
        {/*<BottomMenu className="bottom-divider">
          <StyledLinkHref href="https://docs.mahadao.com/governance/governance-portal" target={"_blank"}>
            Documentation
          </StyledLinkHref>
          <StyledLinkHref href="https://docs.google.com/forms/d/e/1FAIpQLSdeFG524PT4jrLYzbZZPUuuCY7Ty220Y3iSi1StvLbsk8JSXA/viewform" target={"_blank"}>
            Report a Bug
          </StyledLinkHref>
        </BottomMenu>*/}
        <WalletButton>
          {
            !account
              ? (
                <Button
                  text="Connect"
                  tracking_id={'connect_wallet'}
                  onClick={() => {
                    connect('injected')
                      .then(() => {
                        localStorage.removeItem('disconnectWallet')
                      })
                      .catch((e) => { })
                  }}
                />
              )
              : (
                <Button
                  onClick={() => setShowWalletInfo(!showWalletInfo)}
                  variant={'transparent'}
                  text={truncateMiddle(account, 12, '...')}
                  tracking_id={'disconnect_wallet'}
                >
                  <IconLoader iconName={'Wallet'} width={24} height={24} className="m-r-8" />
                </Button>
              )
          }
        </WalletButton>
      </StyledNav>
    </div>
  );
};

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 70px;
  width: 100%;
  left: 0;
  background: #1e1d1d;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  height: calc(100vh - 72px);
  overflow-y: scroll;
  transition: 0.2s ease-out;
  z-index: 111;
`;

const TopMenu = styled.div`
  padding: 24px 12px 16px 12px;
  width: 100%;
`;

const BottomMenu = styled.div`
  padding: 24px 12px 16px 12px;
  width: 100%;
`;

const WalletButton = styled.div`
  padding: 24px 12px 16px 12px;
  width: 100%;
`;

const StyledLink = styled(NavLink)`
  padding: 8px 16px;
  width: 100%;
  border-radius: 2px;
  display: block;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #FFFFFF88;
  margin-bottom: 8px;
  &:hover {
    outline: 1px solid rgba(255, 255, 255, 0.08);
    color: #FFFFFF88;
    opacity: 1;
  }
`;

const StyledLinkHref = styled.a`
  padding: 8px 16px;
  width: 100%;
  border-radius: 2px;
  display: block;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #FFFFFF88;
  margin-bottom: 8px;
  &:hover {
    outline: 1px solid rgba(255, 255, 255, 0.08);
    color: #FFFFFF88;
    opacity: 1;
  }
  &:active {
    background: rgba(255, 255, 255, 0.01);
    border-radius: 2px;
    width: 100%;
    color: #FFFFFF88;
    opacity: 1;
  }
`;

export default MobileNav;
