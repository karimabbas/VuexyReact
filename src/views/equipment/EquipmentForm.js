import Select, { components } from 'react-select'
import { selectThemeColors } from '@utils'
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
    Media,
    FormFeedback, Button
} from 'reactstrap'

import '@styles/react/libs/flatpickr/flatpickr.scss'
import {
    Plus, Tool, Hash, Calendar, Edit2, X
} from 'react-feather'
import { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import Avatar from '@components/avatar'
import Flatpickr from "react-flatpickr"
import SelectWIthAddNew from '../our-componnets/SelectWIthAddNew'
import AutoCompleteInput from '../our-componnets/AutoCompleteInput'
import { useHistory } from "react-router-dom"

const dateNow = Date.now()
const today = new Date(dateNow)

function addLeadingZeros(num, totalLength) {
    return String(num).padStart(totalLength, '0')
}

const format = (date) => {
    return `${date.getFullYear()}-${addLeadingZeros(date.getMonth() + 1, 2)}-${date.getDate()}`
}
const EquipmentForm = (props) => {
    const EquipmentStore = useSelector(state => state.Equipments)
    // console.log(props.picker1)
    const [value, setValue] = useState({})
    const [options, setOptions] = useState([
        {
            value: 'add-new',
            label: 'اضافة',
            type: 'button',
            color: 'flat-success'
        }
    ])
    const history = useHistory()
    const dispatch = useDispatch()

    return (
        <Card>
            <CardHeader>
                <CardTitle tag='h4' className='custom-title'>
                    <img src={'https://db.expand.ps/images/Office_Equipment_-_088_-_Printer-512.png'} alt='user-avatar'
                        className='img-fluid rounded' height='40' width='40' />
                    معلومات المعدات
                </CardTitle>
            </CardHeader>
            <CardBody>
                <Col sm='12' md={'12'}>
                    <Row>
                        <Col md={'8'} sm={'12'}>
                            <Row>
                                <Col sm='12' md='12'>
                                    <FormGroup>
                                        <Label for='fullName'>اسم الجهاز</Label>
                                        <Input
                                            id='id'
                                            name='id'
                                            type='hidden'
                                            innerRef={props.register()}
                                        />
                                        <AutoCompleteInput apiUrl='equip_auto_complete'
                                            placeholder={'اسم الحهاز'}
                                            onSelect={(name) => {
                                                if (props.outPage) {
                                                    dispatch({
                                                        type: 'GET_EQUIPMENT',
                                                        id: +name?.id
                                                    })
                                                } else {
                                                    history.push(`/equip/${name?.id ?? ''}`)
                                                }
                                            }}
                                            id='fullName'
                                            name='fullName'
                                            register={props.register}
                                            errors={props.errors.fullName}
                                        />

                                        {props.errors && props.errors.fullName &&
                                            <FormFeedback>{props.errors.fullName.message}</FormFeedback>}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm='12' md='6'>
                                    <FormGroup>
                                        <Label for='brand'>الماركة</Label>
                                        <Input
                                            id='brand'
                                            name='brand'
                                            type='hidden'
                                            innerRef={props.register()}
                                        />
                                        <div className='invoice-customer'>
                                            <SelectWIthAddNew
                                                modelId={77}
                                                id={'brand'}
                                                name={'brand'}
                                                deptDefult={props.brand}
                                                title={'الماركة'}
                                                storeUrl={'saveConstantsWithParent'}
                                                deleteUrl={'deleteConstant'}
                                                onSelect={(value) => {
                                                    props.setValue('brand', value.id)
                                                }} />
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col sm='12' md='6'>
                                    <FormGroup>
                                        <Label for='equipType'>نوع المعدة</Label>
                                        <Input
                                            id='Eqtype'
                                            name='Eqtype'
                                            type='hidden'
                                            innerRef={props.register()}
                                        />
                                        <div className='invoice-customer'>
                                            <SelectWIthAddNew
                                                modelId={78}
                                                id={'Eqtype'}
                                                name={'Eqtype'}
                                                deptDefult={props.Eqtype}
                                                title={'نوع المعدة'}
                                                storeUrl={'saveConstantsWithParent'}
                                                deleteUrl={'deleteConstant'}
                                                onSelect={(value) => {
                                                    props.setValue('Eqtype', value.id)
                                                }} />
                                        </div>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm='12' md='6'>
                                    <FormGroup>
                                        <Label for='equipStatus'>حالة الجهاز</Label>
                                        <Input
                                            id='EqtStatus'
                                            name='EqtStatus'
                                            type='hidden'
                                            innerRef={props.register()}
                                        />
                                        <div className='invoice-customer'>
                                            <SelectWIthAddNew
                                                modelId={79}
                                                id={'EqtStatus'}
                                                name={'EqtStatus'}
                                                deptDefult={props.EqtStatus}
                                                title={'حالة الجهاز'}
                                                storeUrl={'saveConstantsWithParent'}
                                                deleteUrl={'deleteConstant'}
                                                onSelect={(value) => {
                                                    props.setValue('EqtStatus', value.id)
                                                }} />
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col sm='12' md='6'>
                                    <FormGroup>
                                        <Label for='serialNo'>الرقم التسلسلي</Label>
                                        <InputGroup className='input-group-merge mb-2'>
                                            <InputGroupAddon addonType='prepend'>
                                                <InputGroupText>
                                                    <Hash className='headings' size={14} />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                id='serialNo'
                                                name='serialNo'
                                                innerRef={props.register({ required: true })}
                                                placeholder='الرقم التسلسلي'
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                        <Col style={{ paddingTop: 20 }} md={'4'} sm={'12'}>
                            <center>
                                <Media>
                                    <Media className='d-flex' left>
                                        <Media onClick={props.handlerMediaClick} object className='rounded mr-50' src={props.img} alt="صورة المعدة" style={{ cursor: 'pointer' }} height='200' width='200' />

                                    </Media>
                                    <Input type='file' id="imgPic" name="imgPic" innerRef={props.imageRef} onChange={props.onChangeImage} hidden accept='image/*' />
                                    <X class="btn-icon btn btn-danger btn-close btn-sm"
                                        style={{
                                            marginRight: '-2.3rem'
                                            
                                        }}
                                        onClick={props.resetHandlerImage} />
                                </Media>
                            </center>
                        </Col>
                    </Row>
                </Col>
                <Col sm='12'>
                    <Row>
                        <Col md={'4'} sm='12'>
                            <FormGroup>
                                <Label for='internalNo'>الرقم الداخلي</Label>

                                <InputGroup className='input-group-merge mb-2'>
                                    <InputGroupAddon addonType='prepend'>
                                        <InputGroupText>
                                            <Hash className='headings' size={14} />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        id='internalNo'
                                        name='internalNo'
                                        innerRef={props.register({ required: true })}
                                        placeholder='الرقم الداخلي'
                                    />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        <Col sm='2'>
                            <FormGroup>
                                <Label>العدد</Label>
                                <InputGroup className='input-group-merge mb-2'>
                                    <Input
                                        id='count'
                                        name='count'
                                        type={'number'}
                                        innerRef={props.register({ required: true })}
                                        placeholder='العدد'
                                    />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        <Col md={"6"} sm={"12"}>
                            <FormGroup>
                                <Label for='dept'>القسم</Label>
                                <Input
                                    id='deptId'
                                    name='deptId'
                                    type='hidden'
                                    innerRef={props.register()}
                                />
                                <div className='invoice-customer'>
                                    <SelectWIthAddNew apiUrl='deptInfoForSelect'
                                        modelId={null}
                                        id={'deptId'}
                                        name={'deptId'}
                                        deptDefult={props.dept}
                                        storeUrl={'storeDepartment'}
                                        deleteUrl={'deleteDepartment'}
                                        optionList={EquipmentStore?.departments}
                                        onSelect={(value) => {
                                            props.setValue('deptId', value.id)
                                        }} />
                                </div>
                            </FormGroup>
                        </Col>
                    </Row>
                </Col>
                <Col sm='12'>
                    <Row>
                        <Col md={"6"} sm={"12"}>
                            <FormGroup>
                                <Label>اسم المسؤول</Label>

                                <Input
                                    id='employee'
                                    name='employee'
                                    type='hidden'
                                    innerRef={props.register({ required: true })}
                                />
                                <SelectWIthAddNew apiUrl={``}

                                    id='employee'
                                    name='employee'
                                    modelId={null}
                                    title={'اسم المسؤول'}
                                    optionList={EquipmentStore?.employees}
                                    deptDefult={props.employee}
                                    onSelect={(value) => {
                                        props.setValue('employee', value.id)
                                    }} />
                            </FormGroup>
                        </Col>
                        <Col md={"3"} lg={'3'} sm={"12"}>
                            <FormGroup>
                                <Label for='bayingDate'>تاريخ الشراء</Label>
                                <InputGroup className='input-group-merge mb-2'>
                                    <InputGroupAddon addonType='prepend'>
                                        <InputGroupText>
                                            <Calendar className='headings' size={14} />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Flatpickr defaultValue={format(today)} className='form-control'
                                        value={props.picker1}
                                        onChange={date => props.setPicker1(date[0])} id='expiryDate' />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        <Col md={"3"} lg={'3'} sm={"12"}>
                            <FormGroup>
                                <Label for='expiryDate'>تاريخ الانتهاء </Label>
                                <InputGroup className='input-group-merge mb-2'>
                                    <InputGroupAddon addonType='prepend'>
                                        <InputGroupText>
                                            <Calendar className='headings' size={14} />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Flatpickr defaultValue={format(today)} className='form-control'
                                        value={props.picker2}
                                        onChange={date => props.setPicker2(date[0])} id='expiryDate' />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Row>
                </Col>
                <Col md={'12'} sm={'12'}>
                    <Row>
                        <Col sm='12' md='4'>
                            <FormGroup>
                                <Label for='cost'>التكلفة</Label>
                                <InputGroup>
                                    <Input
                                        id='cost'
                                        name='cost'
                                        placeholder='00.00'
                                        innerRef={props.register({ required: true })}
                                        invalid={props.errors.cost && true}
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
                        <Col sm={"12"} md={"8"}>
                            <FormGroup>
                                <Label for='notes'>ملاحظات</Label>
                                <InputGroup className='input-group-merge' tag={FormGroup}>
                                    <InputGroupAddon addonType='prepend'>
                                        <InputGroupText>
                                            <Edit2 className='headings' size={15} />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        id='notes'
                                        name='notes'
                                        type='text'
                                        innerRef={props.register({ required: false })}
                                        placeholder='ملاحظات'
                                    />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Row>
                </Col>
            </CardBody>
        </Card>

    )
}
export default EquipmentForm