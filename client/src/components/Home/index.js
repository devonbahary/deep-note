import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { connectToHeadFolder, createAndConnectHeadFolder } from '../../actions/folders';
import LoadingSpinner from '../Loading';

class Home extends React.Component {
  state = {
    isOpen: false,
    text: ''
  };

  componentDidMount() {
    this.props.connectToHeadFolder();
  }

  componentDidUpdate(prevProps) {
    const errStatus = this.props.loadError && this.props.loadError.status;
    if (!prevProps.loadError && errStatus && (errStatus === 404 || errStatus === 400)) {
      if (confirm(`We didn\'t find a folder with ID '${this.state.text}'. Create new folder '${this.state.text}'?`)) {
        this.props.createAndConnectHeadFolder({ name: this.state.text });
      }
    }
  }

  handleButtonClick = () => this.setState((prevState) => ({ isOpen: !prevState.isOpen }));

  handleTextChange = e => {
    const text = e.target.value;
    this.setState(() => ({ text }));
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.connectToHeadFolder(this.state.text)
  }

  render() {
    const { headFolderId, isError, isLoading } = this.props;
    
    if (headFolderId) return (<Redirect to={`/folders/${headFolderId}`} />);
    let bodyContents;
    if (!this.state.isOpen) {
      bodyContents = (
        <div className="Home__dialog" onClick={this.handleButtonClick}>
          <i className="far fa-folder Home__dialogIcon"></i>
        </div>
      )
    } else {
      bodyContents = (
        <div className="Home__dialog--open">
          <form onSubmit={this.handleSubmit} className="Home__form">
            <input 
              type="text" 
              className="Home__input" 
              value={this.state.text} 
              onChange={this.handleTextChange}
              disabled={isLoading}
              placeholder="folder"
            >
            </input>
            {isLoading ? (
              <div className="Home__submitLoading">
                <LoadingSpinner />
              </div>
            ) : (
              <button type="submit" className="Home__submit" disabled={!this.state.text.length}>
                <i className="fas fa-arrow-right"></i>
              </button>
            )}
          </form>
        </div>
      )
    }
      
    return (
      <div className="Home">
        {bodyContents}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.folders.isLoading,
  loadError: state.folders.error,
  foldersWatcher: state.folders.folders,
  headFolderId: !state.folders.isLoading && localStorage.getItem('headFolderId')
});

export default connect(mapStateToProps, { connectToHeadFolder, createAndConnectHeadFolder })(Home);
