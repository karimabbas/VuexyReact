import {
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    Row,
    Col,
    FormGroup,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Label,
    Input,
    FormFeedback, Button
} from 'reactstrap'

import '@styles/react/libs/flatpickr/flatpickr.scss'
import {
    Hash, Calendar, Droplet, Crop
} from 'react-feather'
import { useState } from "react"
import Flatpickr from "react-flatpickr"
import SelectWIthAddNew from "../our-componnets/SelectWIthAddNew"
import AutoCompleteInput from "../our-componnets/AutoCompleteInput"
import { useHistory } from "react-router-dom"

const dateNow = Date.now()
const today = new Date(dateNow)

function addLeadingZeros (num, totalLength) {
    return String(num).padStart(totalLength, '0')
}

const format = (date) => {
    return `${date.getFullYear()}-${addLeadingZeros(date.getMonth() + 1, 2)}-${date.getDate()}`
}
const Vehicle = (props) => {
    const history = useHistory()
    return (
        <Card>
            <CardHeader>
                <CardTitle tag='h4' className='custom-title'>
                    <img src={'https://db.expand.ps/images/car.png'} alt='user-avatar'
                        className='img-fluid rounded' height='40' width='40' />
                    معلومات المركبة
                </CardTitle>
            </CardHeader>
            <CardBody>
                <Col sm='12' md={'12'}>
                    <Row>
                        <Col sm='12' md='4'>
                            <FormGroup>
                                <Label for='vehicleBrand'>العلامة التجارية للمركبة</Label>
                                <Input
                                    id='vehicleBrand'
                                    name='vehicleBrand'
                                    type='hidden'
                                    innerRef={props.register()}
                                />
                                <div className='invoice-customer'>
                                    <SelectWIthAddNew apiUrl={`getConstants/80`}
                                        modelId={80}
                                        id={'vehicleBrand'}
                                        name={'vehicleBrand'}
                                        deptDefult={props.vehicleBrand}
                                        title={'العلامة التجارية'}
                                        storeUrl={'saveConstantsWithParent'}
                                        deleteUrl={'deleteConstant'}
                                        onSelect={(value) => {
                                            props.setValue('vehicleBrand', value.id)
                                        }} />
                                </div>
                            </FormGroup>
                        </Col>
                        <Col sm='12' md='4'>
                            <FormGroup>
                                <Label for='model'>الموديل</Label>
                                <Input
                                    id='model'
                                    name='model'
                                    type='hidden'
                                    innerRef={props.register()}
                                />
                                <div className='invoice-customer'>
                                    <SelectWIthAddNew apiUrl={`getConstants/6259`}
                                        modelId={6259}
                                        id={'model'}
                                        name={'model'}
                                        deptDefult={props.model}
                                        title={'الموديل'}
                                        storeUrl={'saveConstantsWithParent'}
                                        deleteUrl={'deleteConstant'}
                                        onSelect={(value) => {
                                            props.setValue('model', value.id)
                                        }} />
                                </div>
                            </FormGroup>
                        </Col>
                        <Col sm='12' md='4'>
                            <FormGroup>
                                <Label for='gearType'>نوع الغيار</Label>
                                <Input
                                    id='gearType'
                                    name='gearType'
                                    type='hidden'
                                    innerRef={props.register()}
                                />
                                <div className='invoice-customer'>
                                    <SelectWIthAddNew apiUrl={`getConstants/6260`}
                                        modelId={6260}
                                        id={'gearType'}
                                        name={'gearType'}
                                        deptDefult={props.gearType}
                                        title={'نوع الغيار'}
                                        storeUrl={'saveConstantsWithParent'}
                                        deleteUrl={'deleteConstant'}
                                        onSelect={(value) => {
                                            props.setValue('gearType', value.id)
                                        }} />
                                </div>
                            </FormGroup>
                        </Col>
                    </Row>
                </Col>
                <Col md={'12'} sm={'12'}>
                    <Row>
                        <Col sm='12' md='4'>
                            <FormGroup>
                                <Label for='platNo'>رقم اللوحة</Label>
                                <InputGroup className='input-group-merge mb-2'>
                                    <InputGroupAddon addonType='prepend'>
                                        <InputGroupText>
                                            <Hash className='headings' size={14} />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        id='platNo'
                                        name='platNo'
                                        innerRef={props.register({ required: true })}
                                        invalid={props.errors.platNo && true}
                                        placeholder='رقم اللوحة'
                                    />
                                </InputGroup>
                                {props.errors && props.errors.platNo && <FormFeedback>ادخل رقم اللوحة </FormFeedback>}
                            </FormGroup>
                        </Col>
                        <Col sm='12' md='4'>
                            <FormGroup>
                                <Label for='ChassisNo'>رقم الشصي</Label>
                                <InputGroup className='input-group-merge mb-2'>
                                    <InputGroupAddon addonType='prepend'>
                                        <InputGroupText>
                                            <Hash className='headings' size={14} />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        id='ChassisNo'
                                        name='ChassisNo'
                                        innerRef={props.register({ required: true })}
                                        invalid={props.errors.ChassisNo && true}
                                        placeholder='رقم الشصي'
                                    />
                                </InputGroup>
                                {props.errors && props.errors.ChassisNo && <FormFeedback>ادخل رقم الشصي </FormFeedback>}
                            </FormGroup>
                        </Col>
                        <Col sm='12' md='4'>
                            <FormGroup>
                                <Label for='vehicleColor'>لون السيارة</Label>
                                <InputGroup className='input-group-merge mb-2'>
                                    <InputGroupAddon addonType='prepend'>
                                        <InputGroupText>
                                            <Droplet className='headings' size={14} />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        id='vehicleColor'
                                        name='vehicleColor'
                                        innerRef={props.register({ required: true })}
                                        placeholder='لون السيارة'
                                    />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Row>
                </Col>
                <Col sm='12' md={'12'}>
                    <Row>
                        <Col sm='12' md='8'>
                            <FormGroup>
                                <Label for='fullName'>اسم المركبة</Label>
                                <Input
                                    id='id'
                                    name='id'
                                    type='hidden'
                                    innerRef={props.register()}
                                />
                                <AutoCompleteInput apiUrl='vehicleForSelect'
                                    placeholder={'اسم المركبة'}
                                    onSelect={(name) => {
                                        if (props.outPage) {

                                        } else {
                                            history.push(`/vehicle/${name?.id ?? ''}`)
                                        }
                                    }}
                                    id='fullName'
                                    name='fullName'
                                    register={props.register}
                                    errors={props.errors.fullName}
                                />
                                {props.errors && props.errors.name && <FormFeedback>ادخل نص صحيح</FormFeedback>}
                            </FormGroup>
                        </Col>
                        <Col sm='12' md='4'>
                            <FormGroup>
                                <Label for='enginNo'>رقم المحرك</Label>
                                <InputGroup className='input-group-merge mb-2'>
                                    <InputGroupAddon addonType='prepend'>
                                        <InputGroupText>
                                            <Hash className='headings' size={14} />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        id='enginNo'
                                        name='enginNo'
                                        innerRef={props.register({ required: true })}
                                        invalid={props.errors.enginNo && true}
                                        placeholder='رقم المحرك'
                                    />
                                </InputGroup>
                                {props.errors && props.errors.enginNo && <FormFeedback>ادخل رقم المحرك </FormFeedback>}
                            </FormGroup>
                        </Col>
                    </Row>
                </Col>
                <Col sm='12' md={'12'}>
                    <Row>
                        <Col sm='12' md='4'>
                            <FormGroup>
                                <Label for='vehicleType'>نوع المركبة</Label>
                                <Input
                                    id='vehicleType'
                                    name='vehicleType'
                                    type='hidden'
                                    innerRef={props.register()}
                                />
                                <div className='invoice-customer'>
                                    <SelectWIthAddNew apiUrl={`getConstants/81`}
                                        modelId={81}
                                        id={'vehicleType'}
                                        name={'vehicleType'}
                                        deptDefult={props.vehicleType}
                                        title={'نوع المركبة'}
                                        storeUrl={'saveConstantsWithParent'}
                                        deleteUrl={'deleteConstant'}
                                        onSelect={(value) => {
                                            props.setValue('vehicleType', value.id)
                                        }} />
                                </div>
                            </FormGroup>
                        </Col>
                        <Col sm='12' md='4'>
                            <FormGroup>
                                <Label for='oilType'>نوع الوقود</Label>
                                <Input
                                    id='oilType'
                                    name='oilType'
                                    type='hidden'
                                    innerRef={props.register()}
                                />
                                <div className='invoice-customer'>
                                    <SelectWIthAddNew apiUrl={`getConstants/6109`}
                                        modelId={6109}
                                        id={'oilType'}
                                        name={'oilType'}
                                        deptDefult={props.oilType}
                                        title={'نوع الوقود'}
                                        storeUrl={'saveConstantsWithParent'}
                                        deleteUrl={'deleteConstant'}
                                        onSelect={(value) => {
                                            props.setValue('oilType', value.id)
                                        }} />
                                </div>
                            </FormGroup>
                        </Col>
                        <Col sm='12' md='4'>
                            <FormGroup>
                                <Label for='archiveNo'>رقم الارشيف</Label>
                                <InputGroup className='input-group-merge mb-2'>
                                    <InputGroupAddon addonType='prepend'>
                                        <InputGroupText>
                                            <Hash className='headings' size={14} />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        id='archiveNo'
                                        name='archiveNo'
                                        defaultValue={'V'}
                                        innerRef={props.register({ required: true })}
                                        placeholder='رقم الارشيف'
                                    />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Row>
                </Col>
                <Col sm='12'>
                    <Row>
                        <Col md={"4"} lg={'4'} sm={"12"}>
                            <FormGroup>
                                <Label for='bayingDate'>تاريخ الشراء</Label>
                                <InputGroup className='input-group-merge mb-2'>
                                    <InputGroupAddon addonType='prepend'>
                                        <InputGroupText>
                                            <Calendar className='headings' size={14} />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Flatpickr defaultValue={format(props.picker)} className='form-control'
                                        value={props.picker}
                                        onChange={date => props.setPicker(date[0])} id='expiryDate' />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        <Col md={"4"} lg={'4'} sm={"12"}>
                            <FormGroup>
                                <Label for='expiryDate'>تاريخ انتهاء الكفالة </Label>
                                <InputGroup className='input-group-merge mb-2'>
                                    <InputGroupAddon addonType='prepend'>
                                        <InputGroupText>
                                            <Calendar className='headings' size={14} />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Flatpickr defaultValue={format(props.picker2)} className='form-control'
                                        value={props.picker2}
                                        onChange={date => props.setPicker2(date[0])} id='expiryDate' />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        <Col sm='12' md='4'>
                            <FormGroup>
                                <Label for='cost'>التكلفة الكلية</Label>
                                <InputGroup>
                                    <Input
                                        id='cost'
                                        name='cost'
                                        placeholder='00.00'
                                        innerRef={props.register({ required: true })}
                                    />
                                    <Input type='select' name='price_value' id='price_value'
                                        innerRef={props.register({ required: true })}
                                    >
                                        <option value={'dollar'}>دولار</option>
                                        <option value={'euro'}>يورو</option>
                                        <option value={'shekel'}>شيكل</option>
                                        <option value={'dinar'}>دينار</option>

                                    </Input>
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Row>
                </Col>
                <Col md={'12'} sm={'12'}>
                    <Row>
                        <Col md={"4"} lg={'4'} sm={"12"}>
                            <FormGroup>
                                <Label for='licExpiryDate'>تاريخ انتهاء الرخصة</Label>
                                <InputGroup className='input-group-merge mb-2'>
                                    <InputGroupAddon addonType='prepend'>
                                        <InputGroupText>
                                            <Calendar className='headings' size={14} />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Flatpickr defaultValue={format(props.picker3)} className='form-control'
                                        value={props.picker3}
                                        onChange={date => props.setPicker3(date[0])} id='expiryDate' />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        <Col md={"4"} lg={'4'} sm={"12"}>
                            <FormGroup>
                                <Label for='insuranceExpiryDate'>تاريخ انتهاء التأمين </Label>
                                <InputGroup className='input-group-merge mb-2'>
                                    <InputGroupAddon addonType='prepend'>
                                        <InputGroupText>
                                            <Calendar className='headings' size={14} />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Flatpickr defaultValue={format(props.picker4)} className='form-control'
                                        value={props.picker4}
                                        onChange={date => props.setPicker4(date[0])} id='expiryDate' />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        <Col sm={"12"} md={"4"}>
                            <FormGroup>
                                <Label for='enginSize'>حجم المحرك</Label>
                                <InputGroup className='input-group-merge' tag={FormGroup}>
                                    <InputGroupAddon addonType='prepend'>
                                        <InputGroupText>
                                            <Crop className='headings' size={15} />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        id='enginSize'
                                        name='enginSize'
                                        type='text'
                                        innerRef={props.register({ required: false })}
                                        invalid={props.errors.enginSize && true}
                                        placeholder='حجم المحرك'
                                    />
                                </InputGroup>
                                {props.errors && props.errors.enginSize && <FormFeedback>ادخل حجم المحرك </FormFeedback>}
                            </FormGroup>
                        </Col>
                    </Row>
                </Col>
            </CardBody>
        </Card>

    )
}
export default Vehicle
