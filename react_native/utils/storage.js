import * as React from 'react';
import firebase from './firebaseConfig';

var storage = firebase.storage();

// for most functions we also need access to the db API
var db = firebase.firestore();

export async function uploadDiagnosisSequence(user, payload, image) {
    /* require the user so that the image is stored correctly in 
    the storage bucket. the title is used to name the file, while image
    is a json with a key for the base64 encoded string */
    let suffix = Math.round(Math.random() * 10000);
    const path = "diagnoses/" + user + "/" + payload.title.toLowerCase().replace(/ /g, "_") + "_" + suffix.toString() + ".jpg"; 
    var storageRef = storage.ref();

    const response = await fetch(image.uri);
    const blob = await response.blob();

    var uploadTask = storageRef.child(path).put(blob);

    const saveToDatabase = async () => {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        try {
            const url = await uploadTask.snapshot.ref.getDownloadURL();
            const diagnosisDocRef = await db.collection("diagnoses").add({
                user: user,
                image: url,
                created: timestamp,
            });
            const userDocRef = await db.collection("users").doc(user).update({
                diagnoses: firebase.firestore.FieldValue.arrayUnion(diagnosisDocRef.id),
            })        
        } catch (err) { console.log(err); }
        finally {
            console.log("Completed this.")
        }
    }

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function(snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        }, function(error) {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            console.log(error.code);
        }, saveToDatabase
    );
}