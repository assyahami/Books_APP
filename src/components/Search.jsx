import React, { useState } from 'react'
import Menu, { SubMenu, MenuItem } from 'rc-menu'
import { AiFillFilter, AiOutlineSearch } from 'react-icons/ai'
import { GETAPI } from '../utils/apiCalls'
import { useDispatch } from 'react-redux'
import { BsFilter } from 'react-icons/bs'

const Search = (props) => {
    const [searchVal, setSearchVal] = useState('')
    const dispatch = useDispatch()

    const handleSearch = async () => {
        try {
            if (searchVal.length <= 3) {
                return
            }
            const getBooks = await GETAPI(`/books?title=${searchVal}`)
            dispatch({
                type: "GETBOOK",
                payload: {
                    data: getBooks.data,
                    pagination: getBooks.pagination,
                }
            })
            setSearchVal("")
        } catch (error) {
            console.log(error);
        }
    }

    const handleOpenFilter = async () => {
        try {
            dispatch({
                type: "OPENFILTER",
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='search-container'>
            <div className='w_100'>
                <button type='submit' className='submit_btn filter' onClick={() => handleOpenFilter()} ><BsFilter size={15} /></button>
                <input type="text" value={searchVal} onChange={(e) => setSearchVal(e.target.value)} className='input_field search' placeholder='Search a book' />
                <button type='submit' className='submit_btn search-btn' onClick={() => handleSearch()} >Search <AiOutlineSearch size={15} /></button>
            </div>
            <div>
            </div>
        </div>
    )
}


export default Search