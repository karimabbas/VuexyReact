import {MoreVertical, Edit, Trash} from 'react-feather'
import {Link} from 'react-router-dom'
import {UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'


const Scrolling = () => {
    window.scrollTo({top: 0, behavior: 'smooth'})
}

export const departmentColumns = (handleDelete) => [

    {
        name: '#',
        selector: 'no',
        sortable: true,
        center: true,
        minWidth: '70px',
        maxWidth: '100px'
    },
    {
        name: 'اسم القسم',
        selector: 'name',
        center: true,
        sortable: true,
        minWidth: '200px'
    },
    {
        name: 'رئيس القسم',
        selector: (row) => (row?.manager?.manager_name ?? ''),
        sortable: true,
        center: true,
        minWidth: '300px'
    },
    {
        name: 'مرتبط بـ',
        selector: (row) => (row?.parent_dept?.parentDeptName ?? ''),
        sortable: true,
        center: true,
        minWidth: '200px'
    },
    {
        name: 'الحركات',
        allowOverflow: true,
        minWidth: '50px',
        maxWidth: '100px',
        cell: row => {
            return (
                <div className='d-flex'>
                    <UncontrolledDropdown>
                        <DropdownToggle className='pr-1' tag='span'>
                            <MoreVertical size={15}/>
                        </DropdownToggle>
                        <DropdownMenu right>

                            <Link to={`/show_department/${row.id}`}>
                                <DropdownItem onClick={Scrolling} className='w-100'>
                                    {/* <Edit size={ 15 } /> */}
                                    <Edit size={15}/>
                                    <span className='align-middle ml-50'>تعديل</span>
                                </DropdownItem>
                            </Link>

                            <DropdownItem onClick={() => {
                                handleDelete({id: row.id})
                            }} className='w-100'>
                                <Trash size={15}/>
                                <span className='align-middle ml-50'>حذف</span>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div>
            )
        }
    }
]