import React from 'react'
import { AuthCard } from '../components/Cards'
import { Formik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { apiCalls } from '../utils/apiCalls'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { signupUser } from '../store/user/actions'
import { useNavigate } from 'react-router'
import Loader from '../components/Loader'

const validationSignUp = Yup.object({
    username: Yup.string().required('Username is required').min(3, 'Username must be at least 3 characters'),
    email: Yup.string().required('Email-ID number is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Password must be same').required('Confirm Password is required')
})

const Signup = () => {
    let dispatch = useDispatch()
    let navigate = useNavigate()
    const { loading } = useSelector((state) => state.bookReducer)
    const handleFormSubmit = async (values, resetForm) => {
        try {
            let payload = {
                username: values.username,
                email: values.email,
                password: values.password,
            }
            dispatch({ type: "LOADINGON" })
            const createUser = await apiCalls("/users/register", payload, "post", toast)
            let getData = createUser.data
            window.localStorage.setItem('authToken', getData.token)
            dispatch({
                type: "SIGNUP",
                payload: {
                    user: getData.user,
                    shortlist: getData.user.shortlist,
                    authToken: getData.authToken,
                }
            })
            dispatch({ type: "LOADINGOFF" })
            navigate("/")
            resetForm()
        } catch (error) {
            console.log(error);
            dispatch({ type: "LOADINGOFF" })

        }
    }


    return (
        <div className='auth-container'>
            <div className='overlay'></div>
            <div>

                <AuthCard heading={'Sign up'}>
                    {loading ? <Loader /> : <Formik
                        initialValues={{
                            username: '',
                            email: '',
                            password: '',
                            confirmPassword: '',
                        }}
                        validationSchema={validationSignUp}
                        onSubmit={({ values, resetForm }) => handleFormSubmit(values, resetForm)}
                    >
                        {({ handleSubmit, handleChange, resetForm, values, errors }) => (
                            <div className='signup-form'>
                                <div>
                                    <label htmlFor="username">Username*</label>
                                    <input type="text" className='input_field' placeholder='Enter a Username' onChange={handleChange} name='username' value={values.username} />
                                    <span className='err-msg'>{errors.username}</span>
                                </div>
                                <div>
                                    <label htmlFor="email">Email *</label>
                                    <input type="email" className='input_field' placeholder='Enter a Email-ID' onChange={handleChange} name='email' value={values.email} />
                                    <span className='err-msg'>{errors.email}</span>
                                </div>
                                <div>
                                    <label htmlFor="Password">Password *</label>
                                    <input type="password" className='input_field' placeholder='Enter a password' onChange={handleChange} name='password' value={values.password} />
                                    <span className='err-msg'>{errors.password}</span>
                                </div>
                                <div>
                                    <label htmlFor="confirmPassword">Confirm Password *</label>
                                    <input type="password" className='input_field' placeholder='Enter a password' onChange={handleChange} name='confirmPassword' value={values.confirmPassword} />
                                    <span className='err-msg'>{errors.confirmPassword}</span>
                                </div>
                                <div>
                                    <button type='submit' className='submit_btn' onClick={() => handleFormSubmit(values, resetForm)}>Submit</button>
                                </div>
                            </div>
                        )}
                    </Formik>}
                </AuthCard>
            </div>
            <div className='book-quotes'>
                <h2>
                    “The person, be it gentleman or lady, who has not pleasure in a good novel, must be intolerably stupid.”
                </h2>
            </div>
        </div>
    )
}

export default Signup