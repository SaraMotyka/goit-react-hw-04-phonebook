import PropTypes from 'prop-types';
import css from '../Filter/Filter.module.css';

export const Filter = ({ filter, addFilter }) => {
  return (
    <div className={css.filter}>
      <input
        type="text"
        name="filter"
        className={css.filter__input}
        value={filter}
        onChange={addFilter}
        placeholder="Enter name"
      />
    </div>
  );
};

Filter.propTypes = {
  filter: PropTypes.string,
  addFilter: PropTypes.func,
};

export default Filter;
