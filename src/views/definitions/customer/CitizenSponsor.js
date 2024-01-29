import {useEffect, useState} from 'react'
import Repeater from '../../../@core/components/repeater'
import {Trash} from 'react-feather'
import {SlideDown} from 'react-slidedown'
import {
    Button,
    Col,
    FormGroup, Input,
    InputGroup,
    Label,
    Row
} from "reactstrap"

const CitizenSponsor = (props) => {

    const [count, setCount] = useState(1)
    // const [sponsors, setSponsors] = useState([])
    const [deletedItemsId, setDeletedItemsId] = useState([])

    useEffect(() => {
        setCount(props.soponsorCount ?? 1)
    }, [props.sponsors])

    useEffect(() => {
        for (let i = 0; i < props?.sponsors?.length; i++) {
            const found = deletedItemsId.find((id) => {
                return id === i
            })
            if (found !== undefined) {
                continue
            }
            props.setValue(`sponsorName-${i}`, props.sponsors[i].sponsorName)
            props.setValue(`sponsorAddress-${i}`, props.sponsors[i].sponsorAddress)
            props.setValue(`sponsorJob-${i}`, props.sponsors[i].sponsorJob)
            props.setValue(`sponsorNationalId-${i}`, props.sponsors[i].sponsorNationalId)
            props.setValue(`sponsorPhone-${i}`, props.sponsors[i].sponsorPhone)
        }
    }, [props.getValues()])

    useEffect(() => {
        setCount(0)
    }, [props.isSubmitted])

    const increaseCount = () => {
        setCount(prevState => prevState + 1)
        props.setValue('repeaterCount', (count + 1))
    }

    const handleEnter = (event) => {
        if (event.key.toLowerCase() === "enter") {
            const form = event.target.form
            const index = [...form].indexOf(event.target)
            form.elements[index + 1].focus()

            event.preventDefault()
        }
    }

    const deleteForm = (e, id) => {
        const slideDownWrapper = e.target.closest('.react-slidedown'),
            form = e.target.closest('section')
        if (slideDownWrapper) {

            props.setValue(`sponsorName-${id}`, '')
            props.unregister(`sponsorName-${id}`)
            props.setValue(`sponsorNationalId-${id}`, '')
            props.setValue(`sponsorPhone-${id}`, '')
            props.setValue(`sponsorJob-${id}`, '')
            props.setValue(`sponsorAddress-${id}`, '')
            slideDownWrapper.remove()
            setDeletedItemsId((prevState) => [id, ...prevState])
        } else {
            props.setValue(`sponsorName-${id}`, '')
            props.setValue(`sponsorNationalId-${id}`, '')
            props.setValue(`sponsorPhone-${id}`, '')
            props.setValue(`sponsorJob-${id}`, '')
            props.setValue(`sponsorAddress-${id}`, '')
            setDeletedItemsId((prevState) => [id, ...prevState])
            form.remove()
        }
    }


    return (
        <>
            <Row>
                <Col md={12} sm={12}>
                    <Repeater count={count}>
                        {i => {
                            const Tag = i === 0 ? 'div' : SlideDown
                            return (
                                <Tag key={i}>
                                    <section>
                                        <Row className='justify-content-between align-items-center'>
                                            <Col md={6} sm={12}>
                                                <FormGroup>
                                                    <Label for={`sponsorName-${i}`}>
                                                        الاسم
                                                    </Label>
                                                    <InputGroup className='input-group-merge' tag={FormGroup}>
                                                        <Input type='text'
                                                               id={`sponsorName-${i}`}
                                                               name={`sponsorName-${i}`}
                                                               innerRef={props.register({required: true})}
                                                               onKeyDown={handleEnter}
                                                        />
                                                    </InputGroup>
                                                </FormGroup>
                                            </Col>
                                            <Col md={3} sm={12}>
                                                <FormGroup>
                                                    <Label for={`sponsorNationalId-${i}`}>رقم الهوية</Label>
                                                    <InputGroup className='input-group-merge' tag={FormGroup}>
                                                        <Input type='text'
                                                               id={`sponsorNationalId-${i}`}
                                                               maxLength="9"
                                                               innerRef={props.register({required: true})}
                                                               name={`sponsorNationalId-${i}`}
                                                        />
                                                    </InputGroup>
                                                </FormGroup>
                                            </Col>
                                            <Col md={3} sm={12}>
                                                <FormGroup>
                                                    <Label for={`sponsorPhone-${i}`}>رقم الهاتف</Label>
                                                    <InputGroup className='input-group-merge' tag={FormGroup}>
                                                        <Input
                                                            id={`sponsorPhone-${i}`}
                                                            name={`sponsorPhone-${i}`}
                                                            type='text'
                                                            maxLength="10"
                                                            innerRef={props.register({required: true})}
                                                        />
                                                    </InputGroup>
                                                </FormGroup>
                                            </Col>
                                            <Col md={6} sm={12}>
                                                <FormGroup>
                                                    <Label for={`sponsorJob-${i}`}>العمل</Label>
                                                    <InputGroup className='input-group-merge' tag={FormGroup}>
                                                        <Input type='text'
                                                               id={`sponsorJob-${i}`}
                                                               name={`sponsorJob-${i}`}
                                                               innerRef={props.register({required: true})}
                                                        />
                                                    </InputGroup>
                                                </FormGroup>
                                            </Col>
                                            <Col md={5} sm={12}>
                                                <FormGroup>
                                                    <Label for={`sponsorAddress-${i}`}>العنوان</Label>
                                                    <InputGroup className='input-group-merge' tag={FormGroup}>
                                                        <Input type='text'
                                                               id={`sponsorAddress-${i}`}
                                                               name={`sponsorAddress-${i}`}
                                                               innerRef={props.register({required: true})}
                                                        />
                                                    </InputGroup>
                                                </FormGroup>
                                            </Col>

                                            <Col md={1}>
                                                <Button.Ripple color='danger'
                                                               className='text-nowrap px-1 mt-1'
                                                               onClick={(e) => deleteForm(e, i)}
                                                               outline>
                                                    <Trash size={14}/>
                                                </Button.Ripple>
                                            </Col>
                                        </Row>
                                        <hr/>
                                    </section>
                                </Tag>
                            )
                        }}

                    </Repeater>
                </Col>
            </Row>
            <Col md={12} className={'mt-1'}>

                <Input type='hidden'
                       id={'repeaterCount'}
                       name={`repeaterCount`}
                       innerRef={props.register({required: true})}
                />
                <Button.Ripple className='btn-icon' color='primary'
                               onClick={increaseCount}>
                    اضافة كفيل
                </Button.Ripple>
            </Col>
        </>
    )
}

export default CitizenSponsor
