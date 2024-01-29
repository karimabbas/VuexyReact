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
import { CreditCard, Edit2, Hash, Mail, Archive, Map, Plus, Smartphone, User, RefreshCw } from "react-feather"
import Select, { components } from "react-select"
import QuickReportIcons from "./QuickReportIcons"
import { selectThemeColors } from '@utils'
import { useState, useEffect, useContext, useRef } from 'react'
import { useHistory, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import CitizenInfoForm from "../definitions/citizen/CitizenInfoForm"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import EmpInfoForm from "../definitions/employee/EmpInfoForm"
import BasicForm from "../definitions/InstitutionsAndOffices/BasicForm"
import FormProject from "../definitions/projects/FormProject"
import RepeatingIndex from '../definitions/projects/RepeatingIndex'
import BuilidingAndWarehouse from "../definitions/BuilidingAndWarehouse/BuilidingAndWarehouse"
import LandsAndGardens from "../definitions/BuilidingAndWarehouse/LandsAndGardens"
import api from "../../@core/util/api"
import makeAnimated from "react-select/animated"
import CitizenSponsor from "../definitions/customer/CitizenSponsor"
import { FaUserShield } from "react-icons/fa"
import SelectWIthAddNew from "./SelectWIthAddNew"
import CustomerInfoForm from "../definitions/customer/CustomerInfoForm"
import SponserForm from "../definitions/projects/SponserForm"
import { useSelector } from "react-redux"
import { AbilityContext } from '@src/utility/context/Can'
import position from '../../assets/images/icon/position.png'
import archive_lock from '../../assets/images/icon/archive_lock.png'
import red_pen from '../../assets/images/icon/red_pen.png'
import { AiOutlineLike } from "react-icons/ai"
const dateNow = Date.now()
const today = new Date(dateNow)

const Address = (props) => {

    const [picker, setPicker] = useState(today)
    const [picker1, setPicker1] = useState(today)
    const [pickerStart, setPickerStart] = useState(today)
    // const [city, setCity] = useState(0)
    // const [town, setTown] = useState(0)
    const [count, setCount] = useState([
        {
            rowId: 0,
            organization: { id: 0, name: '', value: '', label: '' },
            cost: ''
        }
    ])
    const [companies, setCompanies] = useState([
        {
            rowId: 0,
            organization: { id: 0, name: '', value: '', label: '' },
            cost: ''
        }
    ])
    const [submitText, setSubmitText] = useState('حفظ')
    const [allowedEmp, setAllowedEmp] = useState([])
    const [suggestions, setSuggestions] = useState([])
    const [employee, setEmployee] = useState({ id: 0, name: '', model: '', value: '', label: '' })
    const [departmentSetter, setDepartmentSetter] = useState({ id: 0, name: '', model: '', value: '', label: '' })
    const [positionSetter, setPositionSetter] = useState({ id: 0, name: '', value: '', label: '' })
    const [jobTypeSetter, setJobTypeSetter] = useState({ id: 0, name: '', model: '', value: '', label: '' })
    const [citySetter, setCitySetter] = useState({ id: 0, name: '', model: '', value: '', label: '' })
    const [townSetter, setTownSetter] = useState({ id: 0, name: '', model: '', value: '', label: '' })
    const [regionSetter, setRegionSetter] = useState({ id: 0, name: '', model: '', value: '', label: '' })
    const [sponsors, setSponsors] = useState([])
    const [sponsorCount, setSponsorCount] = useState(0)
    const [employeeSetter, setEmployeeSetter] = useState({ id: '', name: '', model: '', value: '', label: '' })
    const [modelData, setModelData] = useState({ model_id: 0, model: '' })
    const animatedComponents = makeAnimated()
    const ability = useContext(AbilityContext)

    const history = useHistory()

    const [img, setImg] = useState('https://t.expand.ps/expand_repov1/public/assets/images/ico/user.png')


    // useEffect(() => {
    //     if (props.type === 'building' || props.type === 'warehouse' || props.type === 'lands&gardens') {
    //         api().get('emp_auto_complete').then(response => { setSuggestions(response.data) })
    //     }
    // }, [props.type])


    let SignupSchema
    if (props.type === 'show_employee') {
        SignupSchema = yup.object().shape({
            nickName: yup.string().min(3).required(),
            empFullName: yup.string().min(3).required(),
            nationalId: yup.string().min(9).required(),
            phone1: yup.string().min(10).required()
        })
    } else if (props.type === 'show_customer') {
        SignupSchema = yup.object().shape({
            customerFullName: yup.string().min(3).required()
        })
    } else {
        SignupSchema = yup.object().shape({
            fullName: yup.string().min(3).required(),
            phone_1: yup.string().min(10).required()
             
        })
    }

    const { register, errors, handleSubmit, reset, setValue, watch, getValues, unregister } = useForm({
        mode: 'onChange',
        resolver: yupResolver(SignupSchema)
    })
    const watchFields = watch(["city", "town"])

    const resetHandler = () => {
        setModelData({ model_id: 0, model: '' })
        setDepartmentSetter({ id: 0, name: '', model: '', value: '', label: '' })
        setPositionSetter({ id: 0, name: '', value: '', label: '' })
        setJobTypeSetter({ id: 0, name: '', model: '', value: '', label: '' })
        setCitySetter({ id: 0, name: '', model: '', value: '', label: '' })
        setTownSetter({ id: 0, name: '', model: '', value: '', label: '' })
        setRegionSetter({ id: 0, name: '', model: '', value: '', label: '' })
        // setResponsibleSetter({ id: 0, name: '', model: '', value: '', label: '' })
        setEmployeeSetter({ id: 0, name: '', model: '', value: '', label: '' })
        setImg('https://t.palexpand.ps/assets/images/ico/user.png')
        setAllowedEmp([])
        setPicker(today)
        setPicker1(today)
        setPickerStart(today)
        // setCity(0)
        // setTown(0)
        reset({
            id: ''
        })
    }

    const handleSelectEmployeeChange = employee => {
        setAllowedEmp(employee)
    }

    const getPermissions = () => {
        if (props.type === 'show_employee') {
            return ability.can('read', 'emp_archives')
        } else if (props.type === 'show_orginzation') {
            return ability.can('read', 'orginzation_archives')
        } else if (props.type === 'show_enginering') {
            return ability.can('read', 'enginering_archives')
        } else if (props.type === 'show_space') {
            return ability.can('read', 'space_archives')
        } else if (props.type === 'show_suppliers') {
            return ability.can('read', 'suppliers_archives')
        } else if (props.type === 'show_banks') {
            return ability.can('read', 'banks_archives')
        } else if (props.type === 'show_warehouses' || props.type === 'show_buildings' || props.type === 'show_gardens_lands') {
            return ability.can('read', 'assets_archives')
        } else if (props.type === 'show_customer' || props.type === 'show_citizens') {
            return ability.can('read', 'sub_archives')
        }
    }
    const getObject = (type, data) => {
        setAllowedEmp((data?.allowed_emp ?? []))

        setModelData({
            model_id: data?.id,
            model: data?.model,
            name: data?.name
        })

        if (data?.image !== null) {
            setImg(data?.image)
        }

        if (data?.job_title_id !== null) {
            setPositionSetter(data?.job_title_name)

        }
        if (data?.admin_id !== null) {
            setEmployeeSetter(data?.responsible_name)
        }

        if (data?.city_id !== null) {
            setCitySetter(data?.city)
            // setCity(data?.city_id)
        }
        if (data?.town_id !== null) {
            setTownSetter(data?.town)
            // setTown(data?.town_id)
        }
        if (data?.region !== null) {
            setRegionSetter(data?.region)

        }

        if (type === 'show_employee') {

            if (data?.department_id !== null) {
                setDepartmentSetter(data?.department)
            }
            if (data?.job_type_id !== null) {
                setJobTypeSetter(data?.job_type)
            }
            let hiringDate = null
            if (data?.start_date !== null) {
                hiringDate = data?.start_date.split("/")
            }
            if (hiringDate !== null && hiringDate.length === 3) {
                const year = +(hiringDate[2] ?? 2022)
                const month = (+(hiringDate[1] ?? 1)) - 1
                const day = +(hiringDate[0] ?? 1)

                setPicker(new Date(year, month, day))
            }
            return {
                id: data?.id,
                empFullName: data?.name,
                fullName: data?.name,
                nickName: data?.nick_name,
                e_mail: data?.email,
                phone1: data?.phone_one,
                phone2: data?.phone_two,
                nationalId: data?.identification,
                deptId: data?.department_id,
                position: data?.job_title_id,
                jobType: data?.job_type_id,
                notes: data?.notes,
                city: data?.city_id,
                town: data?.town_id,
                region: data?.region_id,
                addressDetails: data?.details,
                hasAccount: (data?.status === 'on')
            }
        } else if (type === 'show_orginzation' || type === 'show_enginering' || type === 'show_space' || type === 'show_suppliers' || type === 'show_banks') {
            return {
                id: data?.id,
                fullName: data?.name,
                zepe_code: data?.zepe_code,
                depart_head_name: data?.manager_name,
                position: data?.job_title_id,
                phone_1: data?.phone_one,
                phone_2: data?.phone_two,
                local_phone: data?.whatsapp_one,
                email: data?.email,
                fax: data?.fax,
                town: data?.town_id,
                city: data?.city_id,
                region: data?.region_id,
                addressDetails: data?.details,
                notes: data?.notes

                // allowedEmp: data?.allowedEmp

            }
        } else if (type === 'show_citizens') {
            return {

                id: data?.id,
                fullName: data?.name,
                position: data?.job_title_id,
                formDataMobileNo1: data?.phone_one,
                formDataMobileNo2: data?.phone_two,
                formDataNationalID: data?.national_id,
                formDataCutomerNo: data?.cutomer_num,
                formDataEmailAddress: data?.email,
                notes: data?.notes,
                town: data?.town_id,
                city: data?.city_id,
                region: data?.region_id,
                addressDetails: data?.details
            }
        } else if (type === 'show_warehouses' || type === 'show_buildings' || type === 'show_gardens_lands') {
            return {

                id: data?.id,
                fullName: data?.name,
                asset_price: data?.price,
                employee: data?.admin_id,
                CurrencyID: data?.currency,
                asset_type: data?.asset_statuses_id,
                notes: data?.notes,
                area: data?.area_name1,
                hoodNo: data?.hod_No,
                picNo: data?.pice_No,
                town: data?.town_id,
                city: data?.city_id,
                region: data?.region_id,
                addressDetails: data?.details
            }
        } else if (type === 'show_projects') {

            if (data?.dateStart !== null && data?.dateStart.length === 3) {
                const year = +(data?.dateStart[2] ?? 2022)
                const month = (+(data?.dateStart[1] ?? 1)) - 1
                const day = +(data?.dateStart[0] ?? 1)

                setPickerStart(new Date(year, month, day))
            }
            if (data?.dateEnd !== null && data?.dateEnd.length === 3) {
                const year = +(data?.dateEnd[2] ?? 2022)
                const month = (+(data?.dateEnd[1] ?? 1)) - 1
                const day = +(data?.dateEnd[0] ?? 1)

                setPicker1(new Date(year, month, day))
            }
            return {
                id: data?.id,
                fullName: data?.name,
                projectNo: data?.ProjectNo,
                Projectcost: data?.Projectcost,
                CurrencyID: data?.currency,
                town: data?.town_id,
                city: data?.city_id,
                region: data?.region_id,
                addressDetails: data?.details
            }
        } else if (type === 'show_customer') {
            setSponsorCount(data?.sponsorCount)
            setSponsors(data?.sponsor)
            return {
                id: data?.id,
                customerFullName: data?.name,
                e_mail: data?.email,
                phone1: data?.phone_one,
                phone2: data?.phone_two,
                nationalId: data?.national_id,
                position: data?.job_title_id,
                notes: data?.notes,
                city: data?.city_id,
                town: data?.town_id,
                region: data?.region_id,
                addressDetails: data?.details,
                repeaterCount: data?.sponsorCount
            }
        }

        return {}
    }

    // useEffect(() => {
    //     if (props.selectedDef !== null && props.selectedDef !== undefined && props.selectedDef.length > 0) {
    //         // resetHandler()
    //         // const data = getObject(props.type, props?.selectedDef[0])
    //         // console.log(data)
    //         // reset(data)
    //         setSubmitText('تعديل')
    //     } else {
    //         setSubmitText('حفظ')

    //     }
    // }, [props.selectedDef])


    useEffect(() => {
        if (props.selectedDef !== null && props.selectedDef !== undefined && props.selectedDef.length > 0) {
            // resetHandler()
            const data = getObject(props.type, props?.selectedDef[0])
            setSubmitText('تعديل')
            reset(data)
        } else {
            setSubmitText('حفظ')
        }
    }, [props.selectedDef])

    useEffect(() => {
        resetHandler()
        setAllowedEmp([])

    }, [props.isSubmitted])

    useEffect(() => {
        resetHandler()
    }, [props.type])

    /////////////// image for Employes ////////////

    const [imageFiles, setImageFiles] = useState({

        imgPic: null
    })
    const imageRef = useRef()

    const handlerMediaClick = () => {

        imageRef.current.click()
    }

    const resetHandlerImage = () => {
        api().post('deleteEmployeeImage', props.id)
        setImg('https://t.palexpand.ps/assets/images/ico/user.png')

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
        if (props.type === 'show_employee') {
            props.onsubmit({ ...data, picker, allowedEmp, imageFiles })
        } else if (props.type === 'show_projects') {

            props.onsubmit({ ...data, pickerStart, picker1, allowedEmp, count, companies })

        } else if (props.type === 'show_buildings' || props.type === 'show_warehouses' || props.type === 'show_gardens_lands') {
            props.onsubmit({ ...data })

        } else {
            props.onsubmit({ ...data, allowedEmp })
        }
    }
    const handelname = (name) => {
        if (name === 'show_orginzation') return 'المؤسسة'
        else if (name === 'show_enginering') return 'المكتب الهندسى'
        else if (name === 'show_suppliers') return 'المورد'
        else if (name === 'show_space') return 'مكتب المساحة'
        else if (name === 'show_banks') return 'البنك'
        else if (name === 'show_buildings') return 'المبانى'
        else if (name === 'show_warehouses') return 'المستودع'
        else if (name === 'show_gardens_lands') return 'الحدائق والأراضى'
        else if (name === 'show_projects') return 'المشروع'

    }


    const handelpiType = (name) => {
        if (name === 'show_orginzation') return 'orginzation'
        else if (name === 'show_enginering') return 'enginering'
        else if (name === 'show_suppliers') return 'suppliers'
        else if (name === 'show_space') return 'space'
        else if (name === 'show_banks') return 'banks'
        else if (name === 'show_buildings') return 'buildings'
        else if (name === 'show_warehouses') return 'warehouses'
        else if (name === 'show_gardens_lands') return 'Gardens_lands'
        else if (name === 'show_projects') return 'projects'

    }
    const HandelImage = (name) => {

        if (name === 'show_warehouses') return <img src={'https://db.expand.ps/images/warehouse.png'} alt='user-avatar'
            className='img-fluid rounded text-align center' height='200' width='200' />
        else if (name === 'show_buildings') return <img src={'https://db.expand.ps/images/office_building2.png'}
            alt='user-avatar'
            className='img-fluid rounded text-align center' height='200'
            width='200' />
    }
    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className={'match-height'}>
                <Col md={"6"} sm={"12"}>

                    {props.type === 'show_citizens' && <CitizenInfoForm outPage={props.outPage} modelData={modelData} register={register} position={positionSetter} errors={errors} setValue={setValue} />}
                    {props.type === 'show_customer' && <CustomerInfoForm outPage={props.outPage} modelData={modelData} position={positionSetter} register={register} errors={errors} setValue={setValue} />}
                    {props.type === 'show_employee' && <EmpInfoForm outPage={props.outPage} register={register} dept={departmentSetter} position={positionSetter} jobType={jobTypeSetter} setValue={setValue}
                        errors={errors} picker={picker} setPicker={setPicker}
                        imageRef={imageRef}
                        img={img}
                        setImg={setImg}
                        handlerMediaClick={handlerMediaClick}
                        resetHandlerImage={resetHandlerImage}
                        onChangeImage={onChangeImage}
                    />}

                    {(props.type === 'show_orginzation' || props.type === 'show_enginering' || props.type === 'show_space' || props.type === 'show_suppliers' || props.type === 'show_banks') && <BasicForm outPage={props.outPage} register={register}
                        errors={errors}
                        name={handelname(props.type)}
                        nameDB={handelpiType(props.type)}
                        URLName={props.type}
                        modelData={modelData}
                        position={positionSetter}
                        setValue={setValue} />
                    }

                    {props.type === 'show_projects' && <FormProject outPage={props.outPage} register={register}
                        errors={errors}
                        name={handelname(props.type)}
                        modelData={modelData}
                        URLName={props.type}
                        pickerStart={pickerStart}
                        setPickerStart={setPickerStart}
                        picker1={picker1}
                        setPicker1={setPicker1} />
                    }

                    {props.type === 'show_gardens_lands' && <LandsAndGardens outPage={props.outPage} register={register}
                        errors={errors}
                        name={handelname(props.type)}
                        nameDB={handelpiType(props.type)}
                        URLName={props.type}
                        setValue={setValue}
                        // responsible={responsibleSetter}
                        suggestions={suggestions}
                        employeeSetter={employeeSetter}
                        setEmployee={setEmployee}
                    />
                    }

                    {(props.type === 'show_buildings' || props.type === 'show_warehouses') && <BuilidingAndWarehouse outPage={props.outPage} register={register}
                        errors={errors}
                        name={handelname(props.type)}
                        nameDB={handelpiType(props.type)}
                        URLName={props.type}
                        image={HandelImage(props.type)}
                        setValue={setValue}
                        suggestions={suggestions}
                        setEmployee={setEmployee}
                        // optionList={defStore?.employees}
                        employeeSetter={employeeSetter}
                    />
                    }

                </Col>
                <Col md={"6"} sm={"12"}>
                    <Card>
                        <CardHeader>
                            <CardTitle tag='h4' className='custom-title'>
                                <img src={'https://db.expand.ps/images/maps-icon.png'} alt='user-avatar'
                                    className='img-fluid rounded' height='35' width='35' />
                                العنوان
                            </CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col sm={"12"} md={"12"}>
                                    <Row>
                                        <Col md={"4"} lg='4' sm={"12"}>
                                            <FormGroup>
                                                <Label for='city'>المدينة</Label>
                                                <Input
                                                    id='city'
                                                    name='city'
                                                    type='hidden'
                                                    innerRef={register({ required: false })}
                                                />
                                                <div className='invoice-customer'>
                                                    <SelectWIthAddNew apiUrl={`getCities`}

                                                        id={'city'}
                                                        name={'city'}
                                                        modelId={999999999}
                                                        title={'المدينة'}
                                                        storeUrl={'saveCity'}
                                                        deleteUrl={'deleteCity'}
                                                        deptDefult={citySetter}
                                                        onSelect={(value) => {
                                                            // setCity(value.id)
                                                            setValue('city', value.id)
                                                        }} />

                                                </div>
                                            </FormGroup>
                                        </Col>
                                        <Col md={"4"} lg='4' sm={"12"}>
                                            <FormGroup>
                                                <Label for='town'>البلدة</Label>
                                                <Input
                                                    id='town'
                                                    name='town'
                                                    type='hidden'
                                                    innerRef={register({ required: false })}
                                                />
                                                <div className='invoice-customer'>
                                                    <SelectWIthAddNew

                                                        id={'town'}
                                                        name={'town'}
                                                        title={'البلدة'}
                                                        modelId={watchFields.city}
                                                        storeUrl={'saveTownWithParent'}
                                                        deleteUrl={'deleteTown'}
                                                        deptDefult={townSetter}
                                                        onSelect={(value) => {
                                                            // setTown(value.id)
                                                            setValue('town', value.id)
                                                        }} />

                                                </div>
                                            </FormGroup>
                                        </Col>
                                        <Col md={"4"} lg='4' sm={"12"}>
                                            <FormGroup>
                                                <Label for='region'>المنطقة</Label>
                                                <Input
                                                    id='region'
                                                    name='region'
                                                    type='hidden'
                                                    innerRef={register({ required: false })}
                                                />
                                                <div className='invoice-customer'>
                                                    <SelectWIthAddNew

                                                        id={'region'}
                                                        name={'region'}
                                                        title={'المنطقة'}
                                                        modelId={watchFields.town}
                                                        storeUrl={'saveRegionWithParent'}
                                                        deleteUrl={'deleteRegion'}
                                                        deptDefult={regionSetter}
                                                        onSelect={(value) => {
                                                            setValue('region', value.id)
                                                        }} />

                                                </div>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col sm={"12"} md={"12"}>
                                    <FormGroup>
                                        <Label for='addressDetails'>تفاصيل العنوان</Label>
                                        <InputGroup className='input-group-merge' tag={FormGroup}>
                                            <InputGroupAddon addonType='prepend'>
                                                <InputGroupText>
                                                    <img src={position} style={{ width: '22px' }} className='headings' />
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
                                {(props.type !== 'show_warehouses' && props.type !== 'show_buildings' && props.type !== 'show_projects' && props.type !== 'show_gardens_lands') &&

                                    <Col sm={"12"} md={"12"}>
                                        <FormGroup>
                                            <Label for='notes'>ملاحظات</Label>
                                            <InputGroup className='input-group-merge' tag={FormGroup}>
                                                <InputGroupAddon addonType='prepend'>
                                                    <InputGroupText>
                                                        <img src={red_pen} style={{ width: '34px' }} className='headings' />
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
                                    </Col>}

                                {(props.type !== 'show_warehouses' && props.type !== 'show_buildings' && props.type !== 'show_gardens_lands') &&

                                    <Col sm='12' md='12'>
                                        <FormGroup>
                                            <Label for='access'>
                                                <img src={archive_lock} style={{ width: '45px' }} className='headings mr-1' />
                                                الصلاحية على الارشيف {handelname(props.type)}
                                            </Label>

                                            <Select
                                                isClearable={false}
                                                theme={selectThemeColors}
                                                closeMenuOnSelect={false}
                                                components={animatedComponents}
                                                value={allowedEmp}
                                                isMulti
                                                options={props.allow_list}
                                                id={'allowedEmp'}
                                                name={'allowedEmp'}
                                                innerref={register()}
                                                className='react-select'
                                                classNamePrefix='select'
                                                onChange={handleSelectEmployeeChange}
                                                noOptionsMessage={() => 'لا يوجد بيانات !'}
                                            />
                                        </FormGroup>
                                    </Col>
                                }


                                {(props.type !== 'show_citizens' && props.type !== 'show_projects'

                                    && props.type !== 'show_customer'
                                    && props.type !== 'show_orginzation'
                                    && props.type !== 'show_suppliers'
                                    && props.type !== 'show_banks'
                                    && props.type !== 'show_enginering'
                                    && props.type !== 'show_space') &&
                                    getPermissions() &&
                                    <Col sm={"12"} md={"12"}>
                                        <Row>
                                            <Col sm={'12'} md={'12'} style={{ marginTop: '20px' }}>
                                                <h4>
                                                    <span>
                                                        <img src={'https://t.palexpand.ps/assets/images/ico/msg.png'} style={{ width: '32px' }} className='headings mr-1' />
                                                        الأرشيف
                                                    </span>
                                                </h4>
                                                <hr />
                                            </Col>
                                            <QuickReportIcons type={props.type} modelData={modelData}
                                                citizenIconController={{ archive: true }}></QuickReportIcons>
                                        </Row>
                                    </Col>}
                                {props.type === 'show_projects' &&
                                    <Col sm={"12"} md={"12"}>
                                        {/* <SponserForm 
                                        isSubmitted={ props.isSubmitted }
                                        name='الجهة الممولة' cost='نسبة التمويل'/> */}
                                        <RepeatingIndex
                                            count={count}
                                            setCount={setCount}
                                            organizations={props?.defStore?.organizations ?? []}
                                            isSubmitted={props.isSubmitted} register={register}
                                            name='الجهة الممولة' cost='نسبة التمويل' />
                                        <RepeatingIndex
                                            count={companies}
                                            setCount={setCompanies}
                                            organizations={props?.defStore?.organizations ?? []}
                                            isSubmitted={props.isSubmitted} register={register}
                                            name='الشركة المنفذة' cost='الأعمال الموكلة' />
                                        {/* <RepeatingIndex name='الشركة المنفذة' cost='الأعمال الموكلة' /> */}
                                    </Col>}
                                {props.type === 'show_customer' &&
                                    <>
                                        <Col sm={"12"} md={"12"}>
                                            <Row>
                                                <Col sm={'12'} md={'12'} style={{ marginTop: '20px' }}>
                                                    <h4>
                                                        <span> <FaUserShield /> الكفلاء </span>
                                                    </h4>
                                                    <hr />
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col sm={"12"} md={"12"}>
                                            <CitizenSponsor soponsorCount={sponsorCount} isSubmitted={props.isSubmitted}
                                                unregister={unregister} getValues={getValues}
                                                sponsors={sponsors} setValue={setValue}
                                                register={register} />
                                        </Col>
                                    </>
                                }
                                <Col md={'12'} sm={"12"}>
                                    {ability.can('read', 'edit_model') && <center>
                                        <Button.Ripple className='mr-1' color='primary' type='submit'>
                                            {submitText}
                                            <AiOutlineLike style={{ marginRight: '0.5rem' }} size={15} />
                                        </Button.Ripple>

                                        <Button.Ripple outline color='' className='btn btn-warning' onClick={() => {
                                            resetHandler()
                                            props.refresh()

                                        }}>
                                            اعادة التعيين
                                            <RefreshCw style={{ marginRight: '0.5rem' }} size={15} />
                                        </Button.Ripple>
                                    </center>}
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Form>
    )
}
export default Address