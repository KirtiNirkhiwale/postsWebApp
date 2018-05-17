import React, { Component } from 'react';
import {allPost} from '../actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


function Blog(props) {
  const content = props.posts.map((post) =>
    <div key={post._id} onClick={props.openPost.bind(this, post )} className="post-col">
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <hr />
    </div>
  );
  return (
    <div>
      {content}
    </div>
  );
}

class AllPost extends Component {

  constructor(props) {
    super(props);
    this.state = { allPosts: null } ;
  }
 
  componentWillMount() {
    this.props.allPost().then(() => {
      let reverseArray = this.props.allPostData.message.reverse();
      this.setState({
        allPosts: reverseArray
      });
    }).catch(() => {
        alert(this.props.allPostData);
    });
  }   
  openPost = post => {
    this.props.history.push({
      pathname: '/updatePost',
      state: { postID: post._id, title:post.title, content:post.content, author:post.author }
    })
  }
  render() {
    
    const { handleSubmit } = this.props;        
    return (
        <div className="all-post" >
            <div className="card card-outline-secondary">
                <div className="card-header">
                    <h3 className="mb-0">All Post</h3>
                </div>
                <div className="card-body  justify-content-center">
                {this.state.allPosts ? <Blog openPost={this.openPost} posts={this.state.allPosts} /> : ''}                  
                </div>
            </div>
        </div>
    )
  }
}

const mapStateToProps = state => ({
    allPostData: state.data.allPostData
})
  
const mapDispatchToProps = dispatch => bindActionCreators({
    allPost,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AllPost)