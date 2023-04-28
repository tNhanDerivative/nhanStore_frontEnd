import { createStore } from 'vuex'

function updateLocalStorage(cart) {
  try {
    localStorage.setItem('cart', JSON.stringify(cart))
  } catch (err) {
    // 👇️ This runs
    console.log('Can not setItem() shit')
    console.log('Error: ', err.message);
  }
}

export default createStore({
  state: {
    cart: {
        items: [],
    },
    isAuthenticated: false,
    token: '',
    isLoading: false
  },
  getters: {
    productQuantity: (state, item) => {
      let exists = state.cart.items.find(i => i.product.id === item.product.id)

      if (exists) return exists.quantity
      else return null
    },
    cartItems: (state) => {
      return state.cart
    }
  },
  mutations: {
    initializeStore(state) {

      if (localStorage.getItem('cart')=== undefined || localStorage.getItem('cart') === null) {
        updateLocalStorage(state.cart)
      } else {

        try {
          state.cart = JSON.parse(localStorage.getItem('cart'))
        } catch (err) {
          // 👇️ This runs
          console.log("Can not getItem('cart') from localStorage")
          console.log('Error: ', err.message);
        }

      }

      if (localStorage.getItem('token')) {
          state.token = localStorage.getItem('token')
          state.isAuthenticated = true
      } else {
          state.token = ''
          state.isAuthenticated = false
      } 
    },

    addToCart(state, item) {
      let exists = state.cart.items.find( i => i.product.id === item.product.id)

      if (exists== null) {
        state.cart.items.push({...item, quantity: 1})
        
      } else {
        exists.quantity++

      }

      updateLocalStorage(state.cart)
    },
    

    setIsLoading(state, status) {
      state.isLoading = status
    },
    setToken(state, token) {
        state.token = token
        state.isAuthenticated = true
    },  
    removeToken(state) {
        state.token = ''
        state.isAuthenticated = false
    },
    clearCart(state) {
      state.cart = { items: [] }

      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
  },
  actions: {
  },
  modules: {
  }
})
