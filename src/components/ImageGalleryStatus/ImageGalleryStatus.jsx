import { PureComponent } from 'react';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import pixabayApi, { ITEMS_PER_PAGE } from '../../services/pixabayApi';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Button from '../Button';
import Loader from '../Loader';
import css from './ImageGalleryStatus.module.css';

class ImageGalleryStatus extends PureComponent {
  state = {
    images: [],
    page: 1,
    totalHits: null,
    error: null,
    isLoading: false,
    loadMoreClicked: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { search } = this.props;
    const { page } = this.state;
    const prevSearch = prevProps.search;
    const nextSearch = this.props.search;

    if (prevSearch === nextSearch && prevState.page === page) {
      return;
    }

    if (prevSearch !== nextSearch) {
      this.setState({ page: 1 });
      window.scroll(0, 0);
      this.setState({ loadMoreClicked: false });
    }

    this.setState({ isLoading: true });

    pixabayApi
      .getSearchImages({ value: search, page })
      .then(({ hits, totalHits }) => {
        const uniqueHits = this.addIdToCollection(hits);

        if (!this.state.loadMoreClicked && !this.state.error) {
          toast.success('All found images');
        }

        this.setState(p => {
          const images =
            prevSearch === nextSearch
              ? [...p.images, ...uniqueHits]
              : uniqueHits;
          return {
            images,
            totalHits,
          };
        });
      })
      .catch(e => {
        toast.error(`Incorrect entry!`);
        this.setState({ error: e.message });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  calcPages = totalHits => Math.ceil(totalHits / ITEMS_PER_PAGE);

  handleMoreBtnClick = () => {
    this.setState(p => ({ page: p.page + 1, loadMoreClicked: true }));
  };

  addIdToCollection = images => {
    return images.map(it => ({ ...it, frontId: nanoid(10) }));
  };

  render() {
    const { images, totalHits, error, page, isLoading } = this.state;
    const { onClickImg } = this.props;
    const pages = this.calcPages(totalHits);

    if (isLoading) {
      return <Loader />;
    }

    if (images.length === 0) {
      return <div className={css.message}>No images found.</div>;
    }

    if (error) {
      //   toast.error(`Incorrect entry!`);
      return (
        <p className={css.container}>
          {error}
          <button
            className={css.btnCloseError}
            onClick={() => {
              this.setState({ error: '' });
            }}
          >
            Close Error
          </button>
        </p>
      );
    }

    if (!error && images.length > 0) {
      return (
        <>
          <ImageGallery images={images} onClickImg={onClickImg} />
          {pages > page && !isLoading && (
            <Button
              page={page}
              pages={pages}
              onClick={this.handleMoreBtnClick}
            />
          )}
        </>
      );
    }
  }
}

ImageGalleryStatus.propTypes = {
  search: PropTypes.string.isRequired,
  onClickImg: PropTypes.func.isRequired,
};

export default ImageGalleryStatus;
