import React, { Component } from "react";
import Table from "./Table";
import MyVerticallyCenteredModal from "./MyVerticallyCenteredModal";
import { connect } from "react-redux";
import axios from "axios";
import { getPersons, setCurrent } from "../actions/personActions";

class Register extends Component {
  state = {
    // users: [],
    person: {
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
    },
    errors: {
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
    },
    current: null,
    show: false,
  };

  //get request

  // getData = () => {
  //   axios
  //     .get("/persons")
  //     .then((res) => res.data)
  //     .then((data) => {
  //       // console.log(data);
  //       this.setState({ users: data });
  //     });
  // };

  // componentDidMount = () => {
  //   this.getData();
  // };

  // componentDidUpdate = () => {
  //   this.getData();
  // };

  componentDidMount = () => {
    getPersons();
  };

  addPerson = (newPerson) => {
    axios.post("/persons", newPerson);
    this.setState({ show: false });
    // this.getData();
  };

  edit = (id) => {
    this.setState({
      show: true,
      current: id,
      person: this.state.users.find((person) => person._id === id),
    });
  };
  // setCurrent(id);

  updatePerson = (person) => {
    axios
      .put(`/persons/${this.state.current}`, person)
      .then((res) => res.data)
      .then((data) => {
        this.setState([...this.state.users, { users: data }]);
      });
    this.setState({ show: false, current: null });
    // this.getData();
  };

  deletePerson = (id) => {
    axios
      .delete(`/persons/${id}`)
      .then((res) => res.data)
      .then((data) => {
        const deleteData = this.state.users.filter((user) => user._id !== data);
        this.setState({ users: deleteData });
      });
  };

  onChange = (field, value) => {
    this.setState({
      person: { ...this.state.person, [field]: value },
      errors: {
        ...this.state.errors,
        [field]: this.state.person[field] == null || "" ? true : false,
      },
    });
  };

  validate = () => {
    // console.log("test98", this.state.person, this.state.errors);
    this.setState({
      errors: {
        firstName: this.state.person.firstName === "",
        lastName: this.state.person.lastName === "",
        age: this.state.person.age === "",
        gender: this.state.person.gender === "",
      },
    });
    return (
      this.state.person.firstName !== "" &&
      this.state.person.lastName !== "" &&
      this.state.person.age !== "" &&
      this.state.person.gender !== ""
    );
  };

  submitData = (e) => {
    e.preventDefault();
    if (!this.validate()) return;
    if (this.state.current == null) {
      this.addPerson(this.state.person);
    } else {
      this.updatePerson(this.state.person);
    }
  };

  clearFields = (e) => {
    e.preventDefault();
    this.setState({
      person: { firstName: "", lastName: "", age: "", gender: "" },
    });
  };

  showModel = () => {
    this.setState({ show: true });
  };

  closeModel = () => {
    this.setState({
      person: { firstName: "", lastName: "", age: "", gender: "" },
    });
    this.setState({ current: null });
    this.setState({ show: false });
    // showModal();
  };

  render() {
    const { person, current, show } = this.props.data;

    return (
      <div>
        <MyVerticallyCenteredModal
          show={this.state.show}
          showModel={this.showModel}
          closeModel={this.closeModel}
          submitData={this.submitData}
          change={this.onChange}
          person={this.state.person}
          errors={this.state.errors}
          current={this.state.current}
          clearFields={this.clearFields}
          onSubmit={this.onSubmit}
        />
        {/* <Form /> */}
        <Table
          users={person}
          edit={this.edit}
          deletePerson={this.deletePerson}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.person,
});

export default connect(mapStateToProps, { getPersons })(Register);
