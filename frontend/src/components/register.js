import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import {registerUser} from '../actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class Register extends Component {

  constructor(props) {
    super(props);
  }
 
  submit = values => {
    this.props.registerUser(values).then(() => {
        localStorage.setItem('username', this.props.registerUserData.message.username);
        this.props.history.push('/allPosts');
        setTimeout(function(){ window.location.reload(); }, 1000);       
    }).catch(() => {
        alert(this.props.registerUserData.message);
    });
  }
  renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div className="form-group">
        <label htmlFor="inputName">{label}</label>
        <input {...input} placeholder={label} type={type} className="form-control" />
        {touched && error && <span className="error">{error}</span>}
    </div>
  )
  render() {
    const { handleSubmit } = this.props;        
    return (
        <div className="register" >
            <div className="card card-outline-secondary">
                <div className="card-header">
                    <h3 className="mb-0">Register</h3>
                </div>
                <div className="card-body  justify-content-center">
                    <form className="form" role="form" autoComplete="off" onSubmit={handleSubmit(this.submit)}>
                        <Field type="text" id="inputName" name="name" className="form-control" component={this.renderField} label="Full name" />
                        <Field type="email" id="inputEmail3" name="email"  component={this.renderField} label="Email" />
                        <Field type="text" id="inputUserName" name="username" className="form-control" component={this.renderField} label="Username" />
                        <Field type="password" id="inputPassword" name="password" className="form-control" component={this.renderField} label="Password" />
                        <Field type="password" id="inputVerify" name="password2" className="form-control" component={this.renderField} label="Password (again)" />
                        <div className="form-group">
                            <button type="submit" className="btn btn-success btn-lg float-right">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
  }
}
const validate = values => {
    const errors = {}
    if (!values.username) {
      errors.username = 'Required'
    } else if (values.username.length < 4) {
      errors.username = 'Must be 4 characters or more'
    }
    if (!values.name) {
        errors.name = 'Required'
    } else if (values.name.length < 4) {
        errors.name = 'Must be 4 characters or more'
    }

    if (!values.email) {
        errors.email = 'Required'
    }

    if (!values.password) {
        errors.password = 'Required'
    }
    if (!values.password2) {
        errors.password2 = 'Required'
    }

    if(values.password2 !== values.password) {
        errors.password2 = 'Pasword does not match'
    }

    return errors
}

Register = reduxForm({
    form: 'register',
    validate
})(Register)

const mapStateToProps = state => ({
    registerUserData: state.data.registerUserData
})
  
const mapDispatchToProps = dispatch => bindActionCreators({
    registerUser,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register)