import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { AppDispatch } from '../redux/store'
import { addUser, fetchUsers } from '../redux/slices/users/userSlice'

function SignUp() {
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    image: '',
    phone: '',
    adress: ''
  })

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElment>) => {
    if (event.target.type === 'file') {
      console.log('file selected')
      const fileInput = (event.target as HTMLInputElement) || ''
      setUser((prevUser) => {
        return { ...prevUser, [event.target.name]: fileInput.files?.[0].name }
      })
    } else {
      setUser((prevUser) => {
        return { ...prevUser, [event.target.name]: event.target.value }
      })
    }
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    // if (!user.name || !user.email || !user.password) {
    //   alert('All fields are required')
    //   return
    // }

    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(user.email)) {
      alert('Please enter a valid email address')
      return
    }

    if (user.password.length < 8) {
      alert('Password must be at least 8 characters long')
      return
    }
    const formData = new FormData()
    formData.append('name', user.name)
    formData.append('email', user.email)
    formData.append('password', user.password)
    formData.append('phone', String(user.phone))
    formData.append('address', user.address)
    formData.append('image', user.image || '')

    try {
      const response = await createUser(formData)
      console.log(response)
      // console.log(user)
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      } else {
        console.log(error)
      }
    }

    toast.success('Account created successfully!')
    navigate('/signin')
    // setTimeout(() => {
    // }, 2000)
  }

  return (
    <div className="form-container">
      <ToastContainer />
      <div className="card">
        <h2>Registr</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="Password"
              name="password"
              value={user.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              name="phone"
              value={user.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="adress">Adress</label>
            <input
              type="text"
              name="adress"
              value={user.adress}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="image">Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Registr</button>
        </form>
      </div>
    </div>
  )
}

export default SignUp
