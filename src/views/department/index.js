import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Col,
    Form, FormFeedback,
    FormGroup, Input,
    InputGroup,
    InputGroupAddon, InputGroupText,
    Label, Modal,
    Row, Spinner
} from "reactstrap"
import { Edit2 } from "react-feather"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Select from "react-select"
import { useState, useEffect, useContext } from "react"
import { selectThemeColors } from '@utils'
import makeAnimated from "react-select/animated"
import QuickReportIcons from "../our-componnets/QuickReportIcons"
import DataTableArchive from "../our-componnets/DataTableArchive"
import { useDispatch, useSelector } from "react-redux"
import { deleteDepartment, getAllDepartmentData, storeDepartment } from "./store/action"
import AutoCompleteInput from "../our-componnets/AutoCompleteInput"
import { useHistory, useParams } from "react-router-dom"
import SelectWIthAddNew from "../our-componnets/SelectWIthAddNew"
import DepartmentEmployeeDataTable from "../our-componnets/DepartmentEmployeeDataTable"
import withReactContent from "sweetalert2-react-content"
import Swal from "sweetalert2"
import { departmentEmployeesColumn } from "./list/departmentEmployeesColumn"
import { AbilityContext } from '@src/utility/context/Can'

const Department = (props) => {
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [parentDepartmentSetter, setParentDepartmentSetter] = useState({
        id: 0,
        name: '',
        model: '',
        value: '',
        label: ''
    })
    const [manager, setManager] = useState({ id: 0, name: '', value: '', label: '' })
    const [departmentEmployees, setDepartmentEmployees] = useState([])
    const [modelData, setModelData] = useState({ model_id: 0, model: '' })
    const [allowedEmp, setAllowedEmp] = useState([])
    const ability = useContext(AbilityContext)

    const SignupSchema = yup.object().shape({
        departmentName: yup.string().min(3).required()
    })
    const { register, errors, handleSubmit, setValue, reset } = useForm({
        mode: 'onChange',
        resolver: yupResolver(SignupSchema)
    })

    const { deptId } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const departmentStore = useSelector(state => state.Departments)

    const refresh = () => {
        if (!props.outPage) {
            history.push(`/show_department`)
        }
        setAllowedEmp([])
        setIsSubmitted(prev => !prev)
    }

    const resetHandler = () => {
        setParentDepartmentSetter({ id: 0, name: '', model: '', value: '', label: '' })
        setManager({ id: 0, name: '', value: '', label: '' })
        reset({
            id: ''
        })
    }

    const handleDeleteDepartment = async (id) => {
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
                dispatch(deleteDepartment(id))
                MySwal.fire({
                    icon: 'success',
                    title: 'تم !',
                    text: 'تم حذف القسم.',
                    customClass: {
                        confirmButton: 'btn btn-success'
                    }
                })
            }
        })
    }

    const getObject = (data) => {
        console.log(data)
        setAllowedEmp((data?.allowed_emp ?? []))
        if (data?.manager !== null) {
            setManager(data?.manager)
        }
        if (data?.parent_dept !== null) {
            setParentDepartmentSetter(data?.parent_dept)
        }
        return {
            id: data?.id,
            departmentName: data?.name,
            LinkDept: data?.department_id,
            deptManager: data?.admin_id,
            notes: data?.notes
        }
    }

    useEffect(() => {
        if (deptId) {
            resetHandler()
            setDepartmentEmployees([])
            const id = +deptId
            dispatch({
                type: 'GetDepartment',
                id
            })
        }
    }, [deptId])
    useEffect(() => {
        const data = getObject(departmentStore?.selectedDept[0])
        setDepartmentEmployees((departmentStore?.selectedDept[0]?.dept_employees ?? []))
        reset(data)
    }, [departmentStore.selectedDept])

    useEffect(() => {
        resetHandler()
        setDepartmentEmployees([])
    }, [isSubmitted])

    useEffect(() => {
        refresh()
        dispatch(getAllDepartmentData(handleDeleteDepartment, deptId))
        setDepartmentEmployees([])
    }, [])
    const animatedComponents = makeAnimated()

    const handleSelectEmployeeChange = employee => {
        setAllowedEmp(employee)
    }
    const onSubmit = async (data) => {
        data = { ...data, allowedEmp }
        const state = dispatch(storeDepartment(data))
        if (state) {
            if (props.outPage) {
                setTimeout(() => {
                    props.refresh()
                }, 2000)
            }
            console.log('lol')
            refresh()
        } else {
            console.log('a')
        }
    }

    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row className={'match-height'}>
                    <Col md={"6"} sm={"12"}>
                        <Card>
                            <CardHeader>
                                <CardTitle tag='h4' className='custom-title'>
                                    <img src={'https://db.expand.ps/images/487574_32.png'} alt='user-avatar'
                                        className='img-fluid rounded' height='40' width='40' />
                                    معلومات القسم
                                </CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col sm={'12'} md={'12'}>
                                        <Row>
                                            <Col sm={"12"} md={"6"}>
                                                <FormGroup>
                                                    <Label for='departmentName'>اسم القسم</Label>
                                                    <Input
                                                        id='id'
                                                        name='id'
                                                        type='hidden'
                                                        innerRef={register()}
                                                    />
                                                    <AutoCompleteInput apiUrl='deptInfoForSelect'
                                                        placeholder={'اسم القسم'}
                                                        onSelect={(name) => {
                                                            if (props.outPage) {
                                                                const id = +name?.id
                                                                dispatch({
                                                                    type: 'GetDepartment',
                                                                    id
                                                                })
                                                            } else {
                                                                history.push(`/show_department/${name?.id ?? ''}`)
                                                            }
                                                        }}
                                                        id='departmentName'
                                                        name='departmentName'
                                                        register={register}
                                                        errors={errors.departmentName}
                                                    />
                                                    {errors && errors.departmentName &&
                                                        <FormFeedback>{errors.departmentName.message}</FormFeedback>}
                                                </FormGroup>
                                            </Col>
                                            <Col sm={"12"} md={"6"}>
                                                <FormGroup>
                                                    <Label for='deptManager'>رئيس القسم</Label>
                                                    <Input
                                                        id='deptManager'
                                                        name='deptManager'
                                                        type='hidden'
                                                        innerRef={register()}
                                                    />
                                                    <div className='invoice-customer'>
                                                        <SelectWIthAddNew apiUrl='emp_auto_complete'
                                                            modelId={null}
                                                            id={'deptManager'}
                                                            name={'deptManager'}
                                                            optionList={departmentStore?.employees}
                                                            deptDefult={manager}
                                                            onSelect={(value) => {
                                                                setValue('deptManager', value.id)
                                                            }} />
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col sm={'12'} md={'12'}>
                                        <Row>
                                            <Col sm={"12"} md={"6"}>
                                                <FormGroup>
                                                    <Label for='LinkDept'>مرتبط ب</Label>
                                                    <Input
                                                        id='LinkDept'
                                                        name='LinkDept'
                                                        type='hidden'
                                                        innerRef={register()}
                                                    />
                                                    <div className='invoice-customer'>
                                                        <SelectWIthAddNew apiUrl='deptInfoForSelect'
                                                            modelId={null}
                                                            id={'LinkDept'}
                                                            name={'LinkDept'}
                                                            optionList={departmentStore?.data}
                                                            deptDefult={parentDepartmentSetter}
                                                            onSelect={(value) => {
                                                                setValue('LinkDept', value.id)
                                                            }} />
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                            <Col sm={"12"} md={"6"}>
                                                <FormGroup>
                                                    <Label for='allowedEmp'>الصلاحية على ارشيف القسم</Label>
                                                    <Select
                                                        isClearable={false}
                                                        theme={selectThemeColors}
                                                        closeMenuOnSelect={false}
                                                        components={animatedComponents}
                                                        value={allowedEmp}
                                                        isMulti
                                                        options={(departmentStore?.employees ?? [])}
                                                        className='react-select'
                                                        classNamePrefix='select'
                                                        onChange={handleSelectEmployeeChange}
                                                        noOptionsMessage={() => 'لا يوجد بيانات !'}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        {/*<Row>*/}
                                        {/*    <Col sm={"12"} md={"12"}>*/}
                                        {/*        <Row>*/}
                                        {/*            <Col sm={'12'} md={'12'} style={{marginTop: '20px'}}>*/}
                                        {/*                <h4>*/}
                                        {/*                    <img*/}
                                        {/*                        src={'https://db.expand.ps/images/personal-information.png'}*/}
                                        {/*                        alt='user-avatar'*/}
                                        {/*                        className='img-fluid rounded' height='40' width='40'/>*/}
                                        {/*                    موظفي القسم*/}
                                        {/*                </h4>*/}
                                        {/*                <hr/>*/}
                                        {/*            </Col>*/}
                                        {/*        </Row>*/}
                                        {/*    </Col>*/}
                                        {/*</Row>*/}
                                        <Row>
                                            <Col sm={"12"} md={"12"}>
                                                <DepartmentEmployeeDataTable columns={departmentEmployeesColumn}
                                                    data={departmentEmployees} />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={"6"} sm={"12"}>
                        <Card>
                            <CardHeader>
                                <CardTitle tag='h4' className='custom-title'>
                                    <img src={'https://db.expand.ps/images/t8521_32.png'} alt='user-avatar'
                                        className='img-fluid rounded' height='40' width='40' />
                                    معلومات مهام القسم
                                </CardTitle>
                            </CardHeader>
                            <CardBody>
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
                                {ability.can('read', 'depart_archives') && <Row>
                                    <Col sm={"12"} md={"12"}>
                                        <Row>
                                            <Col sm={'12'} md={'12'} style={{ marginTop: '20px' }}>
                                                <h4>
                                                    <img src={'https://t.palexpand.ps/assets/images/ico/msg.png'}
                                                        alt='user-avatar'
                                                        className='img-fluid rounded' height='40' width='40' />
                                                    الارشيف
                                                </h4>
                                                <hr />
                                            </Col>

                                            <QuickReportIcons type={'show_department'} modelData={modelData}
                                                citizenIconController={{ archive: true }}></QuickReportIcons>
                                        </Row>
                                    </Col>
                                </Row>}
                                {ability.can('read', 'edit_model') && <Row>
                                    <Col md={'12'} sm={"12"}>
                                        <center>
                                            <Button.Ripple className='mr-1' color='primary' type='submit'>
                                                حفظ
                                            </Button.Ripple>
                                            <Button.Ripple outline color='secondary' type='reset'>
                                                اعادة التعيين
                                            </Button.Ripple>
                                        </center>
                                    </Col>
                                </Row>}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Form>
            {!props.outPage && (
                <Row>
                    <Col sm={"12"}>
                        <Col sm={"12"}>
                            <DataTableArchive title={departmentStore?.config?.dataTableTitle} data={departmentStore?.data}
                                columns={departmentStore?.columns}
                            />
                        </Col>
                    </Col>
                </Row>
            )}
            {departmentStore.loading ? (
                <Modal isOpen={departmentStore.loading} className='modal-dialog-centered custom-spinner-modal'>
                    <div className='w-100 h-100 p-0 m-0 b-transparent'>
                        <Spinner color='primary custom-spinner-loading' />
                    </div>
                </Modal>
            ) : null}
        </>
    )
}

export default Department