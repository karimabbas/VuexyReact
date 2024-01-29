import { useState, useEffect, useContext, useLayoutEffect } from 'react'
import { Row, Col, Modal, Spinner, Label, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Input, Card, CardBody, Table } from 'reactstrap'
import api from '../../@core/util/api'
import { useDispatch, useSelector } from 'react-redux'
import SelectSync from './SelectSync'
import { renderFilePreview } from '../archive/list/attachment'
import Url from '@src/@core/util/base-url'
import useDynamicRefs from 'use-dynamic-refs'
import CustomSearch from './CustomSearch'
import { storeTopic } from './store/action'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const CardTwo = () => {
  const dispatch = useDispatch()
  const meetingArchiveStore = useSelector(state => state.meetingArchive)
  const topicsSelected = meetingArchiveStore?.topicsSelected
  const topics = topicsSelected?.agenda_topic
  const meeting = meetingArchiveStore?.meeting
  const agendaNum = meetingArchiveStore?.agendaNum
  const agendaDate = meetingArchiveStore.agendaDate

  const [getRef, setRef] = useDynamicRefs()
  console.log(meeting)
  const saveDecision = id => {
    const topicTitle = getRef(`topicTitle${id}`).current.value
    const descisiontxt = getRef(`descisiontxt${id}`).current.value
    const applicantID = getRef(`applicantID${id}`).current.value
    const applicantType = getRef(`applicantType${id}`).current.value
    const applicantName = getRef(`applicantName${id}`).current.value

    const formData = new FormData()
    formData.append(`descisiontxt${id}`, descisiontxt)
    formData.append(`topicTitle${id}`, topicTitle)
    formData.append(`applicantType${id}`, applicantType)
    formData.append(`applicantID${id}`, applicantID)
    formData.append(`applicantName${id}`, applicantName)
    formData.append('topicId', id)
    formData.append('meetingID', meeting?.id)
    formData.append('connected_to', applicantID)
    formData.append('connected_to_txt', applicantName)
    formData.append('descision', descisiontxt)
    formData.append('detail_id', topicsSelected?.id ? topicsSelected?.id : 0)
    formData.append('agendaNum', agendaNum ? agendaNum : 0)
    formData.append('agendaDate', agendaDate)
    formData.append('model', applicantType)
    formData.append('title', topicTitle)
    formData.append('id', id)
    const objectLocal = {}
    for (const [key, value] of formData.entries()) {
      objectLocal[key] = value
    }
    objectLocal.id = +id
    // console.log(...formData)
    // for (let index = 0; index < attachments?.localAttachments.length; index++) {
    //   formData.append('files[]', attachments.localAttachments[index])
    // }
    // const serverFiles = attachments.serverAttachments
    // formData.append('serverFiles', JSON.stringify(serverFiles))
    dispatch(storeTopic(formData, objectLocal))
  }
  const handleStore = (id) => {
    const MySwal = withReactContent(Swal)
    if (id === 0) {
      saveDecision(id)
    } else {
      return MySwal.fire({
        title: 'هل تريد حفظ التعديلات ؟',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'الغاء',
        confirmButtonText: 'نعم !',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1'
        },
        buttonsStyling: false
      }).then(function (result) {
        if (result.value) {
          saveDecision(id)
        }
      }).catch((err => {
        return false
      }))
    }
  }
  const uploadFiles = id => {
    const attachment = getRef(`attachment${id}`)
    attachment.current.click()
    console.log(attachment)
  }
  const RenderAction = ({ id }) => {
    return (
      <div className="" >
        <img onClick={() => handleStore(id)} src="https://t.palexpand.ps/assets/images/ico/floppy-icon.png" style={{ height: '32px', cursor: 'pointer' }} />
        <img onClick={() => uploadFiles(id)} src="https://t.palexpand.ps/assets/images/ico/upload.png" style={{ height: '32px', cursor: 'pointer' }} />
        <img src="https://t.palexpand.ps/assets/images/ico/scanner.png" style={{ height: '32px', cursor: 'pointer' }} />
        <img src="https://t.palexpand.ps/assets/images/ico/scannerpdf.png" style={{ height: '32px', cursor: 'pointer' }} />
      </div>
    )
  }
  // console.log(topics)
  const attachmentChange = e => {
    const reader = new FileReader(),
      files = e.target.files
    const allFiles = [...files]
  }
  const fileList = files => {
    return <Row className='w-100 d-flex align-items-center justify-content-between'>
      {
        files?.map((file, index) => (
          <div key={`${file.real_name.slice(0, 10)}-${index}`} style={{ padding: '.2rem' }} className='d-flex align-items-center justify-content-end border-0 col-md-6'>
            <a href={`${Url.BASE_URL}${file.url}`} target='_blank'>
              <div className='file-details d-flex align-items-center'>
                <div className='file-preview d-flex justify-content-center'>
                  <span className='file-name mb-0'>
                    <span style={{ fontSize: '15px' }}>
                      {file.real_name.slice(0, 10)}
                    </span>
                    <span style={{ marginRight: '3px' }}>
                      {renderFilePreview(file)}
                    </span>
                  </span>

                </div>
              </div>
            </a>

          </div>
        ))
      }
    </Row>
  }
  const applicantClick = (item, modelApplicant) => {
    const id = item?.id ? item?.id : 0
    const modelID = getRef(`applicantID${id}`)
    const model = getRef(`applicantType${id}`)
    const modelName = getRef(`applicantName${id}`)
    modelName.current.value = modelApplicant.name
    modelID.current.value = modelApplicant.id
    model.current.value = modelApplicant.model
  }
  const RenderRowTable = ({ item, index }) => {
    return (
      <tr key={`card${item?.id}`}>
        <td className='font-weight-bolder' style={{ color: '#3B4781' }}>
          <div className='font-weight-bolder' style={{ color: '#3B4781' }}>{index}</div>
        </td>
        <td className='font-weight-bolder' style={{ color: '#3B4781' }}>
          <Input type='textarea' innerRef={setRef(`topicTitle${item?.id ? item?.id : 0}`)} style={{ border: 0 }} name={`topicTitle${item?.id ? item?.id : 0}`} defaultValue={item?.title} id={`topicTitle${item?.id ? item?.id : 0}`} rows={item?.title?.length ? Math.round(item?.title?.length / 10) : 0} placeholder='أدخل نص الموضوع' />
        </td>
        <td className='font-weight-bolder' style={{ color: '#3B4781' }}>
          <div className='font-weight-bolder' style={{ color: '#3B4781' }}>
            <CustomSearch onClick={modelApplicant => applicantClick(item, modelApplicant)} defaultValue={item?.connected_to_txt} />
            <input type="hidden" defaultValue={item?.connected_to} ref={setRef(`applicantID${item?.id ? item?.id : 0}`)} id={`applicantID${item?.id ? item?.id : 0}`} name={`applicantID${item?.id ? item?.id : 0}`} />
            <input type="hidden" defaultValue={item?.model} ref={setRef(`applicantType${item?.id ? item?.id : 0}`)} id={`applicantType${item?.id ? item?.id : 0}`} name={`applicantType${item?.id ? item?.id : 0}`} />
            <input type="hidden" defaultValue={item?.connected_to_txt} ref={setRef(`applicantName${item?.id ? item?.id : 0}`)} id={`applicantName${item?.id ? item?.id : 0}`} name={`applicantName${item?.id ? item?.id : 0}`} />
          </div>
        </td>
        <td className='font-weight-bolder' style={{ color: '#3B4781' }}>
          <Input type='textarea' innerRef={setRef(`descisiontxt${item?.id ? item?.id : 0}`)} style={{ border: 0 }} name={`descisiontxt${item?.id ? item?.id : 0}`} defaultValue={item?.descision} id={`descisiontxt${item?.id ? item?.id : 0}`} rows={item?.title?.length ? item?.title?.length / 10 : 0} placeholder='أدخل نص القرار' />
          <div>{fileList(item?.files)}</div>
          <Input type='file' onChange={attachmentChange} multiple={true} id={`attachment${item?.id ? item?.id : 0}`} name={`attachment${item?.id ? item?.id : 0}`} innerRef={setRef(`attachment${item?.id ? item?.id : 0}`)} hidden />
        </td>
        <td className='font-weight-bolder' style={{ color: '#3B4781' }}>
          <RenderAction id={item?.id ? item?.id : 0} />
        </td>
      </tr>
    )
  }
  const RenderTable = () => {
    if (topics) {
      return (
        <Table responsive style={{ maxHeight: '200px', overflowY: 'auto' }}>
          <thead>
            <tr>
              <th width="30">#</th>
              <th width="450" >الموضوع</th>
              <th width="200" >مرتبط ب</th>
              <th width="450" >نص القرار</th>
              <th width="160" >الحركات</th>
            </tr>
          </thead>
          <tbody>
            <RenderRowTable item={null} index={topics?.length + 1} />
            {

              topics?.map((item, index) => {
                return <RenderRowTable key={index} item={item} index={topics?.length - index} />
              })
            }
          </tbody>
        </Table>
      )
    } else {
      return (
        <Table responsive style={{ maxHeight: '200px', overflowY: 'auto' }}>
          <thead>
            <tr>
              <th width="30">#</th>
              <th width="450" >الموضوع</th>
              <th width="200" >مرتبط ب</th>
              <th width="450" >نص القرار</th>
              <th width="160" >الحركات</th>
            </tr>
          </thead>
          <tbody>
            <RenderRowTable item={null} index={1} />
          </tbody>
        </Table>
      )
    }
  }
  return (
    <Card>
      <CardBody>
        <Row className='mb-1'>
          <RenderTable />
        </Row>
      </CardBody>
    </Card>
  )
}

export default CardTwo