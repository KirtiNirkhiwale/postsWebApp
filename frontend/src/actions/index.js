import axios from 'axios'
export const INCREMENT_REQUESTED = 'INCREMENT_REQUESTED'
export const INCREMENT = 'INCREMENT'
export const DECREMENT_REQUESTED = 'DECREMENT_REQUESTED'
export const DECREMENT = 'DECREMENT'
export const REGISTER_DATA = 'REGISTER_DATA'
export const LOGIN_DATA = 'LOGIN_DATA'
export const ADD_POST_DATA = 'ADD_POST_DATA'
export const ALL_POST_DATA = 'ALL_POST_DATA'
export const A_POST_DATA = 'A_POST_DATA'
export const UPDATE_POST_DATA = 'UPDATE_POST_DATA'
export const DELETE_POST_DATA = 'DELETE_POST_DATA'

const API_URL = 'http://localhost:8080'

export function registerUser(userData) {
  return dispatch => {
      return axios.post(`${API_URL}/users/register`, userData)
          .then(response => {
              const result = response.data;
              dispatch({type: REGISTER_DATA, data: result});
          })
          .catch(({...error}) => {
              const result = error.response.data;
              dispatch({type: REGISTER_DATA, data: result});
              throw (error);
          });
  };
}

export function loginUser(userData) {
  return dispatch => {
      return axios.post(`${API_URL}/users/login`, userData)
          .then(response => {
              const result = response.data;
              dispatch({type: LOGIN_DATA, data: result});
          })
          .catch(({...error}) => {
              const result = error.response.data;
              dispatch({type: LOGIN_DATA, data: result});
              throw (error);
          });
  };
}

export function addPost(item) {
  return dispatch => {
      return axios.post(`${API_URL}/posts/insert`, item)
          .then(response => {
              const result = response.data;
              dispatch({type: ADD_POST_DATA, data: result});
          })
          .catch(({...error}) => {
              const result = error.response.data;
              dispatch({type: ADD_POST_DATA, data: result});
              throw (error);
          });
  };
}

export function deletePost(id) {
  let postID = {
    postID: id,
  }
  return dispatch => {
      return axios.post(`${API_URL}/posts/delete`, postID)
          .then(response => {
              const result = response.data;
              dispatch({type: DELETE_POST_DATA, data: result});
          })
          .catch(({...error}) => {
              const result = error.response.data;
              dispatch({type: DELETE_POST_DATA, data: result});
              throw (error);
          });
  };
}

export function allPost() {
  return dispatch => {
      return axios.get(`${API_URL}/posts/get-data`)
          .then(response => {
              const result = response.data;
              dispatch({type: ALL_POST_DATA, data: result});
          })
          .catch(({...error}) => {
              const result = error.response.data;
              dispatch({type: ALL_POST_DATA, data: result});
              throw (error);
          });
  };
}

export function updatePost(item) {
  return dispatch => {
      return axios.post(`${API_URL}/posts/update`, item)
          .then(response => {
              const result = response.data;
              dispatch({type: UPDATE_POST_DATA, data: result});
          })
          .catch(({...error}) => {
              const result = error.response.data;
              dispatch({type: UPDATE_POST_DATA, data: result});
              throw (error);
          });
  };
}

export const increment = () => {
    return dispatch => {
      dispatch({
        type: INCREMENT_REQUESTED
      })
  
      dispatch({
        type: INCREMENT
      })
    }
  }
  
  export const incrementAsync = () => {
    return dispatch => {
      dispatch({
        type: INCREMENT_REQUESTED
      })
  
      return setTimeout(() => {
        dispatch({
          type: INCREMENT
        })
      }, 3000)
    }
  }
  
  export const decrement = () => {
    return dispatch => {
      dispatch({
        type: DECREMENT_REQUESTED
      })
  
      dispatch({
        type: DECREMENT
      })
    }
  }
  
  export const decrementAsync = () => {
    return dispatch => {
      dispatch({
        type: DECREMENT_REQUESTED
      })
  
      return setTimeout(() => {
        dispatch({
          type: DECREMENT
        })
      }, 3000)
    }
  }