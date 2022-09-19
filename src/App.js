import { useState } from 'react';
import './App.css';
import Counter from './Counter/Counter';

function App() {
  const [counter1Disabled, setCounter1Disabled] = useState(true);
  const [counter2Disabled, setCounter2Disabled] = useState(true);

  const handleClickCounter1 = () => {
    setCounter1Disabled(true);
    setCounter2Disabled(false);
  }

  const handleClickCounter2 = () => {
    setCounter1Disabled(false);
    setCounter2Disabled(true);
  }

  return (
    <div>
      <Counter minutes={1} disabled={counter1Disabled} onClick={handleClickCounter1}></Counter>
      
      <Counter disabled={counter2Disabled} onClick={handleClickCounter2}></Counter>
    </div>
  );
}

export default App;
