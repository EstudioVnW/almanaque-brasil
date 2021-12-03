import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import * as S from "./styles";

import Header from "../../components/header/index";
import Item from "../config/item";
import tutorialData from "../../components/modal/tutorialData";
import Modal from "./modal";

export default function Tutorial() {
  const history = useHistory();
  const [game, setGame] = useState('');
  const [modal, setModal] = useState(false);

  const handleGame = (item, i) => {
    const games = tutorialData.map(item => item.game);

    setGame(games.filter((game, index) => index === i));
    setModal(modal ? false : true);

    history.push(`/config/tutorial/${item.route}`)
  };
  
  const handleCloseTutorial = () => {
    setModal(false);
    history.goBack()
  };

  return (
    <S.Container>
      {modal ? (
        <Modal
          screen={game}
          handleCloseTutorial={handleCloseTutorial}
        />
      ) : (
        <>
          <Header title='Tutorial' />
          <S.Content>
            {tutorialData.map((item, i) => (
              <Item
                key={i}
                title={item.game}
                handleClick={() => handleGame(item, i)}
              />
            ))}

          </S.Content>
        </>
      )}
    </S.Container>
  );
}