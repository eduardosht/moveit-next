import React, { useState } from "react";
import { Link } from "@reach/router";

import { auth, generateUserDocument, signInWithGoogle } from '../../firebase';

import styles from '../../styles/pages/Login.module.css';

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);

  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    }
  };

  const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
    event.preventDefault();
    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      generateUserDocument(user, { displayName });
    }
    catch (error) {
      setError('Error Signing up with email and password');
    }

    setEmail("");
    setPassword("");
    setDisplayName("");
  };


  return (
    <div className={styles.signInContainer}>
      <div className={styles.signInContainerBox}>
        <h1 className="m-b-24">Cadastrar</h1>
        <button className={`m-b-24 ${styles.iconImage}`} onClick={signInWithGoogle}>
          <img src="google-icon.webp" alt="Google+" />
        </button>
        <div>
          {error !== null && (
            <div>
              {error}
            </div>
          )}
          <form className={styles.form}>
            <input
              type="text"
              className={styles.inputSignIn}
              name="displayName"
              value={displayName}
              placeholder="E.g: Faruq"
              id="displayName"
              onChange={event => onChangeHandler(event)}
            />
            <input
              type="email"
              className={styles.inputSignIn}
              name="userEmail"
              value={email}
              placeholder="Ex: exemplo@gmail.com"
              id="userEmail"
              onChange={event => onChangeHandler(event)}
            />
            <input
              type="password"
              className={`m-b-16 ${styles.inputSignIn}`}
              name="userPassword"
              autoComplete="password"
              value={password}
              placeholder="Digite sua senha"
              id="userPassword"
              onChange={event => onChangeHandler(event)}
            />
            <button
              className={`m-b-16 ${styles.buttonConfirm}`}
              onClick={event => {
                createUserWithEmailAndPasswordHandler(event, email, password);
              }}
            >
              Cadastrar
            </button>
          </form>
          <p className="m-b-8">ou</p>
          <p>
            Já possui uma conta? &nbsp;
            <Link to="/">
              Entre aqui.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default SignUp;