import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'http://localhost:3000/users'

class UserService {
  getUser(id) {
    return axios.get(`${API_URL}/${id}`,{ headers: authHeader() })
  }
  getAllUser() {
    return axios.get(`${API_URL}`,{ headers: authHeader() })
  }
  g
}

export default new UserService()
