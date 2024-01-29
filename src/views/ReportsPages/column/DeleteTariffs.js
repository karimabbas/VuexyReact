import { MoreVertical, Edit, FileText, Archive, Trash, Plus, Image } from 'react-feather'
import { Link } from 'react-router-dom'
import { Badge, Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Col, Row } from 'reactstrap'
import { restoredef } from '../action/index'
import { FiRefreshCw } from "react-icons/fi"

import moment from 'moment'

const Scrolling = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}
export const DeleteTariffs = (def, handleRestoreDef) => [

    {
        name: '#',
        selector: row => row.rowId,
        sortable: true,
        center: true,
        width: '70px'
    },
    {
        name: 'الموظف',
        selector: row => row?.deleted_by?.nick_name,
        center: true,
        sortable: true,
        minWidth: '80px',
        maxWidth: '150px',
        cell: row => {
            return row?.deleted_by?.nick_name
        }
    },
    {
        name: 'الوقت والتاريخ',
        sortable: true,
        center: true,
        minWidth: '200px',
        maxWidth: '350px',
        cell: row => {
            const date = new Date(row.updated_at)
            const lol = date.toString()
           const a = moment(lol).format('YYYY-MM-DD , HH:mm')
            console.log(a)
            return a
        }
    },
    {
        name: 'الاسم',
        // selector: row => row?.name,
        sortable: true,
        center: true,
        minWidth: '120px',
        cell: row => {
            return row?.name
        }
    },
    {
        name: 'النوع',
        center: true,
        sortable: true,
        minWidth: '120px',
        cell: row => {
            if (row?.url === 'employee') return 'موظف'
            else if (row?.url === 'sparePart') return 'قطع غيار'
            else if (row?.url === 'customers') return 'زبون'
            else if (row?.url === 'subscribers') return 'مواطن'
            else if (row?.url === 'orginzation') return 'مؤسسة'
            else if (row?.url === 'suppliers') return 'مورد'
            else if (row?.url === 'banks') return 'بنك'
            else if (row?.url === 'enginering') return 'مكتب هندسى'
            else if (row?.url === 'space') return 'مكتب مساحة'
            else if (row?.url === 'dev_equp') return 'معدات'
            else if (row?.url === 'vehicles') return 'مركبات'
            else if (row?.url === 'buildings') return 'مبانى'
            else if (row?.url === 'Gardens_lands') return 'حدائق واراضى'
            else if (row?.url === 'warehouses') return 'مستودع'
            else if (row?.url === 'projects') return 'مشروع'
            else if (row?.url === 'department') return 'قسم'

        }
    },
    {
        name: 'استعادة',
        allowOverflow: true,
        width: '80px',
        cell: row => {
            return (
                <div className='d-flex'>

                    <Button.Ripple className='btn-icon mt-1' color='primary'
                        onClick={() => { handleRestoreDef(row.url, { id: row.id }) }}>

                        <FiRefreshCw size={14} />
                    </Button.Ripple>
                </div>
            )
        }
    }
]