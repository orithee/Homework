import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from 'react-redux';
import { globalState } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import CardsContainer from './CardsContainer';
import { Container, Divider, List } from '@mui/material';
import { MainListItems } from './utilities/MainListItems';
import { AppBar, Drawer, Theme } from '../helpers/style';
import { Outlet } from 'react-router-dom';

// The main component:
function DashboardContent() {
  const [barOpen, setBarOpen] = React.useState(false);
  const user = useSelector((state: globalState) => state.global.user);
  const codeBlock = useSelector((state: globalState) => state.global.codeOpen);

  const navigate = useNavigate();

  useEffect(() => {
    if (user === undefined) navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={Theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={barOpen}>
          <Toolbar sx={{ pr: '24px' }}>
            {!codeBlock && (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={() => setBarOpen(!barOpen)}
                sx={{
                  marginRight: '36px',
                  ...(barOpen && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {user ? user.name?.toString() : '---'}
            </Typography>
            {user && (
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                {user.isStudent && 'Code Block'}
                {!user.isStudent &&
                  (!codeBlock ? 'Choose code block:' : 'Code Block')}
              </Typography>
            )}
            <Typography component="h1" variant="h6" color="inherit">
              {user?.isStudent && 'Student'}
              {user === undefined && '---'}
              {user?.isStudent === false && 'Mentor'}
            </Typography>
          </Toolbar>
        </AppBar>
        {!codeBlock && (
          <Drawer variant="permanent" open={barOpen}>
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
              }}
            >
              <IconButton onClick={() => setBarOpen(!barOpen)}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
              {' '}
              <MainListItems />
            </List>
          </Drawer>
        )}
        {/* <CardsContainer /> */}
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
            <Outlet />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
