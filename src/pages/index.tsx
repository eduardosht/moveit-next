import { UserProvider } from "../contexts/UserContext";
import Login from './login/Login';

function LoginPage() {
  return (
    <UserProvider>
      <Login />
    </UserProvider>
  );
}

export default LoginPage;