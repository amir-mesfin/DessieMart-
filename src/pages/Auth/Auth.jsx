import React from 'react';
import styles from './Signup.module.css';
import { FcGoogle } from 'react-icons/fc';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

const Auth = () => {
  const [isLogin, setIsLogin] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h2 className={styles.authTitle}>
          {isLogin ? 'Sign In' : 'Create Account'}
        </h2>

        <button className={styles.googleButton}>
          <FcGoogle className={styles.googleIcon} />
          Continue with Google
        </button>

        <div className={styles.divider}>
          <span className={styles.dividerLine}></span>
          <span className={styles.dividerText}>OR</span>
          <span className={styles.dividerLine}></span>
        </div>

        <form className={styles.authForm}>
          <div className={styles.inputGroup}>
            <FiMail className={styles.inputIcon} />
            <input
              type="email"
              placeholder="Email"
              className={styles.authInput}
            />
          </div>

          <div className={styles.inputGroup}>
            <FiLock className={styles.inputIcon} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={styles.authInput}
            />
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          <button type="submit" className={styles.submitButton}>
            {isLogin ? 'Sign In' : 'Register'}
          </button>
        </form>

        <div className={styles.authFooter}>
          <button
            className={styles.toggleAuth}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin
              ? 'New to Dessie Mart? Create account'
              : 'Already have an account? Sign in'}
          </button>
          <button className={styles.forgotPassword}>Forgot password?</button>
        </div>
      </div>
    </div>
  );
};

export default Auth;