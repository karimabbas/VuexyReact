import { useState, useEffect } from 'react'
import api from '../../@core/util/api'
import { Button, Input } from 'reactstrap'
import { selectThemeColors } from '@utils'
import { components } from 'react-select'
import AsyncSelect from 'react-select/async'
import { Plus } from 'react-feather'
import DefinitionModal from './Modal/definitionModal'
const AutoCompleteAjax = (props) => {
  const [showModal, setShowModal] = useState(false)
  const [selected, setSelected] = useState({ label: 'ابحث ...', value: '' })
  const setCustomSuggestions = (array) => {
    if (array && array.length) {
      return ([
        {
          value: 'add-new',
          label: 'اضافة تعريف جديد',
          type: 'button',
          color: 'flat-success'
        }, ...array
      ])
    } else {
      return ([
        {
          value: 'add-new',
          label: 'اضافة تعريف جديد',
          type: 'button',
          color: 'flat-success'
        }
      ])
    }
  }
  useEffect(() => {
    if (props?.selectedFromApi && (props?.selectedFromApi?.value || props?.selectedFromApi.label)) {
      setSelected(props?.selectedFromApi)
    }
  }, [props?.selectedFromApi])

  const handleInputChange = newValue => {
    setSelected(newValue)
    props.onSelect(newValue)
  }
  const toggleModal = () => {
    setShowModal((prevState) => !prevState)
  }
  const OptionComponent = ({ data, ...props }) => {
    if (data.type === 'button') {
      return (
        <Button className='text-left rounded-0' color={data.color} block onClick={() => {
          toggleModal()
        }}>
          <Plus size={14} /> <span className='align-middle ml-50'>{data.label}</span>
        </Button>
      )
    } else {
      return <components.Option {...props}> {data.label} </components.Option>
    }
  }
  const requestSearchQuery = async val => {
    const res = await api().get(`${props.apiUrl}?str=${val}`)
    if (res.status !== 200) return setCustomSuggestions([])
    const arraySuggestions = await res.data
    return setCustomSuggestions(arraySuggestions)
  }
  const promiseOptions = inputValue => {
    if (!inputValue) {
      return new Promise(resolve => {
        resolve(setCustomSuggestions([]))
      })
    } else {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(requestSearchQuery(inputValue))
        }, 500)
      })
    }
  }
  

  return (
    <>
      <DefinitionModal toggleModal={toggleModal} showModal={showModal} type={props.type} />
      <AsyncSelect
        isClearable={props.isClearable}
        loadingMessage={() => "الرجاء الانتظار"}
        noOptionsMessage={() => "لا يوجد بيانات !"}
        className={`react-select ${props.errors ? 'is-invalid' : ''}`}
        classNamePrefix='select'
        value={selected}
        components={{
          Option: OptionComponent
        }}
        loadOptions={promiseOptions}
        cacheOptions={false}
        defaultOptions
        onChange={handleInputChange}
        placeholder={'ابحث ...'}
      />
    </>
  )
}
export default AutoCompleteAjax
