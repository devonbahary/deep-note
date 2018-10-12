import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { setHeadFolderId } from '../actions/local';
import Home from '../components/Home';
import Folder from '../components/Folder';
import Note from '../components/Note';
import AppFooter from '../components/AppFooter';

class AppRouter extends React.Component {
  componentDidMount() {
    const headFolderId = localStorage.getItem('headFolderId');
    if (headFolderId) {
      this.props.setHeadFolderId(headFolderId);
    }
  };

  render() {
    return (
      <BrowserRouter>
        <main id="Page">
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/folders/:folderId/notes/:id' exact component={Note} />
            <Route path='/folders/:id' exact component={Folder} />
          </Switch>
          {/* <AppFooter /> */}
        </main>
      </BrowserRouter>
    );
  }
};

export default connect(undefined, { setHeadFolderId })(AppRouter);

