import React from 'react'
import { AuthCard } from '../components/Cards'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Header from '../components/Header'
import CreateBookForm from '../components/CreateBookForm'
import { FileUploader } from "react-drag-drop-files";
import { useLocation, useNavigate, useParams } from 'react-router'
import axios from 'axios'
import { APP_URL } from '../utils/apiCalls'
import { toast } from 'react-toastify'



const UpdateBook = (props) => {

    const getDetails = useLocation()
    const {id} = useParams()
    const navigate = useNavigate()

    const handleSubmit = async (values, resetForm) => {
        try {
            await axios.put(`${APP_URL}/books/${id}`, {
                ...values
            }).then((res) => {
                toast.success(res.data.message)
                navigate("/")
            })
            resetForm()
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className=''>
            <Header />
            <div className='title_header p-md '>
                <h2 className='title_head_md'>Update a book</h2>
                <span className='border-line'></span>
            </div>
            <div className='create-container'>
                <div>
                    <CreateBookForm defaultValue={getDetails.state} handleSubmit={handleSubmit} isUpdate={true} />
                </div>
            </div>
        </div>
    )
}

export default UpdateBook