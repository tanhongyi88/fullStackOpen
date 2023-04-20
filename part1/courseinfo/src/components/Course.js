const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => <p>Number of exercises {sum}</p>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => {
  const total = parts.reduce((sum, p) => sum + p.exercises, 0);
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
      <Total sum={total} />
    </>
  );
};

const Course = ({ course }) => {
  if (course.parts === undefined) {
    return (
      <div>
        <Header course={course.name} />
        <div>No content</div>
      </div>
    );
  }
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
    </div>
  );
};

export { Course };
