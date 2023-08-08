import PropTypes from 'prop-types';
import css from './Button.module.css';

const Button = ({ page, pages, onClick }) => {
  return (
    <button className={css.btn} type="button" onClick={onClick}>
      Load More
      <span className={css.btnPages}>
        {page}/{pages}
      </span>
    </button>
  );
};

Button.propTypes = {
  page: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
