import React, { useEffect, useState } from 'react'
import facebook_logo from "../assets/images/social-logos/facebook.png";
import gooogle_logo from "../assets/images/social-logos/google.png";
import microsoft_logo from "../assets/images/social-logos/microsoft.png";
import { Link } from 'react-router-dom';
import { BsPencilSquare, BsCalendar3, BsTrash } from 'react-icons/bs'
import { TbWorldPin, TbEdit } from 'react-icons/tb'
import { AiFillHeart, AiOutlineHeart, } from 'react-icons/ai'
import { SiPowerpages } from 'react-icons/si'
import { apiCalls } from '../utils/apiCalls';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

const ProductCard = (props) => {
    const [heart, setHeart] = useState(false)
    const dispatch = useDispatch()
    let { itCanEdit, itCanDelete, index, isShortList, handleRemoveBooks, author, country, year, link, id, language, title } = props
    let payload = {
        title,
        author,
        country,
        year,
        link,
        language,
        id: props.id
    }
    let localStore = localStorage.getItem("shortlist")
    let getShortList = JSON.parse(localStore) || []

    let isLiked = getShortList.some((item) => {
        if (item.id === id) {
            return true
        }
        return false
    });

    useEffect(() => {
        setHeart(isLiked)
    }, [])

    const handleAddSortlist = async () => {
        try {
            const token = localStorage.getItem("authToken")
            const addToShortList = await apiCalls("/users/add_to_shortlist", {
                ...payload
            }, 'put', toast, token)
            dispatch({
                type: "SETLIST",
                payload: addToShortList.data.shortlist,
            })
            localStorage.setItem("shortlist", JSON.stringify(addToShortList.data.shortlist))
            setHeart(true)
        } catch (error) {
            console.log(error);

        }
    }
    const handleRemoveSortlist = async () => {
        try {
            const token = localStorage.getItem("authToken")
            const removeToShortList = await apiCalls(`/users/remove_to_shortlist/${props.id}`, {}, 'put', toast, token)
            dispatch({
                type: "SETLIST",
                payload: removeToShortList.data.shortlist,
            })
            localStorage.setItem("shortlist", JSON.stringify(removeToShortList.data.shortlist))
            setHeart(false)
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <div className='card'>
            <Link to={'/book/details/' + id} className='links' state={props}>
                <div className='card-image-center'>
                    <img src="https://res.cloudinary.com/bloomsbury-atlas/image/upload/w_568,c_scale/jackets/9781408855690.jpg" className='card-image' alt="" />
                </div>

                <div className='center_div flex_col product-title' >
                    <div style={{ alignSelf: "flex-start" }}>
                        <h4>{title?.length > 10 ? title.slice(0, 10) + "..." : title}</h4>
                    </div>
                    <div className='flex_row product-details' >
                        <div style={{ alignSelf: "flex-start" }}>
                            <div className=''>
                                <span className='font_md'>by:{author}</span>
                                <span className='font_md'> <BsPencilSquare size={10} /></span>
                            </div>
                            <div>
                                <span className='font_md'>{country || "India"}</span>
                                <span className='font_md'> <TbWorldPin size={10} /></span>
                            </div>
                        </div>
                        <div style={{
                            alignSelf: "flex-end"
                        }} >

                            <div>
                                <span className='font_md'>{year} </span>
                                <span className='font_md'><BsCalendar3 size={10} /></span>
                            </div>
                        </div>
                    </div>
                    <div>

                    </div>
                </div>
            </Link>
            <div>
                {itCanDelete && <div className='card-actions'>
                    <div title='Delete a book' onClick={() => handleRemoveBooks(index, id)}>
                        <span className='font_md delete-btn'><BsTrash size={15} /></span>
                    </div>
                </div>}


                {!isShortList && <div className='like-btn' style={{ top: isShortList || itCanEdit ? "15%" : "5%" }} >
                    {
                        heart ?
                            <button className='font_md border_zero' style={{ cursor: 'pointer' }} onClick={handleRemoveSortlist}><AiFillHeart size={20} /></button>
                            :
                            <button className='font_md border_zero' style={{ cursor: 'pointer' }} onClick={handleAddSortlist}><AiOutlineHeart size={20} /></button>

                    }

                </div>}
                {<div className='card-actions  edit-btn-common'>
                    <div title='Edit a book' >
                        <Link to={'/book/update/' + id} className='links' state={props}>
                            <span className='font_md '><TbEdit size={15} /></span>
                        </Link>
                    </div>
                </div>}
            </div>
        </div>
    )
}

const AuthCard = (props) => {
    let isLogin = props.heading == "Login"
    return (
        <div className='auth-card'>

            <div className='center_div p-md' >
                <h2>{props.heading}</h2>
            </div>
            <div>
                {props.children}
            </div>
            <div className='center_div '>
                <span className='font_md'>
                    {isLogin ? "Don't Have an Account" : "Have an Account"} &nbsp;?
                </span>
                &nbsp;
                <Link to={isLogin ? "/signup" : "/login"}>
                    {isLogin ? "Signup" : "Login"}
                </Link>
            </div>
        </div>
    )
}

export {
    ProductCard,
    AuthCard
}