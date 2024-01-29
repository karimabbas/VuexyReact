// ** Custom Components
import { useMemo } from 'react'

import api from "../../../@core/util/api"
import { MoreVertical, Edit, FileText, Archive, Trash, Image } from 'react-feather'
import { Link } from 'react-router-dom'
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Col, Row } from 'reactstrap'
import Url from '../../../@core/util/base-url'
// import { handleDeleteDefintion } from '../action/index'

const Scrolling = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

export const CustomerColumns = (def, handleDelete) => [

    {
        name: '#',
        selector: 'no',
        sortable: true,
        center: true,
        width: '70px'
    },
    {
        name: 'اسم الزبون',
        selector: 'name',
        center: true,
        sortable: true,
        minWidth: '300px'
    },
    {
        name: 'رقم الهاتف',
        selector: (row) => {
           return (row.phone_one === null ? row.phone_two : row.phone_one)
        },
        sortable: true,
        center: true,
        minWidth: '100px'
    },
    {
        name: 'رقم الهوية',
        selector: 'national_id',
        sortable: true,
        center: true,
        minWidth: '120px'
    },
    {
        name: 'العنوان',
        selector: (row) => (row?.town?.name ?? ''),
        center: true,
        sortable: true,
        minWidth: '120px'
    },
    {
        name: 'الحركات',
        allowOverflow: true,
        width: '80px',
        cell: row => {
            return (
                <div className='d-flex'>
                    <UncontrolledDropdown>
                        <DropdownToggle className='pr-1' tag='span'>
                            <MoreVertical size={15} />
                        </DropdownToggle>
                        <DropdownMenu right>

                            <Link to={`/add&edit/${def}/${row.id}`}>
                                <DropdownItem onClick={Scrolling} className='w-100'>
                                    {/* <Edit size={ 15 } /> */}
                                    <Edit size={15} />
                                    <span className='align-middle ml-50'>تعديل</span>
                                </DropdownItem>
                            </Link >

                            <DropdownItem onClick={() => {
                                handleDelete(def, {id: row.id})
                            }} className='w-100'>
                                <Trash size={15} />
                                <span className='align-middle ml-50'>حذف</span>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div>
            )
        }
    }
]