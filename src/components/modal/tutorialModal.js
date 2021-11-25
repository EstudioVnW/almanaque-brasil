import React from "react";

import tutorialData from "./tutorialData";
import Modal from "./modal";

export default function TutorialModal({ screen, handleCloseTutorial, btnContent }) {
  const data = tutorialData.filter(item => item.game.toLowerCase() === screen.toString().toLowerCase());
  const subtitle = data.map(item => item.game);

  return (
    <Modal
      title="Tutorial"
      subtitle={subtitle}
      data={data}
      padding='1rem 1.1rem'
      btnContent={btnContent}
      handleClick={handleCloseTutorial}
      elifas='tip'
      isTutorial
    />
  );
}
