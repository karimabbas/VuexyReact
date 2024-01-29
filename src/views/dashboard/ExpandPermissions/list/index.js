// ** Custom Components
import { React, useMemo } from 'react'

// ** Third Party Components
import { AiOutlineFilePdf, AiOutlineFileWord } from 'react-icons/ai'
import { RiFileExcel2Line } from 'react-icons/ri'

import { MoreVertical, Edit, FileText, Archive, Trash, Image, Printer, Check, X } from 'react-feather'
import { Link } from 'react-router-dom'
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Col, Row, CustomInput } from 'reactstrap'
import Url from '../../../../@core/util/base-url'
const Scrolling = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
const Label = () => (
  <>
    <span className='switch-icon-left' style={{ top: '-2px' }}>
      <Check size={14} />
    </span>
    <span className='switch-icon-right' style={{ top: '-2px' }}>
      <X size={14} />
    </span>
  </>
)
export const columns = (handleSwitch) => {
  return [
    {
      name: '#',
      selector: row => row.id,
      sortable: true,
      center: true,
      width: '70px'
    },
    {
      name: 'الصلاحية',
      selector: 'title',
      // center: true,
      sortable: true,
      cell: row => (
        <div className='text-left text-break w-100'>
          <span>{row.title}</span>
        </div>
      )
      // minWidth: '80px'
    },
    {
      name: 'الحالة',
      selector: 'enabled',
      sortable: true,
      cell: row => (
        <div className='text-left text-break w-100'>
          {/* <span>{ row.enabled ? 'true' : 'false' }</span> */}
          <CustomInput
            type='switch'
            label={<Label />}
            className='custom-control-success'
            id={row.name}
            name={row.name}
            inline
            defaultChecked={row.enabled}
            onChange={(e) => {
              const obj = { ...row, enabled: e.target.checked }
              handleSwitch(obj)
            }}
          />
        </div>
      )
      // minWidth: '80px'
    }
  ]
}

