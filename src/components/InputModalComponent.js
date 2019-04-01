import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

class InputModalComponent extends React.PureComponent {
  state = {
    place: ""
  };

  onPlaceChange = e => {
    this.setState({ place: e.target.value });
  };

  onConfirm = () => {
    const { handleConfirm } = this.props;
    const { place } = this.state;
    handleConfirm(place);
    this.setState({ place: "" });
  };

  onClose = () => {
    const { handleClose } = this.props;
    this.setState({ place: "" });
    handleClose();
  };

  render() {
    const { handleClose, show, title } = this.props;
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control type="text" onChange={this.onPlaceChange} value={this.state.place} />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="confirm-btn" variant="primary" onClick={this.onConfirm}>
            Confirm
          </Button>
          <Button className="close-btn" variant="secondary" onClick={this.onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default InputModalComponent;
