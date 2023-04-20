const Form = ({
  addPerson,
  handleNewNameInput,
  nameInput,
  handleNewNumberInput,
  numInput,
}) => {
  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handleNewNameInput} value={nameInput} />
        </div>
        <div>
          number: <input onChange={handleNewNumberInput} value={numInput} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
