/** @jsxImportSource @emotion/react */
import { Route, Switch, Redirect } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useStore } from "./stores";
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import TodoMain from './pages/TodoMain';
import TodoPriority from './pages/TodoPriority';
import Mypage from './pages/Mypage';
import { layout } from "./styles"

const App = observer(({ ...rest }) => {
  const { userStore } = useStore();

  return (
    <div css={layout.root}>
      <Switch>
        <Route exact path="/">
          <Redirect to="/todo-main" />
        </Route>
        <Route path="/login" render={() => (!userStore.isUser ? (<Login />) : (<Redirect to="/todo-main" />))} />
        <Route path="/register" render={() => (!userStore.isUser ? (<Register />) : (<Redirect to="/todo-main" />))} />
        <PrivateRoute>
          <Route path="/todo-main" component={TodoMain} />
          <Route path="/todo-priority" component={TodoPriority} />
          <Route path="/mypage" component={Mypage} />
        </PrivateRoute>
      </Switch>
    </div>
  )
})

const PrivateRoute = observer(({ children, ...rest }) => {
  const { userStore } = useStore();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        userStore.isUser ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  )
})

export default App;
