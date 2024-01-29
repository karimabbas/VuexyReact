import { MoreVertical, Edit, Trash } from 'react-feather'
import { Link } from 'react-router-dom'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'


const Scrolling = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

export const EquipmentColumns = (handleDelete) => [

    {
        name: '#',
        selector: (row) => (row?.no),
        sortable: true,
        center: true,
        minWidth: '70px',
        maxWidth: '100px'
    },
    {
        name: 'اسم الجهاز',
        selector: 'name',
        center: true,
        sortable: true,
        minWidth: '30px'
    },
    {
        name: 'اسم المسؤول',
        selector: (row) => (row?.responsible_name?.name ?? ''),
        sortable: true,
        center: true,
        minWidth: '30px'
    },
    {
        name: 'القسم',
        selector: (row) => (row?.department?.name ?? ''),
        sortable: true,
        center: true,
        minWidth: '50px'
    },
    {
        name: 'الماركة',
        selector: (row) => (row?.brand_type?.name ?? ''),
        sortable: true,
        center: true,
        minWidth: '50px'
    },
    {
        name: 'نوع المعدات',
        selector: (row) => (row?.equpment_type?.name ?? ''),
        sortable: true,
        center: true,
        minWidth: '50px'
    },
    {
        name: 'التكلفة الكليه',
        selector: 'price',
        sortable: true,
        center: true,
        minWidth: '30px'
    },
    {
        name: 'الحالة',
        selector: (row) => (row?.equpment_status?.name ?? ''),
        sortable: true,
        center: true,
        minWidth: '50px'
    },
    {
        name: 'العدد',
        selector: 'count',
        sortable: true,
        center: true,
        minWidth: '50px'
    },
    {
        name: 'الحركات',
        allowOverflow: true,
        left: true,
        minWidth: '100px',
        maxWidth:'50px',
        cell: row => {
            return (
                <div className='d-flex'>
                    <UncontrolledDropdown>
                        <DropdownToggle className='pr-1' tag='span'>
                            <MoreVertical size={15} />
                        </DropdownToggle>
                        <DropdownMenu right>

                            <Link to={`/equip/${row.id}`}>
                                <DropdownItem onClick={Scrolling} className='w-100'>
                                    {/* <Edit size={ 15 } /> */}
                                    <Edit size={15} />
                                    <span className='align-middle ml-50'>تعديل</span>
                                </DropdownItem>
                            </Link >

                            <DropdownItem onClick={() => {
                                handleDelete({ id: row.id })
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