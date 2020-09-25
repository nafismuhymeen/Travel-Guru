import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'
import './Home.css';
import { useHistory } from 'react-router-dom';


const Home = (props) => {
    let history = useHistory()
    function handleClickBooking(id) {
        history.push(`/booking/${id}`)
      }

    return (
        <div className="home">
            <div className="home__carousel">
                <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active carousel__card">
                            <div className="slider">
                                <div className="slider__details">
                                    <h1>{props.places[0].destination}</h1>
                                    <p>{props.places[0].description}</p>
                                    <button style={{zIndex:10, position:"relative"}} onClick={()=>handleClickBooking(props.places[0].id)} className="btn btn-warning">Booking <FontAwesomeIcon icon={faLongArrowAltRight} /></button>
                                </div>
                                <div className="slider__img">
                                    <img src={props.places[0].destinationPhoto} className="d-block w-100" alt="..."></img>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item carousel__card">
                            <div className="slider">
                                <div className="slider__details">
                                    <h1>{props.places[1].destination}</h1>
                                    <p>{props.places[1].description}</p>
                                    <button style={{zIndex:10, position:"relative"}} onClick={()=>handleClickBooking(props.places[1].id)} className="btn btn-warning">Booking <FontAwesomeIcon icon={faLongArrowAltRight} /></button>
                                </div>
                                <div className="slider__img">
                                    <img src={props.places[1].destinationPhoto} className="d-block w-100" alt="..."></img>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item carousel__card">
                            <div className="slider">
                                <div className="slider__details">
                                    <h1>{props.places[2].destination}</h1>
                                    <p>{props.places[2].description}</p>
                                    <button style={{zIndex:10, position:"relative"}} onClick={()=>handleClickBooking(props.places[2].id)} className="btn btn-warning">Booking <FontAwesomeIcon icon={faLongArrowAltRight} /></button>
                                </div>
                                <div className="slider__img">
                                    <img src={props.places[2].destinationPhoto} className="d-block w-100" alt="..."></img>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Home;