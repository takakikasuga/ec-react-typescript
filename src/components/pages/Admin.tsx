import React, { useState } from 'react'
import { strage } from '../../firebase/firebase'
import firebase from 'firebase'
import { uploadItemData } from '../../features/admin/adminSlice'
// import firebase from 'firebase'
import { useDispatch } from 'react-redux';
export const Admin = () => {
  const [image, setImage] = useState<null | any>(null)
  const [name, setName] = useState(null)
  const [description, setDescription] = useState(null)
  const [price_m, setPrice_m] = useState(null)
  const [price_l, setPrice_l] = useState(null)
  const [progress, setProgress] = useState(0)
  const dispatch = useDispatch()

  const handleChange = (e: any) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }
  const handleName = (e: any) => {
    e.preventDefault()
    setName(e.target.value)
  }
  const handleDescription = (e: any) => {
    setDescription(e.target.value)
  }
  const handlePrice_m = (e: any) => {
    e.preventDefault()
    setPrice_m(e.target.value)
  }
  const handlePrice_l = (e: any) => {
    e.preventDefault()
    setPrice_l(e.target.value)
  }

  const handleUpload = () => {
    let itemObject = {
      image: image,
      name: name,
      description: description,
      price: {
        m: price_m,
        l: price_l,
      }
    }
    dispatch(uploadItemData(itemObject))
    // const uploadTask = strage.ref(`images/${image.name}`).put(image);
    // uploadTask.on(
    //   "state_changed",
    //   snapshot => {
    //     const progress = Math.round(
    //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //     )
    //     setProgress(progress)
    //   },
    //   error => {
    //     console.log(error)
    //   }, dispatch(uploadItemData())
    //   () => {
    //     strage
    //       .ref("images")
    //       .child(image.name)
    //       .getDownloadURL()
    //       .then((url) => {
    //         console.log(url)
    //         setProgress(0)
    //         let itemObject = {
    //           imagePath: image,
    //           name: name,
    //           description: description,
    //           price: {
    //             m: price_m,
    //             l: price_l,
    //           }
    //         }



    //         // firebase
    //         //   .firestore()
    //         //   .collection(`items/`)
    //         //   .add(itemObject)
    //         //   .then((doc) => {
    //         //     console.log(doc.id)
    //         //   })
    //         //   .catch((error) => {
    //         //     console.log(error)
    //         //   })
    //       })
    //   }
    // )

  }
  console.log("image", image)
  return (
    <div>
      <p>Forestore Upload</p>
      <progress value={progress} max="100" />
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
      Name：<input type="text" onChange={handleName} />
      Description：<input type="text" onChange={handleDescription} />
      M：<input type="text" onChange={handlePrice_m} />
      L：<input type="text" onChange={handlePrice_l} />
    </div>
  )
}
