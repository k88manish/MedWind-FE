import React from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";

const Style = {
  ADDRESS: {
    height: "3em",
    overflow: "Hidden",
    textOverflow: "ellipsis"
  }
};

const PlaceListItem = ({ location, onEdit, onDelete }) => {
  return (
    <li className="list-item">
      <div className="title">{location.Name}</div>
      <div style={Style.ADDRESS}>
        <strong>Address</strong>: {location.Address}
      </div>
      <div>
        <strong>Latitude</strong>: {location.Lat}
      </div>
      <div>
        <strong>Longitude</strong>: {location.Lng}
      </div>
      <Row className="btn-bar">
        <Button className="edit-btn" variant="outline-dark" size="sm" onClick={() => onEdit(location)}>
          Edit
        </Button>
        &nbsp;or&nbsp;
        <Button className="delete-btn" variant="outline-dark" size="sm" onClick={() => onDelete(location)}>
          Delete
        </Button>
      </Row>
    </li>
  );
};

export default PlaceListItem;
