import React from "react";

import WalletInfo from "./index";
import Modal from "../../../../Modal";

interface MobileWalletInfoProps {
  modalOpen: boolean;
  onClose: () => void;
}

const MobileWalletInfo = (props: MobileWalletInfoProps) => {
  const {
    modalOpen,
    onClose,
  } = props;

  return (
    <Modal
      closeButton
      handleClose={() => onClose()}
      open={modalOpen}
    >
      <div>
        <WalletInfo />
      </div>
    </Modal>
  );
}

export default MobileWalletInfo;
