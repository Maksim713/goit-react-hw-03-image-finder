import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  handleClickImg = () => {
    const { onClickImg, largeImageURL, tags } = this.props;
    if (onClickImg) {
      onClickImg({ largeImageURL, tags });
    }
  };

  render() {
    const { id, webformatURL, tags } = this.props;
    return (
      <li className={css.container}>
        <img
          className={css.image}
          src={webformatURL}
          alt={tags}
          data-key={id}
          onClick={this.handleClickImg}
        />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  onClickImg: PropTypes.func,
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
