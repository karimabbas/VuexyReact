import { useState, useEffect } from 'react'
import api from '../../@core/util/api'
import { Input } from 'reactstrap'
import { selectThemeColors } from '@utils'
import Select from 'react-select'

const AutoCompleteAjax = (props) => {
  const [suggestions, setSuggestions] = useState([])
  const [selected, setSelected] = useState({ label: 'اختر من القائمة', value: '' })
  useEffect(() => {
    if (props.apiUrl) {
      api().get(props.apiUrl).then(response => {
        setSuggestions(response.data)
      })
    } else {
      setSuggestions(props.suggestions)
    }
  }, [props.suggestions])
  useEffect(() => {
    if (props?.selectedFromApi && (props?.selectedFromApi?.value || props?.selectedFromApi.label)) {
      setSelected(props?.selectedFromApi)
    }
  }, [props?.selectedFromApi])

  const handleInputChange = newValue => {
    setSelected(newValue)
    props.onSelect(newValue)
  }
  return (
    <>
      <Select
        theme={ selectThemeColors }
        className={ `react-select ${props.errors ? 'is-invalid' : ''}` }
        classNamePrefix='select'
        value={ selected }
        options={ suggestions }
        isClearable={ false }
        onChange={ handleInputChange }
      />
      {/* <AsyncSelect
        isClearable={ false }
        id={ props.id ?? 'customerName' }
        name={ props.name ?? 'customerName' }
        className={ `react-select ${props.errors ? 'is-invalid' : ''}` }
        classNamePrefix='select'
        loadOptions={ promiseOptions }
        placeholder='بحث'
        value={ selected }
        onChange={ handleInputChange }
        cacheOptions
        defaultOptions
        noOptionsMessage={ () => 'لا يوجد بيانات !' }
      /> */}
    </>
  ) 
  // : (
  //   <>
  //     <Input
  //       id={ props.id ?? 'customerName' }
  //       name={ props.name ?? 'customerName' }
  //       placeholder='بحث'
  //     />
  //   </>
  // )
}
export default AutoCompleteAjax
