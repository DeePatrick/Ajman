import React, { Component } from 'react';
import axios from 'axios';
import * as config from '../../../config';


import { setTranslations, setDefaultLanguage, translate } from 'react-multi-lang';
import en from '../../../language/static_content_english_cust';
import ar from '../../../language/static_content_arabic_cust';
import type { T } from 'react-multi-lang';
import { setLanguage, getLanguage } from 'react-multi-lang';


type Props = {
    t: T
}

setTranslations({ ar, en });
setDefaultLanguage('en');

class LanguageChange extends Component {
    constructor(props) {
        super(props);

        this.state = {
            langcode: 0,
            langid: 0,
            userDetails: {},
            langList: []
        };
    }

    componentWillMount() {
        fetch(config.webApiUrl() + 'aptc_getCommonMasters/1/26')
            .then(response => response.json())
            .then(data => {
                this.setState({ loading: false });
                if (data[0].commonmasterid !== undefined) {
                    this.setState({ langList: data });
                    localStorage.setItem('selectedLanguage', data[0].commonmasterid);
                }
                else {
                    alert(data);
                }
            }).catch((error) => {
                alert(error.message);
                this.setState({ loading: false });
            });


        let tempmatches = Object.assign({}, this.state.sendotps);
        if (localStorage.getItem('logTime') !== undefined) {
            var date = new Date(); // get current date
            var loginTime = new Date(localStorage.getItem('logTime'));
            loginTime = loginTime.getTime();
            var currentTime = date.getTime();
            if (loginTime > currentTime) {
                this.setState({ isSelectLang: false });
            }
            else {
                localStorage.clear();
                tempmatches.IsSuccess = false;
                this.setState({ isSelectLang: true, showing: true, isLogin: false, isSendOtp: false, isMatchOtp: false });
            }
        }
        else {
            localStorage.clear();
            tempmatches.IsSuccess = true;
            this.setState({ isSelectLang: true });
        }
    
    }


    onContinue = (e) =>  {
        if (this.state.langid > 0) {
            this.setState({ isSelectLang: false });
            window.location.reload();
        }
        else {
            alert('please select language');
        }

    }

    onLangChange = (e)  => {
        this.setState({ langid: e.target.value });
        if (e.target.selectedIndex > 0) {
            localStorage.setItem('selectedLanguage', e.target.value);
            localStorage.setItem('selectedLanguageCode', this.state.langList[e.target.selectedIndex - 1].code);

            if (localStorage.getItem('selectedLanguageCode') == 2) { setLanguage('ar'); }
            else { setLanguage('en'); }

            window.location.reload();
        }
    }



    render() {
        console.log(this.state.langList);
        return (
            <div
                className="modal fade"
                id="languageChangeModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="languageChangeModalLabel">
                <div className="modal-dialog modal-xl" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>

                        </div>
                        <form name="form" onSubmit={this.onSubmit}>
                            <div className="modal-body">
                                <div className="container-fluid">
                                    <div className="form-group center">
                                        <select className="edit-form" required value={this.state.langid} onChange={this.onLangChange}>
                                            <option value="" data-content="<span class='select-picker-font-size  select-picker-bg'>Select Language</span>">Select Language</option>
                                            {this.state.langList.map((lang, index) => <option style={{ color: '#000!important' }} key={index} value={lang.commonmasterid}>{lang.name}</option>)}
                                        </select><br />
                                        <button style={{ marginTop: '20px' }} onClick={this.onContinue} type="button" className="btn btn-primary">Continue</button>
                                    </div>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        );
    }

}

export default LanguageChange;
