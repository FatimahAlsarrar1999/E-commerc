import { loginUser } from './userSlice'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
export const baseURL = 'http://localhost:5050'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const response = await axios.get(`${baseURL}/users`)

    return response.data.payload.users
  } catch (error) {
    console.log(error)
    throw error
  }
})

export const signIn = createAsyncThunk('users/signIn', async (user: object) => {
  try {
    const response = await axios.post(`${baseURL}/auth/login`, user)

    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
})

export const signOut = createAsyncThunk('users/signOut', async () => {
  try {
    const response = await axios.post(`${baseURL}/auth/logout`)

    console.log(response)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
})

export const removeUser = async (email: string) => {
  try {
    const response = await axios.delete(`${baseURL}/users/${email}`)

    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const updateUserBan = async (email: string) => {
  try {
    const response = await axios.put(`${baseURL}/users/ban/${email}`)

    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const updateUserUnBan = async (email: string) => {
  try {
    const response = await axios.put(`${baseURL}/users/unban/${email}`)

    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const createUser = async (newUser: FormData) => {
  try {
    const response = await axios.post(`${baseURL}/users/process-register`, newUser)

    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const activateUserAccount = async (token: string) => {
  try {
    const response = await axios.post(`${baseURL}/users/activate`, { token })

    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export type User = {
  _id: string
  name: string
  email: string
  image: string
  address: string
  phone: string
  isAdmin: boolean
  isBanned: boolean
}

export type UserState = {
  users: User[]
  error: null | string
  isLoading: boolean
  isSignedin: boolean
  userData: User | null
  ban: boolean
}

const data =
  localStorage.getItem('signinData') !== null
    ? JSON.parse(String(localStorage.getItem('signinData')))
    : []

const initialState: UserState = {
  users: [],
  error: null,
  isLoading: false,
  isSignedin: data.isSignedin,
  userData: data.userData,
  ban: false
}

export const userSlice = createSlice({
  name: 'uers',
  initialState,
  reducers: {
    editProfile: (state, action) => {
      const { _id, name } = action.payload
      const userFound = state.users.find((user) => user._id === _id)
      if (userFound) {
        userFound.name = name
        state.userData = userFound
        localStorage.setItem(
          'loginData',
          JSON.stringify({
            isLoggedin: state.isSignedin,
            userData: state.userData
          })
        )
      }
    },
    addUser: (state, action) => {
      console.log(state.users.push(action.payload))
      state.users.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload
      state.isLoading = false
    })
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.error = action.error.message || 'an error occured'
      state.isLoading = false
    })
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.isSignedin = true
      state.userData = action.payload.payload
      localStorage.setItem(
        'signinData',
        JSON.stringify({
          isSignedin: state.isSignedin,
          userData: state.userData
        })
      )
    })
    builder.addCase(signOut.fulfilled, (state) => {
      state.isSignedin = false
      state.userData = null
      localStorage.setItem(
        'signinData',
        JSON.stringify({
          isSignedin: state.isSignedin,
          userData: state.userData
        })
      )
    })

    builder.addMatcher(
      (action) => action.type.endsWith('/pending'),
      (state) => {
        state.isLoading = true
        state.error = null
      }
    )
    builder.addMatcher(
      (action) => action.type.endsWith('/rejected '),
      (state, action) => {
        state.error = action.error.message || 'an error occured'

        state.isLoading = true
      }
    )
  }
})

export const { addUser, editProfile } = userSlice.actions
export default userSlice.reducer
