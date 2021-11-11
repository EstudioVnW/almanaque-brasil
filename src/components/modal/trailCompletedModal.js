import React from "react";

import Modal from "../modal/modal";

export default function TrailCompletedModal({ handleClickModal }) {
  const content = {
    title: 'Você já concluiu essa trilha!',
    text: [
      'Tem certeza que quer jogar novamente ?',
      'Você pode continuar jogando as atividades sem pontuar e caso queira uma nova pontuação, poderá reiniciar o mapa nas configurações.'
    ],
    button: 'Jogar sem pontuar'
  };

  return (
    <Modal
      subtitle={content.title}
      data={content.text}
      background='#ababab45'
      handleClick={handleClickModal}
      btnContent={content.button}
      buttonBg='#ffd000'
      elifas='ok'
    />
  );
}