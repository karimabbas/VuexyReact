// ** Custom Components
import { useMemo } from 'react'

// ** Third Party Components
import { AiOutlineFilePdf, AiOutlineFileWord } from 'react-icons/ai'
import { RiFileExcel2Line } from 'react-icons/ri'
import api from "../../../@core/util/api"
import { MoreVertical, Edit, FileText, Archive, Trash, Image } from 'react-feather'
import { Link } from 'react-router-dom'
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Col, Row } from 'reactstrap'
import Url from '../../../@core/util/base-url'

const Scrolling = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export const AssetsColumns = (def, handleDeleteDefintion) => [

    {
        name: '#',
        selector: 'no',
        sortable: true,
        center: true,
        width: '70px'
    },
    {
        name: 'الأسم',
        selector: 'name',
        center: true,
        sortable: true,
        minWidth: '80px',
        maxWidth: '150px'
    },
    {
        name: 'اسم المسؤول',
        selector: (row) => (row?.responsible_name?.name ?? ''),
        sortable: true,
        center: true,
        minWidth: '100px',
        maxWidth: '150px'
    },
    {
        name: 'التكلفة الفعلية',
        selector: 'price',
        sortable: true,
        center: true,
        minWidth: '120px'
    },
    {
        name: 'العنوان',
        selector: 'details',
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
                                handleDeleteDefintion(def, { id: row.id })
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