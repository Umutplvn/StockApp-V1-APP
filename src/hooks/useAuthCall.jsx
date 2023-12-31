import axios from "axios"
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { fetchFail, fetchStart, loginSuccess, logoutSuccess } from "../features/authSlice"



const useAuthCall = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const login = async (userData) => {
    const BASE_URL = "https://10001.fullstack.clarusway.com"

    dispatch(fetchStart())
    try {
      const { data } = await axios.post(
        `${BASE_URL}/account/auth/login/`,
        userData
      )
      dispatch(loginSuccess(data))
      toastSuccessNotify("login islemi basarili")
      navigate("/stock")
    } catch (error) {
      console.log(error)
      dispatch(fetchFail())
      toastErrorNotify(error.response.data.non_field_errors[0])
    }
  }

  const logout = async () => {
    const BASE_URL = "https://10001.fullstack.clarusway.com"

    dispatch(fetchStart())
    try {
      await axios.post(`${BASE_URL}/account/auth/logout/`)
      dispatch(logoutSuccess())
      toastSuccessNotify("Logout islemi basarili")
      navigate("/")
    } catch (error) {
      console.log(error)
      dispatch(fetchFail())
      toastErrorNotify("Logout islemi basarisiz")
    }
  }

  return { login, logout }
}

export default useAuthCall
