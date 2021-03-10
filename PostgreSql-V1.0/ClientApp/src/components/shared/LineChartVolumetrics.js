import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';

class LineChartVolumetrics extends Component {
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
                            '#f9000'
                        ],
                        fill: false, 
                        lineTension:0, 
                        options: {
                            scales: {
                                xAxes: [
                                    {
                                        LineThickness: 20,
                                        categorySpacing: 10,
                                        gridLines: {
                                            offsetGridLines: true
                                        }
                                    }
                                ]
                            }
                        }
                    }
                ]
            }
        };
    }
    render() {
        return (
            <div className="panel-heading">
                <div className="">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <Line
                                data={this.state.chartData}
                                options={{
                                maintainAspectRatio: true
                            }}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LineChartVolumetrics;