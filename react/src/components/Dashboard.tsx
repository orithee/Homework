import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
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
import { Divider, List } from '@mui/material';
import { mainListItems } from './utilities/MainListItems';
import { AppBar, Drawer, Theme } from '../helpers/style';

// The main component:
function DashboardContent() {
  const [open, setOpen] = React.useState(false);
  const user = useSelector((state: globalState) => state.global.user);
  const codeOpen = useSelector((state: globalState) => state.global.codeOpen);

  const navigate = useNavigate();

  useEffect(() => {
    if (user === undefined) navigate('/');
  }, []);

  return (
    <ThemeProvider theme={Theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar sx={{ pr: '24px' }}>
            {!codeOpen && (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={() => setOpen(!open)}
                sx={{
                  marginRight: '36px',
                  ...(open && { display: 'none' }),
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
                  (!codeOpen ? 'Choose code block:' : 'Code Block')}
              </Typography>
            )}
            <Typography component="h1" variant="h6" color="inherit">
              {user?.isStudent && 'Student'}
              {user === undefined && '---'}
              {user?.isStudent === false && 'Mentor'}
            </Typography>
          </Toolbar>
        </AppBar>
        {!codeOpen && (
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
              }}
            >
              <IconButton onClick={() => setOpen(!open)}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">{mainListItems}</List>
          </Drawer>
        )}
        <CardsContainer />
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
