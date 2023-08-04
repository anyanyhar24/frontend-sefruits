import API_ENDPOINT from '../global/api-endpoint'
import api from '../lib/interceptors'

const {
  FRUITS,
  FRUITS_BY_PAGINATE,
  FRUITS_BY_ID,
  FRUITS_BY_NAME
} = API_ENDPOINT

class FruitsSourceAPI {
  static async addFruits (data) {
    const response = await api.post(FRUITS, data)
    return response.data.message
  }

  static async getAllFruits () {
    const response = await api.get(FRUITS)
    return response.data.data
  }

  static async getAllFruitsByPaginate (page, limit) {
    const response = await api.get(FRUITS_BY_PAGINATE(page, limit))
    return response.data.data
  }

  static async getFruitById (id) {
    const response = await api.get(FRUITS_BY_ID(id))
    return response.data.data
  }

  static async getFruitByName (name) {
    const response = await api.get(FRUITS_BY_NAME(name))
    return response.data.data
  }

  static async updateFruitById (id, data) {
    const response = await api.put(FRUITS_BY_ID(id), data)
    return response.data.message
  }

  static async deleteFruitById (id) {
    const response = await api.delete(FRUITS_BY_ID(id))
    return response.data.message
  }
}

export default FruitsSourceAPI
