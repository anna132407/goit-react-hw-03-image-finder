import React, { Component } from 'react';
import { fetchPhotosByKeyWord } from 'services/api';
import css from './App.module.css';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';

export class App extends Component {
  state = {
    keyWord: '',
    photos: [],
    page: 1,
    isLoading: false,
    loadMoreIsVisible: false,
    isModalOpen: false,
    error: '',
    isFetchedArrayEmpty: false,
    largeImageURL: '',
  };

  async componentDidUpdate(_, prevState) {
    const { keyWord, page } = this.state;
    if (prevState.keyWord !== keyWord || prevState.page !== page) {
      this.setState({ isLoading: true });
      try {
        const { hits, totalHits } = await fetchPhotosByKeyWord(keyWord, page);
        if (hits.length === 0) {
          this.setState({ isFetchedArrayEmpty: true });
          return;
        }
        this.setState(prevState => ({
          photos: [...prevState.photos, ...hits],

          loadMoreIsVisible: page < Math.ceil(totalHits / 12),
        }));
      } catch (error) {
        this.setState({ error: error.message });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  setKeyWord = keyWord => {
    this.setState({
      keyWord,
      photos: [],
      page: 1,
      isLoading: false,
      loadMoreIsVisible: false,
      isModalOpen: false,
      error: '',
      isFetchedArrayEmpty: false,
    });
  };
  handleButton = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  onItemClick = largeImageURL => {
    this.setState({ largeImageURL, isModalOpen: true });
  };

  handleModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const {
      photos,
      isLoading,
      loadMoreIsVisible,
      isModalOpen,
      error,
      isFetchedArrayEmpty,
      largeImageURL,
    } = this.state;
    return (
      <>
        {isLoading && <Loader />}

        <section className={css.App}>
          <Searchbar onSubmit={this.setKeyWord} />

          {error && (
            <p className={css.Notify}>
              Sorry, an error occurred! Error: {error} Please try again later
            </p>
          )}
          {isFetchedArrayEmpty ? (
            <p className={css.Notify}>
              Sorry, there are no images for your request
            </p>
          ) : (
            <ImageGallery photos={photos} onItemClick={this.onItemClick} />
          )}
          {loadMoreIsVisible && <Button onLoadMore={this.handleButton} />}
          {isModalOpen && (
            <Modal
              largeImageURL={largeImageURL}
              handleModal={this.handleModal}
            />
          )}
        </section>
      </>
    );
  }
}