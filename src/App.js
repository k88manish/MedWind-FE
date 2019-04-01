import React, { Component } from "react";
import LoadingOverlay from "react-loading-overlay";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import MapComponent from "./components/MapComponent";
import PlaceListItem from "./components/PlaceListItem";
import ModalComponent from "./components/ModalComponent";
import InputModalComponent from "./components/InputModalComponent";
import config from "./appConfig";
import LocationHelper from "./LocationHelper";
import "./App.css";

class App extends Component {
  state = {
    locations: [],
    place: "",
    showModal: false,
    message: "",
    locationToEdit: null,
    isLoading: false
  };

  componentDidMount() {
    this.loadLocations();
  }

  onPlaceChange = e => {
    this.setState({ place: e.target.value });
  };

  onMapAdd = () => {
    const { locations, place } = this.state;
    if (!place || place.trim().length === 0) {
      this.setState({ showModal: true, message: "Place name can not be blank", title: "info" });
    }

    this.setState({ isLoading: true });
    LocationHelper.addLocation(place).then(data => {
      if (data.success) {
        locations.push(data.result);
        this.setState({ locations, isLoading: false, place: "" });
      } else {
        this.setState({ showModal: true, message: data.error.message, title: "Error!", isLoading: false });
      }
    });
  };

  onEdit = loc => {
    this.setState({ showInputModal: true, locationToEdit: loc });
  };

  onEditConfirm = place => {
    this.setState({ isLoading: true });
    LocationHelper.updateLocation(this.state.locationToEdit, place).then(data => {
      if (data.success) {
        this.setState({ showModal: true, message: "Location Updated Successfully", title: "Success" });
        this.loadLocations();
      } else {
        this.setState({ showModal: true, message: data.error.message, title: "Error!", isLoading: false });
      }
    });
  };

  onDelete = loc => {
    this.setState({ isLoading: true });
    LocationHelper.deleteLocation(loc).then(data => {
      if (data.success) {
        this.setState({ showModal: true, message: "Deleted Successfully", title: "Success", isLoading: false });
        this.loadLocations();
      } else {
        this.setState({ showModal: true, message: data.error.message, title: "Error!", isLoading: false });
      }
    });
  };

  loadLocations = async () => {
    this.setState({ isLoading: true });

    try {
      const data = await LocationHelper.getAllLocations();
      if (data.success) {
        this.setState({ locations: data.result, isLoading: false });
      } else {
        this.setState({ showModal: true, message: data.error.message, title: "Error!", isLoading: false });
      }
    } catch (err) {}
  };

  handleClose = () => {
    this.setState({ showModal: false, message: "", showInputModal: false });
  };

  render() {
    const { locations, place, showModal, showInputModal, message, title, isLoading } = this.state;
    return (
      <LoadingOverlay active={isLoading} spinner text="Loading...">
        <Container>
          <ModalComponent show={showModal} handleClose={this.handleClose} message={message} title={title} />
          <InputModalComponent show={showInputModal} handleClose={this.handleClose} handleConfirm={this.onEditConfirm} title={"Edit Place"} />
          <Row>
            <Col sm={6} className="map-container">
              <MapComponent
                locations={locations}
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${config.Google.ApiKey}`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
              />
            </Col>
            <Col sm={6} className="list-container">
              <Row className="input-row">
                <Form className="input-form">
                  <Form.Row>
                    <Col sm={8}>
                      <Form.Control className="place-input" type="text" placeholder="Add Place" value={place} onChange={this.onPlaceChange} />
                    </Col>
                    <Col sm={4}>
                      <Button className="add_btn" variant="primary" onClick={this.onMapAdd}>
                        Add Map
                      </Button>
                    </Col>
                  </Form.Row>
                </Form>
              </Row>
              <Row className="list-row">
                <ul className="list">
                  {locations.map(loc => (
                    <PlaceListItem location={loc} key={loc._id} onEdit={this.onEdit} onDelete={this.onDelete} />
                  ))}
                </ul>
              </Row>
            </Col>
          </Row>
        </Container>
      </LoadingOverlay>
    );
  }
}

export default App;
