import React from 'react'
import { AuthCard } from '../components/Cards'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Header from '../components/Header'
import { APP_URL, apiCalls } from '../utils/apiCalls'
import axios from 'axios'
import { toast } from 'react-toastify'

const validationSignUp = Yup.object({
    title: Yup.string().required('Title is required').min(3, 'Title must be at least 3 characters'),
    author: Yup.string().required('Author is required').min(3, 'Author must be at least 3 characters'),
    country: Yup.string().required('Country is required'),
    language: Yup.string().min(2, 'Language must be at least 3 characters').required('Language is required'),
    year: Yup.string().required('Year is required')
})

const CreateBookForm = (props) => {

    const handleFormSubmit = async (values, resetForm) => {
        try {
            await props.handleSubmit(values)
            resetForm()
        } catch (error) {
            console.log(error);
            toast.warning(error.response.data.message)
        }
    }
    let bookData = props.defaultValue
    return (
        <div className=''>
            <div>
                <Formik
                    initialValues={{
                        title: bookData?.title || '',
                        author: bookData?.author || '',
                        country: bookData?.country || '',
                        language: bookData?.language || '',
                        year: bookData?.year || '',
                        link: bookData?.link || '',
                    }}
                    validationSchema={validationSignUp}
                    onSubmit={(values, { resetForm }) => handleFormSubmit(values, resetForm)}
                >
                    {({ handleSubmit, handleChange, resetForm, values, errors }) => (
                        <div className='create-form'>
                            <div className=''>
                                <div>
                                    <label htmlFor="title">Title*</label>
                                    <input type="text" className='input_field' placeholder='Enter a title' onChange={handleChange} name='title' value={values.title} />
                                    <span className='err-msg'>{errors.title}</span>
                                </div>
                                <div>
                                    <label htmlFor="author">Author*</label>
                                    <input type="text" className='input_field' placeholder='Enter a author' onChange={handleChange} name='author' value={values.author} />
                                    <span className='err-msg'>{errors.author}</span>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label htmlFor="country">country *</label>
                                    <input type="country" className='input_field' placeholder='Enter a country-ID' onChange={handleChange} name='country' value={values.country} />
                                    <span className='err-msg'>{errors.country}</span>
                                </div>
                                <div>
                                    <label htmlFor="laguage">laguage *</label>
                                    <input type="text" className='input_field' placeholder='Enter a laguage' onChange={handleChange} name='language' value={values.language} />
                                    <span className='err-msg'>{errors.language}</span>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label htmlFor="year">Year *</label>
                                    <input type="text" className='input_field' placeholder='Enter a year' onChange={handleChange} name='year' value={values.year} />
                                    <span className='err-msg'>{errors.year}</span>
                                </div>
                                <div>
                                    <label htmlFor="Link">Link *</label>
                                    <input type="text" className='input_field' placeholder='Enter a laguage' onChange={handleChange} name='link' value={values.link} />
                                    <span className='err-msg'>{errors.link}</span>
                                </div>
                            </div>
                            <div className='w_100'>
                                <button type='submit' className='submit_btn w_50   ml-auto mr-auto' onClick={() => handleSubmit(values, resetForm)}>{
                                    props.isUpdate ? "Update" : "Create"
                                }</button>
                            </div>
                        </div>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default CreateBookForm