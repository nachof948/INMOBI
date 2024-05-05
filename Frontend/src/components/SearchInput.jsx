import { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { searchGet } from '../redux/actions/listing';

const SearchInput = () => {
	const [search, setSearch] = useState('');
  const navegar = useNavigate()
  const dispatch = useDispatch()
  
	const handleSubmit = (e) =>{
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
		urlParams.set('search', search);
		const searchQuery = urlParams.toString();
    dispatch(searchGet(searchQuery))
		navegar(`/search?${searchQuery}`);
  }
  
	useEffect(() => {
		const urlParams = new URLSearchParams(location.search);
		const searchTerm = urlParams.get('search');
		if(searchTerm){
			setSearch(searchTerm)
		}
	},[location.search])

  return(
    <form onSubmit={handleSubmit} className="border p-3 rounded-lg flex items-center">
          <input 
            type="text" 
            placeholder="Busca tu casa ideal..."
            className="bg-transparent outline-none w-24 md:w-80 sm:w-40 text-white placeholder:text-white "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button>
            <FaSearch className='text-slate-300 cursor-pointer'/>
          </button>
    </form>
  )
}

export { SearchInput }