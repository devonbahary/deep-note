import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { connectToHeadFolder } from '../actions/folders';
import LoadError from './LoadError';
import LoadingSpinner from './Loading';

class Home extends React.Component {
  componentDidMount() {
    this.props.connectToHeadFolder();
  }

  promptBegin = () => {
    const name = prompt('Give a name to your first folder.');
    if (name) this.props.connectToHeadFolder(name);
  };

  render() {
    const { headFolderId, isError, isLoading } = this.props;
    
    if (headFolderId) return (<Redirect to={`/folders/${headFolderId}`} />);
    let bodyContents;
    if (isError) {
      bodyContents = (<LoadError />);
    } else if (isLoading) {
      bodyContents = (<LoadingSpinner />);
    } else {
      bodyContents = (
        <div className="Home__button" onClick={this.promptBegin}>
          <i className="far fa-folder"></i>
        </div>
      );
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
  isError: state.folders.error,
  headFolderId: !state.folders.isLoading && localStorage.getItem('headFolderId')
});

export default connect(mapStateToProps, { connectToHeadFolder })(Home);
