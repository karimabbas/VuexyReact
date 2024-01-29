import { useState } from 'react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import Select from 'react-select'
import { useHistory } from "react-router-dom"
import { yupResolver } from '@hookform/resolvers/yup'
import { selectThemeColors } from '@utils'
import makeAnimated, { ValueContainer } from "react-select/animated"
import { Card, CardHeader, CardTitle, CardBody, Button, Row, Col, Form, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Label, Input, FormFeedback } from 'reactstrap'
// import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { Box, Map, Search, Mail, MessageSquare, CheckSquare, Calendar, Edit2, FileText, Circle, ShoppingCart, User, Phone, Smartphone, Printer, Smile, Send, Key, Globe, Home, PenTool, Edit, Edit3, Hash, DollarSign, Terminal, Clock, Archive, UserCheck } from 'react-feather'
import AutoCompleteInput from '../../our-componnets/AutoCompleteInput'
import AutoCompleteAjax from '../../our-componnets/AutoCompleteAjax'
import SelectWithAddNew from '../../our-componnets/SelectWIthAddNew'
import { useDispatch, useSelector } from "react-redux"

function addLeadingZeros(num, totalLength) {
    return String(num).padStart(totalLength, '0')
}
const animatedComponents = makeAnimated()

const citizenIconController = {
    lic: false,
    water: false,
    elec: false,
    archive: true,
    job: false,
    tasks: false
}

const BuilidingAndWarehouse = (props) => {
    const history = useHistory()
    const defStore = useSelector(state => state.ASSETS)
    //    console.log(defStore?.employees)
    const dispatch = useDispatch()
    return (
        <Card>
            <CardHeader>
                <CardTitle tag='h4' className='custom-title'>
                    <img src={'https://db.expand.ps/images/info.png'} alt='user-avatar'
                        className='img-fluid rounded' height='40' width='40' />
                    معلومات {props.name}
                </CardTitle>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col sm='8' md='8'>
                        <FormGroup>
                            <Label for='fullName'> اسم {props.name}</Label>
                            <InputGroup className='input-group-merge mb-2'>

                                <AutoCompleteInput apiUrl={`asset_auto_complete/${props.nameDB}`}
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
                                // icon={<FileText className='headings' size={14} />}
                                />
                                <Input
                                    id='id'
                                    name='id'
                                    type='hidden'
                                    innerRef={props.register()}
                                />
                                <Input
                                    id='type'
                                    name='type'
                                    type='hidden'
                                    value={props.nameDB}
                                    innerRef={props.register({ required: true })}
                                    invalid={props.errors.fullName && true}
                                />
                            </InputGroup>

                            {props.errors && props.errors.name && <FormFeedback>ادخل نص صحيح</FormFeedback>}
                        </FormGroup>
                        <Row>
                            <Col sm='8' md='8'>
                                <FormGroup>
                                    <Label>اسم المسؤول</Label>

                                    <Input
                                        id='employee'
                                        name='employee'
                                        type='hidden'
                                        innerRef={props.register({ required: true })}
                                    />
                                    <SelectWithAddNew apiUrl={``}

                                        id='employee'
                                        name='employee'
                                        modelId={null}
                                        title={'اسم المسؤول'}
                                        optionList={defStore?.employees}
                                        storeUrl={''}
                                        deleteUrl={''}
                                        deptDefult={props.employeeSetter}
                                        onSelect={(value) => {
                                            props.setValue('employee', value.id)
                                        }} />


                                    {/* <AutoCompleteAjax
                                        suggestions={props.suggestions}
                                        selectedFromApi={props.employee}
                                        defaultValue={props.employeeSetter}
                                        onSelect={(value) => {
                                            // console.log(value)
                                            props.setEmployee(value.id)
                                        }}
                                    /> */}
                                </FormGroup>
                            </Col>

                            <Col sm='4' md='4'>
                                <FormGroup>
                                    <Label for='asset_type'>نوع الملكية</Label>
                                    <Input
                                        className="form-control"
                                        type='select'
                                        name='asset_type'
                                        id='asset_type'
                                        defaultValue={1}
                                        innerRef={props.register({ required: true })}
                                    >
                                        <option value={1}>ملك</option>
                                        <option value={2}>إيجار</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm='4' md='4'>
                        {props.image}
                    </Col>
                </Row>

                <Row>
                    <Col sm='4' md='4'>
                        <FormGroup>
                            <Label for='asset_price'>تكلفة الفعلية</Label>

                            <InputGroup>
                                <Input
                                    id='asset_price'
                                    name='asset_price'
                                    placeholder='00.00'
                                    innerRef={props.register({ required: true })}
                                    invalid={props.errors.asset_price && true}
                                />
                                <Input
                                    className="form-control"
                                    type='select'
                                    name='CurrencyID'
                                    id='CurrencyID'
                                    defaultValue={1}
                                    innerRef={props.register({ required: true })}>
                                    <option value={1}>دولار</option>
                                    <option value={2}>يورو</option>
                                    <option value={3}>شيكل</option>
                                    <option value={4}>درهم</option>
                                    <option value={5}>دينار</option>
                                </Input>
                            </InputGroup>
                        </FormGroup>
                    </Col>

                    <Col sm={"8"} md={"8"}>
                        <FormGroup>
                            <Label for='notes'>ملاحظات</Label>
                            <InputGroup className='input-group-merge'>
                                <InputGroupAddon addonType='prepend'>
                                    <InputGroupText>
                                        <Edit2 className='headings' size={15} />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    id='notes'
                                    name='notes'
                                    type='text'
                                    innerRef={props.register({ required: true })}
                                    placeholder='ملاحظات'
                                />
                            </InputGroup>
                        </FormGroup>
                    </Col>
                </Row>
            </CardBody>
        </Card>

    )
}

export default BuilidingAndWarehouse