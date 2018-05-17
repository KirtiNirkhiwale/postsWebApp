import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom'
import Login from './login'
import AllPosts from './allPosts'
import AddPost from './addPost'
import UpdatePost from './updatePost'
import Register from './register'
import Header from './header'
import Redirect from 'react-router-dom/Redirect';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = { isLoggedin: false } ;
  }
 
  componentWillMount(){
    let username = localStorage.getItem('username');
    if(username) {
      this.setState({
        isLoggedin: true,
      })
    }
  }

  render() {
    if(this.state.isLoggedin) {
      return (
        <div>
          <Header />
          <main>
            <Switch>
              <Route path="/allPosts" component={AllPosts} />
              <Route path="/addPost" component={AddPost} />
              <Route path="/updatePost" component={UpdatePost} />
              <Redirect exact from='/' to='/allPosts'/>
            </Switch>
          </main>
        </div>
      );
    } else {
      return (
        <div>
          <Header />
          <main>
            <Switch>
              <Route path="/register" component={Register} />
              <Route exact path="/" component={Login} />
            </Switch>
          </main>
        </div>
      );
    }
  }
}
export default App;