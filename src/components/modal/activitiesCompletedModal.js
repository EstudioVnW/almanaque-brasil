import React from "react";

import Modal from "./modal";

export default function ActivitiesCompletedModal({ history, score }) {
  const handleClick = () => {
    history.push('/trilhas');
  };

  const content = {
    title: 'Parabéns!',
    text: [
      'Você concluiu a trilha, e conquistou :',
      score,
      'vamos continuar nessa jornada de conhecimento?'
    ],
    button: 'Escolher outra trilha'
  };

	return (
    <Modal
      subtitle={content.title}
      data={content.text}
      bottom='-2rem'
      background='#ababab45'
      handleClick={handleClick}
      btnContent={content.button}
      margin='.5rem 0 .8rem'
      buttonBg='#ffd000'
      font='1.5em'
      elifas='ok'
      isScore={true}
    />
	);
}