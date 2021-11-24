import React from "react";

import Modal from "./modal";

export default function WelcomeModal({ showThunk, handleClose }) {
  const content = {
    text: [
      'Olá, seja bem-vindo(a) ao aplicativo Almanaque Miguel Burnier, vamos embarcar juntos nessa jornada de conhecimento e diversão?',
      'Sou o Elifas Andreato e serei o seu guia!'
    ],
    button: 'Saiba mais sobre o Elifas'
  };

  return (
    <Modal
      data={content.text}
      background='#ababab45'
      showThunk={showThunk}
      handleClick={handleClose}
      btnContent={content.button}
      buttonBg='#ffd000'
      elifas='guide'
      elifasWidth='14rem'
      isWelcome={true}
    />
  );
}