// a library to wrap and simplify api calls
import apisauce from 'apisauce'
const BASE_URL = 'https://reyhoon.com/'
const Authorization = 'Authorization'
// our "constructor"
const create = (baseURL = BASE_URL) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json'
    },
    // 10 second timeout...
    timeout: 10000
  })

  // Force A Key on all requests
  // api.addRequestTransform(request => {
  //   request.params['APPID'] = '0e44183e8d1018fc92eb3307d885379c'
  // })

  // Wrap api's addMonitor to allow the calling code to attach
  // additional monitors in the future.  But only in __DEV__ and only
  // if we've attached Reactotron to console (it isn't during unit tests).
  if (__DEV__ && console.tron) {
    console.tron.log('Hello, I\'m an example of how to log via Reactotron.')
    api.addMonitor(console.tron.apisauce)
  }

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const getCity = (city) => api.get('weather', {q: city})

  // address APIs
  const fetchAddresses = ({token}) => api.get('user/addresses',
    {}, {[Authorization]: token})

  const addAddress = ({token, address}) => {
    console.log(token, 'address: ', address)
    api.post('user/addresses', address, {[Authorization]: token})
  }

  const editAddress = ({token, address}) =>
      api.put(`user/addresses/${address.id}`, address, {[Authorization]: token})

  const deleteAddress = ({token, id}) => api.delete(`user/addresses/${id}`, {}, {[Authorization]: token})

  // user related APIs
  const login = (username, password) =>
      api.post('session/', {username: username, password: password})
  const getBalance = (token) =>
    api.get('billing/balance', {}, {headers: {[Authorization]: token}})
  const getReferral = (token) =>
    api.get('referral', {}, {headers: {[Authorization]: token}})

  const getResetPasswordPin =
    (cellphone) => api.get('password/reset', {cellphone})
  const setPassword =
    (pincode, password, confirmedPassword) =>
    api.put('password/reset', {pincode, password, confirmedPassword})

  const confirm =
    (confirmationCode, token) =>
      api.put('user/confirm', {confirmationCode}, {[Authorization]: token})
  // restaurants api
  const fetchRestaurant = (id) => api.get(`restaurants`, { id })
  const search = (args) => api.get('search', args)
  const fetchReviews = id => api.get(`restaurants`, { id })
  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2\
    getCity,
    // address APIs
    fetchAddresses,
    addAddress,
    editAddress,
    deleteAddress,
    // user APIs
    login,
    getBalance,
    getReferral,
    getResetPasswordPin,
    setPassword,
    confirm,
    search,
    // restaurants APIs
    fetchRestaurant,
    fetchReviews
  }
}

// let's return back our create method as the default.
export default {
  create
}
