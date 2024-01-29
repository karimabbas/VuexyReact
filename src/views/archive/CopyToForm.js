import { useState, useEffect, useRef } from 'react'
import { Row, Col, Card, CardHeader, CardBody, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { X, Plus, Send } from 'react-feather'
import AutoCompleteAjax from '../our-componnets/AutoCompleteAjax'
import SelectAsync from './SelectAsync'

const CopyToForm = (props) => {
  // const [count, setCount] = useState(0)
  const [copyTo, setCopyTo] = useState([])
  const increaseCount = () => {
    setCopyTo((prevState) => {
      return [...prevState, { label: '', value: '', index: copyTo.length }]
    })
  }
  const deleteForm = (e, index) => {
    e.preventDefault()
    const copyToArray = copyTo.filter((item, i) => i !== index)
    setCopyTo(copyToArray)
  }
  const selectCopyTo = (obj, index) => {
    const copyToArray = copyTo
    // const existingCopyItemIndex = copyToArray.findIndex(item => item?.modelName === index)
    if (index >= 0) {
      copyToArray[index] = obj
    } else {
      copyToArray.push(obj)
    }
    setCopyTo(copyToArray)
  }

  useEffect(() => {
    setCopyTo([])
  }, [props.isSubmitted])

  useEffect(() => {
    props.refreshCopyTo(copyTo)
  }, [copyTo])

  useEffect(() => {

    const newData = props?.data?.map((data) => {
      return {
        id: data.model_id,
        modelId: data.model_id,
        model: data.model_name,
        label: data.name,
        modelName: data.name,
        value: data.name
      }
    })
    setCopyTo(newData ? newData : [])
    // setCopyTo((prevState) => {
    //   return [...newData, ...prevState]
    // })
  }, [props.data])
  return (
    <div className='my-1' >
      {
        copyTo.map((item, index) => (
          <div key={index} className='row justify-content-between align-items-center'>
            <Col md={8}>
              <FormGroup>
                <SelectAsync
                  apiUrl={'archive_auto_complete'}
                  isSubmitted={props.isSubmitted}
                  id={`copy-to-${index}`}
                  name={`copy-to-${index}`}
                  placeholder='نسخة الى'
                  selectedFromApi={{ label: item?.value, value: item?.value }}
                  // suggestions={props.suggestions}
                  onSelect={(value) => {
                    selectCopyTo(value, index)
                  }} icon={<Send className='headings' size={14} />} />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Button.Ripple color='danger' className='text-nowrap px-1 deleteButton' onClick={(e) => deleteForm(e, index)} outline>
                  <X size={14} className='mr-50' />
                  <span>حذف</span>
                </Button.Ripple>
              </FormGroup>
            </Col>
          </div>
        ))
      }
      {/* <Repeater count={ count } >
        { count => (
          <div key={ count } className='row justify-content-between align-items-center'>
            <Col md={ 10 }>
              <FormGroup>
                <AutoCompleteAjax isSubmitted={ props.isSubmitted }
                  id={ `copy-to-${count}` }
                  name={ `copy-to-${count}` }
                  placeholder='نسخة الى'
                  suggestions={ props.suggestions }
                  onSelect={ (value) => {
                    selectCopyTo(value, count)
                  } } icon={ <Send className='headings' size={ 14 } /> } />
              </FormGroup>
            </Col>
            <Col md={ 2 }>
              <FormGroup>
                <Button.Ripple color='danger' className='text-nowrap px-1 deleteButton' onClick={ (e) => deleteForm(e, count) } outline>
                  <X size={ 14 } className='mr-50' />
                  <span>حذف</span>
                </Button.Ripple>
              </FormGroup>
            </Col>
          </div>
        ) }
      </Repeater> */}
      <Button.Ripple className='btn-icon' color='primary' onClick={increaseCount}>
        <Plus size={14} />
        <span className='align-middle ml-25'>اضافة نسخة الى</span>
      </Button.Ripple>
    </div>
  )
}

export default CopyToForm
