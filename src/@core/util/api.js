import axios from 'axios'
import BASE from './base-url'
import { toast } from 'react-toastify'
import { logOut } from './auth'
import { ErrorToast } from '@components/toast'

export default function api(nonApiRoute = false) {
    const token = String(localStorage.getItem('accessToken'))

    const api = axios.create({
        baseURL: `${BASE.BASE_URL}${nonApiRoute ? '' : 'api'}`,
        withCredentials: true
    })

    api.defaults.headers.common['Authorization'] = `Bearer ${token.replaceAll('"', '')}`

    api.interceptors.response.use(response => response, error => {


        if (error?.response?.status === 401) {
            if (!nonApiRoute) logOut()
            return Promise.reject({ status: 401, errors: ['Unauthorized'] })
        }

        if (error?.response?.status === 403) {
            toast.error(
                <ErrorToast
                    title={<h3>تحذير !</h3>}
                    result={<h3>أنت غير مصرح لك !</h3>}
                />, { hideProgressBar: false })

            return Promise.reject({ status: 403, errors: ['Unauthorized'] })
        }

        if (error?.response?.status === 422) {
            const errors = Object.values(error?.response?.data || {})
            return Promise.reject({ status: 422, errorsRaw: errors, errors: errors.reduce(error => error) })
        }

        console.error(error)

        return Promise.reject({ status: error?.response?.status, errors: ['Oops!'] })
    })

    return api
}
