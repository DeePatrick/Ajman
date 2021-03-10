import React, { Component } from 'react';




class SearchResults extends Component {
    displayName = SearchResults.name
    constructor(props) {
        super(props);
        this.state = { name:'', custList: [], loading: true, singleCus:[] };

        fetch('api/Customers/')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    custList: data,
                    loading: false
                });
            });
    }


    handleClick(index) {
        console.log('this click', index);
        this.setState({
            singleCus: index
        });
      }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderVehicleList(this.state.custList);

        return (     
                    <div className="panel">{/* panel */}
                        <div className="panel-body">
                            {contents}
                        </div>
                    </div>
        );
    }


    // Returns the HTML table to the render() method.
    renderVehicleList(custList) {
        return (
            <content>
                {custList.map(cus =>
                    <div className="row" key={cus.id}>
                        <div className="col-md-2 col-lg-2 col-sm-1 col-xs-1">
                          
                                <span className='pics' onClick={ this.handleClick.bind(this, cus)}>
                                <img id="icon-pics" src={cus.photo} className="img-circle" alt="woman" height="45" width="45" />
                                </span>
                          
                        </div>

                        <div className="col-md-10 col-lg-10 col-sm-11 col-xs-11 ">
                            <div className="speech-bubble-left">
                                <span onClick={ this.handleClick.bind(this, cus)}>{cus.name}  {cus.surname} </span>
                                    <span onClick={ this.handleClick.bind(this, cus)}  className="pull-right"><i id="scaled-arrow" className="fa fa-arrow-right"></i></span>

                            </div>
                        </div>
                        <br/>
                    </div>
                )}
            </content>


        );
    }
}

export default SearchResults;
