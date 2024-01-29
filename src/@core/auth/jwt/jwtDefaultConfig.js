// ** Auth Endpoints
import BASE from '../../util/base-url'
export default {
  // loginEndpoint: 'jwt/login',
  // registerEndpoint: 'jwt/register',
  // refreshEndpoint: 'jwt/refresh-token',
  // logoutEndpoint: 'jwt/logout',

  loginEndpoint: `${BASE.BASE_URL}api/login`,
  registerEndpoint: `${BASE.BASE_URL}api/register`,
  refreshEndpoint: `${BASE.BASE_URL}api/refresh-token`,
  logoutEndpoint: `${BASE.BASE_URL}api/logout`,

  // ** This will be prefixed in authorization header with token
  // ? e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // ** Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken'
}
