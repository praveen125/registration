import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function MyVerticallyCenteredModal(props) {
  console.log(props);
  // const [searchText, setSearchText] = useState("");
  // const [sortCol, setSortCol] = useState("");
  // const [sortOrder, setSortOrder] = useState("");
  // const [showSortButton, setShowSortButton] = useState("");
  // const [clickSortButton, setClickSortButton] = useState("");

  const onsubmit = (e) => {
    e.preventDefault();
    props.submitData();
  };

  const onchange = (e) => {
    props.change(e.target.name, e.target.value);
  };

  return (
    <div className="AddDetails">
      <Button variant="primary" onClick={props.showModel}>
        Add Details
      </Button>

      <Modal
        show={props.showModel}
        onHide={props.closeModel}
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Registration Form
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h4>Fill the Registartion Form:</h4>
          <form onSubmit={onsubmit} className="center">
            <div className="form-row">
              <div className="form-group col-md-6">
                <label className="float">First Name :</label>

                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="Enter First Name"
                  value={props.data.firstName}
                  name="firstName"
                  onChange={onchange}
                />
                <div className="error">
                  {props.errors.firstName ? "Name is required" : ""}
                </div>
              </div>

              <div className="form-group col-md-6">
                <label className="float">Last Name :</label>

                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  placeholder="Enter Last Name"
                  value={props.data.lastName}
                  onChange={onchange}
                />
                <div className="error">
                  {props.errors.lastName ? "Name is required " : ""}
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label className="float">Age :</label>
                <input
                  type="number"
                  className="form-control"
                  id="age"
                  name="age"
                  placeholder="Enter Age"
                  value={props.data.age}
                  onChange={onchange}
                />
                <div className="error">
                  {props.errors.age ? "Age is required" : ""}
                </div>{" "}
              </div>

              <div className="form-group col-md-6">
                <div>
                  <fieldset className="form-group">
                    <div className="form-group col-md-6">
                      <legend className="col-form-label col-sm-2 pt-0">
                        Gender:
                      </legend>

                      <div className="col-sm-10">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="male"
                            value="male"
                            onClick={onchange}
                            checked={props.data.gender === "male"}
                          />
                          <div>
                            <label
                              className="form-check-label"
                              for="gridRadios1"
                            >
                              Male
                            </label>
                          </div>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="female"
                            value="female"
                            onClick={onchange}
                            checked={props.data.gender === "female"}
                          />
                          <label className="form-check-label" for="gridRadios2">
                            Female
                          </label>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  <div className="error">
                    {props.errors.gender ? "please select gender" : ""}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <button className="submit" onClick={onsubmit}>
                {props.currentId != -1 ? "Update" : "Submit"}
              </button>
              <button
                className="submit"
                style={{ backgroundColor: "grey" }}
                onClick={props.clearFields}
              >
                {" "}
                Clear
              </button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.closeModel}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MyVerticallyCenteredModal;
