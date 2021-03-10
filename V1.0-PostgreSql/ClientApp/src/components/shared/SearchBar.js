import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class SearchBar extends Component {

    render() {
        return (
            <div className="panel panel-default">
            <div className="panel-body">
                <div>
                    <input
                        type="text"
                        className="form-control-search"
                        placeholder="Search ..."
                        // value={this.state.search}
                        // onChange={this
                        // .updatesearch
                        // .bind(this)}
                        />

                    <span className="btn-search-edit">
                        <button type="button">
                            <i className="glyphicon glyphicon-search btn-search"/>
                        </button>
                        <button
                            type="button"
                            className="leftborder"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false">
                            
                            <span>
                            <i className="fa fa-chevron-down"></i>
                            </span>
                        </button>
                        
                    </span>
                </div>

            </div>
        </div>

        );
    }
}
export default connect()(SearchBar);