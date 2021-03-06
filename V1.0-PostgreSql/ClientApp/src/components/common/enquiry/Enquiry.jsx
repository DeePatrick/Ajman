import React, {Component} from 'react';

import EnquiryListItem from './EnquiryListItem/EnquiryListItem';

import './enquiry.css';

export default class Enquiry extends Component {
  state = {
    enquiries:[
      {
        icon:"fa fa-exclamation-circle",
        enquiryDetails:"KG05LHX - Nissan Micra K12 2005-2010"
      },
      {
        icon:"fa fa-exclamation-circle",
        enquiryDetails:"ML62GHG - Vauxhall Astra SE 2017"
      },
      {
        icon:"fa fa-exclamation-circle",
        enquiryDetails:"LG62HJL - Fiat 500 2015-2017"
      },
      {
        icon:"fa fa-exclamation-circle",
        enquiryDetails:"LG67DFL - Nissan Juke 2015-2017"
      },
    ]
  }

    render() {
        return (
            <div className="inner-view inquiriy">
              <div className="container-fluid">

                <div className="row">
                    <i className="fa fa-exclamation-circle"></i>
                    <h4>ENQUIRIES</h4>
                    <h5>REGISTER NEW ENQUIRY</h5>
                </div>

                <div className="row">
                  <div className="col-lg-5 left">
                    <div className="list">
                      <ul>
                        {
                          this.state.enquiries.map((enquiry, index) => {
                            return (
                              <EnquiryListItem key={index} enquiry={enquiry} />
                            )
                          })
                        }
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-7 right">
                    <div className="company-result">
                      <i className="fa fa-exclamation-circle"></i>
                      <p>Please select an enquiry</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
        )
    }
}
