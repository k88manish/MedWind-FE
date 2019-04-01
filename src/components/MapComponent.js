import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";

// Default Lat long for berlin city
const DEFAULT_CENTER = {
  Lat: "52.5170365",
  Lng: "13.3888599"
};

class MapComponent extends React.Component {
  state = { isOpen: false };
  onToggleOpen = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  render() {
    const bounds = new window.google.maps.LatLngBounds();
    const coordinates = this.props.locations.map(location => {
      const { Lat, Lng } = location;
      const latLng = new window.google.maps.LatLng(Lat, Lng);
      bounds.extend(latLng);
      return { latLng, location };
    });
    return (
      <GoogleMap ref={map => map && map.fitBounds(bounds)} defaultZoom={8} defaultCenter={{ lat: DEFAULT_CENTER.Lat, lng: DEFAULT_CENTER.Lng }}>
        {coordinates.map(({ latLng: { lat, lng }, location }, index) => {
          return (
            <Marker key={index} position={{ lat: lat(), lng: lng() }} onClick={this.onToggleOpen}>
              {this.state.isOpen && (
                <InfoWindow onCloseClick={this.onToggleOpen}>
                  <>
                    <div>{location.Name}</div>
                    <div>{location.Address}</div>
                  </>
                </InfoWindow>
              )}
            </Marker>
          );
        })}
      </GoogleMap>
    );
  }
}

export default withScriptjs(withGoogleMap(MapComponent));
