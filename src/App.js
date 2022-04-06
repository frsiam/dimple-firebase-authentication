import './App.css';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import app from './firebase.init';
import { useState } from 'react';

const auth = getAuth(app)

function App() {

  const [user,setUser] = useState({})

  const googleProvider = new GoogleAuthProvider()
  const githubProvider = new GithubAuthProvider()
  // google sign in 
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
    .then(res => {
      const user = res.user
      setUser(user)
      console.log(user)
    })
    .catch(error => {
      console.error(error)
    })
  }
  // github sign in 
  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
    .then(res => {
      const user = res.user
      setUser(user)
      console.log(user)
    })
    .catch(error => {
      console.error(error)
    })
  }
  // sign out 
  const handleSignOut = () => {
    signOut(auth)
    .then(res => {
      setUser({})
    })
    .catch(error => {
      setUser({})
    })
  }
  return (
    <div className="App">
      {
        user.uid ?
        <button onClick={handleSignOut}>Sign Out</button>
        :
        <>
          <button onClick={handleGoogleSignIn}>Google Sign In</button>
          <button onClick={handleGithubSignIn}>Github Sign In</button>
        </>
      }
      <h1>Name: {user.displayName}</h1>
      <h4>Email: {user.email}</h4>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
