import { useState, useEffect, useContext } from 'react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Card, CardHeader, CardTitle, CardBody, Button, Row, Col, Form, FormGroup, Label, Input, FormFeedback, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap'
import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { AlignCenter, Calendar, Link2, Send } from 'react-feather'
import SelectAsync from './SelectAsync'
import SelectSync from './SelectSync'
import { ErrorToast } from '@components/toast'
import { AbilityContext } from '@src/utility/context/Can'

import { toast } from 'react-toastify'
import CopyToForm from './CopyToForm'
import SelectWithAddNew from '../our-componnets/SelectWIthAddNew'
import { useDispatch, useSelector } from 'react-redux'
import AutoCompleteInput from "../our-componnets/AutoCompleteInput"

const dateNow = Date.now()
const today = new Date(dateNow)
function addLeadingZeros (num, totalLength) {
    return String(num).padStart(totalLength, '0')
}
const format = (date) => {
    return `${date.getFullYear()}-${addLeadingZeros(date.getMonth() + 1, 2)}-${date.getDate()}`
}
const ArchiveForm = (props) => {
    const [msgDate, setMsgDate] = useState([today])
    const [customer, setCustomer] = useState({ label: 'ابحث ...', value: '' })
    const [copyTo, setCopyTo] = useState([])
    const [archiveType, setArchiveType] = useState({ id: 0, name: '', value: '', label: 'اختر نوع الوثيقة' })
    const [attachType, setAttachType] = useState({ id: 0, name: '', value: '', label: 'اختر نوع المرفق' })
    const [vehicleData, setVehicleData] = useState({ id: 0, name: '', value: '', label: 'اختر المركبة' })
    const [userLic, setUserLic] = useState([{ id: 0, name: '', value: '', label: 'اختر الرخصة' }])
    const ability = useContext(AbilityContext)

    const archiveStore = useSelector(state => state.archives)
    const suggestions = archiveStore?.auto_complete_models
    const vehicleSuggestions = archiveStore?.vehicle_auto_complete
    const validity = () => {
        if (props.type === 'trade_archive') {
            return yup.object().shape({
                vehicleName: yup.string().min(3).required(),
                // trade_type: yup.string().required(),
                customerName: yup.string().required()
            })
        } else if (props.type === 'lic_archieve') {
            return yup.object().shape({
                customerName: yup.string().min(3).required(),
                fileNo: yup.string().required()
            })
        } else if (props.type === 'in_archieve' || props.type === 'out_archieve') {
            return yup.object().shape({
                msgTitle: yup.string().min(3).required(),
                customerName: yup.string().required()
            })
        } else if (props.type === 'finance_archive') {
            return yup.object().shape({
                archive_type: yup.string().required(),
                customerName: yup.string().required()
            })
        } else if (props.type === 'mun_archieve') {
            return yup.object().shape({
                archive_type: yup.string().required()
            })
        }
        return yup.object().shape({
            msgTitle: yup.string().min(3).required(),
            customerName: yup.string().required(),
            archive_type: yup.string().required()
        })
    }
    const { register, errors, handleSubmit, reset, setValue } = useForm({ mode: 'onChange', resolver: yupResolver(validity()) })
    const checkValidity = (type) => {
        if (type === 'law_archieve') {
            return false
        } else if (type === 'mun_archieve') {
            return false
        }
        return true
    }
    const getLabel = (label) => {
        if (label === 'customerName') {
            if (props.type === 'out_archieve') {
                return 'صادر الى'
            } else if (props.type === 'in_archieve') {
                return 'وارد من'
            } else if (props.type === 'proj_archieve') {
                return 'اسم المشروع'
            } else if (props.type === 'assets_archieve') {
                return 'اسم الأصل'
            } else if (props.type === 'emp_archieve') {
                return 'اسم الموظف'
            } else if (props.type === 'cit_archieve') {
                return 'اسم الزبون'
            } else if (props.type === 'finance_archive') {
                return 'اسم المستفيد'
            } else if (props.type === 'trade_archive') {
                return 'اسم المستفيد'
            } else if (props.type === 'lic_archieve') {
                return 'اسم صاحب الرخصة'
            }
            return 'مرتبط ب'
        } else if (label === 'msgTitle') {
            if (props.type === 'out_archieve') {
                return 'عنوان المراسلة'
            } else if (props.type === 'in_archieve') {
                return 'عنوان المراسلة'
            }
            return 'عنوان الوثيقة'
        }
    }
    const onSubmit = data => {
        if (checkValidity(props.type)) {
            if (!customer?.value || !customer?.id) {
                toast.error(
                    <ErrorToast
                        title={<h3>خطأ!</h3>}
                        result={<h5>{`اختر ${getLabel('customerName')} من القائمة`}</h5>}
                    />, { hideProgressBar: false, autoClose: 3000, position: "top-center" }
                )
                return
            }
        }
        const dateObject = msgDate[0]
        const date = `${dateObject.getFullYear()}-${dateObject.getMonth() + 1}-${dateObject.getDate()}`
        props.onSubmit({ ...data, msgDate: date, ...customer, copyTo })
    }
    const refreshCopyTo = data => {
        setCopyTo(data)
    }

    useEffect(() => {
        reset({
            archive_id: 0,
            vehicleName: '',
            vehicle_id: null,
            withPrint: null,
            customerName: null,
            archive_type: null
        })
        setArchiveType({
            id: 0,
            name: '',
            value: '',
            label: 'اختر نوع الوثيقة'
        })
        setCustomer({ label: 'ابحث ...', value: '' })
        setVehicleData({ label: 'اختر من القائمة', value: '' })
    }, [props.isSubmitted])

    useEffect(() => {
        if (props.data) {
            if (props.type === 'trade_archive') {
                const allData = props.data.info
                reset({
                    archive_id: allData?.id,
                    tradeNo: allData?.trade_no,
                    tradeType: allData?.trade_type,
                    vehicleName: allData?.vehicle_name,
                    vehicle_id: allData?.vehicle_id,
                    vehicleNo: allData?.vehicle_no,
                    documentPlace: allData?.document_place,
                    documentCode: allData?.document_code,
                    customerName: allData?.name
                })
                setCustomer({
                    id: allData?.model_id,
                    modelId: allData?.model_id,
                    model: allData?.model_name,
                    label: allData?.name,
                    name: allData?.name,
                    modelName: allData?.name,
                    value: allData?.name
                })
                if (allData?.archive_type) {
                    setArchiveType({
                        id: allData?.archive_type?.id,
                        name: allData?.archive_type?.name,
                        value: allData?.archive_type?.name,
                        label: allData?.archive_type?.name
                    })
                }
                setVehicleData({ label: `${allData?.vehicle_name} (${allData?.vehicle_no})`, value: `${allData?.vehicle_name} (${allData?.vehicle_no})` })
            } else {
                const allData = props.data.info
                reset({
                    archive_id: allData?.id,
                    archive_type: allData?.trade_type,
                    msgid: allData?.serisal,
                    msgTitle: allData?.title,
                    customerName: allData?.name,
                    archive_type: allData?.archive_type?.id
                })
                setCustomer({
                    id: allData?.model_id,
                    modelId: allData?.model_id,
                    model: allData?.model_name,
                    label: allData?.name,
                    modelName: allData?.name,
                    value: allData?.name
                })
                if (allData?.archive_type) {
                    setArchiveType({
                        id: allData?.archive_type?.id,
                        name: allData?.archive_type?.name,
                        value: allData?.archive_type?.name,
                        label: allData?.archive_type?.name
                    })
                }
            }
        }
    }, [props.data])
    const renderCopyToForm = () => {
        if (props.type === 'finance_archive' || props.type === 'law_archieve' || props.type === 'lic_archieve' || props.type === 'trade_archive') {
            return <></>
        } else {
            return (
                <CopyToForm data={props?.data?.CopyTo} refreshCopyTo={refreshCopyTo} isSubmitted={props.isSubmitted} suggestions={suggestions} register={register} />
            )
        }
    }

    const getApiCustomerName = () => {
        let api = 'archive_auto_complete'
        if (props.type === 'cit_archieve') {
            api = 'archive_customer_auto_complete'
        } else if (props.type === 'proj_archieve') {
            api = 'archive_project_auto_complete'
        } else if (props.type === 'assets_archieve') {
            api = 'assets_auto_complete'
        } else if (props.type === 'emp_archieve') {
            api = 'employee_auto_complete'
        } else if (props.type === 'dep_archieve') {
            api = 'department_auto_complete'
        }
        return api
    }
    const renderSecondRow = () => {
        if (props.type === 'in_archieve' || props.type === 'out_archieve') {
            return (
                <Col sm='12'>
                    <Row>
                        <Col sm='12' md='8'>
                            <FormGroup>
                                <Label for='msgTitle'>{getLabel('msgTitle')}</Label>
                                <InputGroup className={`${errors.msgTitle ? 'is-invalid' : ''} input-group-merge`}>
                                    <InputGroupAddon addonType='prepend'>
                                        <InputGroupText>
                                            <AlignCenter className='headings' size={14} />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        id='archive_type'
                                        name='archive_type'
                                        innerRef={register()}
                                        type='hidden'
                                        value={1}
                                    />
                                    <Input
                                        id='msgTitle'
                                        name='msgTitle'
                                        innerRef={register({ required: true })}
                                        invalid={errors.msgTitle && true}
                                        placeholder='عنوان المراسلة'
                                    />
                                </InputGroup>

                                {errors && errors.msgTitle && <FormFeedback>ادخل عنوان المراسلة صحيح</FormFeedback>}
                            </FormGroup>
                        </Col>
                        <Col sm='12' md='4'>
                            <FormGroup>
                                <Label for='msgid'>رقم المراسلة</Label>
                                <InputGroup className={`${errors.msgid ? 'is-invalid' : ''} input-group-merge`}>
                                    <InputGroupAddon addonType='prepend'>
                                        <InputGroupText>
                                            <Link2 className='headings' size={14} />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        id='msgid'
                                        name='msgid'
                                        innerRef={register({ required: true })}
                                        invalid={errors.msgid && true}
                                        placeholder='رقم المراسلة'
                                    />
                                </InputGroup>

                                {errors && errors.msgid && <FormFeedback>ادخل رقم المراسلة صحيح</FormFeedback>}
                            </FormGroup>
                        </Col>
                    </Row>
                </Col>
            )
        } else if (props.type === 'finance_archive') {
            return (
                <Col sm='12'>
                    <Row>
                        <Col sm='12' md='4'>
                            <FormGroup>
                                <Label for='msgTitle'>نوع المعاملة</Label>
                                <InputGroup className={`${errors.archive_type ? 'is-invalid' : ''} input-group-merge`}>
                                    <InputGroupAddon addonType='prepend' style={{ width: '15%' }}>
                                        <InputGroupText>
                                            <AlignCenter className='headings' size={14} />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        id='archive_type'
                                        name='archive_type'
                                        type='hidden'
                                        innerRef={register()}
                                    />
                                    <div className='dropdown' style={{ width: '85%' }} >
                                        <SelectWithAddNew
                                            id={'archive_type'}
                                            name={'archive_type'}
                                            modelId={105}
                                            errors={errors && errors.archive_type}
                                            deptDefult={archiveType}
                                            data={archiveStore?.config?.archiveTypeExtensions}
                                            onSelect={(value) => {
                                                setArchiveType(value)
                                                setValue('archive_type', value.id)
                                            }} />
                                    </div>
                                </InputGroup>
                                {errors && (errors.archive_type) && <span>اختر نوع المعاملة </span>}
                            </FormGroup>
                        </Col>
                        <Input
                            id='msgid'
                            name='msgid'
                            type='hidden'
                            innerRef={register({ required: true })}
                        />
                        <Col sm='12' md='8'>
                            <FormGroup>
                                <Label for='msgTitle'>ملاحظات</Label>
                                <InputGroup>
                                    <InputGroupAddon addonType='prepend'>
                                        <InputGroupText>
                                            <Link2 className='headings' size={14} />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        id='msgTitle'
                                        name='msgTitle'
                                        innerRef={register({ required: true })}
                                        placeholder='ملاحظات'
                                    />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Row>
                </Col>
            )
        } else if (props.type === 'law_archieve') {
            return (
                <Col sm='12'>
                    <Row>
                        <Col sm='12' md='8'>
                            <FormGroup>
                                <Label for='msgTitle'>{getLabel('msgTitle')}</Label>
                                <InputGroup className={`${errors.msgTitle || errors.archive_type ? 'is-invalid' : ''} input-group-merge`}>
                                    <InputGroupAddon addonType='prepend'>
                                        <InputGroupText>
                                            <AlignCenter className='headings' size={14} />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        id='archive_type'
                                        name='archive_type'
                                        type='hidden'
                                        innerRef={register()}
                                    />
                                    <Input
                                        id='msgTitle'
                                        name='msgTitle'
                                        innerRef={register({ required: true })}
                                        invalid={errors.msgTitle && true}
                                        placeholder='عنوان المراسلة'
                                    />
                                    <div className='dropdown' style={{ width: '150px' }}>
                                        <SelectWithAddNew
                                            data={archiveStore?.config?.archiveTypeExtensions}
                                            id={'archive_type'}
                                            modelId={101}
                                            name={'archive_type'}
                                            deptDefult={archiveType}
                                            onSelect={(value) => {
                                                setArchiveType(value)
                                                setValue('archive_type', value.id)
                                            }} />
                                    </div>
                                </InputGroup>

                                {errors && (errors.msgTitle || errors.archive_type) && <FormFeedback>ادخل عنوان المراسلة صحيح</FormFeedback>}
                            </FormGroup>
                        </Col>
                        <Col sm='12' md='4'>
                            <FormGroup>
                                <Label for='msgid'>الملاحظات</Label>
                                <InputGroup className={`${errors.msgid ? 'is-invalid' : ''} input-group-merge`}>
                                    <InputGroupAddon addonType='prepend'>
                                        <InputGroupText>
                                            <Link2 className='headings' size={14} />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        id='msgid'
                                        name='msgid'
                                        innerRef={register({ required: true })}
                                        invalid={errors.msgid && true}
                                        placeholder='الملاحظات'
                                    />
                                </InputGroup>

                                {errors && errors.msgid && <FormFeedback>ادخل الملاحظات </FormFeedback>}
                            </FormGroup>
                        </Col>
                    </Row>
                </Col>
            )
        } else if (props.type === 'trade_archive') {
            return (
                <>
                    <Col sm='12'>
                        <Row>
                            <Col sm='12' md='8'>
                                <FormGroup>
                                    <Label for='customerName'>{getLabel('customerName')}</Label>
                                    <Input
                                        type='hidden'
                                        id='customerName'
                                        name='customerName'
                                        innerRef={register()}
                                    />
                                    <SelectSync
                                        type={props.type}
                                        isSubmitted={props.isSubmitted}
                                        suggestions={suggestions}
                                        selectedFromApi={customer}
                                        errors={errors && errors.customerName}
                                        onSelect={(value) => {
                                            setCustomer(value)
                                            setValue('customerName', value.value)
                                        }}
                                        icon={<Send className='headings' size={14} />}
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm='12' md='4'>
                                <FormGroup>
                                    <Label for='default-msgDate'>التاريخ</Label>
                                    <InputGroup className='input-group-merge '>
                                        <InputGroupAddon addonType='prepend'>
                                            <InputGroupText>
                                                <Calendar className='headings' size={14} />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Flatpickr defaultValue={format(today)} className='form-control' value={msgDate} onChange={date => setMsgDate(date)} id='default-msgDate' />
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm='12'>
                        <Row>
                            <Col sm='12' md='8'>
                                <FormGroup>
                                    <Label for='vehicleName'>اسم المركبة</Label>
                                    <Input
                                        type='hidden'
                                        id='vehicleName'
                                        name='vehicleName'
                                        innerRef={register()}
                                    />
                                    <Input
                                        type='hidden'
                                        id='vehicle_id'
                                        name='vehicle_id'
                                        innerRef={register()}
                                    />
                                    <SelectSync
                                        type={'vehicle'}
                                        isSubmitted={props.isSubmitted}
                                        suggestions={vehicleSuggestions}
                                        id='vehicleName'
                                        name='vehicleName'
                                        errors={errors && errors.vehicleName}
                                        selectedFromApi={vehicleData}
                                        onSelect={(value) => {
                                            setVehicleData(value)
                                            setValue('vehicleName', value.value)
                                            setValue('vehicleNo', value.shacie_no)
                                            setValue('vehicle_id', value.id)
                                        }}
                                        icon={<Send className='headings' size={14} />}
                                    />
                                    {errors && errors.vehicleName && <FormFeedback>اختر مركبة</FormFeedback>}
                                </FormGroup>
                            </Col>
                            <Col sm='12' md='4'>
                                <FormGroup>
                                    <Label for='vehicleNo'>رقم الشصي</Label>
                                    <InputGroup className={`${errors.vehicleNo ? 'is-invalid' : ''} input-group-merge`}>
                                        <InputGroupAddon addonType='prepend'>
                                            <InputGroupText>
                                                <Link2 className='headings' size={14} />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            id='vehicleNo'
                                            name='vehicleNo'
                                            innerRef={register({ required: true })}
                                            invalid={errors.vehicleNo && true}
                                            placeholder='رقم الشصي'
                                        />
                                    </InputGroup>
                                    {errors && errors.vehicleNo && <FormFeedback>ادخل رقم الشصي صحيح</FormFeedback>}
                                </FormGroup>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm='12'>
                        <Row>
                            <Col sm='12' md='8'>
                                <FormGroup>
                                    <Label for='documentPlace'>مكان وجود الوثيقة</Label>
                                    <InputGroup className={`${errors.documentPlace ? 'is-invalid' : ''} input-group-merge`}>
                                        <InputGroupAddon addonType='prepend'>
                                            <InputGroupText>
                                                <Link2 className='headings' size={14} />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            id='documentPlace'
                                            name='documentPlace'
                                            innerRef={register({ required: true })}
                                            invalid={errors.documentPlace && true}
                                            placeholder='مكان وجود الوثيقة'
                                        />
                                    </InputGroup>
                                    {errors && errors.documentPlace && <FormFeedback>ادخل مكان وجود الوثيقة صحيح</FormFeedback>}
                                </FormGroup>
                            </Col>
                            <Col sm='12' md='4'>
                                <FormGroup>
                                    <Label for='documentCode'>كود الوثيقة</Label>
                                    <InputGroup className={`${errors.documentCode ? 'is-invalid' : ''} input-group-merge`}>
                                        <InputGroupAddon addonType='prepend'>
                                            <InputGroupText>
                                                <Link2 className='headings' size={14} />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            id='documentCode'
                                            name='documentCode'
                                            innerRef={register({ required: true })}
                                            invalid={errors.documentCode && true}
                                            placeholder='كود الوثيقة'
                                        />
                                    </InputGroup>
                                    {errors && errors.documentCode && <FormFeedback>ادخل كود الوثيقة صحيح</FormFeedback>}
                                </FormGroup>
                            </Col>
                        </Row>
                    </Col>
                </>
            )
        } else if (props.type === 'lic_archieve') {
            return (
                <>
                    <Col sm='12'>
                        <Row>
                            <Col sm='12' md='8'>
                                <FormGroup>
                                    <Label for='customerName'>{getLabel('customerName')}</Label>
                                    <Input
                                        type='hidden'
                                        id='customerName'
                                        name='customerName'
                                        innerRef={register()}
                                    />
                                    <SelectSync
                                        type={props.type}
                                        isSubmitted={props.isSubmitted}
                                        suggestions={suggestions}
                                        selectedFromApi={customer}
                                        errors={errors && errors.customerName}
                                        onSelect={(value) => {
                                            setCustomer(value)
                                            setValue('customerName', value.value)
                                            setUserLic([...value.licenses_for_select])
                                        }}
                                        icon={<Send className='headings' size={14} />}
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm={"12"} md={"4"}>
                                <FormGroup>
                                    <Label for='fileNo'>رقم الملف</Label>
                                    <Input
                                        id='licId'
                                        name='licId'
                                        type='hidden'
                                        innerRef={register()}
                                    />
                                    <AutoCompleteInput apiUrl=''
                                        placeholder={'رقم الملف'}
                                        onSelect={(value) => {
                                            setValue('fileNo', value.fileNo)
                                            setValue('licId', value.id)
                                            setValue('hodNo', value.hodNo)
                                            setValue('pieceNo', value.peiceNo)
                                            setValue('licNo', value.licNo)
                                            setValue('useDesc', value.use_desc)
                                        }}
                                        id='fileNo'
                                        name='fileNo'
                                        register={register}
                                        options={userLic}
                                        errors={errors.departmentName}
                                    />
                                    {errors && errors.fileNo &&
                                        <FormFeedback>{errors.fileNo.message}</FormFeedback>}
                                </FormGroup>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm='12'>
                        <Row>
                            <Col sm='12' md='4'>
                                <FormGroup>
                                    <Label for='default-msgDate'>تاريخ فتح الملف</Label>
                                    <InputGroup className='input-group-merge '>
                                        <InputGroupAddon addonType='prepend'>
                                            <InputGroupText>
                                                <Calendar className='headings' size={14} />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Flatpickr defaultValue={format(today)} className='form-control' value={msgDate} onChange={date => setMsgDate(date)} id='default-msgDate' />
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                            <Col sm='12' md='4'>
                                <FormGroup>
                                    <Label for='hodNo'>رقم الحوض</Label>
                                    <InputGroup className={`input-group-merge`}>
                                        {/*<InputGroupAddon addonType='prepend'>*/}
                                        {/*    <InputGroupText>*/}
                                        {/*        <Link2 className='headings' size={14} />*/}
                                        {/*    </InputGroupText>*/}
                                        {/*</InputGroupAddon>*/}
                                        <Input
                                            id='hodNo'
                                            name='hodNo'
                                            innerRef={register({ required: true })}
                                            placeholder='رقم الحوض'
                                        />
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                            <Col sm='12' md='4'>
                                <FormGroup>
                                    <Label for='pieceNo'>رقم القطعة</Label>
                                    <InputGroup className={`input-group-merge`}>
                                        {/*<InputGroupAddon addonType='prepend'>*/}
                                        {/*    <InputGroupText>*/}
                                        {/*        <Link2 className='headings' size={14} />*/}
                                        {/*    </InputGroupText>*/}
                                        {/*</InputGroupAddon>*/}
                                        <Input
                                            id='pieceNo'
                                            name='pieceNo'
                                            innerRef={register({ required: true })}
                                            placeholder='رقم القطعة'
                                        />
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm='12'>
                        <Row>
                            <Col sm='12' md='4'>
                                <FormGroup>
                                    <Label for='licNo'>رقم الرخصة</Label>
                                    <InputGroup className={`input-group-merge`}>
                                        {/*<InputGroupAddon addonType='prepend'>*/}
                                        {/*    <InputGroupText>*/}
                                        {/*        <Link2 className='headings' size={14} />*/}
                                        {/*    </InputGroupText>*/}
                                        {/*</InputGroupAddon>*/}
                                        <Input
                                            id='licNo'
                                            name='licNo'
                                            innerRef={register({ required: true })}
                                            placeholder='رقم الرخصة'
                                        />
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                            <Col sm='12' md='8'>
                                <FormGroup>
                                    <Label for='useDesc'>الغاية من الاستعمال</Label>
                                    <InputGroup className={`input-group-merge`}>
                                        {/*<InputGroupAddon addonType='prepend'>*/}
                                        {/*    <InputGroupText>*/}
                                        {/*        <Pen className='headings' size={14} />*/}
                                        {/*    </InputGroupText>*/}
                                        {/*</InputGroupAddon>*/}
                                        <Input
                                            id='useDesc'
                                            name='useDesc'
                                            innerRef={register({ required: true })}
                                            placeholder='الغاية من الاستعمال'
                                        />
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm='12' md='12'>
                                <FormGroup>
                                    <Label for='attachType'>نوع المرفق</Label>
                                    <InputGroup className={`input-group-merge`}>
                                        <Input
                                            id='attachType'
                                            name='attachType'
                                            type='hidden'
                                            innerRef={register()}
                                        />
                                        <div className='invoice-customer' style={{ width: '100%' }}>
                                            <SelectWithAddNew
                                                id={'attachType'}
                                                name={'attachType'}
                                                modelId={18}
                                                deptDefult={attachType}
                                                data={archiveStore?.config?.archiveTypeExtensions}
                                                onSelect={(value) => {
                                                    setAttachType(value)
                                                    setValue('attachType', value.id)
                                                }} />
                                        </div>
                                    </InputGroup>
                                    {errors && (errors.archive_type) && <span>اختر نوع المرفق </span>}
                                </FormGroup>
                            </Col>
                        </Row>
                    </Col>
                </>
            )
        }
        let numberOfConstant
        if (props.type === 'cit_archieve') {
            numberOfConstant = 52
        } else if (props.type === 'proj_archieve') {
            numberOfConstant = 53
        } else if (props.type === 'assets_archieve') {
            numberOfConstant = 9
        } else if (props.type === 'emp_archieve') {
            numberOfConstant = 50
        } else if (props.type === 'dep_archieve') {
            numberOfConstant = 51
        } else if (props.type === 'mun_archieve') {
            numberOfConstant = 49
        }
        return (
            <Col sm='12'>
                <Row>
                    <Col sm='12' md='8'>
                        <FormGroup>
                            <Label for='msgTitle'>{getLabel('msgTitle')}</Label>
                            <InputGroup className={`${errors.msgTitle ? 'is-invalid' : ''} input-group-merge`}>
                                <InputGroupAddon addonType='prepend'>
                                    <InputGroupText>
                                        <AlignCenter className='headings' size={14} />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    id='archive_type'
                                    name='archive_type'
                                    type='hidden'
                                    innerRef={register()}
                                    value={0}
                                />
                                <Input
                                    id='msgTitle'
                                    name='msgTitle'
                                    innerRef={register({ required: true })}
                                    invalid={errors.msgTitle && true}
                                    placeholder='عنوان المراسلة'
                                />
                                <div className='dropdown' style={{ width: '150px' }}>
                                    <SelectWithAddNew
                                        data={archiveStore?.config?.archiveTypeExtensions}
                                        modelId={numberOfConstant}
                                        id={'archive_type'}
                                        name={'archive_type'}
                                        errors={errors && errors.archive_type}
                                        deptDefult={archiveType}
                                        onSelect={(value) => {
                                            setArchiveType(value)
                                            setValue('archive_type', value.id)
                                        }} />
                                </div>
                            </InputGroup>
                            {errors && (errors.msgTitle) && <span className="float-left">ادخل عنوان المراسلة صحيح</span>}
                            {errors && (errors.archive_type) && <span className="float-right">اختر نوع المراسلة </span>}
                        </FormGroup>
                    </Col>
                    <Col sm='12' md='4'>
                        <FormGroup>
                            <Label for='msgid'>رقم المراسلة</Label>
                            <InputGroup className={`${errors.msgid ? 'is-invalid' : ''} input-group-merge`}>
                                <InputGroupAddon addonType='prepend'>
                                    <InputGroupText>
                                        <Link2 className='headings' size={14} />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    id='msgid'
                                    name='msgid'
                                    innerRef={register({ required: true })}
                                    invalid={errors.msgid && true}
                                    placeholder='رقم المراسلة'
                                />
                            </InputGroup>
                            {errors && errors.msgid && <FormFeedback>ادخل رقم المراسلة صحيح</FormFeedback>}
                        </FormGroup>
                    </Col>
                </Row>
            </Col>
        )
    }
    const renderCustomerName = () => {
        if (props.type === 'trade_archive') {
            return (
                <Col sm='12'>
                    <Row>
                        <Col sm='12' md='3'>
                            <FormGroup>
                                <Label for='tradeNo'>رقم المعاملة</Label>
                                <InputGroup className={`${errors.msgid ? 'is-invalid' : ''} input-group-merge`}>
                                    <InputGroupAddon addonType='prepend'>
                                        <InputGroupText>
                                            <Link2 className='headings' size={14} />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        id='tradeNo'
                                        name='tradeNo'
                                        innerRef={register({ required: true })}
                                        invalid={errors.tradeNo && true}
                                        placeholder='رقم المعاملة'
                                    />
                                </InputGroup>
                                {errors && errors.tradeNo && <FormFeedback>ادخل رقم المعاملة </FormFeedback>}
                            </FormGroup>
                        </Col>
                        <Col sm='12' md='5'>
                            <FormGroup>
                                <Label for='tradeType'>نوع المعاملة</Label>
                                <InputGroup className='input-group-merge '>
                                    <Input
                                        id='tradeType'
                                        name='tradeType'
                                        innerRef={register({ required: true })}
                                        type='hidden'
                                    />
                                    <div className='dropdown' style={{ width: '100%' }}>
                                        <SelectWithAddNew
                                            data={archiveStore?.config?.archiveTypeExtensions}
                                            id={'tradeType'}
                                            name={'tradeType'}
                                            modelId={105}
                                            errors={errors && errors.tradeType}
                                            deptDefult={archiveType}
                                            onSelect={(value) => {
                                                setValue('tradeType', value.id)
                                            }} />
                                    </div>
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Row>
                </Col>
            )
        } else if (props.type === 'lic_archieve') {
            return <></>
        }
        return (
            <Col sm='12'>
                <Row>
                    <Col sm='12' md='8'>
                        <FormGroup>
                            <Label for='customerName'>{getLabel('customerName')}</Label>
                            <Input
                                type='hidden'
                                id='customerName'
                                name='customerName'
                                innerRef={register()}
                            />
                            <SelectAsync
                                type={props.type}
                                apiUrl={getApiCustomerName()}
                                isSubmitted={props.isSubmitted}
                                // suggestions={suggestions}
                                isClearable={!validity().fields.customerName}
                                errors={errors && errors.customerName}
                                selectedFromApi={customer}
                                onSelect={(value) => {
                                    setCustomer(value)
                                    setValue('customerName', value?.value)
                                }}
                                icon={<Send className='headings' size={14} />}
                            />
                        </FormGroup>
                    </Col>
                    <Col sm='12' md='4'>
                        <FormGroup>
                            <Label for='default-msgDate'>تاريخ المراسلة</Label>
                            <InputGroup className='input-group-merge '>
                                <InputGroupAddon addonType='prepend'>
                                    <InputGroupText>
                                        <Calendar className='headings' size={14} />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Flatpickr defaultValue={format(today)} className='form-control' value={msgDate} onChange={date => setMsgDate(date)} id='default-msgDate' />
                            </InputGroup>
                        </FormGroup>
                    </Col>
                </Row>
            </Col>
        )
    }
    const renderSaveWord = () => {
        if (props.data) return 'تعديل'
        return 'حفظ'
    }
    return (
        <Card>
            <CardHeader >
                <CardTitle tag='h4' className='custom-title'>
                    <img src="https://t.palexpand.ps/assets/images/archive_ico.png" style={{ height: '32px', marginLeft: '5px' }} />
                    {props?.title}
                </CardTitle>
            </CardHeader>
            <CardBody>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        {renderCustomerName()}
                        <Input
                            id='archive_id'
                            name='archive_id'
                            innerRef={register()}
                            type='hidden'
                            value={props?.data?.info?.id ? props?.data?.info?.id : 0}
                        />
                        <Input
                            id='withPrint'
                            name='withPrint'
                            innerRef={register()}
                            type='hidden'
                        />
                        {renderSecondRow()}
                        <Col sm='12'>
                            {renderCopyToForm()}
                        </Col>
                        {ability.can('read', 'store_archive') && <Col sm='12'>
                            <FormGroup className='d-flex mb-0 mt-1 justify-content-center'>
                                <Button.Ripple className='mr-1' color='primary' type='submit'>
                                    {renderSaveWord()}
                                </Button.Ripple>
                                <Button.Ripple className='mr-1' color='primary' onClick={() => {
                                    setValue('withPrint', 1)
                                }} type='submit'>
                                    {renderSaveWord()} وطباعة
                                </Button.Ripple>
                                <Button.Ripple outline color='secondary' type='reset' onClick={() => {
                                    props.refresh()
                                }}>
                                    اعادة التعيين
                                </Button.Ripple>
                            </FormGroup>
                        </Col>}
                    </Row>
                </Form>
            </CardBody>
        </Card>
    )
}
export default ArchiveForm
