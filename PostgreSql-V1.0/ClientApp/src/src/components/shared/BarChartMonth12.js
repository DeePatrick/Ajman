import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

class BarChartMonth12 extends Component {
    constructor(props) {

        super(props);
        this.state = {
            chartData: {
                labels: [
                    'J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D',
                ],
                datasets: [
                    {
                        label: '',
                        data: [
                            32, 65, 48, 32, 65, 70, 62, 65, 58, 32, 30, 68,
                        ],
                        backgroundColor: [
                            '#9f8865', '#9f8865', '#9f8865', '#9f8865', '#9f8865', '#9f8865', '#9f8865', '#9f8865', '#9f8865', '#9f8865', '#9f8865', '#9f8865'
                        ],
                        options: {
                            scales: {
                                xAxes: [
                                    {
                                        barThickness: 20,
                                        categorySpacing: 2,
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
            <div className="">
                <Bar
                    data={this.state.chartData}
                    options={{
                        legend: {
                            display: false
                        },
                        maintainAspectRatio: false
                    }} />
            </div>
        );
    }
}

export default BarChartMonth12;