import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindow,
} from "@react-google-maps/api";
import { useState } from "react";

const libraries = ["places"];

const mapContainerStyle = {
  width: "77vw",
  height: "100vh",
};

const center = {
  lat: 5.603717,
  lng: -0.186964,
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const Map = ({ coordinates, setCurrentLocation }) => {
  const [selectedMarker, setSelectedMarker] = useState(null);

  // set the marker info with the data gotten from the api
  const markers = coordinates.map((geoPoint) => {
    return {
      id: geoPoint.router_number,
      status: geoPoint.status,
      position: {
        lat: parseFloat(geoPoint.latitude),
        lng: parseFloat(geoPoint.longitude),
      },
    };
  });

  // plot a marker by click on the map
  const onClickMarker = (e) => {
    setCurrentLocation({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  };

  // helper function to change the marker color
  function addMarker(id, position, color, status) {
    let url = "http://maps.google.com/mapfiles/ms/icons/";
    url += color + "-dot.png";

    //function to display the marker info of a selected marker
    const handleClick = () => {
      setSelectedMarker({ id, position, status });
    };

    return (
      <MarkerF
        key={id}
        position={position}
        icon={{
          url,
        }}
        onClick={handleClick}
      />
    );
  }

  if (coordinates.length > 0) {
    console.log(markers, "markers");
  }

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) return "Error loading map..";
  if (!isLoaded) return "Loading map..";

  return (
    isLoaded && (
      <>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={8}
          center={center}
          options={options}
          onClick={onClickMarker}
        >
          {markers.map(({ id, status, position }) => {
            return status
              ? addMarker(id, position, "green", status)
              : addMarker(id, position, "red", status);
          })}
          {selectedMarker && (
            <InfoWindow
              position={selectedMarker.position}
              onCloseClick={() => {
                setSelectedMarker(null);
              }}
            >
              <div>
                <h3>router nō - {selectedMarker.id}</h3>
                <h3>status - {`${selectedMarker.status}`}</h3>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </>
    )
  );
};

export default Map;
