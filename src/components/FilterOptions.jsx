import React, { useState } from 'react'
import Search from './Search'
import Select from 'react-select'
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillCloseCircle } from 'react-icons/ai';


export const customStyles = {
    content: {
        top: '60%',
        zIndex: '99999',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
const FilterOptions = ({ getBooksList }) => {
    const { openFilter, books } = useSelector((state) => state.bookReducer)
    const dispatch = useDispatch()
    const [filterVal, setFilterVal] = useState({
        country: '',
        language: '',

    })

    const handleCloseFilter = async () => {
        dispatch({
            type: "CLOSEFILTER",
        })
    }

    const handleChange = async (options, select) => {
        setFilterVal({ ...filterVal, [select.name]: options.value })
    }

    const handleSubmitFilter = async () => {
        try {
            console.log(filterVal);
            dispatch({
                type: "FILTERBOOK",
                payload: {
                    ...filterVal
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
    console.log(books);
    return (
        <div>
            <Modal
                isOpen={openFilter}
                onRequestClose={handleCloseFilter}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className='flex_row filter-header'>
                    <h4>Filter options</h4>
                    <button onClick={handleCloseFilter}><AiFillCloseCircle /></button>
                </div>
                <div className='filter-options'>
                    <div >
                        <span>Country:</span>
                        <Select options={countryValues} placeholder="Select a country" name='country' onChange={handleChange} />
                    </div>

                    <div >
                        <span>Language:</span>
                        <Select options={langValues} placeholder="Select a language" name='language' onChange={handleChange} />
                    </div>
                    <div className='w_100'>
                        <button className='submit_btn w_100' onClick={handleSubmitFilter}>Submit</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
const countryValues = [
    { value: 'india', label: 'India' },
    { value: 'uk', label: 'UK' },
    { value: 'usa', label: 'USA' }
]
const langValues = [
    { value: 'English', label: 'English' },
    { value: 'hindi', label: 'hindi' },
]


export default FilterOptions