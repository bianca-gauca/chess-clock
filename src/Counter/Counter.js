import React, { useEffect, useState } from 'react'

import './Counter.css';

export default function Counter({minutes = 15, disabled = false, onClick}) {
  console.log('rerender')
  const [{min, sec}, setTime] = useState({
    min: minutes,
    sec: 0
  });

  useEffect(() => {
    const timerId = setInterval(() => decrementTimer(), 1000);

    return () => clearInterval(timerId);
  });

  const decrementTimer = () => {
    if ((min > 0 || sec > 0) && disabled === false) {
      if (sec === 0) {
        setTime({
          min: min - 1,
          sec: 59
        })
      } else {
        setTime({
          min,
          sec: sec - 1
        })
      }
    }
  };

  return (
    <div className='counter' onClick={onClick}>
      {min} : {sec}
    </div>
  );
}
