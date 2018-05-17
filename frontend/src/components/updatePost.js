import React, { Component } from 'react';
import { updatePost, deletePost } from '../actions'
import { Field, reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class GetAPost extends Component {

  constructor(props) {
    super(props);
    this.state = {  getAPost: null, postTitle: "", postContent: "" } ;
  }
 
  componentWillMount() {
      this.setState({
        postTitle: this.props.location.state.title,
        postContent: this.props.location.state.content,
      });
  }  
  
  componentDidMount() {
    this.props.autofill('title', this.props.location.state.title);
    this.props.autofill('content', this.props.location.state.content);
    this.props.autofill('postID', this.props.location.state.postID);
  }
  submit = values => {
      let props = {...values};
      props.author = 'kirti'; //TODO - make it dynamic after login
      this.props.updatePost(props).then(() => {
          this.props.history.push('/allPosts');
      }).catch(() => {
          alert(this.props.updatePostData);
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
  deletePost(postID) {
    this.props.deletePost(postID).then(() => {
      this.props.history.push('/allPosts');
    }).catch(() => {
        alert(this.props.deletePostData);
    });
  }
  render() {
    const { handleSubmit } = this.props;        
    return (
        <div className="update-post" >
            <div className="card card-outline-secondary">
                <div className="card-header">
                    <h3 className="mb-0">Update Post</h3>
                </div>
                <div className="card-body  justify-content-center">
                    <form className="form" role="form" autoComplete="off" onSubmit={handleSubmit(this.submit)}>
                      <Field type="hidden" id="inputID" name="postID" className="form-control" component={this.renderField} label="" />
                      <Field type="text" id="inputTitle" name="title" className="form-control" component={this.renderField} label="Title" />
                      <Field type="textarea" id="inputContent" name="content"  component={this.renderField} label="Content" />
                      <div className="form-group row">
                        <div className="col-xs-12 col-sm-6 col-lg-6" >
                          <button type="submit" className="btn btn-success btn-lg float-right">Update Post</button>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-lg-6" >
                          <button type="button" className="btn btn-success btn-lg float-right" onClick={this.deletePost.bind(this, this.props.location.state.postID)}>Delete Post</button>
                        </div>
                      </div>
                    </form>
                </div>
            </div>
        </div>
    )
  }
}

const mapStateToProps = state => ({
    updatePostData: state.data.updatePostData,
    deletePostData: state.data.deletePostData
})
  
const mapDispatchToProps = dispatch => bindActionCreators({
  updatePost,
  deletePost
}, dispatch)

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

GetAPost = reduxForm({
  form: 'updatePost',
  validate
})(GetAPost)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GetAPost)