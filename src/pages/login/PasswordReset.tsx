import React, { useState } from "react";
import { Link } from "@reach/router";

import styles from '../../styles/pages/Login.module.css';

function PasswordReset() {
  const [email, setEmail] = useState("");
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
  const [error, setError] = useState(null);
  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    }
  };
  const sendResetEmail = event => {
    event.preventDefault();
  };
  return (
    <div className={styles.signInContainer}>
      <div className={styles.signInContainerBox}>
        <h1 className="m-b-24">Recuperar senha</h1>
        <div>
          <form action="" className={styles.form}>
            {emailHasBeenSent && (
              <div>
                Um e-mail foi enviado para você!
              </div>
            )}
            {error !== null && (
              <div>
                {error}
              </div>
            )}
            <input
              type="email"
              name="userEmail"
              id="userEmail"
              value={email}
              placeholder="Seu e-mail"
              onChange={onChangeHandler}
              className={`m-b-16 ${styles.inputSignIn}`}
            />
            <button className={`m-b-16 ${styles.buttonConfirm}`}>Recuperar senha</button>
          </form>
          <Link to="/">
            &larr; voltar para página de acesso
            </Link>
        </div>
      </div>
    </div>
  );
};
export default PasswordReset;