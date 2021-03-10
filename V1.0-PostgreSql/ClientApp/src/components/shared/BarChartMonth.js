import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';

class BarChartMonth extends Component {
    constructor(props) {

        super(props);
        this.state = {
            chartData: {
                labels: [
                    'Jan', 'Feb', 'Mar'
                ],
                datasets: [
                    {
                        label: [
                            'Parking Fines' ,'Traffic Violations' ,'Public Transport'
                        ],
                        data: [
                            32, 65, 68
                        ],
                        backgroundColor: [
                            '#9f8865', '#9f8865', '#9f8865'
                        ],
                        options: {
                            scales: {
                                xAxes: [
                                    {
                                        barThickness: 20,
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
        }
    }
    render() {
        return (
            <div className="row penaltypayment-barchart-container">
                            <Bar
                                data={this.state.chartData}
                                options={{
                                maintainAspectRatio: false
                            }}/>
                        </div>

        );
    }
}

export default BarChartMonth;