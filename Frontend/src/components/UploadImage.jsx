import { useRef, useState, useEffect } from 'react'
import { getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { useSelector } from 'react-redux'
import { app } from '../firebase'

const UploadImage = () => {
  const {user} = useSelector((state) => state.auth)
  const fileRef = useRef(null)
  const [file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0)
  const [fileError, setFileError] = useState(false)

  const uploadImage = () =>{
    fileRef.current.click()
  }

  useEffect(() => {
    if(file){
      handleFileUpload(file)
    }
  },[file])

  const handleFileUpload = (file) =>{
    const storage = getStorage(app);
    const fileName = new Date().getTime().file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
    (snapshot) =>{
      const progress = (snapshot.bytesTransferred /
      snapshot.totalBytes) * 100;
      setFilePerc(Math.rounded(progress))
    });
    (error) => {
      setFileError(true)
    }
  }

  return(
    <>
    <input 
          ref={fileRef}  
          type="file" 
          hidden 
          accept='image/*'
          onChange={(e) => setFile(e.target.files[0])}
          />
        <img src={user?.result?.imageProfile} alt={user?.result?.username}
        onClick={uploadImage}
        className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2 '  />
    </>
  )
}

export { UploadImage }