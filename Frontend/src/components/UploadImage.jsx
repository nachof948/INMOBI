import { useRef, useState, useEffect } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { useSelector } from 'react-redux'
import { app } from '../firebase'

const UploadImage = ({ onImageChange }) => {
  const {user} = useSelector((state) => state.auth)
  const fileRef = useRef(null)
  const [file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0)
  const [fileError, setFileError] = useState(false)
  const [formData, setFormData] = useState({})


  const uploadImage = () =>{
    fileRef.current.click()
  }

  useEffect(() => {
    if(file){
      handleFileUpload(file)
    }
  },[file])

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + '_' + file.name; // Corrige la concatenación del nombre del archivo
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
  
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress)); // Asumo que setFilePerc es una función que actualiza el progreso de la carga del archivo
      },
      (error) => {
        setFileError(true); // Si hay un error durante la carga del archivo, establece el estado de error a true
        console.error(error); // Asegúrate de manejar el error de manera adecuada, aquí simplemente se imprime en la consola
      },
      () => {
        // Cuando la carga se completa con éxito, obtén la URL de descarga del archivo y actualiza el estado formData
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, imageProfile: downloadURL });
          onImageChange(downloadURL)
        }).catch((error) => {
          console.error(error); // Maneja cualquier error al obtener la URL de descarga
        });
      }
    );
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
    <img src={formData.imageProfile || user?.result?.imageProfile} alt={user?.result?.username}
      onClick={uploadImage}
      className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2 '  />
    <p className='text-center'>
      {fileError ? 
      (<span className='text-red-700'>Error al cargar la imagen</span>)
      :
      filePerc > 0 && filePerc < 100 ? (
        <span className='text-slate-700'>
          {`Cargando ${filePerc}%`}
        </span>)
      :
      filePerc === 100 ? (
        <span className='text-green-700'>Imagen cargada</span>
      )
      :(
        ""
      )
    }
      </p>
    </>
    
  )
}

export { UploadImage }