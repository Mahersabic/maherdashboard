// DoctorsMap.js

import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import DoctorMarker from "./DoctorMarker";


const mapStyles = {
  width: '98%',
  height: '40%',
  padding: '0px',
  margin: '0px',
};




const DoctorsMap = withScriptjs(withGoogleMap((props) =>{

  let i = 0;
  const markers = props.doctors.map( doctor => <DoctorMarker
                    key={i++}
                    doctor={doctor}
                    location={{lat: parseFloat(doctor.latitude), lng: parseFloat(doctor.longitude)}}
                  />);

  return (
      <GoogleMap
        style={mapStyles}
        defaultZoom={13}
        center={ { lat:  25.333827, lng: 49.597226 } }
        >
        {markers}
      </GoogleMap>
    );
  }
))

export default DoctorsMap;
