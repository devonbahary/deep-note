import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../components/Home';
import Folder from '../components/Folder';
import Note from '../components/Note';
import AppFooter from '../components/AppFooter';
import NotFoundPage from '../components/NotFoundPage';

const AppRouter = () => (
  <BrowserRouter>
    <main id="Page">
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/folders/:folderId/notes/:id' exact component={Note} />
        <Route path='/folders/:id' exact component={Folder} />
        <Route component={NotFoundPage} />
      </Switch>
      {/* <AppFooter /> */}
    </main>
  </BrowserRouter>
);

export default AppRouter;

