import React, {Component} from 'react';

export default class Media extends Component {
  render() {
    return(
        <div className="row">
            <div className="col-md-12 col-lg-12 col-sm-12">
                <div className="panel panel-default">
                    <div className="panel-body main-body-height">
                        <div className="col-md-10 col-lg-10 col-sm-10 col-xs-10" style={{ marginLeft: '20px', textAlign: 'center' }}>
                            <p style={{ marginTop: '40px', fontSize: '30px', color: 'red' }}> Comming Soon...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}
