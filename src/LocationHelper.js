const LocationHelper = {
  ajax: (url, options = { method: "GET" }) => {
    return fetch(url, options)
      .then(response => {
        return response.json().then(json => {
          if (response.ok) {
            return Promise.resolve({ success: true, result: json });
          } else {
            return Promise.resolve({ success: false, error: { message: json.error } });
          }
        });
      })
      .catch(err => {
        return Promise.resolve({ success: false, error: err });
      });
  },

  getAllLocations: () => {
    return LocationHelper.ajax("/location");
  },

  addLocation: place => {
    return LocationHelper.ajax("/location", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ place })
    });
  },

  updateLocation: (loc, place) => {
    return LocationHelper.ajax(`/location/${loc._id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ place })
    });
  },

  deleteLocation: loc => {
    return LocationHelper.ajax(`/location/${loc._id}`, {
      method: "DELETE"
    });
  }
};

export default LocationHelper;
