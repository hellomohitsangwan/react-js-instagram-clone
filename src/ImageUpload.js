import React , {useState} from 'react';
import { Button, Input } from '@material-ui/core';
import firebase from "firebase";
import {storage, db} from './firebase';
import './ImageUpload.css';
function ImageUpload({username}) {
    const [caption,setCaption] = useState('');
    const [progress,setProgress] = useState(0);
    const [image,setImage] = useState(null);
    const handelChange = e =>{
        if(e.target.files[0]) {
            setImage(e.target.files[0])
        }
    };
    const handelUpload = () =>{
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        

        uploadTask.on(
            "state_changed",
            (snapshort) =>{
                //progress function...
                const progress = Math.round(
                    (snapshort.bytesTransferred / snapshort.totalBytes) *100
                );
                setProgress(progress);
            },
            (error) =>{
                //Error function
                console.log(error);
                alert(error.message);
            },
            () =>{
                // complete function 

                // get me dowanload link
                storage
                    .ref('images')
                    .child(image.name)
                    .getDownloadURL()
                    .then(url =>{
                        //post images inside db
                        db.collection("posts").add({
                            timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imgurl: url,
                            username: username
                        })
                    })

                    setProgress(0);
                    setCaption('');
                    setImage(null);
            }

        )
    }
    return (
        <div className="imageUpload">
          {/* I want to have... */}
          {/* Caption input */}
          {/* File picker */}
          {/* Post button */}
          <progress className="imageupload__progress" value={progress} max="100"/>
          <Input className="uploadItemss" type="text" placeholder="Enter a caption..." onChange={event =>{
              setCaption(event.target.value)
          }} value={caption}/>
          <Input className="uploadItemss" type="file" onChange={handelChange}/>
          <Button disabled={!Input} className="uploadItemss" onClick={handelUpload}>
              upload
          </Button>
        </div>
    )
}

export default ImageUpload;
