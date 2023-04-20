const Filter = ({ handleFilter, value }) => (
  <div>
    filter shown with <input onChange={handleFilter} value={value} />
  </div>
);

export default Filter;
