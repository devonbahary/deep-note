import React from 'react';
import { connect } from 'react-redux';

const LoadError = ({ loadError }) => (
  <div className="LoadError">
    <i className="fas fa-exclamation-triangle"></i>
    <span className="LoadError__status">{loadError.status}</span>
    <span className="LoadError__statusText">{loadError.statusText}</span>
  </div>
);

const mapStateToProps = state => ({
  loadError: state.folders.error || state.notes.loadError
});

export default connect(mapStateToProps)(LoadError);