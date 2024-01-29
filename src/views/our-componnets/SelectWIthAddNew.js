import {useState, useEffect} from 'react'
import api from '../../@core/util/api'
import {Button, Input} from 'reactstrap'
import Select, {components} from "react-select"
import {selectThemeColors} from '@utils'
import {Plus} from "react-feather"
import ExtensionModel from "./ExtensionModel/index"
import {useSelector} from "react-redux"

const SelectWithAddNew = (props) => {
    const [options, setOptions] = useState([
        {
            value: 'add-new',
            label: 'اضافة',
            type: 'button',
            color: 'flat-success'
        }
    ])

    const ConstantStore = useSelector(state => state.Constants)
    const AddressStore = useSelector(state => state.Address)

    const [listForModel, setListForModel] = useState([])
    const [newItemAdded, setNewItemAdded] = useState(false)
    const [value, setValue] = useState(props.deptDefult)
    const [showModel, setShowModel] = useState(false)

    useEffect(() => {
        if (props.modelId !== 0 && props.modelId !== null) {
            let selectList
            if (props.name === 'city') {
                selectList = AddressStore.cities ?? []
            } else if (props.name === 'town') {
                selectList = AddressStore.towns[`parent${props.modelId}`] ?? []
            } else if (props.name === 'region') {
                selectList = AddressStore.regions[`parent${props.modelId}`] ?? []
            } else {
                selectList = ConstantStore.data[`parent${props.modelId}`] ?? []
            }
            setOptions([
                {
                    value: 'add-new',
                    label: 'اضافة',
                    type: 'button',
                    color: 'flat-success'
                }, ...(selectList)
            ])
            setListForModel(selectList)
        }
    }, [props.apiUrl, newItemAdded, props.modelId])

    useEffect(() => {
        if (props.name === 'city') {
            if (props.modelId !== 0 && props.modelId !== null) {
                let selectList
                if (props.name === 'city') {
                    selectList = AddressStore.cities ?? []
                } else if (props.name === 'town') {
                    selectList = AddressStore.towns[`parent${props.modelId}`] ?? []
                } else if (props.name === 'region') {
                    selectList = AddressStore.regions[`parent${props.modelId}`] ?? []
                }
                setOptions([
                    {
                        value: 'add-new',
                        label: 'اضافة',
                        type: 'button',
                        color: 'flat-success'
                    }, ...(selectList)
                ])
                setListForModel(selectList)
            }
        }
    }, [AddressStore])

    useEffect(() => {
        if (props.optionList !== null && props.optionList !== undefined) {

            setOptions([
                {
                    value: 'add-new',
                    label: 'اضافة',
                    type: 'button',
                    color: 'flat-success'
                }, ...(props.optionList)
            ])
            setListForModel(props.optionList)

        }
    }, [props.optionList])

    useEffect(() => {
        setValue(props.deptDefult)
    }, [props.deptDefult])

    const handleInputChange = newValue => {
        setValue(newValue)
        props.onSelect(newValue)
    }

    const OptionComponent = ({data, ...props}) => {
        if (data.type === 'button') {
            return (
                <Button className='text-left rounded-0' color={data.color} block onClick={() => {
                    setShowModel((prevState) => !prevState)
                }}>
                    <Plus size={14}/> <span className='align-middle ml-50'>{data.label}</span>
                </Button>
            )
        } else {
            return <components.Option {...props}> {data.label} </components.Option>
        }
    }

    return options.length ? (
        <>
            <ExtensionModel notifySelect={setNewItemAdded} title={props.title} type={props.name} show={showModel} modelId={props.modelId}
                            storeUrl={props.storeUrl} apiUrl={props.apiUrl} deleteUrl={props.deleteUrl}
                            data={listForModel}/>
            <Select
                className={ `react-select ${props.errors ? 'is-invalid' : ''}` }
                classNamePrefix='select'
                value={value}
                options={options}

                theme={selectThemeColors}
                components={{
                    Option: OptionComponent
                }}
                onChange={handleInputChange}
            />
        </>
    ) : (
        <>
            <Input
                id='customerName'
                name='customerName'
                placeholder='بحث'
            />
        </>
    )
}
export default SelectWithAddNew
