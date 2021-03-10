import React from 'react';
import {Route} from 'react-router';
import Layout from '../src/components/Login/Layout';
import Home from './components/Dashboard/Home';
//import VehicleHire from './components/common/vehiclehire/VehicleHire';
import Location from './components/Location/Location';
//import Register from './components/common/register/Register';
import Permit from './components/Permit/Permit';

import MyAccount from './components/Account/MyAccount';
//import Enquiry from './components/common/enquiry/Enquiry';
import Search from './components/common/search/Search';
import searchNav from './components/common/search/searchNav';
import Settings from './components/common/settings/Settings';
//import AddVehicle from './components/Vehicle/AddVehicle';
import Vehicles from './components/Vehicle/Vehicles';
//import AddCompany from './components/Company/AddCompany';
import Company from './components/Company/Company';
//import EditCompany from './components/Company/EditCompany';
//import SelectLanguage from './components/landing/SelectLanguage';
import HomePageFranchise from './components/franchise/HomePageFranchise';
//import CreateEmployee from './components/Employee/CreateEmployee';
import Employee from './components/Employee/Employee';
import Enquiry from './components/Enquiry/Enquiry';
//import EditEmployee from './components/Employee/EditEmployee';
//import EditVehicle from './components/vehicle/EditVehicle';

//import EnquiryAdmin from './components/common/enquiry/EnquiryAdmin';
//import PermitAdmin from './components/common/permit/PermitAdmin';
import AboutUs from './components/Header/HeaderMenuComponents/AboutUs/AboutUs';
import Services from './components/Header/HeaderMenuComponents/Services/Services';
import Contact from './components/Header/HeaderMenuComponents/Contact/Contact';
import Eparticipation from './components/Header/HeaderMenuComponents/Eparticipation/Eparticipation';
import Media from './components/Header/HeaderMenuComponents/Media/Media';
import OpenData from './components/Header/HeaderMenuComponents/OpenData/OpenData';
import RulesRegulations from './components/Header/HeaderMenuComponents/RulesRegulations/RulesRegulations';


export default() => (
    <Layout>
        <Route exact path='/' component={Home}/>
        <Route path='/permit' component={Permit}/>
        <Route path='/search' component={Search} />
        <Route path='/searchNav' component={searchNav} />
        <Route path='/settings' component={Settings}/>
        <Route path='/location' component={Location}/>
        <Route path='/franchise-office/home' component={HomePageFranchise}/>
        <Route path='/employee' component={Employee} />
        <Route path='/enquiry' component={Enquiry} />
        <Route path='/vehicles' component={Vehicles}/>
        <Route path='/myaccount' component={MyAccount} />
        <Route path='/company' component={Company} />
        <Route path='/AboutUs' component={AboutUs} />
        <Route path='/Services' component={Services} />
        <Route path='/Contact' component={Contact} />
        <Route path='/Eparticipation' component={Eparticipation} />
        <Route path='/Media' component={Media} />
        <Route path='/OpenData' component={OpenData} />
        <Route path='/RulesRegulations' component={RulesRegulations} />
    </Layout>

);
