import React, { useState } from "react";
import { Link } from "@reach/router";

import { auth, signInWithGoogle } from '../../firebase';

import styles from '../../styles/pages/Login.module.css';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === 'userEmail') {
      setEmail(value);
    }
    else if (name === 'userPassword') {
      setPassword(value);
    }
  };

  function signInWithEmailAndPasswordHandler(event, email, password) {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password).catch(error => {
      setError("Usuário ou senha inválida!");
      console.error("Usuário ou senha inválida", error);
    });
  };

  return (
    <React.Fragment>
      {error !== null && <div className={styles.errorBox}>{error}</div>}
      <div className={styles.signInContainer}>
        <div className={styles.signInContainerBox}>
          <h1 className="m-b-24">Entrar no app</h1>
          <button className={`m-b-24 ${styles.iconImage}`} onClick={signInWithGoogle}>
            <img src="google-icon.webp" alt="Google+" />
          </button>
          <div>
            <p className="m-b-8">ou use sua conta</p>
            <form className={styles.form}>
              <input
                type="email"
                className={styles.inputSignIn}
                name="userEmail"
                value={email}
                placeholder="Ex: exemplo@gmail.com"
                id="userEmail"
                onChange={(event) => onChangeHandler(event)}
              />
              <input
                type="password"
                className={`m-b-16 ${styles.inputSignIn}`}
                autoComplete="password"
                name="userPassword"
                value={password}
                placeholder="Digite sua senha"
                id="userPassword"
                onChange={(event) => onChangeHandler(event)}
              />
              <button className={`m-b-16 ${styles.buttonConfirm}`} onClick={(event) => { signInWithEmailAndPasswordHandler(event, email, password) }}>
                Entrar
              </button>
            </form>
            <p>
              <span className="m-b-8" style={{ display: 'block' }}>
                Não tem uma conta? &nbsp;
                <Link to="signUp">
                  Registre aqui
                </Link>
              </span>
              <span>
                <Link to="passwordReset">
                  Esqueceu sua senha?
                </Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default SignIn;