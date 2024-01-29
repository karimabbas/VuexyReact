import {
    Card,
    CardBody, CardHeader,
    CardTitle,
    Col,
    FormFeedback,
    FormGroup, Input,
    InputGroup,
    InputGroupAddon, InputGroupText,
    Label,
    Row
} from "reactstrap"
import { CreditCard, Hash, Plus, Smartphone, User, Mail } from "react-feather"
import QuickReportIcons from "../../our-componnets/QuickReportIcons"
import SelectWIthAddNew from "../../our-componnets/SelectWIthAddNew"
import AutoCompleteInput from "../../our-componnets/AutoCompleteInput"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"

const CustomerInfoForm = (props) => {
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
                    معلومات الزبون
                </CardTitle>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col sm={"12"} md={"12"}>
                        <Row>
                            <Col sm={"12"} md={"8"}>
                                <FormGroup>
                                    <Label for='fullName'>اسم الزبون</Label>
                                    <Input
                                        id='id'
                                        name='id'
                                        type='hidden'
                                        innerRef={props.register()}
                                    />
                                    <AutoCompleteInput apiUrl=''
                                        placeholder={'اسم الزبون'}
                                        onSelect={(name) => {
                                            if (props.outPage) {
                                                dispatch({
                                                    type: 'GET_DEF',
                                                    id: +name?.id
                                                })
                                            } else {
                                                history.push(`/add&edit/show_customer/${name?.id ?? ''}`)
                                            }
                                        }}
                                        id='customerFullName'
                                        name='customerFullName'
                                        register={props.register}
                                        errors={props.errors.customerFullName}
                                    />
                                    {props.errors && props.errors.customerFullName &&
                                        <FormFeedback>{props.errors.customerFullName.message}</FormFeedback>}
                                </FormGroup>
                            </Col>
                            <Col sm={"12"} md={"4"}>
                                <FormGroup>
                                    <Label for='nationalId'>رقم الهوية</Label>
                                    <InputGroup className='input-group-merge' tag={FormGroup}>
                                        <InputGroupAddon addonType='prepend'>
                                            <InputGroupText>
                                                <CreditCard className='headings' size={15} />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            id='nationalId'
                                            name='nationalId'
                                            maxLength="9"
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
                                    <Label for='phone1'>رقم الهاتف</Label>
                                    <InputGroup className='input-group-merge' tag={FormGroup}>
                                        <InputGroupAddon addonType='prepend'>
                                            <InputGroupText>
                                                <Smartphone className='headings' size={15} />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            id='phone1'
                                            name='phone1'
                                            type='text'
                                            maxLength="10"
                                            innerRef={props.register({ required: true })}
                                            placeholder='رقم الهاتف'
                                        />
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                            <Col sm={"12"} md={"4"}>
                                <FormGroup>
                                    <Label for='phone2'>رقم الهاتف</Label>
                                    <InputGroup className='input-group-merge' tag={FormGroup}>
                                        <InputGroupAddon addonType='prepend'>
                                            <InputGroupText>
                                                <Smartphone className='headings' size={15} />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            id='phone2'
                                            name='phone2'
                                            type='text'
                                            maxLength="10"
                                            innerRef={props.register({ required: true })}
                                            placeholder='رقم الهاتف'
                                        />
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                            <Col sm={"12"} md={"4"}>
                                <FormGroup>
                                    <Label for='citizenNo'>رقم الزبون</Label>
                                    <InputGroup className='input-group-merge' tag={FormGroup}>
                                        <InputGroupAddon addonType='prepend'>
                                            <InputGroupText>
                                                <Hash className='headings' size={15} />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            id='citizenNo'
                                            name='citizenNo'
                                            innerRef={props.register({ required: true })}
                                            placeholder='رقم الزبون'
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
                                    <Label for='jobTitle'>المسمي الموظيفي</Label>
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
                            <Col sm={"12"} md={"8"}>
                                <FormGroup>
                                    <Label for='e_mail'>البريد الالكتروني</Label>
                                    <InputGroup className='input-group-merge' tag={FormGroup}>
                                        <InputGroupAddon addonType='prepend'>
                                            <InputGroupText>
                                                <Mail className='headings' size={15} />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            id='e_mail'
                                            name='e_mail'
                                            innerRef={props.register({ required: true })}
                                            placeholder='البريد الالكتروني'
                                        />
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                            <Col sm={'12'} md={'12'} style={{ marginTop: '20px' }}>
                                <h4>
                                    <img src={'https://db.expand.ps/images/detalies.png'}
                                        alt='user-avatar'
                                        className='img-fluid rounded' height='40' width='40' />
                                    تفاصيل الزبون
                                </h4>
                                <hr />
                            </Col>
                            <QuickReportIcons type={'show_customer'} modelData={props.modelData} citizenIconController={citizenIconController}></QuickReportIcons>
                        </Row>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}
export default CustomerInfoForm