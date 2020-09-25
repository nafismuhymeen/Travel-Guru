import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData2';
import './Hotels.css';
const Hotels = () => {
    const [hotel, setHotel] = useState(fakeData);
    const {place} = useParams()

    return (
        
            <div className="hotels">
                <div style={{height:"157px"}}></div>
                <h1>Stay In {place}</h1>
                {
                    hotel.map(hotel => 
                        <div className="hotels__details">
                        <div className="hotels__details__img">
                            <img style={{width:"270px"}} src={hotel.hotelPhoto} alt="" />
                        </div>
                        <div className="hotels__details__details">
                            <h5>{hotel.hotelName}</h5>
                            <h6>Price: ${hotel.price}/night</h6>
                        </div>
                       
                    </div>
                    )
                }

            </div>
        
    );
};

export default Hotels;