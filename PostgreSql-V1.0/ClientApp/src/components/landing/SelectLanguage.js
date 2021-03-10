import React, { Component } from 'react';
import LanguageDropdown from './../login/LanguageDropdown';



class SelectLanguage extends Component {
    displayName = SelectLanguage.name

    state = {
        language: true,
        parent: false
    }


    switch = (word) => {
        var language, parent;
        if (word === "language") {
            language = true;
            parent = false;
        }
        else {
            parent = true;
            language = false;
        }
        return this.setState({
            parent: parent,
            langauage: language
        });

    };

    render() {
        return (
            <div>
                <div className={this.state.language ? "" : "hide"}>
                    <div id="background" className="col-md-6">
                        <LanguageDropdown />
                        <div className={this.state.parent ? "hidden" : "mid-screen center"} onClick={this.switch.bind(null, 'parent')}>
                            <button
                                style={{
                                    marginLeft: '25px'
                                }}
                                className="btn btn-create">Select Language</button>
                        </div>
                    </div>
                    
                </div>
                
               
            </div >

        );
    }
}
export default SelectLanguage;