import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Carousel extends Component {
    render() {
        return (
    <div id="myCarousel" className="carousel slide" data-ride="carousel" data-interval="6000">
        <ol className="carousel-indicators carousel-down">
            <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
            <li data-target="#myCarousel" data-slide-to="1"></li>
            <li data-target="#myCarousel" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner" role="listbox">
                <div className="item active">
                    <div>
                        <div className="fines"><i className="far fa-file-alt"></i> </div>        
                         <br />
                        <div className="speech-bubble-top" role="option"> GL 05 GFD Fined £200<br /> Mr Sam Hussien<br /> Issued on 03/08/2017</div>    
                    </div>
                </div>
                <div className="item">
                <div>
                        <div className="fines"><i className="far fa-file-alt"></i> </div>        
                        <br />
                        <div className="speech-bubble-top" role="option"> GL 05 GFD Fined £200<br /> Mr Sam Hussien<br /> Issued on 03/08/2017</div>    
                    </div>
                </div>
                <div className="item">
                <div>
                        <div className="fines"><i className="far fa-file-alt"></i> </div>        
                        <br />
                        <div className="speech-bubble-top" role="option"> GL 05 GFD Fined £200<br /> Mr Sam Hussien<br /> Issued on 03/08/2017</div>    
                    </div>
                </div>          
        </div>
        <a className="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
        </a>
        <a className="right carousel-control" href="#myCarousel" role="button" data-slide="next">
        </a>
    </div>
        )
    }
}
