import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import CreateBook from './pages/Book';
import UpdateBook from './pages/UpdateBook';
import BooksShortList from './pages/BooksShortList';
import MyBooks from './pages/MyBooks';
import { Provider } from 'react-redux'
import store from './store/store.js'
import NotFound from './pages/404';
import BookDetails from './pages/BookDetails';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './middleware/PrivateRoute';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Provider store={store}>
      <>
        <ToastContainer position="bottom-center" autoClose={3000} />
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/' element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            } />
            <Route path='/book/details/:id' element={
              <PrivateRoute>
                <BookDetails />
              </PrivateRoute>
            } />
            <Route path='/book/create' element={
              <PrivateRoute>
                <CreateBook />
              </PrivateRoute>
            } />
            <Route path='/book/update/:id' element={
              <PrivateRoute>
                <UpdateBook />
              </PrivateRoute>
            } />
            <Route path='/book/mybooks/:id' element={
              <PrivateRoute>
                <MyBooks />
              </PrivateRoute>
            } />
            <Route path='/book/shortlist/:id' element={
              <PrivateRoute>
                <BooksShortList />
              </PrivateRoute>
            } />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </>
    </Provider>
  )
}

export default App
