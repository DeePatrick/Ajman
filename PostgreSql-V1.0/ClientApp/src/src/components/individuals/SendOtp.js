import React, { Component } from 'react';
import * as config from '../../../config';
export default class SendOtp extends Component {

    displayName = SendOtp.name;

    constructor(props) {
        super(props)

        this.handleSave = this
            .handleSave
            .bind(this);

        this.state = {
            keyID: '',
            language: 'English'
        };
            this.onChange = this
                .onChange
                .bind(this);

            this.onSubmit = this
                .onSubmit
                .bind(this);

            fetch("https://gist.githubusercontent.com/Goles/3196253/raw/9ca4e7e62ea5ad935bb3580dc0a" +
            "07d9df033b451/CountryCodes.json")
            .then(response => response.json())
            .then(data => {
                this.setState({ countryCodes: data, loading: false });
            });

    }
    onChange(e) {

        this.setState({
            [e.target.name]: e.target.value
        });
    }
    getIdForAuthentication(e) {
        this.setState({ loading: true, showing: false });
        var emiratesId = this.state.keyID;
        const url = config.webApiUrl() + 'aptc_sendotp/' + emiratesId;
        return fetch(url)
            .then(response => response.json())
            .then(data => {
                debugger;
                if (data.StatusCode !== null) {
                    this.setState({ loading: false, showing: false, emiratiDiv: true });
                    alert(data.ResponseMessage);
                }
                else {
                    this.setState({ optDetails: data, loading: false, showing: false, emiratiDiv: false });
                }
            })
            .then(setInterval(() => {
                () => { this.next(); }
            }, 3000))
            .then(this.next())
            .catch((error) => {
                this.setState({ loading: false, showing: false });
                console.log("Fail:" + error.response.data.ResponseMessage);
            });

    }

    next() {
        console.log('fired');
        var optdetails = this.state.optDetails
        if (optdetails.Id !== "") {
            console.log(optdetails.Id)
            document
                .getElementById("hiddenbutton")
                .click();
        } else {
            return (
                <h1>This Id does not exist</h1>
            );
        }

    };

    handleSave() {
        const item = this.state;
        this.props.saveModalDetails(item, 'add');
    }
    render() {
        const { email, password, events } = this.state;
        const { showing } = this.state;
        console.log(showing);
        return (
            <div id="background">
                <form onSubmit={this.handleSubmit}>
                    <div className="center">
                        <span>
                            <p><br />
                                You will need an Emirates ID to register
                                                                    </p>
                        </span>
                        <br />
                        <div className="form-group">
                            <div className="bordered-loginbar ">
                                <input
                                    type="text"
                                    value={this.state.keyID}
                                    name="keyID"
                                    onChange={this.onChange}
                                    className="form-control myformcontrol center "
                                    aria-describedby="emailHelp"
                                    placeholder="Enter Emirati ID Number" />
                            </div>
                        </div>
                        <br />
                        <div className="center">or</div>
                        <div>
                            <button type="button" className="btn btn-primary">Scan Emirati ID Card</button>
                        </div>
                        <br />
                        <img
                            className="padding-icon"
                            src={require('../../assets/Emirates_ID.png')}
                            width="180"
                            alt="logo" />
                        <br /><br />
                        <button
                            id="hiddenbutton" style={
                                { display: 'none' }
                            }
                            type="button"
                            className="btn btn-primary"
                            onClick={() => this.setState({
                                showing: !showing
                            })}>continue</button>

                        &nbsp;

                                                                <button
                            type="button"

                            className="btn btn-danger"
                            onClick={this
                                .getIdForAuthentication
                                .bind(this, this.state.keyID)}>Continue</button>
                        <br />
                        <br /><br /><br />
                    </div>
                </form>
            </div>
        );
    }
}
