import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { IoIosCloseCircleOutline } from "react-icons/io";
import L from 'leaflet'; // Import Leaflet for custom marker
import location from "../../../../src/assets/locationRed.png";

const CloseButton = ({ onClose }) => {
  return (
    <div className="leaflet-top leaflet-right">
      <div className="leaflet-control">
        <IoIosCloseCircleOutline
          className="text-6xl text-red-500 bg-white cursor-pointer m-2"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

const GoogleMapComponent = ({ locations, onClose }) => {
  const [prevLocations, setPrevLocations] = useState([]);


  console.log("hiiiiiiiiiiiiiiiiii",locations)

  useEffect(() => {
    if (locations && locations.length > 0) {
      setPrevLocations(locations);
    }
  }, [locations]);

  if (!locations || locations.length === 0) {
    return <div>No location data available</div>;
  }

  // Default Leaflet icon for the red marker (ending point)
  const createRedIcon = () => {
    return new L.Icon({
      iconUrl: `${location}`, // Red marker icon for the ending point
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [0, -41],
    });
  };

  // Default Leaflet icon for the blue marker (starting point)
  const createBlueIcon = () => {
    return new L.Icon({
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png', // Blue marker icon for the starting point
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [0, -41],
    });
  };

  // Get the first (starting) and last (ending) location
  const startingPosition = [locations[0].latitude, locations[0].longitude]; // Starting point (0th position)
  const endingPosition = [locations[locations.length - 1].latitude, locations[locations.length - 1].longitude]; // Ending point (nth position)

  return (
    <div className=" absolute h-screen w-screen left-0 top-12 right-0  z-50">
      <MapContainer center={startingPosition} zoom={13} className="h-full w-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Add marker for the starting point */}
        <Marker key="start" position={startingPosition} icon={createBlueIcon()}>
          <Popup>
            <div>
              <strong>Starting Point</strong>
              <br />
              <strong>Latitude:</strong> {locations[0].latitude}
              <br />
              <strong>Longitude:</strong> {locations[0].longitude}
              <br />
              <strong>Date & Time:</strong> {new Date(locations[0].timestamp).toLocaleString()}
            </div>
          </Popup>
        </Marker>

        {/* Add marker for the ending point */}
        <Marker key="end" position={endingPosition} icon={createRedIcon()}>
          <Popup>
            <div>
              <strong>Ending Point</strong>
              <br />
              <strong>Latitude:</strong> {locations[locations.length - 1].latitude}
              <br />
              <strong>Longitude:</strong> {locations[locations.length - 1].longitude}
              <br />
              <strong>Date & Time:</strong> {new Date(locations[locations.length - 1].timestamp).toLocaleString()}
            </div>
          </Popup>
        </Marker>

        {/* Add a small dot for each tracked location */}
        {locations.map((location, index) => {
          const position = [location.latitude, location.longitude];
          return (
            <CircleMarker
              key={index}
              center={position}
              radius={1}
              color="blue"
              fillOpacity={1}
            >
              <Popup>
                <div>
                  <strong>Location {index + 1}</strong>
                  <br />
                  <strong>Latitude:</strong> {location.latitude}
                  <br />
                  <strong>Longitude:</strong> {location.longitude}
                  <br />
                  <strong>Date & Time:</strong> {new Date(location.timestamp).toLocaleString()}
                </div>
              </Popup>
            </CircleMarker>
          );
        })}

        <CloseButton onClose={onClose} />
      </MapContainer>
    </div>
  );
};

export default GoogleMapComponent;
