import {
    Button,
    Card,
    CardBody, CardHeader, CardText,
    CardTitle,
    Col,
    Form, FormFeedback,
    FormGroup, Input,
    InputGroup,
    InputGroupAddon, InputGroupText,
    Label,
    Row
} from "reactstrap"
import { CreditCard, Hash, FileText, Plus, Smartphone, User, Mail } from "react-feather"
import QuickReportIcons from "../../our-componnets/QuickReportIcons"
import AutoCompleteInput from "../../our-componnets/AutoCompleteInput"
import SelectWithAddNew from "../../our-componnets/SelectWIthAddNew"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import info from '../../../assets/images/icon/info.png'
import jawwal from '../../../assets/images/icon/jawwal.png'
import mail from '../../../assets/images/icon/mail.jpg'
import ooredoo from '../../../assets/images/icon/ooredoo.png'

const CitizenInfoForm = (props) => {

    const citizenIconController = {
        archive: true,
        car: true
    }
    const history = useHistory()
    const dispatch = useDispatch()

    return (
        <Card>
            <CardHeader>
                <CardTitle tag='h4' className='custom-title'>
                    <img src={'https://db.expand.ps/images/personal-information.png'} alt='user-avatar'
                        className='img-fluid rounded' height='40' width='40' />
                    معلومات المواطن
                </CardTitle>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col sm={"12"} md={"12"}>
                        <Row>
                            <Col sm={"12"} md={"8"}>
                                <FormGroup>
                                    <Label for='fullName'>اسم المواطن</Label>
                                    <InputGroup className='input-group-merge' tag={FormGroup}>

                                        <AutoCompleteInput apiUrl='subscribe_auto_complete'
                                            placeholder='اسم المواطن'
                                            onSelect={(name) => {
                                                if (props.outPage) {
                                                    dispatch({
                                                        type: 'GET_DEF',
                                                        id: +name?.id
                                                    })
                                                } else {
                                                    history.push(`/add&edit/show_citizens/${name?.id ?? ''}`)
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
                                    </InputGroup>
                                    {props.errors && props.errors.fullName &&
                                        <FormFeedback>{props.errors.fullName.message}</FormFeedback>}
                                </FormGroup>
                            </Col>
                            <Col sm={"12"} md={"4"}>
                                <FormGroup>
                                    <Label for='formDataNationalID'>رقم الهوية</Label>
                                    <InputGroup className='input-group-merge' tag={FormGroup}>
                                        <InputGroupAddon addonType='prepend'>
                                            <InputGroupText>
                                                <CreditCard className='headings' size={15} />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            id='formDataNationalID'
                                            name='formDataNationalID'
                                            type='text'
                                            maxLength={9}
                                            innerRef={props.register({ required: true })}
                                            placeholder='رقم الهوية'
                                        />
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={"12"} md={"12"}>
                        <Row>
                            <Col sm={"12"} md={"4"}>
                                <FormGroup>
                                    <Label for='formDataMobileNo1'>رقم الهاتف 1</Label>
                                    <InputGroup className='input-group-merge' tag={FormGroup}>
                                        <InputGroupAddon addonType='prepend'>
                                            <InputGroupText>
                                                <img src={jawwal} style={{ width: '34px' }} className='headings' />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            id='formDataMobileNo1'
                                            name='formDataMobileNo1'
                                            type='text'
                                            maxLength={10}
                                            innerRef={props.register({ required: true })}
                                            placeholder='رقم الهاتف'
                                        />
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                            <Col sm={"12"} md={"4"}>
                                <FormGroup>
                                    <Label for='formDataMobileNo2'>رقم الهاتف 2</Label>
                                    <InputGroup className='input-group-merge' tag={FormGroup}>
                                        <InputGroupAddon addonType='prepend'>
                                            <InputGroupText>
                                                <img src={ooredoo} style={{ width: '34px' }} className='headings' />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            id='formDataMobileNo2'
                                            name='formDataMobileNo2'
                                            type='text'
                                            maxLength={10}
                                            innerRef={props.register({ required: true })}
                                            placeholder='رقم الهاتف'
                                        />
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                            <Col sm={"12"} md={"4"}>
                                <FormGroup>
                                    <Label for='formDataCutomerNo'>رقم المواطن</Label>
                                    <InputGroup className='input-group-merge' tag={FormGroup}>
                                        <InputGroupAddon addonType='prepend'>
                                            <InputGroupText>
                                                <Hash className='headings' size={15} />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            id='formDataCutomerNo'
                                            name='formDataCutomerNo'
                                            innerRef={props.register({ required: true })}
                                            placeholder='رقم المواطن'
                                        />
                                    </InputGroup>
                                </FormGroup>
                            </Col>

                        </Row>
                    </Col>
                    <Col sm={"12"} md={"12"}>
                        <Row>
                            <Col md={"4"} sm={"12"}>
                                <FormGroup>
                                    <Label>المسمى الوظيفى</Label>
                                    <Input
                                        id='position'
                                        name='position'
                                        type='hidden'
                                        innerRef={props.register()}
                                    />
                                    <div className='invoice-customer'>
                                        <SelectWithAddNew apiUrl={`getConstants/74`}
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
                            <Col sm={"12"} md={"8"}>
                                <FormGroup>
                                    <Label for='formDataEmailAddress'>البريد الالكتروني</Label>
                                    <InputGroup className='input-group-merge' tag={FormGroup}>
                                        <InputGroupAddon addonType='prepend'>
                                            <InputGroupText>
                                                <img src={mail} style={{ width: '36px' }} className='headings' />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            id='formDataEmailAddress'
                                            name='formDataEmailAddress'
                                            innerRef={props.register({ required: true })}
                                            placeholder='البريد الالكتروني'
                                        />
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                            <Col sm={'12'} md={'12'} style={{ marginTop: '20px' }}>
                                <h4>
                                    <img src={info} style={{ width: '55px' }} className='headings pr-1' />
                                    تفاصيل المواطن
                                </h4>
                                <hr />
                            </Col>
                            <QuickReportIcons type='show_citizens' modelData={props?.modelData} citizenIconController={citizenIconController}></QuickReportIcons>
                        </Row>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}
export default CitizenInfoForm