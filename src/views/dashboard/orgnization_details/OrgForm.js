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
    NavItem,
    Row,
    Media
} from "reactstrap"

import { BiRename, BiSitemap } from "react-icons/bi"
import { CgRename, CgSize } from "react-icons/cg"

import {
    CreditCard,
    Edit2,
    Hash,
    Mail,
    Archive,
    Map,
    Printer,
    Plus,
    Smartphone,
    User,
    Globe,
    Settings,
    Image,
    X,
    RefreshCw
} from "react-feather"
import { useForm } from "react-hook-form"
import { useState, useEffect, useRef } from 'react'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useHistory } from "react-router-dom"
import Select from 'react-select'
import makeAnimated, { ValueContainer } from "react-select/animated"
import { selectThemeColors } from '@utils'
import SelectWIthAddNew from "../../our-componnets/SelectWIthAddNew"
import QuickReportIcons from "../../our-componnets/QuickReportIcons"
import AutoCompleteInput from "../../../@core/components/autocomplete"
import api from "../../../@core/util/api"
import { FaSitemap } from "react-icons/fa"
import Avatar from '@components/avatar'
import position from "../../../assets/images/icon/position.png"
import red_pen from "../../../assets/images/icon/red_pen.png"
import {AiOutlineLike} from "react-icons/ai"
import info from "../../../assets/images/icon/info.png"

const animatedComponents = makeAnimated()

const OrgForm = (props) => {

    const history = useHistory()

    // const [img, setImg] = useState(null)

    const SignupSchema = yup.object().shape({
        fullName_ar: yup.string().min(3).required()
    })

    const [city, setCity] = useState(0)
    const [town, setTown] = useState(0)
    const [departmentSetter, setDepartmentSetter] = useState({ id: 0, name: '', model: '', value: '', label: '' })
    const [positionSetter, setPositionSetter] = useState({ id: 0, name: '', value: '', label: '' })
    const [jobTypeSetter, setJobTypeSetter] = useState({ id: 0, name: '', model: '', value: '', label: '' })
    const [citySetter, setCitySetter] = useState({ id: 0, name: '', model: '', value: '', label: '' })
    const [townSetter, setTownSetter] = useState({ id: 0, name: '', model: '', value: '', label: '' })
    const [regionSetter, setRegionSetter] = useState({ id: 0, name: '', model: '', value: '', label: '' })


    const [img, setImg] = useState('https://t.expand.ps/expand_repov1/public/assets/images/ico/user.png')
    const [footer_img, setFooter_img] = useState(null)
    const [header_img, setHeader_img] = useState(null)

    const [imageFiles, setImageFiles] = useState({

        imgPic: null,
        footer_image: null,
        header_image: null

    })

    const imageRef = useRef()
    const imageRef1 = useRef()
    const imageRef2 = useRef()

    const handlerMediaClick = () => {

        imageRef.current.click()
    }

    const handlerMediaHeaderClick = () => {

        imageRef1.current.click()
    }

    const handlerMediaFooterClick = () => {

        imageRef2.current.click()
    }

    const onChange = e => {
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

    const onChangeHeader = e => {
        const reader = new FileReader(),
            files = e.target.files
        reader.onload = function () {
            setHeader_img(reader.result)
        }
        reader.readAsDataURL(files[0])
        // setImageFile(files[0])
        setImageFiles(prevState => {
            return {
                ...prevState,
                header_image: files[0]
            }
        })
    }
    const onChangeFooter = e => {
        const reader = new FileReader(),
            files = e.target.files
        reader.onload = function () {
            setFooter_img(reader.result)
        }
        reader.readAsDataURL(files[0])
        // setImageFile(files[0])
        setImageFiles(prevState => {
            return {
                ...prevState,
                footer_image: files[0]
            }
        })
    }

    const resetHandler = () => {
        setImg('https://t.palexpand.ps/assets/images/ico/user.png')

        api().post('deleteLogo')
    }

    const resetHandler1 = () => {
        setFooter_img('https://t.palexpand.ps/assets/images/ico/user.png')
        api().post('deleteFooter')


    }

    const resetHandler2 = () => {
        setHeader_img('https://t.palexpand.ps/assets/images/ico/user.png')
        api().post('deleteHeader')

    }

    const onSubmit = data => {
        console.log(data)

        props.onsubmit({ ...data, imageFiles })
    }

    const { register, unregister, errors, handleSubmit, reset, setValue } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })

    useEffect(() => {

        api().post('updateOrganization', {}).then((response) => {
            const data = response?.data?.user

            if (data?.logo !== null) {
                setImg(data?.logo)
            }
            if (data?.header_img !== null) {
                setHeader_img(data?.header_img)
            }
            if (data?.footer_img !== null) {
                setFooter_img(data?.footer_img)
            }

            if (data?.city_id !== null) {
                setCitySetter(data?.city)
                setCity(data?.city_id)
            }
            if (data?.town_id !== null) {
                setTownSetter(data?.town)
                setTown(data?.town_id)
            }
            if (data?.region_id !== null) {
                setRegionSetter(data?.region)

            }

            reset({
                fullName_ar: data?.name_ar,
                fullName_en: data?.name_en,
                phone1: data?.phone_one,
                phone2: data?.phone_two,
                email: data?.email,
                fax: data?.fax,
                website: data?.website,
                addressDetails: data?.addressDetails,
                notes: data?.notes,
                storage_path: data?.storage_path,
                max_upload: data?.max_upload,
                town: data?.town_id,
                city: data?.city_id,
                region_id: data?.region_id

            })
        })

    }, [])

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className={'match-height'}>
                <Col md={"6"} sm={"12"}>
                    <Card>
                        <CardHeader>
                            <CardTitle tag='h4' className='custom-title'>
                                <img src={info} style={{ width: '44px' }} className='headings pr-1' />
                                <span> بيانات المؤسسة  </span>
                            </CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col sm='8' md='8'>
                                    <FormGroup>
                                        <Label for='fullName_ar'>الأسم باللغة العربية</Label>
                                        <InputGroup className='input-group-merge' tag={FormGroup}>
                                            {/*<InputGroupAddon addonType='prepend'>*/}
                                            {/*    <InputGroupText>*/}
                                            {/*        <BiRename className='headings' size={15} />*/}
                                            {/*    </InputGroupText>*/}
                                            {/*</InputGroupAddon>*/}
                                            <Input
                                                id='fullName_ar'
                                                name='fullName_ar'
                                                innerRef={register({ required: true })}
                                                errors={errors.fullName_ar}
                                            />

                                        </InputGroup>
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for='fullName_en'>الأسم باللغة الأنجليزية</Label>
                                        <InputGroup className='input-group-merge' tag={FormGroup}>
                                            {/*<InputGroupAddon addonType='prepend'>*/}
                                            {/*    <InputGroupText>*/}
                                            {/*        <CgRename className='headings' size={15} />*/}
                                            {/*    </InputGroupText>*/}
                                            {/*</InputGroupAddon>*/}
                                            <Input
                                                id='fullName_en'
                                                name='fullName_en'
                                                innerRef={register({ required: true })}
                                                errors={errors.fullName_en}
                                            />
                                        </InputGroup>
                                    </FormGroup>

                                    <Row>
                                        <Col sm='6' md='6'>
                                            <FormGroup>
                                                <Label for='phone1'>رقم الهاتف </Label>
                                                <InputGroup className='input-group-merge' tag={FormGroup}>
                                                    <InputGroupAddon addonType='prepend'>
                                                        <InputGroupText>
                                                            <img src={'https://db.expand.ps/images/call-pinar35.png'} style={{ width: '22px' }} className='headings' />
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input
                                                        id='phone1'
                                                        name='phone1'
                                                        type='text'
                                                        maxLength={10}
                                                        innerRef={register({ required: false })}
                                                        placeholder='رقم الهاتف'
                                                    />
                                                </InputGroup>
                                            </FormGroup>
                                        </Col>

                                        <Col sm='6' md='6'>
                                            <FormGroup>
                                                <Label for='phone2'> رقم الهاتف </Label>
                                                <InputGroup className='input-group-merge' tag={FormGroup}>
                                                    <InputGroupAddon addonType='prepend'>
                                                        <InputGroupText>
                                                            <img src={'https://db.expand.ps/images/call-pinar35.png'} style={{ width: '22px' }} className='headings' />
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input
                                                        id='phone2'
                                                        name='phone2'
                                                        type='text'
                                                        maxLength={10}
                                                        innerRef={register({ required: false })}
                                                        placeholder='رقم الهاتف'
                                                    />
                                                </InputGroup>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col style={{ paddingTop: 20 }} sm='4' md='4'>
                                    <div>
                                        <Media>
                                            <Media className='d-flex' left>
                                                <Media onClick={handlerMediaClick} object className='rounded mr-50' src={img} alt='Generic placeholder image' style={{ cursor: 'pointer' }} height='63' width='200' />
                                                <X className="btn-icon btn btn-danger btn-close btn-sm"
                                                    style={{
                                                        marginRight: '-2.3rem'

                                                    }}
                                                    onClick={resetHandler} />
                                            </Media>
                                            <Input type='file' id="imgPic" name="imgPic" innerRef={imageRef} onChange={onChange} hidden accept='image/*' />

                                        </Media>
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col sm='4' md='4'>
                                    <FormGroup>
                                        <Label for='website'>الموقع الألكترونى</Label>
                                        <InputGroup className='input-group-merge' tag={FormGroup}>
                                            <InputGroupAddon addonType='prepend'>
                                                <InputGroupText>
                                                    <img src={'https://db.expand.ps/images/www35.png'} style={{ width: '22px' }} className='headings' />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                id='website'
                                                name='website'
                                                innerRef={register({ required: false })}
                                                placeholder='الموقع الالأكترونى'
                                            />
                                        </InputGroup>
                                    </FormGroup>

                                </Col>
                                <Col sm='4' md='4'>
                                    <FormGroup>
                                        <Label>FAX</Label>
                                        <InputGroup className='input-group-merge '>
                                            <InputGroupAddon addonType='prepend'>
                                                <InputGroupText>
                                                    <img src={'https://db.expand.ps/images/fax35.png'} style={{ width: '22px' }} className='headings' />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                id='fax'
                                                name='fax'
                                                innerRef={register({ required: false })}
                                                placeholder='FAX'
                                            />
                                        </InputGroup>
                                    </FormGroup>

                                </Col>
                                <Col sm='4' md='4'>
                                    <FormGroup>
                                        <Label for='email'>البريد الألكترونى</Label>

                                        <InputGroup className='input-group-merge '>
                                            <InputGroupAddon addonType='prepend'>
                                                <InputGroupText>
                                                    <img src={'https://db.expand.ps/images/mailico35.jpg'} style={{ width: '22px' }} className='headings' />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                id='email'
                                                name='email'
                                                innerRef={register({ required: false })}
                                                placeholder='البريد الألكترونى'
                                            />
                                        </InputGroup>
                                    </FormGroup>

                                </Col>
                            </Row>
                            <Col sm={"12"} md={"12"}>
                                <Row>
                                    <Col sm={'12'} md={'12'} style={{ marginTop: '20px' }}>
                                        <CardTitle tag='h4' className='custom-title mb-0'>
                                            <span>
                                                <img src={'https://t.palexpand.ps/assets/images/ico/msg.png'} style={{ width: '32px', marginBottom:'5px' }} className='headings mr-1 ' />
                                                الأرشيف
                                            </span>
                                        </CardTitle>
                                        <hr />
                                    </Col>
                                    <QuickReportIcons type="orgnization_details" citizenIconController={{ archive: true }}></QuickReportIcons>
                                </Row>
                            </Col>
                            {/*<Col sm={"12"} md={"12"} className='mt-1'>*/}
                            {/*    <Row>*/}
                            {/*        <Col sm={'12'} md={'12'} style={{ marginTop: '20px' }}>*/}
                            {/*            <h4>*/}
                            {/*                <span> <Settings /> إعدادات التخزين </span>*/}
                            {/*            </h4>*/}
                            {/*            <hr />*/}
                            {/*        </Col>*/}
                            {/*        <Col sm='6' md='6'>*/}
                            {/*            <FormGroup>*/}
                            {/*                <Label for='storage_path'>مسار التخزين</Label>*/}
                            {/*                <InputGroup className='input-group-merge' tag={FormGroup}>*/}
                            {/*                    <InputGroupAddon addonType='prepend'>*/}
                            {/*                        <InputGroupText>*/}
                            {/*                            <Globe className='headings' size={15} />*/}
                            {/*                        </InputGroupText>*/}
                            {/*                    </InputGroupAddon>*/}
                            {/*                    <Input*/}
                            {/*                        id='storage_path'*/}
                            {/*                        name='storage_path'*/}
                            {/*                        innerRef={register({ required: false })}*/}

                            {/*                    />*/}
                            {/*                </InputGroup>*/}
                            {/*            </FormGroup>*/}

                            {/*        </Col>*/}
                            {/*        <Col sm='6' md='6'>*/}
                            {/*            <FormGroup>*/}
                            {/*                <Label for='max_upload'>أقصى حجم للتخزين</Label>*/}
                            {/*                <InputGroup className='input-group-merge' tag={FormGroup}>*/}
                            {/*                    <InputGroupAddon addonType='prepend'>*/}
                            {/*                        <InputGroupText>*/}
                            {/*                            <CgSize className='headings' size={15} />*/}
                            {/*                        </InputGroupText>*/}
                            {/*                    </InputGroupAddon>*/}
                            {/*                    <Input*/}
                            {/*                        id='max_upload'*/}
                            {/*                        name='max_upload'*/}
                            {/*                        type='number'*/}
                            {/*                        innerRef={register({ required: false })}*/}
                            {/*                    />*/}
                            {/*                </InputGroup>*/}
                            {/*            </FormGroup>*/}

                            {/*        </Col>*/}

                            {/*    </Row>*/}
                            {/*</Col>*/}

                        </CardBody>
                    </Card>

                </Col>
                <Col md={"6"} sm={"12"}>
                    <Card>
                        <CardHeader>
                            <CardTitle tag='h4' className='custom-title'>
                                <img src={'https://db.expand.ps/images/maps-icon.png'}
                                    className='headings mr-1' height='35' width='35' />
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
                                                            setCity(value.id)
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
                                                    <SelectWIthAddNew apiUrl={`getTowns/${city}`}

                                                        id={'town'}
                                                        name={'town'}
                                                        title={'البلدة'}
                                                        modelId={city}
                                                        storeUrl={'saveTownWithParent'}
                                                        deleteUrl={'deleteTown'}
                                                        deptDefult={townSetter}
                                                        onSelect={(value) => {
                                                            setTown(value.id)
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
                                                    <SelectWIthAddNew apiUrl={`getRegions/${town}`}

                                                        id={'region'}
                                                        name={'region'}
                                                        title={'المنطقة'}
                                                        modelId={town}
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
                                {/*<Col sm={"12"} md={"12"}>*/}
                                {/*    <FormGroup>*/}
                                {/*        <Label for='addressDetails'>تفاصيل العنوان</Label>*/}
                                {/*        <InputGroup className='input-group-merge' tag={FormGroup}>*/}
                                {/*            <InputGroupAddon addonType='prepend'>*/}
                                {/*                <InputGroupText>*/}
                                {/*                    <img src={position} style={{ width: '22px' }} className='headings' />*/}
                                {/*                </InputGroupText>*/}
                                {/*            </InputGroupAddon>*/}
                                {/*            <Input*/}
                                {/*                id='addressDetails'*/}
                                {/*                name='addressDetails'*/}
                                {/*                type='text'*/}
                                {/*                innerRef={register({ required: false })}*/}
                                {/*                placeholder='تفاصيل العنوان'*/}
                                {/*            />*/}
                                {/*        </InputGroup>*/}
                                {/*    </FormGroup>*/}
                                {/*</Col>*/}

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
                                </Col>
                                <Col sm={"12"} md={"12"} className='mb-2'>
                                    <Row>
                                        <Col sm={'12'} md={'12'} style={{ marginTop: '20px' }}>
                                            <CardTitle tag='h4' className='custom-title mb-0'>
                                            <span>
                                                الترويسة والتذييل
                                            </span>
                                            </CardTitle>
                                            <hr />
                                        </Col>
                                        <Col sm='6' md='6'>

                                            <div>
                                                <Media>
                                                    <Media className='mr-25' left>
                                                        <Media onClick={handlerMediaHeaderClick} object className='rounded mr-50' src={header_img} alt='Generic placeholder image' style={{ cursor: 'pointer' }} height='100' width='300' />
                                                        <X className="btn-icon btn btn-danger btn-close btn-sm"
                                                           style={{
                                                               position: 'absolute',
                                                               left: 5,
                                                               top: 0,
                                                               marginLeft: 19,
                                                               marginTop: 1

                                                           }}
                                                           onClick={resetHandler2} />
                                                    </Media>
                                                    <Input type="file" id="header_img_file" name="header_img_file" innerRef={imageRef1} onChange={onChangeHeader} hidden accept='image/*' />

                                                </Media>
                                            </div>
                                        </Col>
                                        <Col sm='6' md='6'>
                                            <div>
                                                <Media>
                                                    <Media className='mr-25' left>
                                                        <Media onClick={handlerMediaFooterClick} object className='rounded mr-50' src={footer_img} alt='Generic placeholder image' style={{ cursor: 'pointer' }} height='100' width='300' />
                                                        <X className="btn-icon btn btn-danger btn-close btn-sm"
                                                           style={{
                                                               position: 'absolute',
                                                               left: 5,
                                                               top: 0,
                                                               marginLeft: 19,
                                                               marginTop: 1

                                                           }}
                                                           onClick={resetHandler1} />
                                                    </Media>
                                                    <Input type="file" id="footer_img_file" name="footer_img_file" innerRef={imageRef2} onChange={onChangeFooter} hidden accept='image/*' />

                                                </Media>
                                            </div>
                                        </Col>

                                    </Row>
                                </Col>
                                <Col md={'12'} sm={"12"} className='mt-5'>
                                    <center>
                                        <Button.Ripple className='mr-1' color='primary' type='submit'>
                                            حفظ
                                            <AiOutlineLike style={{ marginRight: '0.5rem' }} size={15} />
                                        </Button.Ripple>

                                        <Button.Ripple outline color='' className='btn btn-warning' onClick={() => {
                                            reset({
                                                employee_id: ''
                                            })
                                        }} >
                                            اعادة التعيين
                                            <RefreshCw style={{ marginRight: '0.5rem' }} size={15} />
                                        </Button.Ripple>
                                    </center>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Form >
    )
}
export default OrgForm