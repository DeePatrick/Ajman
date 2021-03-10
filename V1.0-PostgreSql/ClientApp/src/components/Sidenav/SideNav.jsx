import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './sidenav.css';

 export default class SideNav extends Component {
  // displayName = SideNav.name;
  render() {
    return (
      <div className="sidebar-fixed-left">
            <ul className="sidebar-nav">

                <NavLink to={'/'}  id="icorn-home" className="icorns">
                      <i className="fa fa-home"></i>
                      <span className="icorn-text">HOME</span>
                </NavLink>


                {/*<NavLink to={'/location'} id="icorn-location" className="icorns">
                      <i className="fa fa-map-marker"></i>
                      <span className="icorn-text">LOCATION</span>
                </NavLink>*/}


                <NavLink to={'/register'}  id="icorn-car" className="icorns">
                    <i className="fa fa-car"></i>
                    <span className="icorn-text">REGISTERED VEHICLES</span>
                </NavLink>


                <NavLink to={'/employees'} id="icorn-circle" className="icorns">
                    <i className="fa fa-user-plus"></i>
                    <span className="icorn-text">EMPLOYEES</span>
                </NavLink>

                <NavLink to={'/enquiry'} id="icorn-circle" className="icorns">
                    <i className="fa fa-exclamation-circle"></i>
                    <span className="icorn-text">ENQUIRY</span>
                </NavLink>


                <NavLink to={'/permit'} id="icorn-ticket" className="icorns">
                    <i className="fa fa-ticket"></i>
                    <span className="icorn-text">PERMIT</span>
                </NavLink>


                <NavLink to={'/search'} id="icorn-search" className="icorns">
                    <i className="fa fa-search"></i>
                    <span className="icorn-text">SEARCH</span>
                </NavLink>


                <NavLink to={'/settings'} id="icorn-cog" className="icorns">
                    <i className="fa fa-cog"></i>
                    <span className="icorn-text">SETTINGS</span>
                </NavLink>

          </ul>
    </div>
  );
  }
}
