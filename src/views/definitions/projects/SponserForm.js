import { useEffect, useState } from "react"
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


const SponserForm = (props) => {


    const [sponser, setSponser] = useState([])

    const increaseCount = () => {
        setSponser((prevState) => {
            return [...prevState, prevState + 1]
        })
    }

    const deleteForm = (e, index) => {
        e.preventDefault()
        const sponserArray = sponser.filter((item, i) => i !== index)
        setSponser(sponserArray)
    }

    const sponserName = (obj, index) => {
        const sponserArray = sponser

        if (index >= 0) {
            sponserArray[index] = obj
        } else {
            sponserArray.push(obj)
        }
        console.log(sponserArray)
    }

    useEffect(() => {
        setSponser([])
    }, [props.isSubmitted])

    // useEffect(() => {

    //     const newData = props?.data?.map((data) => {
    //       return {
    //         id: data.model_id,
    //         modelId: data.model_id,
    //         model: data.model_name,
    //         label: data.name,
    //         modelName: data.name,
    //         value: data.name
    //       }
    //     })
    //     setCopyTo(newData ? newData : [])
    //     // setCopyTo((prevState) => {
    //     //   return [...newData, ...prevState]
    //     // })
    //   }, [props.data])

    return (

        <div className='my-1' >
            <Row>
                {
                    sponser.map((item, index) => (
                        <div key={index} className='justify-content-between align-items-center'>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for={''}>{props.name}</Label>
                                        <InputGroup className='input-group-merge' tag={FormGroup}>
                                            <InputGroupAddon addonType='prepend'>
                                                <InputGroupText>
                                                    <Home size={15} />
                                                </InputGroupText>
                                            </InputGroupAddon>

                                            <Input type='text'
                                                id='sponser'
                                                name='sponser'
                                                onChange={(value) => {
                                                    console.log(value)
                                                    sponserName(value, index)
                                                  }} />
                                        </InputGroup>
                                    </FormGroup>
                                </Col>
                                <Col md={5}>
                                    {/* <FormGroup>
                                        <Label for={''}>{props.cost}</Label>
                                        <InputGroup className='input-group-merge' tag={FormGroup}>
                                            <InputGroupAddon addonType='prepend'>
                                                <InputGroupText>
                                                    <HardDrive size={15} />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type='text' />
                                        </InputGroup>
                                    </FormGroup> */}
                                </Col>

                                <Col md={1}>
                                    <Button.Ripple color='danger'
                                        className='text-nowrap px-1 deleteButton mt-2' onClick={(e) => deleteForm(e, index)}
                                        outline>
                                        <Trash size={14} />
                                        <span className='align-middle ml-25'>حذف</span>

                                    </Button.Ripple>
                                </Col>

                            </Row>
                        </div>
                    ))
                }
                <Col md={5} className={'mb-1'}>
                    <Button.Ripple className='btn-icon btn-icon mt-1' color='primary' onClick={increaseCount}>
                        <Plus size={14} />
                        <span className='align-middle ml-25'>اضافة الجهات الممولة </span>
                    </Button.Ripple>
                </Col>
            </Row>

        </div>

    )
}
export default SponserForm