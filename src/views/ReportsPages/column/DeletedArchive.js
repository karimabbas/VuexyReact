// ** Custom Components
import { React, useMemo } from 'react'
import moment from 'moment'

// ** Third Party Components
import { AiOutlineFilePdf, AiOutlineFileWord } from 'react-icons/ai'
import { RiFileExcel2Line } from 'react-icons/ri'

import { MoreVertical, Edit, FileText, Archive, Trash, Image } from 'react-feather'
import { Link } from 'react-router-dom'
import { Badge, Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Col, Row } from 'reactstrap'
import Url from '../../../@core/util/base-url'
import { FiRefreshCw } from "react-icons/fi"

// import { handleRestoreArchive } from '../action'
// import { handleDeleteArchive } from '../store/action/index'

const Scrolling = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
const checkImage = (extension) => {
  return extension.includes('image') ||
    extension.includes('png') ||
    extension.includes('jpg') ||
    extension.includes('jpeg')
}
const renderFilePreview = file => {
  if (checkImage(file.extension)) {
    // return <img className='rounded' alt={ 'file' } src={ `${Url.BASE_URL}${file.url}` } height='28' width='28' />
    return <Image size='28' />

  } else if (file.extension.includes('pdf')) {
    return <AiOutlineFilePdf size='28' />
  } else if (file.extension.includes('doc')) {
    return <AiOutlineFileWord size='28' />
  } else if (file.extension.includes('xls')) {
    return <RiFileExcel2Line size='28' />
  } else {
    return <FileText size='28' />
  }
}
const fileList = files => {
  return <Row className='w-100'>
    {
      files?.map((file, index) => (
        <div key={`${file.real_name.slice(0, 10)}-${index}`} style={{ padding: '0.5rem 1rem' }} className='d-flex align-items-center justify-content-between border-0 col-md-6'>
          <a href={`${Url.BASE_URL}${file.url}`} target='_blank'>

            <div className='file-details d-flex align-items-center'>
              <div className='file-preview mr-1'>{renderFilePreview(file)}</div>
              <div>
                <span className='file-name mb-0'>{file.real_name.slice(0, 20)}</span>
              </div>
            </div>
          </a>

        </div>
      ))
    }
  </Row>
}

export const DeletedArchive = (def, handleRestoreArchive) => [
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
    maxWidth: '150px'
  },
  {
    name: 'الوقت والتاريخ',
    // selector: 'date',
    sortable: true,
    center: true,
    minWidth: '140px',
    maxWidth: '160px',
    cell: row => {
      const date = moment(row.updated_at).format("YYYY-MM-DD , HH:mm")
      return date
    }
  },
  {
    name: 'العنوان',
    selector: 'title',
    sortable: true,
    center: true,
    minWidth: '120px'
  },
  {
    name: 'نوع الارشيف',
    selector: 'type',
    sortable: true,
    center: true,
    minWidth: '120px',
    cell: row => {
      if (row.type === 'outArchive') return 'أرشيف الصادر'
      else if (row.type === 'inArchive') return 'أرشيف الوارد'
      else if (row.type === 'projArchive') return 'أرشيف المشاريع'
      else if (row.type === 'assetsArchive') return 'أرشيف الأصول'
      else if (row.type === 'empArchive') return 'أرشيف الموظفين'
      else if (row.type === 'citArchive') return 'أرشيف الزبائن'
    }
  },
  {
    name: 'مرتبط ب',
    selector: 'name',
    center: true,
    sortable: true,
    minWidth: '120px'
  },
  {
    name: 'نسخة الى',
    selector: 'copyToNames',
    sortable: true,
    center: true,
    minWidth: '120px',
    cell: row => {
      return <div className=''>
        {
          row?.copyToNames
        }
      </div>
    }
  },
  {
    name: 'المرفقات',
    selector: 'salary',
    sortable: true,
    minWidth: '350px',
    className: 'row w-200',
    style: { width: '100%' },
    // center: true,
    cell: row => {
      return (
        <>{fileList(row.files)}</>
      )
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
            onClick={() => { handleRestoreArchive({ id: row.id }) }}>

            <FiRefreshCw size={14} />
          </Button.Ripple>
        </div>
      )
    }
  }
]

