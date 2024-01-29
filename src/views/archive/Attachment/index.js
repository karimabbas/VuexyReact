// ** React Imports
import { useState, Fragment, useEffect } from 'react'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Button, ListGroup, ListGroupItem, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap'
import Pdf from '../../../assets/images/icon/PDF.png'
import Photos from '../../../assets/images/icon/Photos.png'
import '@styles/react/libs/file-uploader/file-uploader.scss'
import url from '../../../@core/util/base-url'
// ** Third Party Imports
import Select from 'react-select'

import { useDropzone } from 'react-dropzone'
import { FileText, X, DownloadCloud, Image } from 'react-feather'
import { useDispatch } from 'react-redux'
import { setAttachment, addEmployeeShare, EmployeeShareHandler } from '../store/action'
import { selectThemeColors } from '@utils'
import "scanner-js"
import { renderFilePreview as renderFileIcon } from '../list/attachment'

const Attachment = (props) => {
  // ** State
  const [files, setFiles] = useState([])
  const [filesUploaded, setFilesUploaded] = useState([])
  const [formModal, setFormModal] = useState(false)

  const toggleHandler = () => setFormModal(!formModal)

  const dispatch = useDispatch()

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => {
      setFiles([...files, ...acceptedFiles.map(file => Object.assign(file))])
    }
  })
  useEffect(() => {
    if (props.filesData) {
      setFilesUploaded(props.filesData)
    }
  }, [props.filesData])
  useEffect(() => {
    setFiles([])
    setFilesUploaded([])
  }, [props.isSubmitted])

  useEffect(() => {
    dispatch(setAttachment(({ files, filesUploaded })))
  }, [files, filesUploaded])

  const scanImgRequest = {
    use_asprise_dialog: true, // Whether to use Asprise Scanning Dialog
    show_scanner_ui: false, // Whether scanner UI should be shown
    twain_cap_setting: { // Optional scanning settings
      ICAP_PIXELTYPE: "TWPT_RGB" // Color
    },
    output_settings: [
      {
        type: "return-base64",
        format: "png"
      }
    ]
  }

  const scanPdfRequest = {
    use_asprise_dialog: true, // Whether to use Asprise Scanning Dialog
    show_scanner_ui: false, // Whether scanner UI should be shown
    twain_cap_setting: { // Optional scanning settings
      ICAP_PIXELTYPE: "TWPT_RGB" // Color
    },
    output_settings: [
      {
        type: "return-base64",
        format: "pdf"
      }
    ]
  }

  const dataURLtoFile = (dataurl, filename) => {

    const arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }

    return new File([u8arr], filename, { type: mime })
  }
  /** Processes the scan result */
  const displayImagesOnPage = (successful, mesg, response) => {
    if (!successful) { // On error
      console.error(`Failed:  ${mesg}`)
      return
    }
    if (successful && mesg !== null && mesg.toLowerCase().indexOf('user cancel') >= 0) { // User cancelled.
      console.info('User cancelled')
      return
    }
    const scannedImages = scanner.getScannedImages(response, true, false) // returns an array of ScannedImage
    for (let i = 0;
      (scannedImages instanceof Array) && i < scannedImages.length; i++) {
      const scannedImage = scannedImages[i]
      const elementImg = scanner.createDomElementFromModel({
        name: 'img',
        attributes: {
          class: 'scanned',
          src: scannedImage.src
        }
      })
      const file = dataURLtoFile(scannedImage.src, 'scanner_img.png')
      setFiles((prevState) => {
        return [...prevState, file]
      })
      // (document.getElementById('images') ? document.getElementById('images') : document.body).appendChild(elementImg)
    }
  }
  const displayPdfOnPage = (successful, mesg, response) => {
    if (!successful) { // On error
      console.error(`Failed:  ${mesg}`)
      return
    }
    if (successful && mesg !== null && mesg.toLowerCase().indexOf('user cancel') >= 0) { // User cancelled.
      console.info('User cancelled')
      return
    }
    const scannedImages = scanner.getScannedImages(response, true, false) // returns an array of ScannedImage
    for (let i = 0;
      (scannedImages instanceof Array) && i < scannedImages.length; i++) {
      const scannedImage = scannedImages[i]
      const elementImg = scanner.createDomElementFromModel({
        name: 'img',
        attributes: {
          class: 'scanned',
          src: scannedImage.src
        }
      })
      const file = dataURLtoFile(scannedImage.src, 'scanner_Pdf.pdf')
      setFiles((prevState) => {
        return [...prevState, file]
      })
      // (document.getElementById('images') ? document.getElementById('images') : document.body).appendChild(elementImg)
    }
  }

  /** Triggers the scan */
  const scan = (type) => {
    if (type === 'image') {
      scanner.scan(displayImagesOnPage, scanImgRequest)
    } else {
      scanner.scan(displayPdfOnPage, scanPdfRequest)
    }
  }

  const renderFilePreview = file => {
    console.log(file)
    if (file.type.startsWith('image')) {
      return <img className='rounded' alt={file.name} src={URL.createObjectURL(file)} height='28' width='28' />
    } else {
      return renderFileIcon({ extension: file.path })
      // return <FileText size='28' />
    }
  }
  const renderFileUploadedPreview = file => {
    return renderFileIcon(file)
  }

  const handleRemoveFile = file => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter(i => i.name !== file.name)
    setFiles([...filtered])
  }

  const renderFileSize = size => {
    if (Math.round(size / 100) / 10 > 1000) {
      return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`
    } else {
      return `${(Math.round(size / 100) / 10).toFixed(1)} kb`
    }
  }
  const handleSelectEmployeeChange = employee => {
    dispatch(EmployeeShareHandler(employee))
  }
  const storeEmployeeShare = () => {
    dispatch(addEmployeeShare()).then(() => toggleHandler())
  }
  const fileList = files.map((file, index) => (
    <ListGroupItem key={`${file.name}-${index}`} className='d-flex align-items-center justify-content-between'>
      <div className='file-details d-flex align-items-center'>
        <div className='file-preview mr-1'>{renderFilePreview(file)}</div>
        <div>
          <p className='file-name mb-0'>{file.name}</p>
          <p className='file-size mb-0'>{renderFileSize(file.size)}</p>
        </div>
      </div>
      <Button color='danger' outline size='sm' className='btn-icon' onClick={() => handleRemoveFile(file)}>
        <X size={14} />
      </Button>
    </ListGroupItem>
  ))
  const handleRemoveUploadedFile = file => {
    const uploadedFiles = filesUploaded
    const filtered = uploadedFiles.filter(i => i.real_name !== file.real_name)
    setFilesUploaded([...filtered])
  }
  const fileUploadedList = filesUploaded.map((file, index) => (
    <ListGroupItem key={`${file.real_name}-${index}`} className='d-flex align-items-center justify-content-between'>
      <a href={`${url.BASE_URL}${file.url}`} target='_blank'>
        <div className='file-details d-flex align-items-center'>
          <div className='file-preview mr-1'>{renderFileUploadedPreview(file)}</div>
          <div>
            <p className='file-name mb-0'>{file.real_name}</p>
            {/* <p className='file-size mb-0'>{ renderFileSize(file.size) }</p> */}
          </div>
        </div>
      </a>
      <Button color='danger' outline size='sm' className='btn-icon' onClick={() => handleRemoveUploadedFile(file)}>
        <X size={14} />
      </Button>
    </ListGroupItem>
  ))
  const handleRemoveAllFiles = () => {
    setFiles([])
    setFilesUploaded([])
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4' className='custom-title'>
          <>
            <div className='d-inline'>
              <FileText
                color='#5599fe'
              />
              المرفقات
            </div>
            <div style={{ height: '32px', float: 'left' }} title="الاعدادات" onClick={toggleHandler} >
              <img src="https://t.palexpand.ps/assets/images/ico/share.png" height="27px" style={{ cursor: 'pointer' }} />
            </div>
          </>
        </CardTitle>
      </CardHeader>
      <CardBody>
        <Row>
          <Col md='11' sm='12'>
            <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              <div className='d-flex align-items-center justify-content-center flex-column'>
                <DownloadCloud size={64} />
                <h5>اسحب الملفات او اضغط هنا</h5>
                <p className='text-secondary'>
                  اسحب الملفات او اضغط {' '}
                  <a href='/' onClick={e => e.preventDefault()}>
                    تصفح
                  </a>{' '}
                  داخل الجهاز
                </p>
              </div>
            </div>
          </Col>
          <Col md='1' sm='12'>
            <div className='col-md-1 col-sm-12 px-0 '>
              <img src={Photos} style={{ cursor: 'pointer', width: '32px', margin: '5px 5px 0 0' }} onClick={() => scan('image')} />
              <img src={Pdf} style={{ cursor: 'pointer', width: '32px', margin: '5px 5px 0 0' }} onClick={() => scan('pdf')} />
            </div>
          </Col>
        </Row>
        {files.length || filesUploaded.length ? (
          <Fragment>
            <ListGroup className='my-2'>{fileUploadedList}</ListGroup>
            <ListGroup className='my-2'>{fileList}</ListGroup>
            <div className='d-flex justify-content-end'>
              <Button className='me-1' color='danger' outline onClick={handleRemoveAllFiles}>
                حذف الكل
              </Button>
            </div>
          </Fragment>
        ) : null}
      </CardBody>
      <Modal isOpen={formModal} toggle={toggleHandler} className='modal-dialog-centered modal-lg'>
        <ModalHeader toggle={toggleHandler}>
          <Label className='font-weight-bold' style={{ fontSize: '20px' }}>إعدادات مشاركة الارشيف مع الموظفين</Label>
        </ModalHeader>
        <ModalBody>
          <Col className='mb-1' md='12' sm='12'>
            <Label>اختر الموظفين</Label>
            <Select
              isClearable={false}
              theme={selectThemeColors}
              value={props?.config?.employeeShareList}
              isMulti
              bsSize='lg'
              placeholder='بحث'
              name='archive_config'
              options={props?.employeeList}
              onChange={handleSelectEmployeeChange}
              className='react-select'
              classNamePrefix='select'
              noOptionsMessage={() => 'لا يوجد بيانات !'}
            />
          </Col>
        </ModalBody>
        <ModalFooter className='d-flex align-items-center'>
          <Button color='primary' onClick={storeEmployeeShare}>
            حفظ
          </Button>{' '}
        </ModalFooter>
      </Modal>
    </Card >
  )
}

export default Attachment
