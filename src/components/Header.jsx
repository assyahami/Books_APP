import React from 'react'
import logo from '../assets/images/logo.png'
import Search from './Search'
import { FaUserCircle } from 'react-icons/fa'
import { AiOutlineHeart } from 'react-icons/ai'
import { GiNotebook } from 'react-icons/gi'
import { Link } from 'react-router-dom'

const Header = ({ isHome }) => {
    let localStore = localStorage.getItem("shortlist")
    let getShortList = JSON.parse(localStore) || []


    return (
        <>
            <div className='app-header'>
                <a href={'/'} className='links'>
                    <div className='flex_row'>
                        <img src={logo} width={'50px'} alt="" />
                        <h4>BK</h4>
                    </div>
                </a>
                <div className='user_info'>
                    <div>
                        <Link to={'/book/create'}>
                            <button className='outline_btn'>
                                Books
                                &nbsp;
                                <GiNotebook size={15} />
                            </button>
                        </Link>
                    </div>
                    <Link to={'/book/shortlist/1'} className='links'>
                        <span>
                            <AiOutlineHeart size={20} />
                            {getShortList?.length}
                        </span>
                    </Link>
                    <span>
                        <FaUserCircle size={20} />
                    </span>
                </div>
            </div>
            {isHome && <div className='search-filter-options '>
                <Search />
            </div>}
        </>
    )
}

export default Header