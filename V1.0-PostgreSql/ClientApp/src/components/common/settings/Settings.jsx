import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import './settings.css';

export default class Settings extends Component {
  render() {
    return (<div className="inner-view settings">
      <div className="container-fluid">
        <div className="row">
          <i className="fa fa-cog"></i>
          <h4>SETTINGS</h4>
        </div>
        <div className="row links">
          <div className="col-md-4">
            <Link to={'/language-input-tools'}>
              Language & Input tools
            </Link>
          </div>
          <div className="col-md-4">
            <Link to={'/language-input-tools'}>
              Device Activity and Notifications
            </Link>
          </div>
          <div className="col-md-4">
            <Link to={'/language-input-tools'}>
              Delete your account or services
            </Link>
          </div>
          <div className="col-md-4">
            <Link to={'/language-input-tools'}>
              Location Info
            </Link>
          </div>
          <div className="col-md-4">
            <Link to={'/language-input-tools'}>
              Delete your account or services
            </Link>
          </div>
          <div className="col-md-4">
            <Link to={'/language-input-tools'}>
              Delete your account or services
            </Link>
          </div>
          <div className="col-md-4">
            <Link to={'/language-input-tools'}>
              Account History
            </Link>
          </div>
          <div className="col-md-4">
            <Link to={'/language-input-tools'}>
              Edit Dashboard
            </Link>
          </div>
          <div className="col-md-4">
            <Link to={'/language-input-tools'}>
              Accessibility
            </Link>
          </div>
          <div className="col-md-4">
            <Link to={'/language-input-tools'}>
              Security Info
            </Link>
          </div>

          <div className="col-md-4">
            <Link to={'/companies'}>
              Companies
            </Link>
          </div>
        </div>
      </div>
    </div>)
  }
}
