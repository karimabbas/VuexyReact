// ** React Import
import { useState } from 'react'

// ** Custom Components
import Sidebar from '@components/sidebar'
import { Lock, Edit, Trash2, User } from 'react-feather'

// ** Utils
import { isObjEmpty, selectThemeColors } from '@utils'

// ** Third Party Components
import classnames from 'classnames'
import Select, { components } from 'react-select'

import { useForm } from 'react-hook-form'
import { Button, FormGroup, Label, FormText, Form, Input, Row, Col, InputGroupAddon, InputGroup, InputGroupText } from 'reactstrap'

// ** Store & Actions
import { addUser } from '../store/action'
import { useDispatch } from 'react-redux'
import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'

const SidebarNewUsers = ({ open, toggleSidebar }) => {
  // ** States
  const [role, setRole] = useState('subscriber')
  const [plan, setPlan] = useState('basic')
  const [picker, setPicker] = useState(new Date())


  // ** Store Vars
  const dispatch = useDispatch()

  // ** Vars
  const { register, errors, handleSubmit } = useForm()

  // ** Function to handle form submit
  const onSubmit = values => {
    if (isObjEmpty(errors)) {
      toggleSidebar()
      dispatch(
        addUser({
          fullName: values.name,
          area: values.area,
          role,
          username: values.username,
          country: values.country,
          contact: values.contact,
          email: values.email,
          currentPlan: plan,
          status: 'active',
          avatar: ''
        })
      )
    }
  }
  const colorOptions = [
    { value: 'الكل', label: 'الكل', color: '#00B8D9', isFixed: true },
    { value: 'الحى الشمالى', label: 'الحى الشمالى', color: '#0052CC', isFixed: true },
    { value: 'الحى الجنوبى', label: 'الحى الجنوبى', color: '#5243AA', isFixed: true },
    { value: 'الحى الغربى', label: 'الحى الغربى', color: '#5243AA', isFixed: true },
    { value: 'الحى الشرقى', label: 'الحى الشرقى', color: '#5243AA', isFixed: true }

  ]

  const firstOptions = [
    { value: 'منزلى', label: 'منزلى', color: '#00B8D9', isFixed: true },
    { value: 'تجارى', label: 'تجارى', color: '#00B8D9', isFixed: true },
    { value: 'صناعى', label: 'صناعى', color: '#00B8D9', isFixed: true },
    { value: 'زراعى', label: 'زراعى', color: '#00B8D9', isFixed: true }
  ]

  const secoundOptions = [
    { value: 'دفع مسبق', label: 'دفع مسبق', color: '#00B8D9', isFixed: true },
    { value: 'فاتورة', label: 'فاتورة', color: '#00B8D9', isFixed: true }
  ]

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col md='3' sm='3'>
          <FormGroup>
            <Label for='nameMulti'>اسم المشترك</Label>
            <Input type='text' name='name' id='nameMulti' placeholder='اسم المشترك'
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['full-name'] })}
             />
          </FormGroup>
        </Col>

        <Col md='2' sm='3'>
          <Label>المنطقة</Label>
          <Select
            isClearable={false}
            theme={selectThemeColors}
            // defaultValue={[colorOptions[2]]}
            isMulti
            name='area'
            options={colorOptions}
            className='react-select'
            classNamePrefix='select'
          />
        </Col>

        <Col sm='2'>
          <FormGroup>
            <Label for='nameMulti'>رقم رخصة البناء</Label>
            <Input type='number' name='name' id='nameMulti' placeholder='رقم رخصة البناء' />
          </FormGroup>
        </Col>

        <Col sm='2'>
          <FormGroup>
            <Label for='nameMulti'>رقم الأشتراك </Label>
            <Input type='number' name='name' id='nameMulti' placeholder='رقم الأشتراك' />
          </FormGroup>
        </Col>
        <Col sm='2'>
          <FormGroup>
            <Label for='nameMulti'>رقم طلب الأشتراك </Label>
            <Input type='number' name='name' id='nameMulti' placeholder='رقم طلب الأشتراك' />
          </FormGroup>
        </Col>

        <Col md='2' sm='3'>
          <Label>نوع الأشتراك</Label>
          <Select
            isClearable={false}
            theme={selectThemeColors}
            // defaultValue={[colorOptions[2]]}
            isMulti
            name='colors'
            options={firstOptions}
            className='react-select'
            classNamePrefix='select'
          />
        </Col>

        <Col sm='2' md='3'>
          <FormGroup>
            <Label for='default-picker'>تاريخ الأشتراك</Label>
            <Flatpickr className='form-control' value={picker} onChange={date => setPicker(date)} id='default-picker' />
          </FormGroup>
        </Col>

        <Col md='2' sm='3'>
          <FormGroup>
            <Label for='nameMulti'>رقم العداد</Label>
            <Input type='text' name='name' id='nameMulti' placeholder='رقم العداد' />
          </FormGroup>
        </Col>

        <Col md='2' sm='3'>
          <FormGroup>
            <Label for='nameMulti'>نوع العداد</Label>
            <Input type='text' name='name' id='nameMulti' placeholder=' نوع العداد' />
          </FormGroup>
        </Col>
        
        <Col md='1' sm='3'>
          <FormGroup>
            <Label for='nameMulti'>قدرة العداد</Label>
            <InputGroup className='input-group-merge mb-2'>
              <InputGroupAddon addonType='prepend'>
                <InputGroupText>FAS</InputGroupText>
              </InputGroupAddon>
              <Input/>
            </InputGroup>
          </FormGroup>
        </Col>

        <Col md='1' sm='3'>
          <FormGroup>
            <Label for='nameMulti'>أمبير</Label>
            <InputGroup className='input-group-merge mb-2'>
              <InputGroupAddon addonType='prepend'>
                <InputGroupText>A</InputGroupText>
              </InputGroupAddon>
              <Input placeholder='Username' 
              defaultValue='32'
              />
            </InputGroup>
          </FormGroup>
        </Col>

        <Col md='2' sm='3'>
          <Label>ألية الدفع</Label>
          <Select
            isClearable={false}
            theme={selectThemeColors}
            // defaultValue={[colorOptions[2]]}
            isMulti
            name='colors'
            options={secoundOptions}
            className='react-select'
            classNamePrefix='select'
          />
        </Col>
        
        <Col sm='1'>
          <FormGroup>
            <Label for='nameMulti'>رقم العامود</Label>
            <Input type='number' name='name' id='nameMulti' placeholder='رقم العامود' />
          </FormGroup>
        </Col>

        <Col sm='2'>
          <FormGroup>
            <Label for='nameMulti'>رقم / اسم المحول</Label>
            <Input type='text' name='name' id='nameMulti' placeholder='رقم / اسم المحول' />
          </FormGroup>
        </Col>

        <Col md='12' sm='12'>
          <FormGroup>
            <Label for='cityMulti'>وصف مكان المشترك</Label>
            <Input type='text' name='city' id='cityMulti' placeholder='وصف مكان المشترك' />
          </FormGroup>
        </Col>

        <Col md='12' sm='12'>
          <FormGroup>
            <Label for='CountryMulti'>ملاحظات</Label>
            <Input type='text' name='country' id='CountryMulti' placeholder='ملاحظات' />
          </FormGroup>
        </Col>
        
        <Col sm='12'>
          <FormGroup className='d-flex mb-0'>
            <Button.Ripple className='mr-1' color='primary' type='submit' onClick={e => e.preventDefault()}>
              اشتراك
            </Button.Ripple>
          </FormGroup>
        </Col>
      </Row>
      
    </Form>

  )
}

export default SidebarNewUsers
