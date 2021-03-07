import { Router, RouteComponentProps } from "@reach/router";
import { useContext, useEffect } from "react";

import { UserContext } from "../../contexts/UserContext";
import Home from "../aplication";


import PasswordReset from "./PasswordReset";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

function Login() {
  const { user } = useContext(UserContext);

  return (
    user.user != null ?
      <Home level={0} currentExperience={0} challengesCompleted={0} />
      :
      <Router>
        <RouterPage pageComponent={<SignUp />} path="signUp" />
        <RouterPage pageComponent={<SignIn />} path="/" />
        <RouterPage pageComponent={<PasswordReset />} path="passwordReset" />
      </Router>
  );
}

const RouterPage = (
  props: { pageComponent: JSX.Element } & RouteComponentProps
) => props.pageComponent;

export default Login;