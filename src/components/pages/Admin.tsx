import React, { useState } from 'react'
import firebase from 'firebase'
import { strage } from '../../firebase/firebase'

export const Admin = () => {
  const [image, setImage] = useState(null)
  const [progress, setProgress] = useState(0)

  const handleChange = (e: any) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const handleUpload = () => {
    const uploadTask = strage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )
        setProgress(progress)
      },
      error => {
        console.log(error)
      },
      () => {
        strage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url)
            setProgress(0)
          })
      }
    )

  }
  console.log("image", image)
  return (
    <div>
      <p>Forestore Upload</p>
      <progress value={progress} max="100" />
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  )
}
