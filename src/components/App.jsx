import { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGalleryStatus from './ImageGalleryStatus';
import Modal from './Modal';
import Container from './Container';
import css from './App.module.css';

class App extends Component {
  state = {
    search: '',
    modalImg: {
      largeImageURL: '',
      tags: '',
    },
    showedModal: false,
  };

  getSearchValue = value => {
    this.setState({ search: value });
  };

  getModalImg = modalImg => {
    this.setState({ modalImg });
    this.toggleModal();
  };

  handleKeyDownEscModal = () => {
    this.toggleModal();
    this.setState({ modalImg: { largeImageURL: '', tags: '' } });
  };

  toggleModal = () => {
    this.setState(({ showedModal }) => ({ showedModal: !showedModal }));
  };

  render() {
    const {
      search,
      showedModal,
      modalImg: { largeImageURL, tags },
    } = this.state;

    return (
      <div className={css.container}>
        <Searchbar
          onSubmit={this.getSearchValue}
          onClickImg={this.getModalImg}
        />
        <Container>
          <ImageGalleryStatus search={search} onClickImg={this.getModalImg} />
        </Container>
        {showedModal && (
          <Modal
            src={largeImageURL}
            alt={tags}
            onKeyDownEsc={this.handleKeyDownEscModal}
          />
        )}
      </div>
    );
  }
}

export default App;
