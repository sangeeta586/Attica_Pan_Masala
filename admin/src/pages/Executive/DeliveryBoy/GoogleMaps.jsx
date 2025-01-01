import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import L from "leaflet";

const CloseButton = ({ onClose }) => {
  return (
    <div className="absolute top-4 right-4  z-50">
      <IoIosCloseCircleOutline
        className="text-4xl text-red-500 bg-white cursor-pointer z-50"
        onClick={onClose}
      />
    </div>
  );
};

const GoogleMapComponent = ({ locations, onClose }) => {
  const [prevLocations, setPrevLocations] = useState([]);

  useEffect(() => {
    if (locations && locations.length > 0) {
      setPrevLocations(locations);
    }
  }, [locations]);

  if (!locations || locations.length === 0) {
    return <div>No location data available</div>;
  }

  const endPosition = [
    locations[locations.length - 1].latitude,
    locations[locations.length - 1].longitude,
  ];

  // Define custom icon using SVG
  const createIcon = (color) => {
    return new L.DivIcon({
      className: "custom-icon",
      html: ` 
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" class="w-12 h-12">
          <path d="M12 2C8.13 2 5 5.13 5 8.5c0 2.58 2.5 6.57 6.21 11.01l.79.88.79-.88C16.5 15.07 19 11.08 19 8.5 19 5.13 15.87 2 12 2zm0 11c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
        </svg>`,
    });
  };

  return (
    <div className="w-[80%] h-screen relative ">
      <MapContainer
        center={endPosition}
        zoom={13}
        className="h-full w-full flex justify-end "
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={endPosition} icon={createIcon("#EF4444")} />
      </MapContainer>

      {/* Close button */}
      <CloseButton onClose={onClose} />
    </div>
  );
};

export default GoogleMapComponent;
