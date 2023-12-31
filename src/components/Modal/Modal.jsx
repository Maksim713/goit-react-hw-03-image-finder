import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

class Modal extends Component {
  componentDidMount = () => {
    window.addEventListener('keydown', this.onKeyDown);
  };

  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.onKeyDown);
  };

  onKeyDown = e => {
    if (e.key !== 'Escape') return;
    this.closeModal();
  };

  closeModal = () => {
    this.props.onKeyDownEsc();
  };

  render() {
    const { src, alt } = this.props;

    return (
      <div className={css.overlay} onClick={this.closeModal}>
        <div className={css.modal}>
          <img className={css.modalImg} src={src} alt={alt} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onKeyDownEsc: PropTypes.func.isRequired,
};

export default Modal;
