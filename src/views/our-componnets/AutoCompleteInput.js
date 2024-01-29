import {useState, useEffect} from 'react'
import api from '../../@core/util/api'
import {Input} from 'reactstrap'
import {useSelector} from "react-redux"
import OurAutocomplete from "./autocomplete"

const AutoCompleteInput = (props) => {
    const [suggestions, setSuggestions] = useState([])

    const departments = useSelector(state => state.Departments)
    const employees = useSelector(state => state.Employees)
    const customers = useSelector(state => state.Customers)
    useEffect(() => {
        if (props.name === 'departmentName') {
            setSuggestions([...departments.data ?? []])
        } else if (props.name === 'empFullName') {
            setSuggestions([...employees.data ?? []])
        } else if (props.name === 'customerFullName') {
            setSuggestions([...customers.data ?? []])
        }
    }, [departments, employees, customers])
    //used when suggestions come from parent like in lic archive
    useEffect(() => {
        setSuggestions((props.options ?? []))
    }, [props.options])
    useEffect(() => {
        if (props.name !== 'departmentName' && props.name !== 'empFullName' && props.name !== 'customerFullName' && props.apiUrl !== '') {
            api().get(props.apiUrl).then(response => {
                setSuggestions(response.data)
            })
        }
    }, [])

    const handleInputChange = newValue => {
        props.onSelect(newValue)
    }

    return suggestions.length ? (
        <>
            <OurAutocomplete
                suggestions={suggestions}
                className='form-control'
                filterKey='label'
                suggestionLimit={4}
                name={props.name}
                id={props.id}
                register={props.register}
                errors={props.errors}
                onSelect={handleInputChange}
                placeholder={props.placeholder ?? 'بحث'}
            />
        </>
    ) : (
        <>
            <Input
                name={props.name}
                id={props.id}
                innerRef={props.register({required: true})}
                invalid={props.errors && true}
                placeholder={props.placeholder ?? 'بحث'}
            />
        </>
    )
}
export default AutoCompleteInput