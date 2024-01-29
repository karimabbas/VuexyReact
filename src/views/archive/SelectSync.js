import { useState, useEffect } from 'react'
import api from '../../@core/util/api'
import { Button, Input } from 'reactstrap'
import { selectThemeColors } from '@utils'
import Select, { components } from 'react-select'
import { Plus } from 'react-feather'
import DefinitionModal from './Modal/definitionModal'
const AutoCompleteAjax = (props) => {
    const [suggestions, setSuggestions] = useState([
        {
            value: 'add-new',
            label: 'اضافة تعريف جديد',
            type: 'button',
            color: 'flat-success'
        }
    ])
    const [showModal, setShowModal] = useState(false)
    const [selected, setSelected] = useState({ label: 'ابحث ...', value: '' })
    useEffect(() => {
        if (props.apiUrl) {
            api().get(props.apiUrl).then(response => {
                setSuggestions([
                    {
                        value: 'add-new',
                        label: 'اضافة تعريف جديد',
                        type: 'button',
                        color: 'flat-success'
                    }, ...(response.data)
                ])
            })
        } else {
            if (props?.suggestions) {
                setSuggestions([
                    {
                        value: 'add-new',
                        label: 'اضافة تعريف جديد',
                        type: 'button',
                        color: 'flat-success'
                    }, ...props?.suggestions
                ])
            } else {
                setSuggestions([
                    {
                        value: 'add-new',
                        label: 'اضافة تعريف جديد',
                        type: 'button',
                        color: 'flat-success'
                    }
                ])
            }
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
    const toggleModal = () => {
        setShowModal((prevState) => !prevState)
    }

    const OptionComponent = ({ data, ...props }) => {
        if (data.type === 'button') {
            return (
                <Button className='text-left rounded-0' color={data.color} block onClick={() => {
                    setShowModal((prevState) => !prevState)
                }}>
                    <Plus size={14} /> <span className='align-middle ml-50'>{data.label}</span>
                </Button>
            )
        } else {
            return <components.Option {...props}> {data.label} </components.Option>
        }
    }

    return (
        <>
            <DefinitionModal toggleModal={toggleModal} showModal={showModal} type={props.type} />
            <Select
                theme={selectThemeColors}
                className={`react-select ${props.errors ? 'is-invalid' : ''}`}
                classNamePrefix='select'
                value={selected}
                components={{
                    Option: OptionComponent
                }}
                options={suggestions}
                isClearable={false}
                onChange={handleInputChange}
            />
        </>
    )
}
export default AutoCompleteAjax
