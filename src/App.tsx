import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Routing from './routes/Routing'

import './styles/App.scss'
import { AppDispatch } from './redux/store'
import { fetchCategories } from './redux/slices/categories/categorySlice'
import { fetchUsers } from './redux/slices/users/userSlice'
import { fetchProducts } from './redux/slices/products/productSlice'

function App() {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchCategories())
    dispatch(fetchUsers())
  }, [])

  return (
    <div className="App">
      <Routing />
    </div>
  )
}

export default App
