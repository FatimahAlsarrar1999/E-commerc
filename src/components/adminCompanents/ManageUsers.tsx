/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchUsers,
  removeUser,
  updateUserBan,
  updateUserUnBan
} from '../../redux/slices/users/userSlice'
import { AppDispatch, RootState } from '../../redux/store'
import AdminSideBar from '../../pages/admin/AdminSideBar'
export const baseURL = 'http://localhost:5050'

const ManageUsers = () => {
  const dispatch: AppDispatch = useDispatch()
  const { users, isLoading, error } = useSelector((state: RootState) => state.users)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>{error}</div>
  }
  const handleBan = async (email: string, isBanned: boolean) => {
    try {
      const response = isBanned ? await updateUserUnBan(email) : await updateUserBan(email)
      console.log(response)
      dispatch(fetchUsers())
    } catch (error) {
      console.log(error)
    }
  }
  const handleDelete = async (email: string) => {
    try {
      const response = await removeUser(email)
      dispatch(fetchUsers())
    } catch (error) {
      console.log(error.response.data.massage)
    }
  }

  return (
    <div className="wrapper">
      <AdminSideBar />
      <div className="main-content">
        <h2>Users</h2>
        <section className="products">
          {users.length > 0 &&
            users.map((user) => {
              console.log(user.image)
              if (!user.isAdmin) {
                return (
                  <div className="product" key={user._id}>
                    <div className="product-info">
                      <img src={`${baseURL}/${user.image}`} alt={user.name} />
                      <p>
                        <span>Name:</span> {user.name}
                      </p>
                      <p>
                        <span>Role:</span> {user.isAdmin}
                      </p>
                      <div className="buttons">
                        <button onClick={() => handleBan(user.email, user.isBanned)}>
                          {user.isBanned ? 'unban' : 'ban'}
                        </button>
                        <button onClick={() => handleDelete(user.email)}>delete</button>
                      </div>
                    </div>
                  </div>
                )
              }
            })}
        </section>
      </div>
    </div>
  )
}

export default ManageUsers
