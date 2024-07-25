// src/components/Map.js
import React, { useCallback } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useDispatch } from "react-redux";
import { setLocation } from "../../store/locationSlice";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

function Map() {
  const dispatch = useDispatch();

  const onMapClick = useCallback(
    (e) => {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=YOUR_API_KEY`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.results.length > 0) {
            const address = data.results[0].formatted_address;
            dispatch(setLocation({ address, coordinates: { lat, lng } }));
          }
        });
    },
    [dispatch]
  );

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onClick={onMapClick}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(Map);
