import React, { Component } from 'react';
import Form from './Form';
import Table from './Table';

export class Register extends Component {
  state = {
    users: [
      {
        firstname: 'praveen',
        lastname: 'surisetty',
        age: '23',
        gender: 'male',
      },
      {
        firstname: 'naidu',
        lastname: 'bandaru',
        age: '25',
        gender: 'male',
      },
      {
        firstname: 'sravani',
        lastname: 'jampa',
        age: '23',
        gender: 'female',
      },
    ],
    data : {
        firstname: '',
        lastname: '',
        age: '',
        gender: '',
    },
    errors: {
      firstname: '',
      lastname: '',
      age: '',
      gender: '',
    },
  };

  edit = (id) => {
    this.setState({
      data: this.state.users[id],
    });
   console.log(this.state.users[id])
  };

  delete = (id) => {
    this.setState({ users : this.state.users.filter((person, i)=> i != id) });
  };

   validate = () => {
    this.setState({
      errors: {
        firstname: this.state.data.firstname == '',
        lastname: this.state.data.lastname == '',
        age: this.state.data.age == '',
        gender: this.state.data.gender == '',
      },
    });
    return (
      this.state.data.firstname == '' ||
      this.state.data.lastname == '' ||
      this.state.data.age == '' ||
      this.state.data.gender == ''
    );
  };

  submitData = () => {
    if (this.validate()) return;
    this.setState({
      users: [...this.state.users, this.state.data],
      data: { firstname: '', lastname: '', age: '', gender: '' }
    });
  };

  onChange= (field, value)=> {
    this.setState({data: {...this.state.data, [field]:value}, 
     errors: {
        ...this.state.errors,
        [field]: this.state.data.age == null || '' ? true : false,
      },})
  }

  render() {
    return (
      <div>
        <Form submitData={this.submitData} change={this.onChange} data={this.state.data} errors={this.state.errors}/>
        <Table users={this.state.users} edit={this.edit} delete={this.delete} />
      </div>
    );
  }
}

export default Register;
