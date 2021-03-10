import React, { Component } from 'react';
import DriverPerformance from './../shared/DriverPerformance';

class Carousel extends Component {

    render() {

        return (
            <div id="myCarousel" className="carousel slide" data-ride="carousel" data-interval="6000">
                <ol className="carousel-indicators carousel-down">
                    <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                    <li data-target="#myCarousel" data-slide-to="1"></li>
                    <li data-target="#myCarousel" data-slide-to="2"></li>
                    <li data-target="#myCarousel" data-slide-to="3"></li>
                </ol>
                <div className="carousel-inner" role="listbox">
                    <div className="item active">
                        <DriverPerformance  />
                    </div>
                    <div className="item">
                        <DriverPerformance  />
                    </div>
                    <div className="item">
                        <DriverPerformance />
                    </div>
                    <div className="item">
                        <DriverPerformance />
                    </div>
                </div>
                <div className="">
                    <a className="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
                    </a>
                    <a className="right carousel-control" href="#myCarousel" role="button" data-slide="next">
                    </a>
                </div>
            </div>
        );
    }
}

export default Carousel;