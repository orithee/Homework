import { Box, Container, Grid, Paper, Toolbar } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Cards } from '../helpers/types';
import CodeCard from './CodeCard';

interface props {
  title: string;
  description: string;
  blockId: number;
}

export default function CardsContainer() {
  const [cards, setCards] = useState<Cards[]>();

  useEffect(() => {
    fetchCodeCards();
  }, []);

  const fetchCodeCards = async () => {
    const res = await axios.get('/code-cards');
    if (res.data) {
      console.log(res.data.cards);
      setCards(res.data.cards);
    }
  };

  return (
    <>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={5}>
            {cards &&
              cards.map((card) => {
                return (
                  <CodeCard
                    key={card.id}
                    title={card.title}
                    description={card.description}
                    blockId={card.id}
                  />
                );
              })}
          </Grid>
        </Container>
      </Box>
    </>
  );
}
