import React, { useState, useEffect } from 'react'
import { ProductCard } from '../components/Cards'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'

const BooksShortList = () => {
    const [data, setData] = useState([])
    const dispatch = useDispatch()
    const { shortlist } = useSelector((state) => state.userReducer)

    useEffect(() => {
        let localStore = localStorage.getItem("shortlist")
        let getShortList = JSON.parse(localStore) || []
        setData(shortlist.length > 0 ? shortlist : getShortList)
    }, [])

    const handleRemoveBooks = (indx) => {
        setData((prev) => prev.filter((item, index) => index !== indx))
        dispatch({
            type: "SETLIST",
            payload: data,
        })
    }

    return (
        <div>
            <Header />
            <div className='title_header '>
                <h2 className='title_head_md'>Shortlisted</h2>
                <span className='border-line'></span>
            </div>
            <div className=' list-cards list-card-container'>
                {
                    data?.map((item, index) => {
                        return (
                            <div key={item.id}>
                                <ProductCard itCanEdit={false} index={index} handleRemoveBooks={handleRemoveBooks} itCanDelete={true} isShortList={true} {...item} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default BooksShortList