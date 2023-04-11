import { useState } from "react";

const Button = (props) => {
  return (
    <div>
      <button onClick={props.handleClick}>{props.text}</button>
    </div>
  );
};

const StatisticLine = (props) => {
  if (props.percent !== undefined) {
    return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value}%</td>
      </tr>
    );
  }
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};

const Statistics = (props) => {
  if (props.total === 0) {
    return (
      <div>
        <div>No feedback given</div>
      </div>
    );
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine text="total" value={props.total} />
        <StatisticLine
          text="average"
          value={(props.good - props.bad) / props.total}
        />
        <StatisticLine
          text="positive"
          value={(props.good / props.total) * 100}
          percent={true}
        />
      </tbody>
    </table>
  );
};
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);

  const goodIncrement = () => {
    const newVal = good + 1;
    const newTotal = newVal + neutral + bad;
    setGood(newVal);
    setTotal(newTotal);
  };
  const neutralIncrement = () => {
    const newVal = neutral + 1;
    const newTotal = good + newVal + bad;
    setNeutral(newVal);
    setTotal(newTotal);
  };
  const badIncrement = () => {
    const newVal = bad + 1;
    const newTotal = good + neutral + newVal;
    setBad(newVal);
    setTotal(newTotal);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={goodIncrement} text="good" />
      <Button handleClick={neutralIncrement} text="neutral" />
      <Button handleClick={badIncrement} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} />
    </div>
  );
};

export default App;
