/* eslint-disable react/prop-types */
import { createContext, useState } from "react";


export const GetCurrentLocationContext = createContext();

export const CurrentLocationProvider = ({children}) => {
    const [coordinates, setCoordinates] = useState({ "latitude": "", "longitude": ""});
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const handleGetLocation = () => {
        //Pops up prompt for allowing App to get user's current location
        navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
        enableHighAccuracy: true
        })
    }
        
    const successLocation = (position) => {
        //Set state of coordinates when Allow current location is accepted
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        if (longitude && latitude) {
        setCoordinates({"latitude": latitude, "longitude": longitude});
        } 
    }

    const errorLocation = (error) => {
        /*handles an error with getting current location,
        or user disagrees to allow App to get user's current Location.*/
        console.log(error) //test
    }
    return (
        <GetCurrentLocationContext.Provider value={{coordinates, handleGetLocation}}>
            {children}
        </GetCurrentLocationContext.Provider>
    )
}