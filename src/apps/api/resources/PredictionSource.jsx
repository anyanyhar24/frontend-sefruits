import axios from 'axios'
import API_ENDPOINT from '../global/api-endpoint'

const { PREDICTION } = API_ENDPOINT

class PredictionAPI {
  static async predict (image) {
    const response = await axios.post(PREDICTION, image, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data.predictions
  }
}

export default PredictionAPI
