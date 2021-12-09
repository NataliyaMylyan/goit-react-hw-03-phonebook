import PropTypes from "prop-types";
import s from "./Filter.module.css";

const Filter = ({ filter, onChange }) => (
  <div className={s.filter}>
    <label>
      Find contacts by name
      <input
        className={s.input}
        type="text"
        name="filter"
        value={filter}
        onChange={onChange}
      />
    </label>
  </div>
);

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
