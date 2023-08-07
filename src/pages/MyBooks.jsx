import React from 'react'
import { ProductCard } from '../components/Cards'
import Header from '../components/Header'

const MyBooks = () => {
    return (
        <div>
            <Header/>
            
            <div className='title_header p-lg'>
                <h2 className='title_head_md'>My books</h2>
                <span className='border-line'></span>
            </div>
            <div className='p-lg'>
                <ProductCard itCanEdit={true} itCanDelete={true} isShortList={false}/>
            </div>
        </div>
    )
}

export default MyBooks