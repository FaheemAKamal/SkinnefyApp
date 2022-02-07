import * as React from 'react';
import firebase from './firebaseConfig';

var auth = firebase.auth();

export const userContext = React.createContext({
    user: null,
});

export const useSession = () => {
  const { user } = React.useContext(userContext);
  return user;
}

export const useAuth = () => {
    const [state, setState] = React.useState(() => { 
        const user = firebase.auth().currentUser;
        return { initializing: !user, user, } 
    })
    function onChange(user) {
        setState({ initializing: false, user });
    }
    React.useEffect(() => {
        // listen for auth changes
        const unsubscribe = firebase.auth().onAuthStateChanged(onChange);
        // unsubscribe to the listener when unmounting
        return () => unsubscribe();
    }, []);
    return state;
}

export function logout() {
    auth.signOut().then(() => console.log("User Signed out"))
    .catch(() => console.log(error.message));
}

export function loginWithPassword(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
}