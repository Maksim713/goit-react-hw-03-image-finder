import { Component } from 'react';
import { toast } from 'react-toastify';
import css from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    search: '',
  };

  handleNameChange = e => {
    this.setState({ search: e.currentTarget.value.toLowerCase() });
  };

  handleFormSubmit = e => {
    e.preventDefault();

    if (this.state.search.trim() === '') {
      return toast.warn('Type in the input box!');
    }

    this.props.onSubmit(e.target.elements['search'].value.toLowerCase().trim());
    this.reset();
    // toast.success('All found images');
    // toast.success(`Total images found`);
  };

  reset = () => {
    this.setState({ search: '' });
  };

  render() {
    const { search } = this.state;

    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleFormSubmit}>
          <button type="submit" className={css.button}>
            <span className={css.buttonLabel}>Search</span>
          </button>

          <input
            className={css.input}
            type="text"
            name="search"
            value={search}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
