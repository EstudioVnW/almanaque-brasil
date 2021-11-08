import React from "react";

import Modal from "./modal";

export default function Tip({ text, handleModalTip }) {
  return (
    <Modal
      data={text}
      handleClick={handleModalTip}
      background='#70707075'
      isTip={true}
      noAbsolute
    />
  );
}