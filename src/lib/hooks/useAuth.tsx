import { useState, useEffect, useContext, createContext } from "react";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
export type IUser = object | boolean | null;
export type IAuth = {
  user: IUser,
  signin: Function,
  signup: Function,
  signout: Function
}
const initialState: IAuth = {
  user: null,
  signin: () => {},
  signup: () => {},
  signout: () => {}
}

const firebaseConfig = {
  apiKey: "AIzaSyAZHt8XTQKNkPOCAcFJ-6ukeKZ9mqDwUWY",
  authDomain: "auth-fc3c0.firebaseapp.com",
  databaseURL: "https://auth-fc3c0.firebaseio.com",
  projectId: "auth-fc3c0",
  storageBucket: "auth-fc3c0.appspot.com",
  messagingSenderId: "839503353780",
  appId: "1:839503353780:web:cc4e9c747b26a8315dc4e1"
};
const app = initializeApp(firebaseConfig);
const messages: { [x: string]: any } = {
  'auth/user-not-found': 'Credentials not correct',
  'auth/email-already-in-use': 'Email already exists',
  'auth/invalid-email': 'Email not valid',
  'auth/weak-password': 'Password should be at least 6 characters long',
  'auth/wrong-password': 'Password is not correct',
  'auth/missing-email': 'Missing Email',
  'auth/internal-error': 'Internal Error',
  'auth/too-many-requests': 'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.'
};
const AuthContext = createContext(initialState);
const renderError = (err: any) => {
  console.warn({ err, message: err.message, code: err.code, formattedMessage: messages[err.code] || '' })
  return messages[err.code] || ''
}
export const auth = getAuth(app)
export function AuthProvider({ children }: any) {
  const auth = useAuthProvider();
  const { user } = auth || {}
  return <AuthContext.Provider value={auth}>{user !== null ? children: null}</AuthContext.Provider>;
}
export const useAuth = () => {
  const data = useContext(AuthContext);
  return data;
};
function useAuthProvider() {
  const [user, setUser] = useState<IUser>(null);
  const signin = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const accessToken = await result.user.getIdToken();
      localStorage.setItem('accessToken', accessToken)
    } catch (err) {
      return { error: renderError(err) }
    }
  }; 
  const signup = async (email: string, password: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const accessToken = await result.user.getIdToken();
      setUser(result.user);
      localStorage.setItem('accessToken', accessToken)
    } catch (err) {
      return { error: renderError(err) }
    }
  };
  const signout = async () => {
    await signOut(auth)
    setUser(false);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });
    return () => unsubscribe();
  }, []);
  
  return {
    user,
    signin,
    signup,
    signout,
  };
}