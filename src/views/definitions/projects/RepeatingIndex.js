import { useState, useEffect } from 'react'
import Repeater from '@components/repeater'
import { X, Plus, Trash, Edit2, DollarSign, Home, Percent, Share2, HelpCircle, HardDrive } from 'react-feather'
import { SlideDown } from 'react-slidedown'
import {
    Button, Card,
    CardBody,
    CardHeader,
    CardTitle,
    Col,
    Form, FormFeedback,
    FormGroup, Input,
    InputGroup,
    InputGroupAddon, InputGroupText,
    Label,
    Row
} from "reactstrap"
import SelectWIthAddNew from "../../our-componnets/SelectWIthAddNew"

const RepeatingForm = (props) => {

    const [organization, setOrganization] = useState([])

    const addFields = () => {
        const newField = { rowId: (props.count.length), organization: { id: 0, name: '', value: '', label: '' }, cost: '' }
        props.setCount([...props.count, newField])
    }

    const deleteForm = (e, index) => {
        e.preventDefault()
        const sponserArray = props.count.filter((item, i) => i !== index)
        props.setCount(sponserArray)
    }

    const handleFormChange = (index, event) => {
        const data = [...props.count]
        data[index][event.target.name] = event.target.value
        props.setCount(data)
    }
    useEffect(() => {
        setOrganization(props.organizations)
    }, [props.organizations])

    // useEffect(() => {
    //
    //     const newData = props?.data?.map((data) => {
    //         console.log(data)
    //         return {
    //             data
    //         }
    //     })
    //     props.setCount(newData ? newData : [])
    //
    // }, [props.data])

    const handleEnter = (event) => {
        if (event.key.toLowerCase() === "enter") {
            const form = event.target.form
            const index = [...form].indexOf(event.target)
            form.elements[index + 1].focus()

            event.preventDefault()
        }
    }


    return (
        <>
            <Row>
                <Col md={12} sm={12}>
                    {
                        props.count.map((item, index) => {
                            return (<Row key={index} className='justify-content-between align-items-center'>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>{props.name}</Label>
                                        <div className='invoice-customer'>
                                            <SelectWIthAddNew apiUrl='emp_auto_complete'
                                                modelId={null}
                                                id={'organizations'}
                                                name={'organizations'}
                                                optionList={organization}
                                                deptDefult={item.organization}
                                                onSelect={(value) => {
                                                    props.setCount(prev => {
                                                        const existingOrg = prev.filter(org => org.rowId === index)
                                                        const org = prev.filter(org => org.rowId !== index)
                                                        item.organization = value
                                                        return [...org, { rowId: index, organization: value, cost: existingOrg[0].cost ?? '' }]
                                                    })
                                                }} />
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col md={5}>
                                    <FormGroup>
                                        <Label>{props.cost}</Label>
                                        <InputGroup className='input-group-merge' tag={FormGroup}>
                                            <InputGroupAddon addonType='prepend'>
                                                <InputGroupText>
                                                    <HardDrive size={15} />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type='text'
                                                id='cost'
                                                name='cost'
                                                value={item.cost}
                                                onChange={(event) => {
                                                    props.setCount((prev) => {
                                                        const existingOrg = prev.filter(org => org.rowId === index)
                                                        const org = prev.filter(org => org.rowId !== index)
                                                        item.cost = event.target.value
                                                        return [...org, { rowId: index, organization: existingOrg[0].organization, cost: event.target.value }]
                                                    })
                                                }}
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                </Col>

                                <Col md={1}>
                                    <Button.Ripple color='danger'
                                        className='text-nowrap px-1 mt-1'
                                        onClick={(e) => deleteForm(e, index)}
                                        outline>
                                        <Trash size={14} />
                                    </Button.Ripple>
                                </Col>
                            </Row>)

                        })
                    }
                </Col>
            </Row>
            <Col md={1}>
                <Button.Ripple className='btn-icon' color='primary'
                    onClick={addFields}>
                    <Plus size={14} />
                </Button.Ripple>
            </Col>
            <Col sm={12}>
                <hr />
            </Col>
        </>
    )
}

export default RepeatingForm
