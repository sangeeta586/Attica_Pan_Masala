import React, { useEffect, useState, useRef } from "react";
import ManagementSideBarModal from "../ManagementChart/ManagementSideBarModal";
import ManagementSidebar from "../ManagementSidebar";
import { Button, Modal } from "@material-tailwind/react"; // Import Modal from Material Tailwind
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../constants";

const SosHomepage = () => {
  const [showModal, setShowModal] = useState(false);
  const [latestAlert, setLatestAlert] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const navigate = useNavigate();
  const alertSound = useRef(null);
  const previousAlertId = useRef(null);

  useEffect(() => {
    alertSound.current = new Audio();

    alertSound.current.addEventListener("error", (e) => {
      console.error("Error loading audio file", e);
    });

    const fetchAlerts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/sosAlert/`);
        const newAlerts = response.data;
        setAlerts(newAlerts);

        const latest = newAlerts[0];
        if (previousAlertId.current !== latest._id) {
          setLatestAlert(latest);
          previousAlertId.current = latest._id;
          alertSound.current.play().catch((e) => {
            console.error("Error playing audio", e);
          });
          setShowModal(true);
        }
      } catch (error) {
        console.error("Error fetching alerts:", error);
        // Handle error, maybe show an error message to the user
      }
    };

    const intervalId = setInterval(fetchAlerts, 1000);

    return () => {
      clearInterval(intervalId);
      if (alertSound.current) {
        alertSound.current.pause();
        alertSound.current = null;
      }
    };
  }, []);

  const handleRegisterClick = () => {
    navigate("/sos-register");
  };

  const handleBlockConfirm = async (alert) => {
    try {
      await axios.delete(`${BASE_URL}/api/sosAlert/${alert.uniqueCode}`);
      alert("The alert has been blocked successfully.");
      setLatestAlert(null); // Clear the latest alert
      setAlerts((prevAlerts) => prevAlerts.filter((a) => a._id !== alert._id)); // Update the alerts list
    } catch (error) {
      console.error("Error blocking the alert:", error);
      alert("Failed to block the alert.");
    }
  };

  return (
    <div className="flex gap-6 bg-[#dbeafe] w-full">
      <div className="h-screen md:block lg:block hidden">
        <ManagementSidebar />
      </div>
      
      <div className="lg:ml-80 md:ml-40 font-serif w-full lg:p-10 md:p-5 p-4">
        <div className="flex items-center flex-wrap lg:justify-end md:justify-end justify-center lg:gap-10 md:gap-5 gap-1 lg:h-28 h-16 bg-[#93c5fd] rounded-xl lg:my-5 md:my-5 my-2">
          <div className="lg:hidden md:hidden block">
            <ManagementSideBarModal />
          </div>
          <p className="lg:text-2xl md:text-xl text-xs font-bold border-4 border-[#1e40af] p-2 rounded-lg bg-[#dbeafe]">
            SOS
          </p>
          <Button
            color="green"
            onClick={handleRegisterClick}
            className="lg:mr-12 lg:-ml-2 md:mr-8 mr-2 lg:text-md md:text-md text-xs bg-[#1e40af]"
          >
            Register
          </Button>
        </div>
        
        {showModal && latestAlert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="z-50 bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-xl mb-4">New Alert</h2>
              <p>Email: {latestAlert.emailId}</p>
              <p>Phone: {latestAlert.phone}</p>
              <p>Unique Code: {latestAlert.uniqueCode}</p>
              <p>Alert: {latestAlert.alert.toString()}</p>
              <p>{new Date(latestAlert.updatedAt).toLocaleString()}</p>
              <div className="flex gap-2 items-center content-center mt-4">
                <Button color="red" onClick={() => setShowModal(false)}>Cancel</Button>
                <Button color="green" onClick={() => handleBlockConfirm(latestAlert)}>Confirm</Button>
              </div>
            </div>
          </div>
        )}

        <div className="container mx-auto 2xl:ml-0 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {alerts.map((alert) => (
              <div key={alert._id} className="bg-indigo-400 p-5 text-white rounded-lg">
                <h2 className="text-lg mb-4 text-center">Alert</h2>
                <p>Email: {alert.emailId}</p>
                <p>Phone: {alert.phone}</p>
                <p>Unique Code: {alert.uniqueCode}</p>
                <p>Alert: {alert.alert.toString()}</p>
                <p>{new Date(alert.updatedAt).toLocaleString()}</p>
                <div className="flex gap-2 items-center content-center mt-4">
                  <Button color="red" onClick={() => setShowModal(false)}>Cancel</Button>
                  <Button color="green" onClick={() => handleBlockConfirm(alert)}>Confirm</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SosHomepage;
