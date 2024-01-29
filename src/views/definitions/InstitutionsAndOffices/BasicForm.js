import { useState } from 'react'
import { useHistory } from "react-router-dom"
import { Card, CardHeader, CardTitle, CardBody, Button, Row, Col, Form, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Label, Input, FormFeedback } from 'reactstrap'
// import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { Mail, Archive, FileText, User, Phone, Smartphone, Printer, Send } from 'react-feather'
import QuickReportIcons from '../../our-componnets/QuickReportIcons'
import AutoCompleteInput from '../../our-componnets/AutoCompleteInput'
import SelectWIthAddNew from '../../our-componnets/SelectWIthAddNew'
import { useDispatch } from "react-redux"

const citizenIconController = {
    lic: false,
    water: false,
    elec: false,
    archive: true,
    job: false,
    tasks: false
}

const BasicForm = (props) => {

    const history = useHistory()
    const dispatch = useDispatch()

    return (
        <Card>
            <CardHeader>
                <CardTitle tag='h4' className='custom-title'>
                    <img src={'https://db.expand.ps/images/sponsor.png'} alt='user-avatar'
                        className='img-fluid rounded' height='40' width='40' />
                    معلومات {props.name}
                </CardTitle>
            </CardHeader>
            <CardBody>
                <Col sm='12'>
                    <Row>
                        <Col sm='8' md='8'>
                            <FormGroup>
                                <Label for='fullName'> اسم {props.name}</Label>

                                <AutoCompleteInput apiUrl={`orginzation_auto_complete/${props.nameDB}`}
                                    placeholder={props.name}
                                    onSelect={(name) => {
                                        if (props.outPage) {
                                            dispatch({
                                                type: 'GET_DEF',
                                                id: +name?.id
                                            })
                                        } else {
                                            history.push(`/add&edit/${props.URLName}/${name?.id ?? ''}`)
                                        }
                                    }}
                                    id='fullName'
                                    name='fullName'
                                    register={props.register}
                                    errors={props.errors.fullName}
                                    icon={<FileText className='headings' size={14} />}
                                />
                                <Input
                                    id='id'
                                    name='id'
                                    type='hidden'
                                    innerRef={props.register()}
                                />
                                <Input
                                    id='org_type'
                                    name='org_type'
                                    type='hidden'
                                    value={props.nameDB}
                                    innerRef={props.register({ required: true })}
                                    invalid={props.errors.fullName && true}
                                />

                                {props.errors && props.errors.name && <FormFeedback>ادخل نص صحيح</FormFeedback>}
                            </FormGroup>
                        </Col>
                        <Col sm='4' md='4'>
                            <FormGroup>
                                <Label for='zepe_code'>الرمز البريدى</Label>

                                <InputGroup className='input-group-merge'>
                                    <InputGroupAddon addonType='prepend'>
                                        <InputGroupText>
                                            <Send className='headings' size={14} />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        id='zepe_code'
                                        name='zepe_code'
                                        innerRef={props.register({ required: true })}
                                        invalid={props.errors.zepe_code && true}
                                        placeholder='الرمز البريدى'
                                    />
                                </InputGroup>
                                {props.errors && props.errors.zepe_code && <FormFeedback>ادخل نص صحيح</FormFeedback>}
                            </FormGroup>
                        </Col>
                    </Row>
                </Col>
                <Col sm='12'>
                    <Row>
                        <Col sm='8'>
                            <FormGroup>
                                <Label for='depart_head_name'>اسم المسؤول</Label>

                                <InputGroup className='input-group-merge '>
                                    <InputGroupAddon addonType='prepend'>
                                        <InputGroupText>
                                            <User className='headings' size={14} />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        id='depart_head_name'
                                        name='depart_head_name'
                                        innerRef={props.register({ required: true })}
                                        invalid={props.errors.depart_head_name && true}
                                        placeholder='اسم المسؤل'
                                    />
                                </InputGroup>
                                {props.errors && props.errors.depart_head_name && <FormFeedback>ادخل نص صحيح</FormFeedback>}
                            </FormGroup>
                        </Col>
                        <Col sm='4'>
                            <FormGroup>
                                <Label>المسمى الوظيفى</Label>
                                <Input
                                    id='position'
                                    name='position'
                                    type='hidden'
                                    innerRef={props.register()}
                                />
                                <div className='invoice-customer'>
                                    <SelectWIthAddNew apiUrl={`getConstants/74`}
                                        modelId={74}
                                        title={'المسمي الوظيفي'}
                                        id={'position'}
                                        name={'position'}
                                        storeUrl={'saveConstantsWithParent'}
                                        deleteUrl={'deleteConstant'}
                                        deptDefult={props.position}
                                        onSelect={(value) => {
                                            props.setValue('position', value.id)
                                        }} />
                                </div>
                            </FormGroup>
                        </Col>
                    </Row>
                </Col>
                <Col sm='12'>
                    <Row>
                        <Col sm='4'>
                            <FormGroup>
                                <Label for='phone_1'>رقم الهاتف 1</Label>
                                <InputGroup className='input-group-merge '>
                                    <InputGroupAddon addonType='prepend'>
                                        <InputGroupText>
                                            <Smartphone className='headings' size={14} />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        id='phone_1'
                                        name='phone_1'
                                        type='text'
                                        maxLength={10}
                                        invalid={props.errors.phone_1 && true}
                                        innerRef={props.register({ required: false })}
                                        placeholder='05600000000'
                                    />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        <Col sm='4'>
                            <FormGroup>
                                <Label for='phone_2'>رقم الهاتف 2 </Label>
                                <InputGroup className='input-group-merge '>
                                    <InputGroupAddon addonType='prepend'>
                                        <InputGroupText>
                                            <Smartphone className='headings' size={14} />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        id='phone_2'
                                        name='phone_2'
                                        type='text'
                                        maxLength={10}
                                        innerRef={props.register({ required: false })}
                                        placeholder='05600000000'
                                    />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        <Col sm='4'>
                            <FormGroup>
                                <Label for='local_phone'>الرقم الأرضى</Label>
                                <InputGroup className='input-group-merge '>
                                    <InputGroupAddon addonType='prepend'>
                                        <InputGroupText>
                                            <Phone className='headings' size={14} />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        id='local_phone'
                                        type='text'
                                        maxLength={10}
                                        name='local_phone'
                                        innerRef={props.register({ required: false })}
                                        placeholder='0000000000'
                                    />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Row>
                </Col>
                <Col sm='12'>
                    <Row>
                        <Col sm='8' md='8'>
                            <FormGroup>
                                <Label for='email'>البريد الألكترونى</Label>

                                <InputGroup className='input-group-merge '>
                                    <InputGroupAddon addonType='prepend'>
                                        <InputGroupText>
                                            <Mail className='headings' size={14} />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        id='email'
                                        name='email'
                                        innerRef={props.register({ required: true })}
                                        invalid={props.errors.email && true}
                                        placeholder='البريد الألكترونى'
                                    />
                                </InputGroup>
                                {props.errors && props.errors.mail && <FormFeedback>ادخل نص صحيح</FormFeedback>}
                            </FormGroup>
                        </Col>
                        <Col sm='4' md='4'>
                            <Label>FAX</Label>
                            <InputGroup className='input-group-merge '>
                                <InputGroupAddon addonType='prepend'>
                                    <InputGroupText>
                                        <Printer className='headings' size={14} />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    id='fax'
                                    name='fax'
                                    innerRef={props.register({ required: true })}
                                    invalid={props.errors.fax && true}
                                    placeholder='FAX'
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                </Col>
                <Col sm='12'>
                    <Row>
                        <Col sm={"12"} md={"12"}>
                            <Row>
                                <Col sm={'12'} md={'12'} style={{ marginTop: '20px' }}>
                                    <h4>
                                        <span> <Archive /> الأرشيف </span>
                                    </h4>
                                    <hr />
                                </Col>
                                <QuickReportIcons type={props.nameDB} modelData={props.modelData} citizenIconController={{ archive: true }}></QuickReportIcons>
                            </Row>
                        </Col>

                    </Row>
                </Col>
            </CardBody>
        </Card>

    )
}
export default BasicForm
