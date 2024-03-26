import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const API_URL = 'http://localhost:3000/'

class AuthService {
  login(user) {
    return axios
      .post(`${API_URL}auth/login`, {
        email: user.email,
        password: user.password
      })
      .then((response) => {
        console.log(user)
        if (response.data.accessToken) {
          const token = response.data.accessToken
          const decoded = jwtDecode(token)
          console.log(decoded)
          localStorage.setItem('user', JSON.stringify(response.data))
          if (decoded) {
            localStorage.setItem('userId', JSON.stringify(decoded.userId))
          }
        }

        return response.data
      })
  }

  logout() {
    localStorage.removeItem('user')
    localStorage.removeItem('userId')
  }

  register(user) {
    return axios.post(API_URL + 'users', {
      name: user.name,
      email: user.email,
      password: user.password
    })
  }
}

export default new AuthService()
