// ** React Imports
import { useEffect, useState } from 'react'
import QRCode from 'qrcode'
// ** Third Party Components
import { Row, Col, Table } from 'reactstrap'
import { getArchive } from '../store/action/index'
// ** Styles
import '@styles/base/pages/app-invoice-print.scss'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import baseUrl from '../../../@core/util/base-url'
const Print = (props) => {
  // ** Print on mount
  const [qrCode, setQrCode] = useState('')
  const { type, archiveId } = useParams()
  const dispatch = useDispatch()
  const archiveStore = useSelector(state => state.archives)
  const archive_info = archiveStore?.selectedArchive
  useEffect(() => {
    if (archiveId) {
      const archive_id = +archiveId
      dispatch(getArchive(archive_id, type)).then(() => {
        const url = `${baseUrl.BASE_URL_FRONT}archive/${archive_info?.info?.type}/${archive_info?.info?.id}`
        QRCode.toDataURL(url).then(data => {
          setQrCode(data)
        }).then(() => {
          setTimeout(() => window.print(), 50)
        }).catch(err => {
          return console.error(err)
        })
      })
    }
  }, [archiveId])
  const getForm = () => {
    if (type === 'trade_archive') {
      return (
        <div className='d-flex justify-content-between flex-md-row flex-column pb-2 mt-2 align-items-center'>
          <div>
            <h4 className='mb-25'>اسم المستفيد : { archive_info?.info?.name }</h4>
            <h4 className='mb-25'>اسم المركبة : { archive_info?.info?.vehicle_name }</h4>
            <h4 className='mb-25'>رقم الشصي : { archive_info?.info?.vehicle_no }</h4>
            <h4 className='mb-0'>{ archive_info?.info?.archive_type?.name ? `نوع المعاملة : ${archive_info?.info?.archive_type?.name}` : '' }</h4>
          </div>
          <div>
            <img className='mb-25' src={ qrCode } />
          </div>
          <div className='mt-md-0 mt-2'>
            {/* <h4 className='font-weight-bold text-right mb-1'>{  }</h4> */ }
            <div className='invoice-date-wrapper mb-50'>
              <span className='invoice-date-title'>رقم المعاملة:</span>
              <span className='font-weight-bold'> { archive_info?.info?.trade_no }</span>
            </div>
            <div className='invoice-date-wrapper mb-50'>
              <span className='invoice-date-title'>التاريخ:</span>
              <span className='font-weight-bold'> { archive_info?.info?.date }</span>
            </div>
            <div className='invoice-date-wrapper'>
              <span className='invoice-date-title'>تم الأرشفة بواسطة:</span>
              <span className='font-weight-bold'>{ archive_info?.info?.admin?.name }</span>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div className='d-flex justify-content-between flex-md-row flex-column pb-2 mt-2 align-items-center'>
        <div>
          <h4 className='mb-25'>مرتبط ب : { archive_info?.info?.name }</h4>
          <h4 className='mb-25'>عنوان الوثيقة : { archive_info?.info?.title }</h4>
          <h4 className='mb-0'>{ archive_info?.info?.archive_type?.name ? `نوع الوثيقة : ${archive_info?.info?.archive_type?.name}` : '' }</h4>
        </div>
        <div>
          <img className='mb-25' src={ qrCode } />
        </div>
        <div className='mt-md-0 mt-2'>
          {/* <h4 className='font-weight-bold text-right mb-1'>{  }</h4> */ }
          <div className='invoice-date-wrapper mb-50'>
            <span className='invoice-date-title'>رقم المراسلة:</span>
            <span className='font-weight-bold'> { archive_info?.info?.serisal }</span>
          </div>
          <div className='invoice-date-wrapper mb-50'>
            <span className='invoice-date-title'>التاريخ:</span>
            <span className='font-weight-bold'> { archive_info?.info?.date }</span>
          </div>
          <div className='invoice-date-wrapper'>
            <span className='invoice-date-title'>تم الأرشفة بواسطة:</span>
            <span className='font-weight-bold'>{ archive_info?.info?.admin?.name }</span>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className='invoice-print '>
      <div className='d-flex mb-1 justify-content-center mr-5'>
        <h3 className='text-primary font-weight-bold ml-1'>Expand</h3>
      </div>
      { getForm() }

      <hr className='my-2' />

    </div>
  )
}

export default Print
