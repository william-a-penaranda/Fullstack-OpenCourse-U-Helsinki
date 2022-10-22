import { useState } from "react";


const Button = ({ clickHandler, text }) => (
  <button onClick={clickHandler}>
    {text}
  </button>
);

const StatisticLine = ({ text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  if ((good+neutral+bad) === 0){
    return(
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    );
  }
  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="average" value={(good-bad)/(good+neutral+bad)} />
          <StatisticLine text="positive" value={`${good/(good+neutral+bad)*100} %`} />
        </tbody>
      </table>
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button clickHandler={() => setGood(good+1)} text="good"/>
      <Button clickHandler={() => setNeutral(neutral+1)} text="neutral"/>
      <Button clickHandler={() => setBad(bad+1)} text="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
  )
};

export default App;
