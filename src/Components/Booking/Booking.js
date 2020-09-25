import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './Booking.css';



const Booking = (props) => {
    const { destinationId } = useParams();
    console.log(destinationId)


const [fromDate, setFromDate] = useState(null);
const [toDate, setToDate] = useState(null);

const history = useHistory();

const handleBooking = ()=>{
    history.push(`/hotels/${props.place[destinationId].destination}`);
}


return (
    <div className="booking">
        <div className="booking__emptyTop"></div>
        <div className="booking__content">
            <div className="booking__placeDescription">
                <h1>{props.place[destinationId].destination}</h1>
                <p>{props.place[destinationId].description}</p>
            </div>
            <div className="booking__form">
                <p style={{ marginTop: "27px" }}>Origin</p>
                <input className="booking__input" type="text" />
                <p style={{ marginTop: "13px" }}>Destination</p>
                <input value={props.place[destinationId].destination} className="booking__input" type="text" />
                <div className="booking__datePicker">
                    <div>
                        <p>From</p>
                        <DatePicker className="booking__datePickerFrom" dateFormat="dd/MM" selected={fromDate} onChange={date =>setFromDate(date)} minDate= {new Date()} peekNextMonth="dd/MM" />
                        <CalendarTodayIcon className="calanderFrom"></CalendarTodayIcon>
                    </div>
                    <div>
                        <p style={{marginLeft:"17px"}}>To</p>
                        <DatePicker className="booking__datePickerTo" dateFormat="dd/MM" selected={toDate} onChange={date =>setToDate(date)} minDate= {new Date()} peekNextMonth="dd/MM" />
                        <CalendarTodayIcon className="calanderTo"></CalendarTodayIcon>
                    </div>
                </div>
                <button onClick={handleBooking} className="booking__startBooking">Start Booking</button>
            </div>
        </div>
        <div className="booking__emptyBottom"></div>
    </div>
);
};

export default Booking;