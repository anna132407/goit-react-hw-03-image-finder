import { Component } from 'react';
import css from './Modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = e => {
    if (e.code === 'Escape') {
      this.props.handleModal();
    }
  };
  handleBackDrop = e => {
    if (e.target === e.currentTarget) {
      this.props.handleModal();
    }
  };

  render() {
    return (
      <div className={css.Overlay} onClick={this.handleBackDrop}>
        <div className={css.Modal}>
          <img src={this.props.largeImageURL} alt="Large" />
        </div>
      </div>
    );
  }
}
