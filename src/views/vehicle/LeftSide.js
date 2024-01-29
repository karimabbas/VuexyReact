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
import { Calendar, Edit2 } from "react-feather"
import { useState, useEffect, useContext } from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import QuickReportIcons from "../our-componnets/QuickReportIcons"
import Vehicle from "./Vehicle"
import SelectWIthAddNew from "../our-componnets/SelectWIthAddNew"
import { useHistory, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import api from "../../@core/util/api"
import { deleteVehicle, getAllVehicleData, storeVehicle } from "./store/action"
import withReactContent from "sweetalert2-react-content"
import Swal from "sweetalert2"
import { AbilityContext } from '@src/utility/context/Can'

const dateNow = Date.now()
const today = new Date(dateNow)

const LeftSide = (props) => {
    const [picker, setPicker] = useState(today)
    const [picker2, setPicker2] = useState(today)
    const [picker3, setPicker3] = useState(today)
    const [picker4, setPicker4] = useState(today)

    const initStateForSelects = {
        id: 0,
        name: '',
        model: '',
        value: '',
        label: ''
    }
    const [submitText, setSubmitText] = useState('حفظ')
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [vehicleBrandSetter, setVehicleBrandSetter] = useState(initStateForSelects)
    const [modelSetter, setModelSetter] = useState(initStateForSelects)
    const [gearTypeSetter, setGearTypeSetter] = useState(initStateForSelects)
    const [vehicleTypeSetter, setVehicleTypeSetter] = useState(initStateForSelects)
    const [oilTypeSetter, setOilTypeSetter] = useState(initStateForSelects)
    const [branchSetter, setBranchSetter] = useState(initStateForSelects)
    const [SellingMethodSetter, setSellingMethodSetter] = useState(initStateForSelects)
    const [model, setModel] = useState({ model_id: 0, model: '' })
    const history = useHistory()
    const dispatch = useDispatch()
    const ability = useContext(AbilityContext)

    const SignupSchema = yup.object().shape({
        fullName: yup.string().min(3).required(),
        platNo: yup.string().min(1).required()
    })

    const { register, errors, handleSubmit, reset, setValue, getValues } = useForm({
        mode: 'onChange',
        resolver: yupResolver(SignupSchema)
    })
    const refresh = () => {
        if (!props.outPage) {
            history.push(`/vehicle`)
        }
        setIsSubmitted(prev => !prev)
    }
    const handleDeleteVehicle = async (id) => {
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
                dispatch(deleteVehicle(id))
                MySwal.fire({
                    icon: 'success',
                    title: 'تم !',
                    text: 'تم حذف المركبة',
                    customClass: {
                        confirmButton: 'btn btn-success'
                    }
                })
            }
        })
    }
    const resetHandler = () => {
        setVehicleBrandSetter(initStateForSelects)
        setModelSetter(initStateForSelects)
        setGearTypeSetter(initStateForSelects)
        setVehicleTypeSetter(initStateForSelects)
        setOilTypeSetter(initStateForSelects)
        setBranchSetter(initStateForSelects)
        setSellingMethodSetter(initStateForSelects)
        setPicker(today)
        setPicker2(today)
        setPicker3(today)
        setPicker4(today)
        setModel({
            model_id: 0,
            model: ''
        })
        reset({
            id: ''
        })
    }
    const getObject = (data) => {

        console.log(data)
        if (data?.brand_id !== null && data?.brand_id !== "") {
            setVehicleBrandSetter(data?.brand_type)
        }
        if (data?.vehicleModel !== null && data?.vehicleModel !== "") {
            setModelSetter(data?.vehicle_model)
        }
        if (data?.gearType !== null && data?.gearType !== "") {
            setGearTypeSetter(data?.gear_type)
        }
        if (data?.type_id !== null && data?.type_id !== "") {
            setVehicleTypeSetter(data?.vehicle_type)
        }
        if (data?.oilType !== null && data?.oilType !== "") {
            setOilTypeSetter(data?.oil_type)
        }
        if (data?.branchData !== null && data?.branchData !== "") {
            setBranchSetter(data?.branch_data)
        }
        if (data?.sellingMethod !== null && data?.sellingMethod !== "") {
            setSellingMethodSetter(data?.selling_method)
        }

        if (data?.selling_date !== null && data?.selling_date.length === 3) {
            const year = +(data?.selling_date[2] ?? 2022)
            const month = (+(data?.selling_date[1] ?? 1)) - 1
            const day = +(data?.selling_date[0] ?? 1)
            setPicker(new Date(year, month, day))
        }
        if (data?.wdateinput !== null && data?.wdateinput.length === 3) {
            const year = +(data?.wdateinput[2] ?? 2022)
            const month = (+(data?.wdateinput[1] ?? 1)) - 1
            const day = +(data?.wdateinput[0] ?? 1)
            setPicker2(new Date(year, month, day))
        }
        if (data?.licensedate !== null && data?.licensedate.length === 3) {
            const year = +(data?.licensedate[2] ?? 2022)
            const month = (+(data?.licensedate[1] ?? 1)) - 1
            const day = +(data?.licensedate[0] ?? 1)
            setPicker3(new Date(year, month, day))
        }
        if (data?.Inshurencedate !== null && data?.Inshurencedate.length === 3) {
            const year = +(data?.Inshurencedate[2] ?? 2022)
            const month = (+(data?.Inshurencedate[1] ?? 1)) - 1
            const day = +(data?.Inshurencedate[0] ?? 1)
            setPicker4(new Date(year, month, day))
        }
        setModel({
            model_id: data?.id,
            model: data?.model
        })
        return {
            id: data?.id,
            archiveNo: data?.archiveNo,
            vehicleBrand: data?.brand_id,
            price_value: data?.currency,
            fullName: data?.name,
            enginNo: data?.enginNo,
            enginSize: data?.enginSize,
            gearType: data?.gearType,
            oilType: data?.oiltype,
            cost: data?.price,
            productionYear: data?.productionYear,
            SellingMethod: data?.sellingMethod,
            branch: data?.branch,
            platNo: data?.serial_number,
            ChassisNo: data?.shacie_no,
            vehicleType: data?.type_id,
            vehicleColor: data?.vehicleColor,
            model: data?.vehicleModel,
            notes: data?.notes
        }
    }


    useEffect(() => {
        if (props.selectedVeh !== null && props.selectedVeh !== undefined && props.selectedVeh.length > 0) {
            setSubmitText('تعديل')
        } else {
            setSubmitText('حفظ')

        }
    }, [props.selectedVeh])


    useEffect(() => {
        if (props.selectedVeh !== null && props.selectedVeh !== undefined && props.selectedVeh.length > 0) {
            resetHandler()
            const data = getObject(props?.selectedVeh[0])
            console.log(data)
            reset(data)
        }
    }, [props.selectedVeh])


    // useEffect(() => {
    //     if (props.vehicleId) {
    //         resetHandler()
    //         const id = +props.vehicleId
    //         api().post('getVehicle', { id }).then((response) => {
    //             const data = getObject(response?.data?.vehicle)
    //             reset(data)
    //         })
    //     }
    // }, [props.vehicleId])


    useEffect(() => {
        resetHandler()
    }, [isSubmitted])


    useEffect(() => {
        refresh()
        dispatch(getAllVehicleData(handleDeleteVehicle, props.vehicleId))
    }, [])

    const onSubmit = data => {
        const state = dispatch(storeVehicle({ ...data, picker, picker2, picker3, picker4 }))
        if (state) {
            if (props.outPage) {
                setTimeout(() => {
                    props.refresh()
                }, 2000)
            }
            refresh()
        }
    }
    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className={'match-height'}>
                <Col md={"6"} sm={"12"}>
                    <Vehicle register={register} errors={errors} picker={picker} setPicker={setPicker}
                        picker2={picker2} setPicker2={setPicker2}
                        picker3={picker3} setPicker3={setPicker3}
                        picker4={picker4} setPicker4={setPicker4}
                        vehicleBrand={vehicleBrandSetter} model={modelSetter} 
                        gearType={gearTypeSetter} vehicleType={vehicleTypeSetter}
                        oilType={oilTypeSetter} setValue={setValue}
                        outPage={props.outPage}
                    />
                </Col>
                <Col md={"6"} sm={"12"}>
                    <Card>
                        <CardHeader>
                            <CardTitle tag='h4' className='custom-title'>
                                <img src={'https://db.expand.ps/images/sponsor.png'} alt='user-avatar'
                                    className='img-fluid rounded' height='35' width='35' />
                                {" الفرع"}
                            </CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col md={"4"} lg='4' sm={"12"}>
                                    <FormGroup>
                                        <Label for='branch'>الفرع</Label>
                                        <Input
                                            id='branch'
                                            name='branch'
                                            type='hidden'
                                            innerRef={register()}
                                        />
                                        <div className='invoice-customer'>
                                            <SelectWIthAddNew apiUrl={`getConstants/6261`}
                                                modelId={6261}
                                                id={'branch'}
                                                name={'branch'}
                                                deptDefult={branchSetter}
                                                title={'الفرع'}
                                                storeUrl={'saveConstantsWithParent'}
                                                deleteUrl={'deleteConstant'}
                                                onSelect={(value) => {
                                                    setValue('branch', value.id)
                                                }} />

                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col sm={"12"} md={"4"}>
                                    <FormGroup>
                                        <Label for='productionYear'>سنة الانتاج</Label>
                                        <InputGroup className='input-group-merge' tag={FormGroup}>
                                            <InputGroupAddon addonType='prepend'>
                                                <InputGroupText>
                                                    <Calendar className='headings' size={15} />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                id='productionYear'
                                                name='productionYear'
                                                innerRef={register({ required: true })}
                                                invalid={errors.productionYear && true}
                                                placeholder='سنة الانتاج'
                                            />
                                        </InputGroup>
                                        {errors && errors.productionYear &&
                                            <FormFeedback>ادخل سنة الانتاج </FormFeedback>}
                                    </FormGroup>
                                </Col>
                                <Col sm={"12"} md={"4"}>
                                    <FormGroup>
                                        <Label for='SellingMethod'>طريقة البيع</Label>
                                        <Input
                                            id='SellingMethod'
                                            name='SellingMethod'
                                            type='hidden'
                                            innerRef={register()}
                                        />
                                        <div className='invoice-customer'>
                                            <SelectWIthAddNew apiUrl={`getConstants/6262`}
                                                modelId={6262}
                                                id={'SellingMethod'}
                                                name={'SellingMethod'}
                                                deptDefult={SellingMethodSetter}
                                                title={'طريقة البيع'}
                                                storeUrl={'saveConstantsWithParent'}
                                                deleteUrl={'deleteConstant'}
                                                onSelect={(value) => {
                                                    setValue('SellingMethod', value.id)
                                                }} />

                                        </div>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={"12"} md={"12"}>
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
                                                innerRef={register({ required: false })}
                                                placeholder='ملاحظات'
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                </Col>
                            </Row>
                            {ability.can('read', 'vehcileArchive') && <Row>
                                <Col sm={"12"} md={"12"}>
                                    <Row>
                                        <Col sm={'12'} md={'12'} style={{ marginTop: '20px' }}>
                                            <h4>
                                                الارشيف
                                            </h4>
                                            <hr />
                                        </Col>
                                        <QuickReportIcons
                                            type='vehicle'
                                            modelData={model}
                                            citizenIconController={{ archive: true }}></QuickReportIcons>
                                    </Row>
                                </Col>
                            </Row>}
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