import "./App.css";
import RouterForm from "./components/RouterForm";
import Map from "./components/Map";
import { useState, useEffect } from "react";
import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

function App() {
  const [existingCoordinates, setExistingCoordinates] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [formErrors, setformErrors] = useState({});
  const [formData, setFormData] = useState({
    router_number: "",
    latitude: "",
    longitude: "",
    status: false,
  });

  //form validation
  const formValidation = (formData) => {
    let errors = {};

    if (formData.router_number.length < 4) {
      errors.router_number =
        "Router number should atleast be more than 4 characters.";
    }
    return errors;
  };

  /* helper functions for application */
  const handleInput = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleStatus = (e) => {
    setFormData({ ...formData, status: !formData.status });
  };

  const resetForm = () => {
    setFormData({
      router_number: "",
      latitude: "",
      longitude: "",
      status: false,
    });
  };

  function loadExistingCoordinates() {
    return axios
      .get(`${baseUrl}/api/coverage`)
      .then((res) => setExistingCoordinates(res.data.routerData));
  }

  /* heart of application */
  const setCurrentLocation = (data) => {
    setFormData({ ...formData, latitude: data.lat, longitude: data.lng });
  };

  // handler for when the submit button is clicked
  const handleSubmit = (e) => {
    e.preventDefault();
    setformErrors(formValidation(formData));
    setIsSubmit(true);

    axios
      .post(`${baseUrl}/api/coverage`, formData)
      .then(loadExistingCoordinates)
      .then(resetForm)
      .catch((err) => console.log(err.response.data));
  };

  // load all coordinates from backend when page loads
  useEffect(() => {
    loadExistingCoordinates();
  }, []);

  return (
    <div>
      <Map
        coordinates={existingCoordinates}
        setCurrentLocation={setCurrentLocation}
      />

      <RouterForm
        formData={formData}
        formErrors={formErrors}
        handleInput={handleInput}
        handleStatus={handleStatus}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default App;
