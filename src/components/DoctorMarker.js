import React from "react";
import { Marker } from "react-google-maps";
// import StethoscopeIcon from "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
const green = "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
const red = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
export default class DoctorMarker extends React.Component {



  render(){

    const { doctor } = this.props;

    return(
        <Marker
          position={this.props.location}
          icon={doctor.status === '0'? red : green}
        >
        </Marker>
    );
  }
}
