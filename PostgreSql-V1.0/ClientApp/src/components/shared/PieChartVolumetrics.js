import React, {Component} from 'react';
import {Pie} from 'react-chartjs-2';

class PieChartVolumetrics extends Component {
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
                        borderColor: [
                            "#E9DAC6", "#CBCBCB", "#D88569", "#E4CDA2", "#89BC21"
                        ],
                        borderWidth: [
                            1, 1, 1, 1, 1
                        ],
                        options: {
                            responsive: true,
                            title: {
                                display: true,
                                position: "top",
                                text: "Pie Chart",
                                fontSize: 18,
                                fontColor: "#111"
                            },
                            legend: {
                                display: true,
                                position: "bottom",
                                labels: {
                                    fontColor: "#333",
                                    fontSize: 16
                                }
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
                            <Pie
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

export default PieChartVolumetrics;