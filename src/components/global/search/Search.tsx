import { useContext, useState } from 'react'
import { colors } from '../../../utilities/constans'
import { PlusSampleIcon } from '../icons/Icons'
import { ContextRoad } from '../../road/RoadContext'
import './search.css'

interface Props{
    filterSomething: (nameFilter: string) => void,
    placeHolder: string,
    handleClear: () => void,
}
const SearchInput = ({ filterSomething, placeHolder, handleClear}: Props) => {

  const [search, setSearch] = useState('')
  const contextValues = useContext(ContextRoad);

  if(!contextValues)return

  const {setShowModal} = contextValues

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    filterSomething(value);
    setSearch(value)
  }
  const handleClearSearch = () => {
    setSearch('')
    handleClear();
  }

  return (
    <section className='search-bar'>
      <div className='content-search'>
        <input
          className='input'
          placeholder={placeHolder}
          value={search}
          onChange={(e) => handleOnChange(e)}
        />
        <p className='btn-close btn-close-search' onClick={handleClearSearch}></p>
      </div>
      <div className='search-btns' onClick={() => setShowModal(true)}>
        <PlusSampleIcon color={colors.COLOR_MAIN}/>
        <button className='btn-new-search' >
          Nuevo</button>
      </div>
    </section>
  )
}

export default SearchInput;