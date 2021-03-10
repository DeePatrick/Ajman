import React, { Component } from 'react';


class StaffDetail extends Component {

    constructor() {
        super();
        this.state = { comList: [], loading: true };

        fetch('api/Staffs/1')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    comList: data,
                    loading: false
                });
            });
    }
    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderStaffDetailTable(this.state.comList);

        return (
            <div className="panel">{/* panel */}
                <div className="panel-heading">
                   
                </div>

                <div className="panel-body">
                    <div> {contents}</div>
                    <div className="center-twin-buttons">
                        <button class="black-margin" ><i className="fa fa-copy"> </i> Scan </button>
                        <button class="black-margin" ><i className="fa fa-edit"> </i> Message </button>
                    </div>
<br/>
                    <div className="center-twin-buttons">
                        <button class="red-end-session-button" > End Session <span>00:00:59</span></button>
                    </div>
                </div>
            </div>

        );
    }


    // Returns the HTML table to the render() method.
    renderStaffDetailTable(comList) {
        return <div>
            <ul className="company-logo">

            <li>Username : {comList.email}</li>
            <li>Password : **********</li>
            <br/>

            <li>Address</li>
            <li> {comList.address}</li>
            <li>D.O.B</li>
            <li>{comList.dob}</li>
            <br/>
            <li>{comList.phone}</li>

                {/* {comList.map(comp =>
                    <li key={comp.id}>
                        <span><i id="companylogo" className="fas fa-building"></i>{comp.name}</span>
                    </li>
                )} */}
            </ul>
        </div>;
    }


}

export default StaffDetail;
