import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';

class BarChartVolumetrics extends Component {
    constructor(props) {

        super(props);
        this.state = {
            chartData: {
                labels: [
                    'Vehicles',
                    'Individuals',
                    'Companies',
                    'App Users',
                    'Web Users',
                    'Franchise Users'
                ],
                datasets: [
                    {
                        label: 'volumetrics',
                        data: [
                            32,
                            95,
                            42,
                            63,
                            90,
                            41
                        ],
                        backgroundColor: [
                            '#e7e7e7',
                            'e4e4e4',
                            '#333333',
                            '#f7931e',
                            '#a0a0a0',
                            '#ae874c'
                        ],
                        options: {
                            scales: {
                                xAxes: [{
                                    scaleLabel: {
                                        display: false
                                    },
                                    ticks: {
                                        display: false 
                                    },
                                    display:false
                                }]
                            }
                        }
                    }
                ]
            }
        };
    }


    componentDidMount() {
      
    }

    render() {
        return (
            <div className="panel-heading">
                <div className="">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <br/>
                            <Bar
                                data={this.state.chartData}
                                options={{
                                    legend: {
                                        display: false
                                    },
                                    scales: {
                                        xAxes: [{
                                            ticks: {
                                                display: false 
                                            }
                                        }]
                                    }
                            }}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BarChartVolumetrics;