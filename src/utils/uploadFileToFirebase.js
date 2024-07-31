import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import app from '../config/firebaseConfig.js';

const storage = getStorage(app);

const uploadFileToFirebase = (file, path) => {
    return new Promise((resolve, reject) => {
        const storageRef = ref(storage, path);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                // Optional: track upload progress
            },
            (error) => {
                console.error('Upload failed:', error);
                reject(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        resolve(downloadURL);
                    })
                    .catch((error) => {
                        console.error('Error getting download URL:', error);
                        reject(error);
                    });
            }
        );
    });
};

export default uploadFileToFirebase;