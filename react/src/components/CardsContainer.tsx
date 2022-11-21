import { Grid } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Cards } from '../helpers/types';
import { globalState } from '../redux/store';
import CodeCard from './CodeCard';
import BasicModal from './utilities/BasicModal';
import CurrentSession from './CurrentSession';

// A component that displays exercise cards:
export default function CardsContainer() {
  const [cards, setCards] = useState<Cards[]>();
  const [openSession, setOpenSession] = useState<boolean | number>(false);
  const codeOpen = useSelector((state: globalState) => state.global.codeOpen);
  const links = useSelector((state: globalState) => state.global.sessionLinks);

  useEffect(() => {
    fetchCodeCards();
  }, []);

  const fetchCodeCards = async () => {
    const res = await axios.get('/code-cards');
    if (res.data) {
      setCards(res.data.cards);
    }
  };

  return (
    <>
      <Grid container spacing={5}>
        {cards &&
          cards.map((card, index) => {
            return (
              <CodeCard
                key={index}
                title={card.title}
                description={card.description}
                blockId={card.id}
                setOpenSession={setOpenSession}
              />
            );
          })}
      </Grid>
      {typeof openSession === 'number' && (
        <BasicModal setOpenSession={setOpenSession} sessionId={openSession} />
      )}
      {links.mentor && links.student && <CurrentSession />}
    </>
  );
}
