import { getDownloadURL, getStorage, uploadBytesResumable, ref } from "firebase/storage";
import { useState, useEffect } from "react";
import { app } from "../firebase";
import { DELETE_IMAGE} from "../constants/index"
import { useDispatch } from "react-redux";

const UploadImageList = ({ onImageChange, imageUrl }) => {
  const dispatch = useDispatch()
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState(imageUrl || []);
  const [cargando, setCargando] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);

  useEffect(() => {
    setImageUrls(imageUrl || []);
  }, [imageUrl]);

  const handleImageSubmit = (e) => {
    e.preventDefault();
    if (images.length > 0 && images.length < 7) {
      setCargando(true);
      const promises = [];
      for (let i = 0; i < images.length; i++) {
        promises.push(storeImage(images[i]));
      }
      Promise.all(promises)
        .then((urls) => {
        setImageUrls([...imageUrls, ...urls]);
        onImageChange([...imageUrls, ...urls]);
        setImageUploadError(false);
        setCargando(false);
        })
        .catch(() => {
          setImageUploadError("Fallo la carga de las imagenes");
        });
    } else {
      setImageUploadError("Solo puedes subir 6 imagenes");
    }
  };

  const storeImage = async (image) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const imageName = new Date().getTime() + "_" + image.name;
      const storageRef = ref(storage, imageName);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_change",
        (snapshot) => {
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              resolve(downloadURL);
            })
            .catch((error) => {
              reject(error);
            });
        }
      );
    });
  };
// Para obtener el valor actualizado, usa una función de callback
const handleRemoveImage = (index) => {
  setImageUrls(prevImageUrls => {
      const updatedImageUrls = prevImageUrls.filter((_, i) => i !== index);
      return updatedImageUrls;
  });
  dispatch({type: DELETE_IMAGE, payload: imageUrls})
};

  return (
    <>
      <div className="flex items-center gap-4">
        <input
          className="p-3 border border-gray-300 rounded w-full"
          type="file"
          name="images"
          accept="image/*"
          multiple
          onChange={(e) => setImages(e.target.files)}
        />
        <button
          type="button"
          disabled={cargando}
          onClick={handleImageSubmit}
          className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
        >
          {cargando ? "Subiendo..." : "Subir"}
        </button>
      </div>
      <p className="text-red-700">{imageUploadError && imageUploadError}</p>
      {imageUrls.length > 0 &&
        imageUrls.map((url, index) => (
          <div className="flex items-center justify-between p-3 border border-slate-300 rounded-lg" key={index}>
            <img src={url} alt="Casa publicada" className="h-24 object-contain rounded-lg" />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
            >
              Eliminar
            </button>
          </div>
        ))}
    </>
  );
};

export { UploadImageList };
