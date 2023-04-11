const Header = (props) => {
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  );
};
const Content = (props) => {
  return (
    <div>
      <Part
        title={props.parts[0].name}
        noOfExercise={props.parts[0].exercises}
      />
      <Part
        title={props.parts[1].name}
        noOfExercise={props.parts[1].exercises}
      />
      <Part
        title={props.parts[2].name}
        noOfExercise={props.parts[2].exercises}
      />
    </div>
  );
};

const Part = (props) => {
  return (
    <div>
      <p>
        {props.title} {props.noOfExercise}
      </p>
    </div>
  );
};
const Total = (props) => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {props.parts[0].exercises +
          props.parts[1].exercises +
          props.parts[2].exercises}
      </p>
    </div>
  );
};
const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
