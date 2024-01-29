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
import { Calendar, Edit2, Map, Plus, Smartphone } from "react-feather"
import Select, { components } from "react-select"
import { selectThemeColors } from '@utils'
import { useState, useRef, useEffect} from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import QuickReportIcons from "../our-componnets/QuickReportIcons"
import SelectWIthAddNew from "../our-componnets/SelectWIthAddNew"
import { deleteEquipment, getAllEquipmenteData, store_Equipment } from "./store/action"
import { useHistory, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import EquipmentForm from "./EquipmentForm"

const dateNow = Date.now()
const today = new Date(dateNow)

const LeftSide = (props) => {
    const [options, setOptions] = useState([
        {
            value: 'add-new',
            label: 'اضافة',
            type: 'button',
            color: 'flat-success'
        }
    ])
    const [value, setValue2] = useState({})
    const [picker1, setPicker1] = useState([today])
    const [picker2, setPicker2] = useState([today])
    const [img, setImg] = useState('https://db.expand.ps/images/equipment.jpg')


    const EquipmentStore = useSelector(state => state.Equipments)

    const history = useHistory()
    const dispatch = useDispatch()

    const SignupSchema = yup.object().shape({
        // productionYear: yup.string().min(4).required(),
        fullName: yup.string().min(3).required()
        // platNo: yup.string().min(1).required(),
        // ChassisNo: yup.string().min(1).required(),
        // enginNo: yup.string().min(1).required(),
        // enginSize: yup.string().min(1).required()
    })

    const { register, errors, handleSubmit, reset, setValue, getValues } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })

    const initStateForSelects = {
        id: 0,
        name: '',
        model: '',
        value: '',
        label: ''
    }

    const [submitText, setSubmitText] = useState('حفظ')
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [brandTypeSetter, setBrandTypeSetter] = useState(initStateForSelects)
    const [eqtypeSetter, setEqTypeSetter] = useState(initStateForSelects)
    const [eqtStatusSetter, setEqtStatusSetter] = useState(initStateForSelects)
    const [employeeSetter, setEmployeeSetter] = useState(initStateForSelects)
    const [departmentSetter, setDepartmentSetter] = useState(initStateForSelects)
    const [supplyerNameSetter, setSupplyerNameSetter] = useState(initStateForSelects)
    const [sponsorNameSetter, setSponsorNameSetter] = useState(initStateForSelects)

    const resetHandler = () => {
        setBrandTypeSetter(initStateForSelects)
        setEqTypeSetter(initStateForSelects)
        setEqtStatusSetter(initStateForSelects)
        setEmployeeSetter(initStateForSelects)
        setDepartmentSetter(initStateForSelects)
        setSupplyerNameSetter(initStateForSelects)
        setSponsorNameSetter(initStateForSelects)
        setImg('https://db.expand.ps/images/equipment.jpg')
        setPicker1(today)
        setPicker2(today)
        // setModel({
        //     model_id: 0,
        //     model: ''
        // })
        reset({
            id: ''
        })
    }

    const refresh = () => {
        if (!props.outPage) {
            history.push(`/equip`)
        }
        setIsSubmitted(prev => !prev)
    }

    const handleDeleteEquipment = async (id) => {
        const MySwal = withReactContent(Swal)
        return MySwal.fire({
            title: 'هل أنت متأكد من الحذف ؟',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'الغاء',
            confirmButtonText: 'نعم !',
            customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-outline-danger ml-1'
            },
            buttonsStyling: false
        }).then(function (result) {
            if (result.value) {
                dispatch(deleteEquipment(id))
                MySwal.fire({
                    icon: 'success',
                    title: 'تم !',
                    text: 'تم حذف المعدة',
                    customClass: {
                        confirmButton: 'btn btn-success'
                    }
                })
            }
        })
    }

    const getObject = (data) => {
        console.log(data)
        
        if (data?.image !== null) {
            setImg(data?.image)
        }
        if (data?.brand_id !== null && data?.brand_id !== "") {
            setBrandTypeSetter(data?.brand_type)
        }
        if (data?.equpment_type_id !== null && data?.equpment_type_id !== "") {
            setEqTypeSetter(data?.equpment_type)
        }
        if (data?.equpment_status_id !== null && data?.equpment_status_id !== "") {
            setEqtStatusSetter(data?.equpment_status)
        }
        if (data?.admin_id !== null && data?.admin_id !== "") {
            setEmployeeSetter(data?.responsible_name)
        }
        if (data?.department_id !== null && data?.department_id !== "") {
            setDepartmentSetter(data?.department)
        }
        if (data?.sponser !== null && data?.sponser !== "") {
            setSponsorNameSetter(data?.sponser_name)
        }
        if (data?.supplyer !== null && data?.supplyer !== "") {
            setSupplyerNameSetter(data?.supplyer_name)
        }

        if (data?.selling_date !== null && data?.selling_date.length === 3) {
            const year = +(data?.selling_date[2] ?? 2022)
            const month = (+(data?.selling_date[1] ?? 1)) - 1
            const day = +(data?.selling_date[0] ?? 1)
            setPicker1(new Date(year, month, day))
        }
        if (data?.wdate_input !== null && data?.wdate_input.length === 3) {
            const year = +(data?.wdate_input[2] ?? 2022)
            const month = (+(data?.wdate_input[1] ?? 1)) - 1
            const day = +(data?.wdate_input[0] ?? 1)
            setPicker2(new Date(year, month, day))
        }

        // setModel({
        //     model_id: data?.id,
        //     model: data?.model
        // })
        return {
            id: data?.id,
            fullName: data?.name,
            brand: data?.brand_id,
            Eqtype: data?.equpment_type_id,
            EqtStatus: data?.equpment_status_id,
            serialNo: data?.serial_number,
            internalNo: data?.internal_number,
            count: data?.count,
            cost: data?.price,
            CurrencyID: data?.currency,
            notes: data?.notes,
            addressDetails: data?.address,
            supplierPhone: data?.supply_phone,
            sponsorPhone: data?.sponsor_phone

        }
    }

    useEffect(() => {
        console.log(props.selectedEqu)
        if (props.selectedEqu !== null && props.selectedEqu !== undefined && props.selectedEqu.length > 0) {

            setSubmitText('تعديل')
        } else {
            setSubmitText('حفظ')

        }
    }, [props.selectedEqu])


    useEffect(() => {
        if (props.selectedEqu !== null && props.selectedEqu !== undefined && props.selectedEqu.length > 0) {
            resetHandler()
            const data = getObject(props?.selectedEqu[0])
            console.log(data)
            reset(data)
        }
    }, [props.selectedEqu])

    useEffect(() => {
        refresh()
        dispatch(getAllEquipmenteData(handleDeleteEquipment, props.equipId))
    }, [])

    useEffect(() => {
        resetHandler()
    }, [isSubmitted])

    /////////////// image for Equimpent ////////////

    const [imageFiles, setImageFiles] = useState({

        imgPic: null
    })
    const imageRef = useRef()
    // console.log(imageRef)

    const handlerMediaClick = () => {

        imageRef.current.click()
    }

    const resetHandlerImage = () => {
        setImg('https://db.expand.ps/images/equipment.jpg')
        api().post('deleteEquipmentImage', props.equipId)

    }

    const onChangeImage = e => {
        const reader = new FileReader(),
            files = e.target.files
        reader.onload = function () {
            setImg(reader.result)
        }
        reader.readAsDataURL(files[0])
        // setImageFile(files[0])
        setImageFiles(prevState => {
            return {
                ...prevState,
                imgPic: files[0]
            }
        })
    }

    const onSubmit = data => {
        console.log({ ...data, picker1, picker2 })

        const state = dispatch(store_Equipment({ ...data, picker1, picker2, imageFiles }))
        if (state) {
            refresh()
            if (props.outPage) {
                props.refresh()
            }
        }
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className={'match-height'}>
                <Col md={"6"} sm={"12"}>
                    <EquipmentForm register={register} errors={errors}
                        picker1={picker1}
                        setPicker1={setPicker1}
                        picker2={picker2}
                        setPicker2={setPicker2}
                        setValue={setValue}
                        brand={brandTypeSetter}
                        Eqtype={eqtypeSetter}
                        EqtStatus={eqtStatusSetter}
                        employee={employeeSetter}
                        dept={departmentSetter}
                        outPage={props.outPage}
                        img={img}
                        imageRef={imageRef}
                        onChangeImage={onChangeImage}
                        handlerMediaClick={handlerMediaClick}
                        resetHandlerImage={resetHandlerImage}
                    />
                </Col>
                <Col md={"6"} sm={"12"}>
                    <Card>
                        <CardHeader>
                            <CardTitle tag='h4' className='custom-title'>
                                <img src={'https://db.expand.ps/images/sponsor.png'} alt='user-avatar'
                                    className='img-fluid rounded' height='35' width='35' />
                                مانح / مورد
                            </CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col sm={"12"} md={"12"}>
                                    <FormGroup>
                                        <Label for='addressDetails'>تفاصيل العنوان</Label>
                                        <InputGroup className='input-group-merge' tag={FormGroup}>
                                            <InputGroupAddon addonType='prepend'>
                                                <InputGroupText>
                                                    <Map className='headings' size={15} />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                id='addressDetails'
                                                name='addressDetails'
                                                type='text'
                                                innerRef={register({ required: false })}
                                                placeholder='تفاصيل العنوان'
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={"8"} lg='8' sm={"12"}>
                                    <FormGroup>
                                        <Label for='SupplyerName'>الشركة الموردة</Label>
                                        <Input
                                            id='SupplyerName'
                                            name='SupplyerName'
                                            type='hidden'
                                            innerRef={register()}
                                        />

                                        <div className='invoice-customer'>
                                            <SelectWIthAddNew apiUrl='deptInfoForSelect'
                                                modelId={null}
                                                id={'SupplyerName'}
                                                name={'SupplyerName'}
                                                deptDefult={supplyerNameSetter}
                                                optionList={EquipmentStore?.organization}
                                                title={'الشركة الموردة'}
                                                onSelect={(value) => {
                                                    setValue('SupplyerName', value.id)
                                                }} />
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col sm={"12"} md={"4"}>
                                    <FormGroup>
                                        <Label for='supplierPhone'>رقم الهاتف</Label>
                                        <InputGroup className='input-group-merge' tag={FormGroup}>
                                            <InputGroupAddon addonType='prepend'>
                                                <InputGroupText>
                                                    <Smartphone className='headings' size={15} />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                id='supplierPhone'
                                                name='supplierPhone'
                                                type='text'
                                                maxLength={10}
                                                innerRef={register({ required: true })}
                                                placeholder='رقم الهاتف'
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={"8"} lg='8' sm={"12"}>
                                    <FormGroup>
                                        <Label for='SponsorName'>المؤسسة المانحة</Label>
                                        <Input
                                            id='SponsorName'
                                            name='SponsorName'
                                            type='hidden'
                                            innerRef={register()}
                                        />
                                        <div className='invoice-customer'>
                                            <SelectWIthAddNew apiUrl={`getConstants/6261`}
                                                modelId={null}
                                                id={'SponsorName'}
                                                name={'SponsorName'}
                                                deptDefult={sponsorNameSetter}
                                                optionList={EquipmentStore?.organization}
                                                title={'الشركة الموردة'}
                                                onSelect={(value) => {
                                                    setValue('SponsorName', value.id)
                                                }} />
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col sm={"12"} md={"4"}>
                                    <FormGroup>
                                        <Label for='sponsorPhone'>رقم الهاتف</Label>
                                        <InputGroup className='input-group-merge' tag={FormGroup}>
                                            <InputGroupAddon addonType='prepend'>
                                                <InputGroupText>
                                                    <Smartphone className='headings' size={15} />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                id='sponsorPhone'
                                                name='sponsorPhone'
                                                type='text'
                                                maxLength={10}
                                                innerRef={register({ required: true })}
                                                placeholder='رقم الهاتف'
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={"12"} md={"12"}>
                                    <Row>
                                        <Col sm={'12'} md={'12'} style={{ marginTop: '20px' }}>
                                            <h4>
                                                الارشيف
                                            </h4>
                                            <hr />
                                        </Col>
                                        <QuickReportIcons
                                            type='equip'
                                            modelData={props?.modelData}
                                            citizenIconController={{ archive: true }}></QuickReportIcons>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={'12'} sm={"12"}>
                                    <center>
                                        <Button.Ripple className='mr-1' color='primary' type='submit'>
                                            {submitText}
                                        </Button.Ripple>
                                        <Button.Ripple outline color='secondary' type='reset'>
                                            اعادة التعيين
                                        </Button.Ripple>
                                    </center>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Form>
    )
}
export default LeftSide