import React from 'react';
import { Link } from 'react-router-dom';
import LoadError from './LoadError';

const NotFoundPage = () => (
  <div className="NotFoundPage">
    <LoadError loadError={{ status: '404', statusText: 'We couldn\'t find the page you were looking for.' }} />
    <Link to='/' className="NotFoundPage__footerLink">
      <i className="far fa-folder"></i>
    </Link>
  </div>
);

export default NotFoundPage;