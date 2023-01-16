import "./App.css";
import RouterForm from "./components/RouterForm";
import Map from "./components/Map";
import { useState, useEffect } from "react";
import axios from "axios";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

const baseUrl = process.env.REACT_APP_BASE_URL;

function App() {
  const [existingCoordinates, setExistingCoordinates] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [formErrors, setformErrors] = useState({});
  const [userIsAuthenticated, setuserIsAuthenticated] = useState(false);
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
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        {!userIsAuthenticated && (
          <GoogleLogin
            className="login-btn"
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse.credential);
              let decoded = jwt_decode(credentialResponse.credential);
              console.log(decoded);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        )}
        <Map
          coordinates={existingCoordinates}
          setCurrentLocation={setCurrentLocation}
        />
        {userIsAuthenticated && (
          <RouterForm
            formData={formData}
            formErrors={formErrors}
            handleInput={handleInput}
            handleStatus={handleStatus}
            handleSubmit={handleSubmit}
          />
        )}
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
