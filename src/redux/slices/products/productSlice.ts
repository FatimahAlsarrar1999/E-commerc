import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'

export const baseUrl = 'http://localhost:5050/products'

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  try {
    const response = await axios.get(`${baseUrl}`)
    console.log(response.data.payload.products)
    return response.data.payload.products
  } catch (error) {
    console.error('Error', error)
  }
})

export const fetchProductsHome = createAsyncThunk(
  'products/fetchProductsHome',
  async ({ page, limit }: { page: number; limit: number }) => {
    try {
      const response = await axios.get(`${baseUrl}`, { params: { page, limit } })
      return response.data.payload.products
    } catch (error) {
      console.error('Error', error)
    }
  }
)

export const deleteProduct = createAsyncThunk('product/deleteProduct', async (slug: string) => {
  try {
    await axios.delete<Product[]>(`${baseUrl}/${slug}`)
    return slug
  } catch (error) {
    console.error('Error', error)
  }
})

export type Product = {
  _id: string
  name: string
  slug: string
  description: string
  quantity: number
  price: number
  image: string
  category: category
  variants: string[]
  sizes: string[]
}

export type ProductState = {
  products: Product[]
  error: null | string
  isLoading: boolean
  searchTerm: string
  singleProduct: Product
  selectedCategory: string
}

const initialState: ProductState = {
  products: [],
  error: null,
  isLoading: false,
  searchTerm: '',
  singleProduct: {} as Product,
  selectedCategory: ''
}

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    searchProduct: (state, action) => {
      state.searchTerm = action.payload
    },

    findProductById: (state, action) => {
      const id = action.payload
      const productFound = state.products.find((product) => product.id === id)
      if (productFound) {
        state.singleProduct = productFound
      }
    },

    sortProducts: (state, action) => {
      const sortingCriteria = action.payload
      if (sortingCriteria === 'name') {
        state.products.sort((a, b) => a.name.localeCompare(b.name))
      } else if (sortingCriteria === 'price') {
        state.products.sort((a, b) => a.price - b.price)
      }
    },

    setSelectedCategory(state, action: PayloadAction<string>) {
      state.selectedCategory = action.payload
    },

    // removeProduct: (state, action) => {
    //   const filteredProducts = state.products.filter(
    //     (product) => product.id !== action.payload.productId
    //   )
    //   state.products = filteredProducts
    // },

    addProduct: (state, action) => {
      state.products.push(action.payload)
    },

    updateProduct: (state, action) => {
      const { id, name, description, image, price } = action.payload
      const foundProduct = state.products.find((product) => product.id === id)
      if (foundProduct) {
        foundProduct.name = name
        foundProduct.description = description
        foundProduct.image = image
        foundProduct.price = price
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload
      state.isLoading = false
    })

    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.isLoading = false
      state.products = state.products.filter((product) => product.slug !== action.payload)
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

export const {
  findProductById,
  searchProduct,
  sortProducts,
  setSelectedCategory,
  // removeProduct,
  addProduct,
  updateProduct
} = productSlice.actions

export default productSlice.reducer
