import React,{useEffect,useState} from 'react';
import './Post.css';
import Avatar from "@material-ui/core/Avatar";
import {db} from "./firebase";
import firebase from 'firebase'
import { Button, Input } from '@material-ui/core';

function Post({username,postID,user,caption,imgurl}) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    useEffect(() => {
        let unsubscribe;
        if(postID) {
            unsubscribe = db
                .collection('posts')
                .doc(postID)
                .collection("comments")
                .orderBy('timeStamp','desc')
                .onSnapshot( snapshot =>{
                    setComments(snapshot.docs.map((doc) => doc.data()));
                });
        }
        return () =>{
            unsubscribe();
        };
        
    }, [postID]);
    
    const postComment = event =>{
        event.preventDefault();
        db.collection('posts').doc(postID).collection('comments').add({
            text: comment,
            username: user.displayName,
            timeStamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setComment('');
    }
    return ( 
        <div className = "post">
            <div className = "post__header">
                <Avatar className = "post__avatar"
                src = "data:image/jpeg;base64,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" />
                <h3 >{username}</h3> 
                { /* Header -> avtar + user name */ } 
            </div>
            
            <img className = "post__image"
            src = {imgurl}  alt="mohit"/> 
            { /* Img  */ } 
            <h4 className = "post__text" > <strong>{username} : </strong>{caption}</h4> 
            { /* username + caption */ } 
            {/* post comments */}
            <div className="post__comment">
                {comments.map(comment =>(
                    <p>
                        <strong>{comment.username} </strong> {comment.text}
                    </p>
                ))}
            </div>
            {/* Add comments... */}
            {user && (
                <form className="post__commentBox">
                <Input
                    className="post__input"
                    type="text"
                    placeholder="Add comment..."
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                />
                <Button
                    className="post__button"
                    disabled={!comment}
                    type="submit"
                    onClick={postComment}
                >
                    post
                </Button>
            </form>
            )}
        </div>
    );
}
export default Post;