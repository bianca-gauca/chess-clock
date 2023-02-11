import React from 'react';
import { Dialog, IconButton, Toolbar, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import './App.css';
import Counter from './Counter/Counter';
import ReactConfetti from 'react-confetti';
import { RestartAlt } from '@mui/icons-material';
import { KeepAwake } from '@capacitor-community/keep-awake';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    background: 'linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)'
  },
}));

const INITIAL_TIME = {
  min: 15,
  sec: 0
};

function App() {
  const [player1, setPlayer1] = useState({
    name: 'Alex',
    disabled: true,
    time: {
      ...INITIAL_TIME
    },
    moves: 0
  });
  const [player2, setPlayer2] = useState({
    name: 'Bianca',
    disabled: true,
    time: {
      ...INITIAL_TIME
    },
    moves: 0
  });
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [winner, setWinner] = useState();
  const { innerWidth: windowWidth } = window;

  useEffect(() => {
    const keepScreenAwake = async () => {
      if (!player1.disabled || !player2.disabled) {
        await KeepAwake.keepAwake();
      } else {
        await KeepAwake.allowSleep();
      }
    }

    keepScreenAwake().catch(() => console.log('Could not keep the screen awake'));
  }, [player1.disabled, player2.disabled])

  const handleCounter1Click = () => {
    const {disabled, moves} = player1;

    setPlayer1({
      ...player1,
      disabled: true,
      moves: disabled ? moves : moves + 1
    });
    setPlayer2({
      ...player2,
      disabled: false
    });
  }

  const handleCounter2Click = () => {
    const {disabled, moves} = player2;

    setPlayer1({
      ...player1,
      disabled: false
    });
    setPlayer2({
      ...player2,
      disabled: true,
      moves: disabled ? moves : moves + 1
    });
  }

  const handleCounter1Change = ({time}) => {
    setPlayer1({
      ...player1,
      time,
    });
  }

  const handleCounter2Change = ({time}) => {
    setPlayer2({
      ...player2,
      time,
    });
  }

  const handleCounterFinish = ({name: playerName}) => {
    setPlayer1({
      ...player1,
      disabled: true
    });
    setPlayer2({
      ...player2,
      disabled: true
    });
    setWinner(playerName);
    setDialogOpen(true);
  }

  const handleCloseDialog = () => {
    setDialogOpen(false);
  }

  const resetCounters = () => {
    setPlayer1({
      ...player1,
      time: {
        ...INITIAL_TIME
      },
      disabled: true,
      moves: 0
    });
    setPlayer2({
      ...player2,
      time: {
        ...INITIAL_TIME
      },
      disabled: true,
      moves: 0
    });
  }

  const handleDialogReset = () => {
    resetCounters();
    handleCloseDialog();
  }

  return (
    <div>
      <div className='counter1'>
        <Counter
          player={player1}
          onClick={handleCounter1Click}
          onChange={handleCounter1Change}
          onFinish={() => handleCounterFinish(player1)}
        >
        </Counter>
      </div>

       <Box
          sx={{
              position: 'relative',
              width: '100%'
          }}
          onClick={handleDialogReset}
        >
          <RestartAlt sx={{
            position: 'absolute',
            color: '#2c2c3b',
            width: '50px',
            height: '50px',
            cursor: 'pointer',
            left: '50%',
            ml: '-25px',
            top: '40px',
          }}/>
        </Box>

      <div className='counter2'>
        <Counter
          player={player2}
          onClick={handleCounter2Click}
          onChange={handleCounter2Change}
          onFinish={() => handleCounterFinish(player2)}
        >
        </Counter>
      </div>

      <BootstrapDialog
        fullScreen
        open={isDialogOpen}
        onClose={handleCloseDialog}
        sx={{
          background: 'linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)'
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={handleCloseDialog}
            aria-label="close"
            sx={{
              position: 'absolute',
              right: 20,
              top: 20,
              color: '#373737'
            }}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
        <Box>
          <ReactConfetti
            width={windowWidth}
            height={'300px'}
            numberOfPieces={60}
            opacity={0.7}
          />
        </Box>

        <Box sx={{
            textAlign: 'center',
            mt: '20%',
            width: '100%',
          }}>
          <Typography variant='h4' sx={{
            color: '#373737'
          }}>
              And the winner is
          </Typography>
          <Typography variant='h2' sx={{
            color: '#ffffff'
          }}>
              {winner}
          </Typography>
        </Box>

        <Box
          sx={{
              color: '#ffffff',
              position: 'absolute',
              bottom: '100px',
              left: '50%',
              ml: '-40px'
          }}
          onClick={handleDialogReset}
        >
          <RestartAlt sx={{
            width: '80px',
            height: '80px',
            cursor: 'pointer'
          }}/>
        </Box>
      </BootstrapDialog>
    </div>
  );
}

export default App;
