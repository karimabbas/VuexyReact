// ** React Imports
import { useState, useContext, useEffect } from 'react'

import { User, Info, Share2 } from 'react-feather'
import { Card, CardBody, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane, Alert, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import Definitions from './index'
import '@styles/react/apps/app-users.scss'
import Department from '../../department/index'
import Vehicle from '../../vehicle/index'
import { useDispatch } from "react-redux"
import { getAllData } from '../store/action/index'
import Equipment from '../../equipment/index'
const DefinistionTabs = (props) => {
    const [activeTab, setActiveTab] = useState('show_employee')
    const dispatch = useDispatch()
    const toggle = tab => setActiveTab(tab)
    const RenderTabs = () => {
        return (
            <>
                <Nav className='wrap-border' pills fill >
                    <NavItem>
                        <NavLink className='py-1' active={activeTab === 'show_employee'} onClick={() => toggle('show_employee')}>
                            <User size={18} />
                            <span className='align-middle d-none d-sm-block'>اضافة موظف</span>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className='py-1' active={activeTab === 'show_department'} onClick={() => toggle('show_department')}>
                            <Info size={18} />
                            <span className='align-middle d-none d-sm-block'>اضافة قسم</span>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className='py-1' active={activeTab === 'show_citizens'} onClick={() => toggle('show_citizens')}>
                            <Share2 size={18} />
                            <span className='align-middle d-none d-sm-block'>اضافة مواطن</span>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className='py-1' active={activeTab === 'show_customer'} onClick={() => toggle('show_customer')}>
                            <Share2 size={18} />
                            <span className='align-middle d-none d-sm-block'>اضافة زبون</span>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className='py-1' active={activeTab === 'show_projects'} onClick={() => toggle('show_projects')}>
                            <Share2 size={18} />
                            <span className='align-middle d-none d-sm-block'>اضافة مشروع</span>
                        </NavLink>
                    </NavItem>
                    <UncontrolledButtonDropdown className='nav-item'>
                        <DropdownToggle nav caret className={`w-100 ${(
                            activeTab === 'show_orginzation' ||
                            activeTab === 'show_suppliers' ||
                            activeTab === 'show_banks' ||
                            activeTab === 'show_enginering' ||
                            activeTab === 'show_space'
                        ) ? 'active' : ''}`}>
                            <Share2 size={18} />
                            <span className='align-middle d-none d-flex justify-content-center'>المؤسسات والمكاتب</span>
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={() => toggle('show_orginzation')} tag='a'>
                                <span className='align-middle d-none d-flex justify-content-center'>اضافة مؤسسة</span>
                            </DropdownItem>
                            <DropdownItem onClick={() => toggle('show_suppliers')} tag='a'>
                                <span className='align-middle d-none d-flex justify-content-center'>اضافة مورد</span>
                            </DropdownItem>
                            <DropdownItem onClick={() => toggle('show_banks')} tag='a'>
                                <span className='align-middle d-none d-flex justify-content-center'>اضافة بنك</span>
                            </DropdownItem>
                            <DropdownItem onClick={() => toggle('show_enginering')} tag='a'>
                                <span className='align-middle d-none d-flex justify-content-center'>اضافة مكتب هندسي</span>
                            </DropdownItem>
                            <DropdownItem onClick={() => toggle('show_space')} tag='a'>
                                <span className='align-middle d-none d-flex justify-content-center'>اضافة مكتب مساحة</span>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledButtonDropdown>
                    <UncontrolledButtonDropdown className='nav-item'>
                        <DropdownToggle nav caret className={`w-100 ${(
                            activeTab === 'equip' ||
                            activeTab === 'vehicle' ||
                            activeTab === 'show_buildings' ||
                            activeTab === 'show_gardens_lands' ||
                            activeTab === 'show_warehouses'
                        ) ? 'active' : ''}`}>
                            <Share2 size={18} />
                            <span className='align-middle d-none d-flex justify-content-center'>الأصول</span>
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={() => toggle('equip')} tag='a'>
                                <span className='align-middle d-none d-flex justify-content-center'>اضافة اجهزة ومعدات</span>
                            </DropdownItem>
                            <DropdownItem onClick={() => toggle('vehicle')} tag='a'>
                                <span className='align-middle d-none d-flex justify-content-center'>اضافة مركبة</span>
                            </DropdownItem>
                            <DropdownItem onClick={() => toggle('show_buildings')} tag='a'>
                                <span className='align-middle d-none d-flex justify-content-center'>اضافة مباني</span>
                            </DropdownItem>
                            <DropdownItem onClick={() => toggle('show_gardens_lands')} tag='a'>
                                <span className='align-middle d-none d-flex justify-content-center'>اضافة حدائق واراضى</span>
                            </DropdownItem>
                            <DropdownItem onClick={() => toggle('show_warehouses')} tag='a'>
                                <span className='align-middle d-none d-flex justify-content-center'>اضافة مستودعات</span>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledButtonDropdown>
                </Nav>
            </>
        )
    }
    const RenderAssetsTabs = () => {
        return (
            <>
                <Nav className='wrap-border' pills fill >
                    <NavItem>
                        <NavLink className='py-1' active={activeTab === 'equip'} onClick={() => toggle('equip')} tag='a'>
                            <span className='align-middle d-none d-sm-block'>اضافة اجهزة ومعدات</span>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className='py-1' active={activeTab === 'vehicle'} onClick={() => toggle('vehicle')} tag='a'>
                            <span className='align-middle d-none d-sm-block'>اضافة مركبة</span>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className='py-1' active={activeTab === 'show_buildings'} onClick={() => toggle('show_buildings')} tag='a'>
                            <span className='align-middle d-none d-sm-block'>اضافة مباني</span>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className='py-1' active={activeTab === 'show_gardens_lands'} onClick={() => toggle('show_gardens_lands')} tag='a'>
                            <span className='align-middle d-none d-sm-block'>اضافة حدائق واراضى</span>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className='py-1' active={activeTab === 'show_warehouses'} onClick={() => toggle('show_warehouses')} tag='a'>
                            <span className='align-middle d-none d-sm-block'>اضافة مستودعات</span>
                        </NavLink>
                    </NavItem>
                </Nav>
            </>
        )
    }
    useEffect(() => {
        const type = props.type
        console.log(type)
        if (type === 'proj_archieve') {
            toggle('show_projects')
        } else if (type === 'assets_archieve') {
            toggle('equip')
        } else if (type === 'emp_archieve') {
            toggle('show_employee')
        } else if (type === 'cit_archieve') {
            // toggle('show_citizens')
            toggle('show_customer')
        } else if (type === 'dep_archieve') {
            toggle('show_department')
        } else if (type === 'trade_archive') {
            toggle('show_customer')
        } else if (type === 'lic_archieve') {
            toggle('show_customer')
        } else if (type === 'vehicle') {
            toggle('vehicle')
        }
    }, [props.type])
    const RenderDefinitions = () => {
        const type = props.type
        if (type === 'out_archieve' || type === 'in_archieve' || type === 'finance_archive' || type === 'law_archieve') {
            return <RenderTabs />
        } else if (type === 'proj_archieve') {
            return <></>
        } else if (type === 'assets_archieve') {
            return <RenderAssetsTabs />
        } else if (type === 'emp_archieve') {
            return <></>
        } else if (type === 'cit_archieve') {
            return <></>
        } else if (type === 'dep_archieve') {
            return <></>
        } else if (type === 'trade_archive') {
            return <></>
        } else if (type === 'mun_archieve') {
            return <></>
        } else if (type === 'lic_archieve') {
            return <></>
        } else if (type === 'vehicle') {
            return <></>
        }
        return <RenderTabs />
    }
    const refresh = () => {
        dispatch(getAllData(props.type))
    }
    return (
        <Row className='app-user-edit'>
            <Col sm='12'>
                <RenderDefinitions />
                {activeTab !== 'show_department' && activeTab !== 'vehicle' && activeTab !== 'equip' && (
                    <Definitions def={activeTab} refresh={refresh} />
                )}
                {activeTab === 'show_department' && <Department refresh={refresh} outPage={true} />}
                {activeTab === 'vehicle' && <Vehicle refresh={refresh} outPage={true} />}
                {activeTab === 'equip' && <Equipment refresh={refresh} outPage={true} />}
            </Col>
        </Row>
    )
}

export default DefinistionTabs