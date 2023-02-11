import React, { useCallback, useEffect } from 'react'

import './Counter.css';

export default function Counter({
  player = {
    time: {
      min: 15,
      sec: 0
    },
    name: 'Player',
    disabled: false, 
  }, 
  onClick,
  onFinish,
  onChange
}) {
  const { time, name: playerName, disabled, moves } = player;
  const {min, sec} = time;

  const decrementTimer = useCallback(() => {
    if ((min > 0 || sec > 0) && !disabled) {
      let newMin
      let newSec
      if (sec === 0) {
        newMin = min - 1;
        newSec = 59;
      } else {
        newMin = min;
        newSec = sec - 1;
      }

      onChange && onChange({
        time: {
          min: newMin,
          sec: newSec
        },
      })

      if (newMin === 0 && newSec === 0) {
        onFinish && onFinish();
      }
    }
  }, [min, sec, disabled, onChange, onFinish]);

  useEffect(() => {
    const intervalId = setTimeout(() => decrementTimer(), 1000);

    return () => clearTimeout(intervalId);
  }, [decrementTimer]);

  const numberToTime = (value) => value < 9 ? `0${value}` : value;
  const activeClass = disabled ? '' : 'active';

  return (
    <div className={`counter-container ${activeClass}`} onClick={onClick}>
      <div className='counter-player'>{playerName}</div>
      <div className='counter-time'>
        <div className='min'> {numberToTime(min)}</div> 
        <div className='points'>:</div> 
        <div className='sec'>{numberToTime(sec)}</div>
      </div>
      <div className='counter-moves'>Moves: {moves}</div>
    </div>
    
  );
}
