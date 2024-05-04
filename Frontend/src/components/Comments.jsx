import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { listDeleteOpinion, listGet, listOpinion } from "../redux/actions/listing"

const Comments = () => {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const { id } = useParams()
  const [formData, setFormData] = useState('')
  const {list} = useSelector((state) => state.listing)
  
  useEffect(() => {
    dispatch(listGet(id))
  },[dispatch, id])
   console.log(list.comments)

  const handleChange = (e) =>{
    setFormData(e.target.value)
  }
  const handleSubmit = (e) =>{
    e.preventDefault();
    dispatch(listOpinion(id, formData, user?.result?._id))
  }
  const deleteComment = (id, formData, userId) =>{
    dispatch(listDeleteOpinion(id, formData, userId ))
  }
  return(
    <>
    <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
      <textarea 
        name="comments" 
        className='w-full relative resize-none rounded-md outline-none p-3 bg-slate-800 text-white placeholder:text-white' 
        placeholder='Agrega tu comentario...'
        onChange={handleChange}
      />
      <button 
        type='submit' 
        className='self-end w-fit bg-slate-400 text-center text-lg transition-all duration-250 uppercase p-3 rounded-md text-white hover:bg-slate-800'
        onClick={handleSubmit}
      >
        Enviar
      </button>
    </form>
    <div>
      {list.comments.map((opinion, index) =>(
        <div className=""key={index}>
                    <textarea 
          
          name="comments" 
          className='w-full relative resize-none rounded-md outline-none p-3 bg-slate-800 text-white placeholder:text-white' 
          value={opinion.text}
          readOnly={true}
          disabled={true}
        />
        <button onClick={() => deleteComment(id, opinion.text, user?.result?._id)}>X</button>
        </div>
      ))}
    </div>
    </>
  )
}

export { Comments }