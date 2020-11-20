import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

// const mapSTP = (state) => ({
//   loggedIn: Boolean(state.session.currentUser),
//   user: state.session.currentUser,
// })


// export const AuthRouteOld = ({ loggedIn, path, exact, component: Component, user }) => (
//   <Route
//     path={path}
//     exact={exact}
//     render={props => (
//       loggedIn ? <Redirect to={`/${user.username}`} /> : <Component {...props} />
//     )}
//   />
// )
// export const ProtectedRoute = ({ loggedIn, path, exact, component: Component }) => (
//   <Route
//     path={path}
//     exact={exact}
//     render={props => (
//       loggedIn ? <Component {...props} /> : <Redirect to={'/'} />
//     )}
//   />
// )

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
      {currentUser ? <Component {...rest} /> : <Redirect to="/sign" />}
    </Route>
  );
}