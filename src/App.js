import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Post';
import { db ,auth } from './firebase';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button , Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';
import InstagramEmbed from 'react-instagram-embed';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts,setpost] = useState([]);
  const [open,setOpen] = useState(false);
  const [openSignIn,setSignIn] = useState('');
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [email,setEmail] = useState('');
  const [user, setUser] = useState(null);
  //UseEffect : Run a pice of code based on a specific condition
  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser) {
        // user has logged in...
        console.log(authUser);
        setUser(authUser);
      }else {
        // user has logged out...
        setUser(null);
      }
    });

    return () =>{
      // perform some clean up action
      unsubscribe();
    }
  },[user,username])
  useEffect(()=> {
    // this is where code runs
    // run every tiime variable change
    db.collection('posts').orderBy('timeStamp', 'desc').onSnapshot(snapshot =>{
      // every time a new post is added fire this code
      setpost(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })
      ));
    })
  },[]);
  const signUp = event =>{
    event.preventDefault();

    auth
    .createUserWithEmailAndPassword(email,password)
    .then((authUser) =>{
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch(error => alert(error.message))

    setOpen(false)
  }

  const signIn = event =>{
    event.preventDefault();

    auth
    .signInWithEmailAndPassword(email,password)
    .catch(erroe => alert(erroe.message))

    setSignIn(false);
  }
  return (
    <div className="App">
      <Modal
        open={open}
        onClose={() => setOpen(false)}> 
          <div style={modalStyle} className={classes.paper}>
            <form className="app__signUp">
              <center>
                <img className="app__headerImage"
                  src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                  alt=""
                />
              </center>
              <Input 
                  placeholder="Username"
                  type="text"
                  value={username}
                  onChange = {e=> setUsername(e.target.value)}
              />
              <Input 
                  placeholder="email"
                  type="text"
                  value={email}
                  onChange = {e=> setEmail(e.target.value)}
              />
              <Input 
                  placeholder="password"
                  type="password"
                  value={password}
                  onChange = {e=> setPassword(e.target.value)}
              />
              <Button onClick={signUp} type="submit">Sign up</Button>
            </form>
            
          </div>
        </Modal>
      <Modal
        open={openSignIn}
        onClose={() => setSignIn(false)}> 
          <div style={modalStyle} className={classes.paper}>
            <form className="app__signUp">
              <center>
                <img className="app__headerImage"
                  src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                  alt=""
                />
              </center>
              <Input 
                  placeholder="email"
                  type="text"
                  value={email}
                  onChange = {e=> setEmail(e.target.value)}
              />
              <Input 
                  placeholder="password"
                  type="password"
                  value={password}
                  onChange = {e=> setPassword(e.target.value)}
              />
              <Button onClick={signIn} type="submit">Log In</Button>
            </form>
            
          </div>
        </Modal>
      <div className="app__header">
        <img className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        alt=""/>
        {user ? (
        <Button onClick={()=> auth.signOut()}>LogOut</Button>
        ): (
        <div className="app__loginContainer">
        <Button onClick={()=> setSignIn(true)}>Log In</Button>
        <Button onClick={()=> setOpen(true)}>Sign Up</Button>
        </div>
      )}
      </div>

{user &&      <div className="app__posts">
          
            {
              posts.map( ({id,post}) => (
                <Post key ={id} postID={id} user={user} username={post.username} caption={post.caption} imgurl={post.imgurl} avatarurl={post.avatarurl} />
              ))
            }
          
      </div>}
      
    {/* {window.matchMedia("max-width : 739px") ?         <div className="app__postsRight">
            <InstagramEmbed
              url='https://www.instagram.com/p/B8HXS8aHXxh/?utm_source=ig_web_copy_link'
              maxWidth={320}
              hideCaption={false}
              containerTagName='div'
              protocol=''
              injectScript
              onLoading={() => {}}
              onSuccess={() => {}}
              onAfterRender={() => {}}
              onFailure={() => {}}
            />
      </div> : null} */}

      
      {user ? (
        <ImageUpload username={user.displayName}/>
      ) : (
          <div className="starting">
            <h2 className="starting_items">Hey! thanks for opening this instagram-clone website made by mohit sangwan</h2>
            <h3 className="starting_items">please log in  or sign up to continue with this website,it is a very basic version of instagram which i have made , it includes user authentication,adding posts,comments and much more.For better experience open in laptop/pc or tablet.</h3>
            <p className="starting_items">feel free and very safe to add any post and logging in/signing up your all data will be safe and saved in firebase which is a google server and is encrypyted which means no one access it without you.</p>
   </div>
    )}
    </div>
  );
}

export default App;
