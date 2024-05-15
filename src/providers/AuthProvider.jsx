import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';
import useAxios from '../hooks/useAxios';


export const AuthContext = createContext(null);
const auth = getAuth(app);

// social providr 
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {

    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxios()

    const createUser = async (email, password) => {
        setLoading(true);
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            const newUser = result.user;
            await updateProfile(newUser, { displayName: '', photoURL: '' });
            setUser(newUser);
            return result;
        } catch (error) {
            setLoading(false);
            console.log (error);
        }
    };

    const signInWithGoogle = () =>{
       return signInWithPopup(auth, googleProvider)
    }

    const signIn  = (email, password) => {
        setLoading(true)
       return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () =>{
        setLoading(true)
        return signOut(auth)
    }

    useEffect(() =>{
      const unSubscribe = onAuthStateChanged(auth, currentUser =>{
            // console.log('Current user', currentUser);
            const userEmail = currentUser?.email || user?.email
            const loggedUser = {email : userEmail}
            setUser(currentUser)
            setLoading(false)
            // console.log(currentUser)
            // if user 
            if(currentUser){
                axiosSecure.post('/jwt', loggedUser)
                .then(res =>{
                    console.log(res.data)
                })
            }
            else{
                axiosSecure.post('/logout', {email: user?.email})
                .then(res => {
                    console.log(res.data)
                })
            }
        })
        return () =>{
            unSubscribe();
        }
    },[ user?.email, axiosSecure])
 
    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut,
        signInWithGoogle,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;