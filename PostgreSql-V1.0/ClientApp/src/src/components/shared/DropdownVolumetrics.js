import React, {Component} from 'react';
import BarChartVolumetrics from './BarChartVolumetrics';
import PieChartVolumetrics from './PieChartVolumetrics';
import LineChartVolumetrics from './LineChartVolumetrics';

class DropdownVolumetrics extends Component {
    displayName = DropdownVolumetrics.name

    state = {
        selectValue: 'Radish'
    }

    handleChange = (e) => {
        this.setState({selectValue: e.target.value});
    }

    _renderSubComp() {
        switch (this.state.selectValue) {
            case 'mango':
                return <div className="slidebottom"><BarChartVolumetrics/></div>
            case 'orange':
                return <div className="slidebottom"><PieChartVolumetrics/></div>
            case 'apple':
                return <div className="slidebottom"><LineChartVolumetrics/></div>
            default:
                return <div className="slidebottom"><BarChartVolumetrics/></div>
        }
    }

    render() {
        let message = this._renderSubComp();

        return (
            <div>
                <div>
                    <div className="chart-size">
                        <div className={(localStorage.getItem('selectedLanguageCode') == 2) ? "btn-group pull-left" : "btn-group pull-right"}>
                            <select
                                value={this.state.selectValue}
                                onChange={this.handleChange}
                                className="selectpicker pull-right" data-width="180px" data-height="30px">
                                <option value="mango" data-content="<span class='select-picker-font-size'>Bar Chart</span>">Bar Chart</option>
                                <option value="orange" data-content="<span class='select-picker-font-size'>Pie Chart</span>">Pie Chart</option>
                                <option value="apple" data-content="<span class='select-picker-font-size'>Line Chart</span>">Line Chart</option>
                            </select>
                        </div>
                    </div>
                </div><br/>
                <div>{message}</div>
            </div>
        );
    }
}

export default DropdownVolumetrics;
