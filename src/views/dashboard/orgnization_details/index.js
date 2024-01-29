import { useState, useEffect } from 'react'
import { Col, Row } from "reactstrap"
import OrgForm from './OrgForm'
import { useParams } from "react-router-dom"
import api from '../../../@core/util/api'
import { toast, Slide } from 'react-toastify'
import { ErrorToast, SuccessToast } from '@components/toast'

const Org = () => {
    const [isSubmitted, setIsSubmitted] = useState(false)

    const submitHandler = (data) => {

        const formData = new FormData()
      
        Object.keys(data).map(key => {
            if (key === 'imageFiles') {
                console.log(data[key])
                // const imagepic = Object.assign(data[key])
                const files = data[key]
                formData.append('image', files?.imgPic)
                formData.append('header_image', files.header_image) 
                formData.append('footer_image', files.footer_image)

            } else {
                console.log(data)
                formData.append(key, data[key])
            }
        })


        api().post('storeSettings', formData)
            .then((response) => {
                console.log(response.data.data)
                setIsSubmitted(prev => !prev)
                toast.success(
                    <SuccessToast
                        result={<h6>تهانينا تمت العملية بنجاح!</h6>}
                    />, { hideProgressBar: false, autoClose: 2500, position: 'top-center' })
            }).catch((err) => {
                toast.error(
                    <ErrorToast
                        title={<h3>خطأ!</h3>}
                        result={
                            err?.errorsRaw?.map((error, index) => <h5>{index + 1} : {error} </h5>)
                        }
                    />, { hideProgressBar: false, autoClose: 2500, position: 'top-center' })
            })
    }
    return (
        <>
            <OrgForm isSubmitted={isSubmitted} onsubmit={submitHandler} />
        </>
    )
}

export default Org