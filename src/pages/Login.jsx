import React from 'react'
import { AuthCard } from '../components/Cards'
import { Formik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { toast } from 'react-toastify'
import { apiCalls } from '../utils/apiCalls'
import { useDispatch } from 'react-redux'
import { loginUser } from '../store/user/actions'
import { useNavigate, useNavigation } from 'react-router'

const validationSignUp = Yup.object({
    email: Yup.string().matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please enter a valid Email-ID').required('Email-ID number is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
})

const Login = () => {
    let dispatch = useDispatch()
    let navigate = useNavigate()
    const handleFormSubmit = async (values, resetForm) => {
        try {
            let payload = {
                email: values.email,
                password: values.password,
            }
            const findUser = await apiCalls("/users/login", payload, "post", toast)
            let getData = findUser.data
            window.localStorage.setItem('authToken', getData.token)
            navigate('/')
            dispatch({
                type: "LOGIN",
                payload: {
                    user: getData.user,
                    shortlist: getData.user.shortlist,
                    authToken: getData.authToken,
                }
            })
            resetForm()
        } catch (error) {

        }
    }

    return (
        <div className='auth-container'>
            <div className='overlay'></div>
            <div>
                <AuthCard heading={'Login'}>
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                        validationSchema={validationSignUp}
                        onSubmit={(values, resetForm) => handleFormSubmit(values, resetForm)}
                    >
                        {({ handleSubmit, resetForm, handleChange, values, errors }) => (
                            <div className='signup-form'>
                                <div>
                                    <label htmlFor="email">Email *</label>
                                    <input type="email" className='input_field' placeholder='Enter a Email-ID' onChange={handleChange} name='email' value={values.email} />
                                    <span className='err-msg'>{errors.email}</span>
                                </div>
                                <div>
                                    <label htmlFor="Password">Password *</label>
                                    <input type="password" className='input_field' placeholder='Enter a password' name='password' onChange={handleChange} value={values.password} />
                                    <span className='err-msg'>{errors.password}</span>
                                </div>
                                <div>
                                    <button type='submit' className='submit_btn' onClick={() => handleFormSubmit(values, resetForm)}>Submit</button>
                                </div>
                            </div>
                        )}
                    </Formik>
                </AuthCard>
            </div>
            <div className='book-quotes'>
                <h2>
                    “If you only read the books that everyone else is reading, you can only think what everyone else is thinking.”
                </h2>
            </div>
        </div>
    )
}

export default Login