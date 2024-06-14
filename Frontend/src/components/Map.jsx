import { useState, useEffect, useContext } from 'react';
import '../styles/Schedule.css'
import '../styles/Map.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useJsApiLoader, GoogleMap, DirectionsRenderer } from '@react-google-maps/api';
import { fetchRoute } from '../services/routePlannerservice';
import { usersData } from '../services/farmerService';
import '../styles/Schedule.css'
import { darkModeStyle } from '../mapStyles/GoogleMapDarkMode';
import { ThemeContext } from '../contexts/ThemeContext';

//Handles Map styles
const containerStyle = {
  width: '100%',
  height: '80%',
  "borderRadius": '15px',
  "marginRight": '40px'
};



//Coordinates of where the map initially loads up
const center = {
  lat: -33.963700,
  lng: 18.575237,
};

export default function Map() {
  const [map, setMap] = useState(null);
  const [farmNames, setFarmNames] = useState(['', '']);
  const [route, setRoute] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [numStops, setNumStops] = useState(0);
  const [addStop, setAddStop] = useState(false);
  const [removeStop, setRemoveStop] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [allNames, setAllNames] = useState([]);
  const [change, setChange] = useState(false);
  const { theme } = useContext(ThemeContext);



  useEffect(() => {
    //Requests and stores all farmer's information.
    const getFarmersInfo = async () => {
        try {
            const data = await usersData();
            setAllNames(data.data)
        } catch (error) {
            console.log(error)
        }
    }
    getFarmersInfo();
  }, []);

  /*(Starts here) Handles the Configuration of the api( not the Map configures itself, that's below...)*/
  const { isLoaded } = useJsApiLoader({
    /*loads the Map api and addtional services, using the key*/
    googleMapsApiKey: 'AIzaSyBoy9iqOcx0Zap0oPYYvrCKIy-NNVWUFIs',
    libraries: ['places'],
  });

  if (!isLoaded) {
    /*Handle situation where the api has not been loaded yet*/
    return <div>Loading...</div>;
  }
  
  const handleAddFarm = () => {
    setFarmNames([...farmNames, '']);
    setNumStops((prev) => prev + 1);
    setAddStop(true);
  }

  const handleRemoveFarm = (stops) => {
    const index = stops + 2

    if (farmNames[index -1]) {
      const filteredNames = farmNames.filter(name =>
        name !== farmNames[index -1]);

      console.log(filteredNames);
      setFarmNames(filteredNames);
    }

    //setNumStops((prev) => prev - 1);
    setRemoveStop(true);
  }
  const handleFarmNameChange = (index, value) => {
    const newFarmNames = [...farmNames];
    newFarmNames[index] = value;
    setFarmNames(newFarmNames);
  }

  const calculateRoute = async () => {
    /*if (farmNames.some(name => name === '')) {
      return;
    }*/
   //console.log(farmNames)//test
    try {
      const data = await fetchRoute(farmNames);
      //console.log(data)//test
      if (data.success) {
        setRoute(data.route);
        const waypoints = data.route.slice(1, -1).map(index => ({
          location: {
            lat: data.farms[index].coordinates.latitude,
            lng: data.farms[index].coordinates.longitude,
          },
          stopover: true,
        }));

        const directionsService = new google.maps.DirectionsService();
        const directionsResult = await directionsService.route({
          origin: {
            lat: data.farms[0].coordinates.latitude,
            lng: data.farms[0].coordinates.longitude,
          },
          destination: {
            lat: data.farms[0].coordinates.latitude,
            lng: data.farms[0].coordinates.longitude,
          },
          travelMode: google.maps.TravelMode.DRIVING,
          waypoints,
        });

        setDirectionsResponse(directionsResult);
      } else {
        console.error('Failed to fetch route:', data.error);
      }

    } catch (error) {
      console.error('Error calculating route:', error);
    }
  };


  /* Handles Autocorrection */
  
  const handleInputChange = (index, value) => {
    const inputValue = value;
    setQuery(inputValue);
    setChange(true);

    // Filter names based on input value
    const filteredNames = allNames.filter(name =>
      name.name.toLowerCase().includes(inputValue.toLowerCase())
    );

    setSuggestions(filteredNames);
    //handleFarmNameChange(index, value);
  };

  const handleSelectSuggestion = (index, name) => {
    setQuery(name.name); // Set the selected name in the input field
    handleFarmNameChange(index, name.name)
    setSuggestions([]); // Clear suggestions
  };

  return (
    <div className="map-input-container">
       <div className="schedule-container">
         <div className={`planner-container${numStops + 1}`}>
          <div className="planner-title-container">
             <h1 className={`planner-title ${theme}`}>Plan Collection</h1>
           </div>
           <div className="destination-container">
            {farmNames.map((name, index) => (
                <div className="farm-name-container" key={index}>
                  {index < 6 && 
                    <input
                      key={index}
                      type="text"
                      className={addStop ? "pickup second-pickup2" : "pickup second-pickup"}
                      placeholder={`Farm ${index + 1}`}
                      value={name}
                      onChange={(e) => handleFarmNameChange(index, e.target.value)}
                    />
                  }
                </div>
            ))}
            <div className="icon-add-remove">
              {numStops < 4 && <FontAwesomeIcon 
                icon={faCirclePlus}
                className={addStop ? (`addIcon${numStops + 1}`) : "addIcon"}
                onClick={handleAddFarm}
              />}
              {/*numStops < 4 && <FontAwesomeIcon 
                icon={faTrash}
                className={removeStop ? (`removeIcon${numStops + 1}`) : "removeIcon"}
                onClick={() => handleRemoveFarm(numStops)}
              />*/}
            </div>
           </div>
          <div className="schedule-btn-container">
            <button className="schedule-submit-btn" onClick={calculateRoute}>Schedule</button>
          </div>
        </div>
      </div>
      {/*Map visuals configures below*/}
      {theme == 'dark' ?
      <GoogleMap
        center={center}
        zoom={10}
        mapContainerStyle={containerStyle}
        options={{ 
          styles: darkModeStyle,
          streetViewControl: true 
        }}
        onLoad={(map) => setMap(map)}
      >
        {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
      </GoogleMap>:
      <GoogleMap
        center={center}
        zoom={10}
        mapContainerStyle={containerStyle}
        options={{ 
          streetViewControl: true 
        }}
        onLoad={(map) => setMap(map)}
      >
        {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
      </GoogleMap>
      }
    </div>
  );
}