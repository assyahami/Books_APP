import React, { useEffect, useState } from 'react'
import { AuthCard, ProductCard } from '../components/Cards'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Header from '../components/Header'
import CreateBookForm from '../components/CreateBookForm'
import { FileUploader } from "react-drag-drop-files";
import axios from 'axios'
import { APP_URL, BASE_URL, GETAPI, apiCalls } from '../utils/apiCalls'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import ReactModal from 'react-modal'
import { customStyles } from '../components/FilterOptions'


let styles = {
    ...customStyles, content: {
        width: window.innerWidth <= 480 ? "100%" : "50%",
        left: window.innerWidth <= 480  ? "0":'25%',
        right: '25%',

    }
}
const CreateBook = () => {
    const [data, setData] = useState([])
    const dispatch = useDispatch()
    const token = localStorage.getItem("authToken")
    const [open, setOpen] = useState(false)

    const handleGETMybooks = async () => {
        try {
            const getMybooks = await axios.get(BASE_URL + "/users/profile", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch({
                type: "SETLIST",
                payload: getMybooks.data.data.mybooks,
            })
            setData(getMybooks.data.data.mybooks)
        } catch (error) {
            console.log(error);
        }
    }

    const handleRemoveBooks = async (indx, id) => {

        try {
            setData((prev) => prev.filter((item, index) => index !== indx))
            await apiCalls("/users/delete_written_book/" + id, {}, 'put', toast, token)
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        handleGETMybooks()
    }, [])


    const handleFormSubmit = async (values) => {
        try {
            const createBook = await axios.post(`${APP_URL}/books`, {
                ...values
            }).then(async (res) => {
                toast.success(res.data.message)
                await apiCalls("/users/add_written_book", { ...values, id: Date.now() }, 'put', toast, token)
                handleGETMybooks()
                handleCloseCreateDialog()
            })
        } catch (error) {
            console.log(error);
        }
    }

    const handleOpenCreateDialog = () => { setOpen(true) }
    const handleCloseCreateDialog = () => { setOpen(false) }
    return (
        <div className=''>
            <Header />

            <div>
                <ReactModal
                    isOpen={open}
                    onRequestClose={handleCloseCreateDialog}
                    style={styles}
                >
                    <h4 className='txt-center'>Create a Book</h4>
                    <CreateBookForm handleSubmit={handleFormSubmit} />
                </ReactModal>
            </div>

            <div className='mybooks-header'>
                <div className='title_header p-md '>
                    <h2 className='title_head_md'>Create a book</h2>
                    <span className='border-line'></span>
                </div>
                <div onClick={handleOpenCreateDialog}>
                    <button className='submit_btn'>Create</button>
                </div>
            </div>
            <div className='center_div' style={{ marginTop: 25 }}>
                {data.length <= 0 && <div className='center_div'>
                    <h2>Your not written any boys</h2>
                </div>}
            </div>
            <div className='p-lg list-cards list-card-container'>
                {
                    data?.map((item, index) => {
                        return (
                            <div key={item.id}>
                                <ProductCard itCanEdit={true} index={index} handleRemoveBooks={handleRemoveBooks} itCanDelete={true} isShortList={false} {...item} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default CreateBook