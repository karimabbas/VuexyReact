import useJwt from '@src/auth/jwt/useJwt'
// import api from './api'
const config = useJwt?.jwtConfig

export const logOut = () => {
    localStorage.removeItem('userData')
    localStorage.removeItem(config?.storageTokenKeyName)
    localStorage.removeItem(config?.storageRefreshTokenKeyName)
    window.open('/', '_self')
}

