import React,{useState} from 'react';
import styles from './Signup.module.css';
import DessieMartLogo from '../../assets/image/DessieMartLogo.png'; 
import { FcGoogle } from 'react-icons/fc';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import {auth} from '../../utility/firebase'
const Auth = () => {
  const [isLogin, setIsLogin] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);
  const [email,setEmail]= useState('');
  const [password,setPassword]= useState("");
  const [error,setError]= useState("");
  // console.log(password);
  // console.log(email);
const authHandler = (event) =>{
event.preventDefault();
console.log(event.target.name);
}


  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.logoContainer}>
          <img src={DessieMartLogo} alt="DessieMart Logo" className={styles.logo} />
          <h1 className={styles.brandName}>DessieMart</h1>
        </div>
        
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
              onChange={(e)=> setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className={styles.inputGroup}>
            <FiLock className={styles.inputIcon} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={styles.authInput}
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          <button 
                 type="submit" 
                 className={styles.submitButton}
                 onClick={authHandler} 
                 name={isLogin ? "signin" : "signup"}>
            {isLogin ? 'Sign In' : 'Register'}
          </button>
        </form>

        <div className={styles.authFooter}>
          <button
            className={styles.toggleAuth}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin
              ? 'New to DessieMart? Create account'
              : 'Already have an account? Sign in'}
          </button>
          <button className={styles.forgotPassword}>Forgot password?</button>
        </div>
      </div>
    </div>
  );
};

export default Auth;