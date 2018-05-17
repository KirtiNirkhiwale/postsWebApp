import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import {loginUser} from '../actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class Login extends Component {

  constructor(props) {
    super(props);
  }
 
  submit = values => {
    this.props.loginUser(values).then(() => {
        localStorage.setItem('username', this.props.loginUserData.message.username);
        this.props.history.push( '/allPosts');
        setTimeout(function(){ window.location.reload(); }, 1000);
    }).catch(() => {
        alert(this.props.loginUserData.message);
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
        <div className="login" >
            <div className="card card-outline-secondary">
                <div className="card-header">
                    <h3 className="mb-0">Login</h3>
                </div>
                <div className="card-body  justify-content-center">
                    <form className="form" role="form" autoComplete="off" onSubmit={handleSubmit(this.submit)}>
                        <Field type="text" id="inputUserName" name="username" className="form-control" component={this.renderField} label="Username" />
                        <Field type="password" id="inputPassword" name="password" className="form-control" component={this.renderField} label="Password" />
                        <div className="form-group">
                            <button type="submit" className="btn btn-success btn-lg float-right">Login</button>
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
    if (!values.password) {
        errors.password = 'Required'
    }

    return errors
}

Login = reduxForm({
    form: 'login',
    validate
})(Login)

const mapStateToProps = state => ({
    loginUserData: state.data.loginUserData
})
  
const mapDispatchToProps = dispatch => bindActionCreators({
    loginUser,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)