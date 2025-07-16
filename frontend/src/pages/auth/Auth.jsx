import React,{useState,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import styles from './Signup.module.css';
import DessieMartLogo from '../../assets/image/DessieMartLogo.png'; 
import { FcGoogle } from 'react-icons/fc';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import {auth} from '../../utility/firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth';
import {Type} from '../../utility/action.type'
import {DataContext} from '../../component/dataProvider/DataProvider'
const Auth = () => {
  const [isLogin, setIsLogin] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);
  const [email,setEmail]= useState('');
  const [password,setPassword]= useState("");
  const [error,setError]= useState("");
  const [{user},dispatch] = useContext(DataContext)
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // console.log(email);
  // console.log(user);
  const authHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      if (event.target.name === "signin") {
        const userInfo = await signInWithEmailAndPassword(auth, email, password);
        dispatch({
          type: Type.SET_USER,
          user: userInfo.user
        });
        navigate('/'); // Redirect after login
      } else {
        const newUserInfo = await createUserWithEmailAndPassword(auth, email, password);
        dispatch({
          type: Type.SET_USER,
          user: newUserInfo.user
        });
        navigate('/'); // Redirect after signup
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


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
            {/* create Error message  */}
            {error && (
                <div className={styles.errorMessage}>
                  {error}
                </div>
          )}
           <button 
                  type="submit" 
                  className={styles.submitButton}
                  onClick={authHandler} 
                  name={isLogin ? "signin" : "signup"}
                  disabled={loading || !email || !password}
                >
                  {loading ? (
                    <div className={styles.buttonContent}>
                      <ClipLoader 
                        color="#ffffff" 
                        size={20} 
                        cssOverride={{ marginRight: '8px' }} 
                      />
      
                    </div>
                  ) : (
                    isLogin ? 'Sign In' : 'Register'
                  )}
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