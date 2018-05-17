import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import {addPost} from '../actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { routeActions, push } from 'react-router-redux'

class AddPost extends Component {

  constructor(props) {
    super(props);
  }
 
  submit = values => {
    let props = {...values};
    props.author = 'kirti'; //TODO - make it dynamic after login
    this.props.addPost(props).then(() => {
        this.props.history.push('/allPosts');
    }).catch(() => {
        alert(this.props.addPostData);
    });
  }
  renderField = ({ input, label, type, meta: { touched, error } }) => {
    if(type === 'textarea') {
      return (
        <div className="form-group">
            <label htmlFor="inputName">{label}</label>
            <textarea {...input} placeholder={label} className="form-control"  />
            {touched && error && <span className="error">{error}</span>}
        </div>
      )
    } else {
      return (
        <div className="form-group">
            <label htmlFor="inputName">{label}</label>
            <input type={type} {...input} placeholder={label} className="form-control" />
            {touched && error && <span className="error">{error}</span>}
        </div>
      )
    }
  } 
  render() {
    const { handleSubmit } = this.props;        
    return (
        <div className="add-post" >
            <div className="card card-outline-secondary">
                <div className="card-header">
                    <h3 className="mb-0">Add Post</h3>
                </div>
                <div className="card-body  justify-content-center">
                    <form className="form" role="form" autoComplete="off" onSubmit={handleSubmit(this.submit)}>
                        <Field type="text" id="inputTitle" name="title" className="form-control" component={this.renderField} label="Title" />
                        <Field type="textarea" id="inputContent" name="content"  component={this.renderField} label="Content" />
                        <div className="form-group">
                            <button type="submit" className="btn btn-success btn-lg float-right">Add Post</button>
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
    if (!values.title) {
      errors.title = 'Required'
    } 
    if (!values.password) {
        errors.content = 'Required'
    }
  
    return errors
  }

AddPost = reduxForm({
    form: 'addPost',
    validate
})(AddPost)

const mapStateToProps = state => ({
    addPostData: state.data.addPostData
})
  
const mapDispatchToProps = dispatch => bindActionCreators({
    addPost,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddPost)