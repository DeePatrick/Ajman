import React, { Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import Layout from './components/Layout';
import Home from './components/common/home/Home';
import Location from './components/common/location/Location';
import Enquiry from './components/common/enquiry/Enquiry';
import Search from './components/common/search/Search';
import Settings from './components/common/settings/Settings';
import Vehicles from './components/vehicle/Vehicles';
import Company from './components/company/Company';
import HomePageFront from './components/front-office/HomePageFront';
import HomePageBack from './components/back-office/HomePageBack';
import HomePageCallCenter from './components/call-center/HomePageCallCenter';
import HomePageFrontCustomerRep from './components/front-customer-rep/HomePageFrontCustomerRep';
import HomePageFrontWaitingCustomer from './components/front-waiting-cust/HomePageFrontWaitingCustomer';
import Users from './components/users/Users';
import Individuals from './components/individuals/Individuals';
import NotFound from './components/NotFound';
import PermitRequestList from './components/common/permit/PermitRequestList';
import IndividualSeeMore from './components/individuals/IndividualSeeMore';
import DriverPerformanceDetail from './components/drivers/DriverPerformanceDetail';
import People from './components/people/People';
import MyAccount from './components/people/MyAccount';
import IndividualCompanies from './components/company/IndividualCompanies';
import CompanyVehicles from './components/vehicle/Vehicles';
import CompanyPermitRequestList from './components/common/permit/CompanyPermitRequestList';
import RolePermissions from './components/landing/roles/RolePermissions';
import PermitTab from './components/common/permit/PermitTab';
//import PermitEnquiry from './components/common/permit/PermitEnquiry';
import PermitApproval from './components/common/permit/PermitApproval';
import CompanyTab from './components/company/CompanyTab';
import VehicleTab from './components/vehicle/VehicleTab';
import VehicleApproval from './components/vehicle/VehicleApproval';

export default class App extends Component {
    displayName = App.name
    render() {
        return (
            <Layout>
                <Switch>
                    <Route path='/permissions' component={RolePermissions} />
                    <Route path='/company-permits-requests-list' component={CompanyPermitRequestList} />
                    <Route path='/permittab' exact component={PermitTab} />
                    <Route path='/permitapproval' exact component={PermitApproval} />
                    <Route path='/companytab' exact component={CompanyTab} />
                    <Route path='/vehicletab' exact component={VehicleTab} />
                    <Route path='/vehicleapproval' exact component={VehicleApproval} />
                    <Route path='/enquiry' component={Enquiry} />
                    <Route path='/search' component={Search} />
                    <Route path='/settings' component={Settings} />
                    <Route path='/location' component={Location} />
                    <Route path='/see-more' component={IndividualSeeMore} />
                    <Route path='/front-office/home' component={HomePageFront} />
                    <Route path='/back-office/home' component={HomePageBack} />
                    <Route path='/call-center/home' component={HomePageCallCenter} />
                    <Route path='/front-office-wc/home' component={HomePageFrontWaitingCustomer} />
                    <Route path='/front-office-cr/home' component={HomePageFrontCustomerRep} />
                    <Route path='/car-track/drivers' component={DriverPerformanceDetail} />
                    <Route path='/users' component={Users} />
                    <Route path='/employees' component={Individuals} />
                    <Route path='/vehicles' component={Vehicles} />
                    <Route path='/company-vehicles' component={CompanyVehicles} />
                    <Route path='/individual-company' component={IndividualCompanies} />
                    <Route path='/company' render={(props) => <Company sortBy="newest" {...props} />} />
                    <Route path='/people' component={People} />
                    <Route path='/my-account' component={MyAccount} />                
                    <Route path='/' exact component={Home} />
                    <Redirect to="/not-found" />
                    <Route path='/not-found' component={NotFound} />
                </Switch>
            </Layout>
        );
    }
}



