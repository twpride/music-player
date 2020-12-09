import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const currentUser = useSelector(state => state.session.currentUser);
  return (
    <Route>
      {currentUser ? <Component {...rest} /> : <Redirect to="/" />}
    </Route>
  );
}

export const AuthRoute = ({ component: Component, ...rest }) => {
  const currentUser = useSelector(state => state.session.currentUser);
  return (
    <Route>
      {currentUser ? <Redirect to="/" /> : <Component {...rest} />}
    </Route>
  );
}