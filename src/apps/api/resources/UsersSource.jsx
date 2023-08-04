import axios from 'axios'
import API_ENDPOINT from '../global/api-endpoint'
import api from '../lib/interceptors'

const { USERS, USERS_BY_PAGINATE, USERS_OTP_VERIFICATION, USER_BY_ID } = API_ENDPOINT

class UsersSourceAPI {
  static async register (data) {
    const response = await axios.post(USERS, data)
    return response.data.message
  }

  static async verifyOTPVerification (data) {
    const response = await axios.post(USERS_OTP_VERIFICATION, data)
    return response.data.message
  }

  static async getAllUsers () {
    const response = await api.get(USERS)
    return response.data.data
  }

  static async getAllUsersByPaginate (page, limit) {
    const response = await api.get(USERS_BY_PAGINATE(page, limit))
    return response.data.data
  }

  static async getUserById (id) {
    const response = await api.get(USER_BY_ID(id))
    return response.data.data
  }

  static async putUserById (id, data) {
    const response = await api.put(USER_BY_ID(id), data)
    return response.data.message
  }

  static async deleteUserById (id) {
    const response = await api.delete(USER_BY_ID(id))
    return response.data.message
  }
}

export default UsersSourceAPI
