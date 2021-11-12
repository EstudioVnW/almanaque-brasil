import React from 'react';
import { useHistory } from "react-router-dom";


import Modal from "./modal"
import ImgFace from "../../images/face.svg"

const ErrorModal = () => {
  const history = useHistory();

  const content = {
    title: 'Opa! A aplicação parou.',
    text: [
      'Por favor, vá para home para atualizar.',
      <img src={ImgFace} alt="Emoji triste" style={{ margin: '0 auto' }} />
    ],
    button: 'ir para home'
  };

  const handleClick = () => {
    history.push(`/dashboard`);
  }

  return (
    <Modal
      subtitle={content.title}
      data={content.text}
      background='#0000004d'
      balloonColor='#f3f3f3'
      margin='0 auto 1.899rem auto '
      width='100%'
      font='1.5rem'
      btnHeight
      btnContent={content.button}
      handleClick={handleClick}
    />
  );
}

export default ErrorModal;
