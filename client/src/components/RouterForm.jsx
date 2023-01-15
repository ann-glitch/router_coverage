const RouterForm = ({
  formData,
  formErrors,
  handleInput,
  handleStatus,
  handleSubmit,
}) => {
  return (
    <div className="form-box">
      <h2 className="heading"> Router Coverage </h2>
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

        <button>Submit</button>
      </form>
    </div>
  );
};

export default RouterForm;
