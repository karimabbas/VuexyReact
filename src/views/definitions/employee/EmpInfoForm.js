import {
    Card,
    CardBody, CardHeader,
    CardTitle,
    Col, CustomInput, FormFeedback,
    FormGroup, Input,
    InputGroup,
    InputGroupAddon, InputGroupText,
    Label,
    Row,
    Media
} from "reactstrap"
import {CreditCard, Hash, Smartphone, Mail, Phone, X, Calendar, Key} from "react-feather"
import Flatpickr from "react-flatpickr"
import '@styles/react/libs/flatpickr/flatpickr.scss'
import Avatar from '@components/avatar'
import {useHistory} from "react-router-dom"
import {useState, useRef} from "react"
import AutoCompleteInput from "../../our-componnets/AutoCompleteInput"
import SelectWIthAddNew from "../../our-componnets/SelectWIthAddNew"
import {useSelector, useDispatch} from "react-redux"
import PhoneComponent from "../../our-componnets/Phone"

function addLeadingZeros(num, totalLength) {
    return String(num).padStart(totalLength, '0')
}

const format = (date) => {
    return `${date.getFullYear()}-${addLeadingZeros(date.getMonth() + 1, 2)}-${date.getDate()}`
}

const EmpInfoForm = (props) => {
    const employeeStore = useSelector(state => state.Employees)
    const history = useHistory()
    const dispatch = useDispatch()

    return (
        <Card>
            <CardHeader>
                <CardTitle tag='h4' className='custom-title'>
                    <img src={'https://db.expand.ps/images/personal-information.png'} alt='user-avatar'
                         className='img-fluid rounded' height='40' width='40'/>
                    معلومات الموظف
                </CardTitle>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col sm={"12"} md={"8"}>
                        <Row>
                            <Col sm={"12"} md={"12"}>
                                <FormGroup>
                                    <Label for='fullName'>اسم الموظف</Label>
                                    <Input
                                        id='id'
                                        name='id'
                                        type='hidden'
                                        innerRef={props.register()}
                                    />
                                    <AutoCompleteInput apiUrl='emp_auto_complete'
                                                       placeholder={'اسم الموظف'}
                                                       onSelect={(name) => {
                                                           if (props.outPage) {
                                                               dispatch({
                                                                   type: 'GET_DEF',
                                                                   id: +name?.id
                                                               })
                                                           } else {
                                                               history.push(`/add&edit/show_employee/${name?.id ?? ''}`)
                                                           }
                                                       }}
                                                       id='empFullName'
                                                       name='empFullName'
                                                       register={props.register}
                                                       errors={props.errors.empFullName}
                                    />

                                    {props.errors && props.errors.empFullName &&
                                        <FormFeedback>{props.errors.empFullName.message}</FormFeedback>}
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={"12"} md={"6"}>
                                <FormGroup>
                                    <Label for='nationalId'>رقم الهوية</Label>
                                    <InputGroup className='input-group-merge' tag={FormGroup}>
                                        <InputGroupAddon addonType='prepend'>
                                            <InputGroupText>
                                                <CreditCard className='headings' size={15}/>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            id='nationalId'
                                            name='nationalId'
                                            maxLength="9"
                                            innerRef={props.register({required: true})}
                                            invalid={props.errors.nationalId && true}
                                            placeholder='رقم الهوية'
                                        />
                                    </InputGroup>
                                    {props.errors && props.errors.nationalId &&
                                        <FormFeedback>{props.errors.nationalId.message}</FormFeedback>}
                                </FormGroup>
                            </Col>
                            <Col sm={"12"} md={"6"}>
                                <FormGroup>
                                    <Label for='jobNo'>الرقم الوظيفي</Label>
                                    <InputGroup className='input-group-merge' tag={FormGroup}>
                                        <InputGroupAddon addonType='prepend'>
                                            <InputGroupText>
                                                <Hash className='headings' size={15}/>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            id='jobNo'
                                            name='jobNo'
                                            innerRef={props.register({required: true})}
                                            placeholder='الرقم الوظيفي'
                                        />
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Col>
                    <Col style={{paddingTop: 20}} md={'4'} sm={'12'}>
                        <center>
                            <Media>
                                <Media className='d-flex' left>
                                    <Media onClick={props.handlerMediaClick} object className='rounded ml-5'
                                           src={props.img} alt="صورة الهوية" style={{cursor: 'pointer'}} height='120'
                                           width='120'/>
                                    <X className="btn-icon btn btn-danger btn-close btn-sm ml-2"
                                       onClick={props.resetHandlerImage}/>
                                </Media>
                                <Input type='file' id="imgPic" name="imgPic" innerRef={props.imageRef}
                                       onChange={props.onChangeImage} hidden accept='image/*'/>

                            </Media>
                        </center>
                    </Col>
                    <Col sm={"12"} md={"12"}>
                        <Row>
                            <PhoneComponent sm={12} md={4} img={'https://db.expand.ps/images/jawwal35.png'} id={'phone1'}
                                   name={'phone1'} errors={props.errors} register={props.register}>
                            </PhoneComponent>
                            {/*<Col sm={"12"} md={"4"}>*/}
                            {/*    <FormGroup>*/}
                            {/*        <Label for='phone1'>رقم الهاتف</Label>*/}
                            {/*        <InputGroup className='input-group-merge' tag={FormGroup}>*/}
                            {/*            <InputGroupAddon addonType='prepend'>*/}
                            {/*                <InputGroupText>*/}
                            {/*                    <Smartphone className='headings' size={15} />*/}
                            {/*                </InputGroupText>*/}
                            {/*            </InputGroupAddon>*/}
                            {/*            <Input*/}
                            {/*                id='phone1'*/}
                            {/*                name='phone1'*/}
                            {/*                type='text'*/}
                            {/*                maxLength="10"*/}
                            {/*                innerRef={props.register({ required: true })}*/}
                            {/*                invalid={props.errors.phone1 && true}*/}
                            {/*                placeholder='رقم الهاتف'*/}
                            {/*            />*/}
                            {/*        </InputGroup>*/}
                            {/*        {props.errors && props.errors.phone1 &&*/}
                            {/*            <FormFeedback>{props.errors.phone1.message}</FormFeedback>}*/}
                            {/*    </FormGroup>*/}
                            {/*</Col>*/}
                            <Col sm={"12"} md={"4"}>
                                <FormGroup>
                                    <Label for='phone2'>رقم الهاتف</Label>
                                    <InputGroup className='input-group-merge' tag={FormGroup}>
                                        <InputGroupAddon addonType='prepend'>
                                            <InputGroupText>
                                                <Smartphone className='headings' size={15}/>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            id='phone2'
                                            name='phone2'
                                            type='text'
                                            maxLength="10"
                                            innerRef={props.register({required: true})}
                                            placeholder='رقم الهاتف'
                                        />
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                            <Col sm={"12"} md={"4"}>
                                <FormGroup>
                                    <Label for='nickName'>اسم مختصر</Label>
                                    <InputGroup className='input-group-merge' tag={FormGroup}>
                                        <Input
                                            id='nickName'
                                            name='nickName'
                                            innerRef={props.register({required: true})}
                                            invalid={props.errors.nickName && true}
                                            placeholder='اسم مختصر'
                                        />
                                    </InputGroup>
                                    {props.errors && props.errors.nickName &&
                                        <FormFeedback>{props.errors.nickName.message}</FormFeedback>}
                                </FormGroup>
                            </Col>

                        </Row>
                    </Col>
                    <Col sm={"12"} md={"12"}>
                        <Row>
                            <Col sm={"12"} md={"4"}>
                                <FormGroup>
                                    <Label for='internalPhone'>الرقم الداخلي</Label>
                                    <InputGroup className='input-group-merge' tag={FormGroup}>
                                        <InputGroupAddon addonType='prepend'>
                                            <InputGroupText>
                                                <Phone className='headings' size={15}/>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            id='internalPhone'
                                            name='internalPhone'
                                            type='number'
                                            innerRef={props.register({required: true})}
                                            placeholder='الرقم الداخلي'
                                        />
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                            <Col sm={"12"} md={"8"}>
                                <FormGroup>
                                    <Label for='e_mail'>البريد الالكتروني</Label>
                                    <InputGroup className='input-group-merge' tag={FormGroup}>
                                        <InputGroupAddon addonType='prepend'>
                                            <InputGroupText>
                                                <Mail className='headings' size={15}/>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            id='e_mail'
                                            name='e_mail'
                                            innerRef={props.register({required: true})}
                                            placeholder='البريد الالكتروني'
                                        />
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={"12"} md={"12"}>
                        <Row>
                            <Col sm={'12'} md={'12'} style={{marginTop: '20px'}}>
                                <h4>
                                    <img src={'https://db.expand.ps/images/workHrs.png'}
                                         alt='user-avatar'
                                         className='img-fluid rounded' height='40' width='40'/>
                                    بيانات العمل
                                </h4>
                                <hr/>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={'12'} md={'12'}>
                        <Row>
                            <Col md={"8"} lg={'8'} sm={"12"}>
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
                                                          optionList={employeeStore?.departments}
                                                          onSelect={(value) => {
                                                              props.setValue('deptId', value.id)
                                                          }}/>
                                    </div>
                                </FormGroup>
                            </Col>
                            <Col md={"4"} lg={'4'} sm={"12"}>

                                <center>
                                    <FormGroup>
                                        <Key className='headings' style={{marginLeft: '10px'}}/>
                                        <Label for='hasAccount'>بيانات المستخدم</Label>
                                        <div className={'mt-1'}>
                                            <CustomInput type='switch' id='hasAccount' name='hasAccount'
                                                         innerRef={props.register()}
                                                         defaultChecked/>
                                        </div>
                                    </FormGroup>
                                </center>

                            </Col>
                        </Row>
                    </Col>
                    <Col sm={'12'} md={'12'}>
                        <Row>
                            <Col md={"4"} lg={'4'} sm={"12"}>
                                <FormGroup>
                                    <Label for='jobType'>نوع الوظيفة</Label>
                                    <Input
                                        id='jobType'
                                        name='jobType'
                                        type='hidden'
                                        innerRef={props.register()}
                                    />
                                    <div className='invoice-customer'>
                                        <SelectWIthAddNew apiUrl={`getConstants/66`}

                                                          modelId={66}
                                                          id={'jobType'}
                                                          name={'jobType'}
                                                          deptDefult={props.jobType}
                                                          title={'نوع الوظيفة'}
                                                          storeUrl={'saveConstantsWithParent'}
                                                          deleteUrl={'deleteConstant'}
                                                          onSelect={(value) => {
                                                              props.setValue('jobType', value.id)
                                                          }}/>
                                    </div>
                                </FormGroup>
                            </Col>
                            <Col md={"4"} lg={'4'} sm={"12"}>
                                <FormGroup>
                                    <Label for='hiringDate'>تاريخ البداية</Label>
                                    <InputGroup className='input-group-merge mb-2'>
                                        <InputGroupAddon addonType='prepend'>
                                            <InputGroupText>
                                                <Calendar size={14}/>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Flatpickr defaultValue={format(props.picker)} className='form-control'
                                                   value={props.picker}
                                                   onChange={date => props.setPicker(date[0])} id='default-picker'/>
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                            <Col md={"4"} lg={'4'} sm={"12"}>

                                <FormGroup>
                                    <Label for='position'>المسمي الوظيفي</Label>
                                    <Input
                                        id='position'
                                        name='position'
                                        type='hidden'
                                        innerRef={props.register()}
                                    />
                                    <div className='invoice-customer'>
                                        <SelectWIthAddNew apiUrl={`getConstants/65`}
                                                          modelId={65}
                                                          title={'المسمي الوظيفي'}
                                                          id={'position'}
                                                          name={'position'}
                                                          storeUrl={'saveConstantsWithParent'}
                                                          deleteUrl={'deleteConstant'}
                                                          deptDefult={props.position}
                                                          onSelect={(value) => {
                                                              props.setValue('position', value.id)
                                                          }}/>
                                    </div>
                                </FormGroup>

                            </Col>
                        </Row>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}
export default EmpInfoForm