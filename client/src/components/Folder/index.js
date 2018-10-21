import React from 'react';
import { connect } from 'react-redux';
import { getFolder } from '../../actions/folders';
import { didRedirectToNewNote } from '../../actions/notes';
import { Redirect } from 'react-router';
import ColorPicker from './ColorPicker';
import FolderChildAction from './FolderChildAction';
import FolderContents from './FolderContents';
import FolderHeader from './FolderHeader';
import HeadFolderModal from './HeadFolderModal';
import LoadError from '../LoadError';
import LoadingSpinner from '../Loading';


class Folder extends React.Component {
  componentDidMount() {
    if (!this.props.folder) this.props.getFolder(this.props.id);
  }

  componentDidUpdate() {
    if (!this.props.folder && !this.props.error) this.props.getFolder(this.props.id);
  }

  render() {
    const { folder, isLoading, error, newNoteId } = this.props;
    let bodyContents;
    if (error && error.status === 404) {
      bodyContents = (<Redirect to='/not-found' />)
    } else if (error) {
      bodyContents = (<LoadError />);
    } else if (isLoading) {
      bodyContents = <LoadingSpinner />;
    } else if (folder) {
      bodyContents = <FolderContents folder={folder} />;
    }

    if (newNoteId) {
      setTimeout(() => this.props.didRedirectToNewNote(), 100); // was causing "re-render" warnings
      return (
        <Redirect to={`/folders/${folder._id}/notes/${newNoteId}`} />
      );
    }

    return (
      <div className="Folder">
        <FolderHeader folder={folder} />
        <div className="Folder__body">
          {bodyContents}
        </div>
        <ColorPicker />
        <HeadFolderModal />
        <FolderChildAction parentFolder={folder} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const folder = state.folders.folders.find(folder => folder._id === id);
  const newNoteId = state.notes.newNoteId;
  const { error } = state.folders;
  const isLoading = state.folders.isLoading || state.notes.isLoading;
  return { id, folder, isLoading, error, newNoteId };
};

export default connect(mapStateToProps, { getFolder, didRedirectToNewNote })(Folder);