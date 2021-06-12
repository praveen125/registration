import React, { Component } from "react";
import Form from "./Form";
import Table from "./Table";
import Modalpop from "./Modalpop";
import MyVerticallyCenteredModal from "./MyVerticallyCenteredModal";
import axios from "axios";

class Register extends Component {
  state = {
    // items: [],
    users: [],
    //   {
    //     firstName: "praveen",
    //     lastName: "surisetty",
    //     age: "23",
    //     gender: "male",
    //   },
    //   {
    //     firstName: "naidu",
    //     lastName: "bandaru",
    //     age: "25",
    //     gender: "male",
    //   },
    //   {
    //     firstName: "sravani",
    //     lastName: "jampa",
    //     age: "23",
    //     gender: "female",
    //   },
    //   {
    //     firstName: "nagu",
    //     lastName: "surisetti",
    //     age: "23",
    //     gender: "male",
    //   },
    //   {
    //     firstName: "demudu",
    //     lastName: "pyla",
    //     age: "23",
    //     gender: "male",
    //   },
    //   {
    //     firstName: "leela",
    //     lastName: "jampa",
    //     age: "23",
    //     gender: "female",
    //   },
    //   {
    //     firstName: "kumari",
    //     lastName: "jampa",
    //     age: "23",
    //     gender: "female",
    //   },
    //   {
    //     firstName: "appi",
    //     lastName: "kaligi",
    //     age: "23",
    //     gender: "male",
    //   },
    //   {
    //     firstName: "kamesh",
    //     lastName: "pyla",
    //     age: "23",
    //     gender: "male",
    //   },
    //   {
    //     firstName: "vasanth",
    //     lastName: "gummidi",
    //     age: "23",
    //     gender: "male",
    //   },
    //   {
    //     firstName: "pavani",
    //     lastName: "kumari",
    //     age: "23",
    //     gender: "female",
    //   },
    //   {
    //     firstName: "siri",
    //     lastName: "jampa",
    //     age: "23",
    //     gender: "female",
    //   },
    // ],
    data: {
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
    currentId: -1,
    show: false,
  };
  //get request

  componentDidMount = async () => {
    await axios
      .get("/persons")
      .then((res) => res.data)
      .then((data) => {
        console.log(data);

        this.setState({ users: data });
      });
  };

  // // post request

  componentWillMount = async () => {
    await axios
      .post("/persons")
      .then((res) => res.data)
      .then((data) => {
        this.setState({ users: data });
      });
  };
  //update
  // componentWillMount = async (id) => {
  //   await axios
  //     .put(`/persons/${id}`)
  //     .then((res) => res.data)
  //     .then((data) => {
  //       this.setState({ users: data });
  //     });
  // };

  //delete

  edit = (id) => {
    this.showModel();
    this.updatedPerson(id);
  };
  updatedPerson = (person) => async (id) => {
    // console.log(person._id);
    await axios.put(`/persons/${person._id}`);

    this.setState({
      data: this.state.users[id],
      currentId: id,
      errors: {
        firstName: "",
        lastName: "",
        age: "",
        gender: "",
      },
    });
    console.log(this.state.users[id]);
  };

  delete = (id) => {
    this.deletePerson(id);
  };

  deletePerson = async (id) => {
    await axios.delete(`/persons/${id}`);
    this.setState({
      users: this.state.users.filter((person) => person._id != id),
    });
  };

  validate = () => {
    this.setState({
      errors: {
        firstName: this.state.data.firstName == "",
        lastName: this.state.data.lastName == "",
        age: this.state.data.age == "",
        gender: this.state.data.gender == "",
      },
    });
    return (
      this.state.data.firstName == "" ||
      this.state.data.lastName == "" ||
      this.state.data.age == "" ||
      this.state.data.gender == ""
    );
  };

  submitData = () => {
    if (this.validate()) return;
    // if (this.state.data != "") {
    if (this.state.currentId == -1) {
      console.log(this.state.currentId);
      this.setState({
        users: [...this.state.users, this.state.data],
        data: {
          firstName: "",
          lastName: "",
          age: "",
          gender: "",
        },
      });
    } else {
      const newList = this.state.users.map((person, i) => {
        if (this.state.currentId == i) {
          return this.state.data;
        } else {
          return person;
        }
      });
      this.setState({
        users: newList,
        currentId: -1,
        // users: [...this.state.users, this.state.data],
        data: { firstName: "", lastName: "", age: "", gender: "" },
      });
    }
  };
  // this.setState({
  //   users: [...this.state.users, this.state.data],
  //   data: { firstName: "", lastName: "", age: "", gender: "" },
  // });

  onChange = (field, value) => {
    this.setState({
      data: { ...this.state.data, [field]: value },
      errors: {
        ...this.state.errors,
        [field]: this.state.data.age == null || "" ? true : false,
      },
    });
  };
  clearFields = (e) => {
    // e.preventDefault();
    this.setState({
      data: { firstName: "", lastName: "", age: "", gender: "" },
    });
  };

  showModel = () => {
    // e.preventDefault();
    this.setState({ show: true });
  };

  closeModel = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <div>
        <MyVerticallyCenteredModal
          show={this.state.show}
          showModel={this.showModel}
          closeModel={this.closeModel}
          submitData={this.submitData}
          change={this.onChange}
          data={this.state.data}
          errors={this.state.errors}
          currentId={this.state.currentId}
          clearFields={this.clearFields}
          onSubmit={this.onSubmit}
        />
        {/* <Form /> */}
        <Table users={this.state.users} edit={this.edit} delete={this.delete} />
      </div>
    );
  }
}

export default Register;
