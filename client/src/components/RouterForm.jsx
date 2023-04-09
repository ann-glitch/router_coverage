import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

const RouterForm = ({
  formData,
  formErrors,
  handleInput,
  handleStatus,
  handleSubmit,
}) => {
  // const [userIsAuthenticated, setuserIsAuthenticated] = useState(false);
  const { user, setUser } = useContext(AuthContext);

  //handle google auth login
  const handleLogin = async (credentialResponse) => {
    axios.defaults.withCredentials = true;
    const response = await axios.post(`${baseUrl}/api/coverage/auth/login`, {
      token: credentialResponse.credential,
    });

    localStorage.setItem("token", response.data.token);
    setUser(response.data);
    // if (response.status === 200) {
    //   setuserIsAuthenticated(true);
    // }
  };
  console.log(user);
  //keep user logged in
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get(`${baseUrl}/api/coverage/auth/profile`, {
          headers: {
            "x-auth-token": token,
          },
        })
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  //handle auth logout
  const handleLogout = async () => {
    const response = await axios.get(`${baseUrl}/api/coverage/auth/logout`);
    if (response.status === 200) {
      // setuserIsAuthenticated(false);
      setUser(null);
    }
  };

  return (
    <div className="form-box">
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <h2 className="heading"> Router Coverage </h2>
        {user && (
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="router-number">
              <label className="form-label">
                Router Number:
                <input
                  className="form-input"
                  id="router_number"
                  type="text"
                  value={formData.router_number}
                  onChange={(e) => handleInput(e)}
                  required
                />
              </label>
              <p className="error-message">{formErrors.router_number}</p>
            </div>

            <div>
              <p className="para">
                <i>Click on the map to add your latlng.</i>
              </p>
            </div>

            <div className="latitude">
              <label className="form-label">
                Latitude:
                <input
                  className="form-input"
                  id="latitude"
                  type="text"
                  value={formData.latitude}
                  onChange={(e) => handleInput(e)}
                  required
                />
              </label>
            </div>

            <div className="longitude">
              <label className="form-label">
                Longitude:
                <input
                  className="form-input"
                  id="longitude"
                  type="text"
                  value={formData.longitude}
                  onChange={(e) => handleInput(e)}
                  required
                />
              </label>
            </div>

            <div className="router-status">
              <p className="form-label paragraph">Router Status:</p>
              <label className="switch">
                <input
                  type="checkbox"
                  id="status"
                  value={formData.status}
                  onClick={handleStatus}
                />
                <span className="slider round"></span>
              </label>
            </div>

            <div className="router-btn">
              <button>Submit</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </form>
        )}

        {!user && (
          <div>
            <p className="para">
              <i>
                This website enables users to enter their router numbers and the
                state of their routers. The website then visualizes the
                submitted router data and indicates which routers are
                operational and inoperative on a Google map. Sign in now and
                submit your router data!
              </i>
            </p>

            <div className="google-auth">
              <h2>Sign in with Google</h2>
              <GoogleLogin
                className="login-btn"
                onSuccess={handleLogin}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </div>
          </div>
        )}
      </GoogleOAuthProvider>
    </div>
  );
};

export default RouterForm;
