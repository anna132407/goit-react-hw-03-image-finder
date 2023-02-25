import { Component } from 'react';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    keyWord: '',
  };

  handleInputChange = e => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    if (this.state.keyWord.trim() === '') {
      return;
    }
    this.props.onSubmit(this.state.keyWord);
    this.setState({ keyWord: '' });
  };

  render() {
    return (
      <header className={css.SearchBar}>
        <form className={css.SearchForm} onSubmit={this.handleFormSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>
          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="keyWord"
            value={this.state.keyWord}
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}