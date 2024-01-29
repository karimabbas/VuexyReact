export default {
    BASE_URL: process.env.REACT_APP_STAGE === 'development' ? process.env.REACT_APP_BACKEND : process.env.REACT_APP_BACKEND_PRODUCT,
    BASE_URL_FRONT: process.env.REACT_APP_STAGE === 'development' ? process.env.REACT_APP_FRONTEND : process.env.REACT_APP_FRONTEND_PRODUCT
}
