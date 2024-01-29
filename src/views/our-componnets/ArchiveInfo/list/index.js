// ** Custom Components
import { React, useMemo } from 'react'

// ** Third Party Components

import { Link } from 'react-router-dom'
import { renderFilePreview } from '../../../archive/list/attachment'

import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Col, Row } from 'reactstrap'
import Url from '../../../../@core/util/base-url'
import { getTypeAr } from '../ArchiveTypeAr'
const Scrolling = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
const fileList = (files, type = '') => {
  return <Row className='w-100'>
    {
      files?.map((file, index) => (
        <div key={`${file.real_name.slice(0, 10)}-${index}`} /*style={{ padding: '0.5rem 1rem' }}*/ className='d-flex align-items-center justify-content-between border-0 col-md-6'>
          <a href={`${Url.BASE_URL}${file.url}`} target='_blank' style={{width:'100%'}}>

            <div className='file-details d-flex align-items-center' style={{
              height: '29px',
              width: '100%',
              color: 'black',
              border: '1px solid #cacfe7',
              backgroundColor: '#ECEFF1',
              borderRadius: '3px',
              marginBottom: '5px'
            }}>
              <div className='file-preview mr-1'>{renderFilePreview(file)}</div>
              <div>
                { (type === 'mun_archieve') && <span className='file-name mb-0'>{file.real_name.slice(0, 20)}</span>}
                { (type !== 'mun_archieve') && <span className='file-name mb-0'>{file.real_name.slice(0, 10)}</span>}
              </div>
            </div>
          </a>

        </div>
      ))
    }
  </Row>
}
const getColumns = (type) => {
  if (type === 'law_archieve') {
    return [
      {
        name: '#',
        selector: row => row.rowId,
        sortable: true,
        center: true,
        width: '70px'
      },
      {
        name: 'التاريخ',
        selector: 'date',
        sortable: true,
        center: true,
        width: '130px'
        // maxWidth: '150px'
      },
      {
        name: 'النوع',
        selector: row => row?.archive_type?.name,
        center: true,
        sortable: true,
        minWidth: '80px',
        maxWidth: '150px'
      },
      {
        name: 'العنوان',
        selector: 'title',
        sortable: true,
        center: true,
        minWidth: '120px'
      },
      {
        name: 'الملاحظات',
        selector: 'serisal',
        center: true,
        sortable: true,
        minWidth: '180px'
      },
      {
        name: 'المرفقات',
        selector: 'salary',
        sortable: true,
        minWidth: '120px',
        className: 'row w-100',
        style: { width: '100%' },
        center: true,
        cell: row => {
          return (
            <>{fileList(row.files)}</>
          )
        }
      }
    ]
  } else if (type === 'out_archieve' || type === 'in_archieve') {
    return [
      {
        name: '#',
        selector: row => row.rowId,
        sortable: true,
        center: true,
        width: '70px'
      },
      {
        name: 'رقم الارشيف',
        selector: 'serisal',
        center: true,
        sortable: true,
        minWidth: '80px',
        maxWidth: '120px'
      },
      {
        name: 'تاريخ الارسال',
        selector: 'date',
        sortable: true,
        center: true,
        minWidth: '100px',
        maxWidth: '120px'
      },
      {
        name: 'عنوان المراسلة',
        selector: 'title',
        sortable: true,
        center: true,
        minWidth: '120px'
      },
      {
        name: 'نسخة الى',
        selector: 'copyToNames',
        sortable: true,
        center: true,
        minWidth: '120px',
        maxWidth: '250px',
        cell: row => {
          return <div className=''>
            {
              row?.copyToNames
            }
          </div>
        }
      },
      {
        name: 'أنشئ بواسطة',
        selector: row => row?.admin?.nick_name,
        sortable: true,
        center: true,
        minWidth: '110px',
        maxWidth: '200px'
      },
      {
        name: 'المرفقات',
        selector: 'salary',
        sortable: true,
        minWidth: '200px',
        className: 'row w-100',
        style: { width: '100%' },
        center: true,
        cell: row => {
          return (
            <>{fileList(row.files)}</>
          )
        }
      }
    ]
  } else if (type === 'finance_archive') {
    return [
      {
        name: '#',
        selector: row => row.rowId,
        sortable: true,
        center: true,
        width: '70px'
      },
      {
        name: 'التاريخ',
        selector: 'date',
        sortable: true,
        center: true,
        minWidth: '130px'
      },
      {
        name: 'نوع المعاملة',
        selector: row => row?.archive_type?.name,
        center: true,
        sortable: true,
        width: '120px',
        maxWidth: '150px'
      },
      {
        name: 'ملاحظات',
        selector: 'title',
        sortable: true,
        center: true,
        minWidth: '120px'
      },
      {
        name: 'أنشئ بواسطة',
        selector: row => row?.admin?.nick_name,
        sortable: true,
        center: true,
        minWidth: '120px'
      },
      {
        name: 'المرفقات',
        selector: 'salary',
        sortable: true,
        minWidth: '120px',
        className: 'row w-100',
        style: { width: '100%' },
        center: true,
        cell: row => {
          return (
            <>{fileList(row.files)}</>
          )
        }
      }
    ]
  } else if (type === 'copy_to') {
    return [
      {
        name: '#',
        selector: row => row.rowId,
        sortable: true,
        center: true,
        minWidth: '10px',
        maxWidth: '70px'
      },
      {
        name: 'رقم الارشيف',
        selector: row => row?.archive?.serisal,
        center: true,
        sortable: true,
        minWidth: '80px',
        maxWidth: '110px'
      },
      {
        name: 'العنوان',
        selector: row => row?.archive?.title,
        center: true,
        sortable: true,
        minWidth: '80px'
      },
      {
        name: 'النوع',
        selector: row => row?.archive?.type,
        center: true,
        sortable: true,
        minWidth: '80px',
        maxWidth: '100px',
        cell: row => {
          return (
            getTypeAr(row?.archive?.type)

          )
        }
      },
      {
        name: 'الوثيقة الاصلية مرتبطة ب',
        selector: row => row?.archive?.name,
        center: true,
        sortable: true,
        minWidth: '120px',
        maxWidth: '250px'
      },
      {
        name: 'التاريخ',
        selector: row => row?.archive?.date,
        sortable: true,
        center: true,
        minWidth: '100px',
        maxWidth: '100px'
      },
      {
        name: 'أنشئ بواسطة',
        selector: row => row?.archive?.admin?.nick_name,
        sortable: true,
        center: true,
        minWidth: '110px',
        maxWidth: '150px'
      },
      {
        name: 'المرفقات',
        selector: 'salary',
        sortable: true,
        minWidth: '200px',
        className: 'row w-100',
        style: { width: '100%' },
        center: true,
        cell: row => {
          return (
            <>{fileList(row?.archive?.files)}</>
          )
        }
      }
    ]
  } else if (type === 'model_docs') {
    return [
      {
        name: '#',
        selector: row => row.rowId,
        sortable: true,
        center: true,
        width: '70px'
      },
      {
        name: 'التاريخ',
        selector: 'date',
        sortable: true,
        center: true,
        minWidth: '100px',
        maxWidth: '150px'
      },
      {
        name: 'العنوان',
        selector: 'title',
        center: false,
        sortable: true,
        minWidth: '80px'
      },
      {
        name: 'النوع',
        selector: row => row?.type,
        center: true,
        sortable: true,
        minWidth: '80px',
        maxWidth: '180px',
        cell: row => {
          return (
            getTypeAr(row?.type)

          )
        }
      },
      {
        name: 'نوع الوثيقة',
        selector: row => row?.archive_type?.name,
        center: true,
        sortable: true,
        width: '120px',
        maxWidth: '150px'
      },
      {
        name: 'أنشئ بواسطة',
        selector: row => row?.admin?.nick_name,
        sortable: true,
        center: true,
        minWidth: '120px'
      },
      {
        name: 'المرفقات',
        selector: 'salary',
        sortable: true,
        minWidth: '120px',
        className: 'row w-100',
        style: { width: '100%' },
        center: true,
        cell: row => {
          return (
            <>{fileList(row.files)}</>
          )
        }
      }
    ]
  } else if (type === 'proj_archive') {
    return [
      {
        name: '#',
        selector: row => row.rowId,
        sortable: true,
        center: true,
        width: '70px'
      },
      {
        name: 'الرقم',
        selector: 'serisal',
        center: true,
        sortable: true,
        minWidth: '80px',
        maxWidth: '150px'
      },
      {
        name: 'التاريخ',
        selector: 'date',
        sortable: true,
        center: true,
        width: '130px'
      },
      {
        name: 'النوع',
        selector: row => row?.archive_type?.name,
        center: true,
        sortable: true,
        minWidth: '80px',
        maxWidth: '150px'
      },
      {
        name: 'عنوان المراسلة',
        selector: 'title',
        sortable: true,
        center: true,
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
        minWidth: '120px',
        className: 'row w-100',
        style: { width: '100%' },
        center: true,
        cell: row => {
          return (
            <>{fileList(row.files)}</>
          )
        }
      }
    ]
  } else if (type === 'assets_archive') {
    return [
      {
        name: '#',
        selector: row => row.rowId,
        sortable: true,
        center: true,
        width: '70px'
      },
      {
        name: 'الرقم',
        selector: 'serisal',
        center: true,
        sortable: true,
        minWidth: '80px',
        maxWidth: '150px'
      },
      {
        name: 'التاريخ',
        selector: 'date',
        sortable: true,
        center: true,
        width: '130px'
      },
      {
        name: 'النوع',
        selector: row => row?.archive_type?.name,
        center: true,
        sortable: true,
        minWidth: '80px',
        maxWidth: '150px'
      },
      {
        name: 'عنوان المراسلة',
        selector: 'title',
        sortable: true,
        center: true,
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
        minWidth: '120px',
        className: 'row w-100',
        style: { width: '100%' },
        center: true,
        cell: row => {
          return (
            <>{fileList(row.files)}</>
          )
        }
      }
    ]
  } else if (type === 'trade_archive') {
    return [
      {
        name: '#',
        selector: row => row.rowId,
        sortable: true,
        center: true,
        width: '70px'
      },
      {
        name: 'رقم المعاملة',
        selector: 'trade_no',
        center: true,
        sortable: true,
        minWidth: '100px',
        maxWidth: '210px'
      },
      {
        name: 'التاريخ',
        selector: 'date',
        sortable: true,
        center: true,
        width: '130px'
      },
      {
        name: 'نوع المعاملة',
        selector: row => row?.archive_type?.name,
        sortable: true,
        center: true,
        minWidth: '130px'
      },
      {
        name: 'المستفيد',
        selector: row => row?.name,
        center: true,
        sortable: true,
        minWidth: '120px'
      },
      {
        name: 'اسم المركبة',
        selector: 'vehicle_name',
        sortable: true,
        center: true,
        minWidth: '120px'
      },
      {
        name: 'رقم الشصي',
        selector: 'vehicle_no',
        sortable: true,
        center: true,
        minWidth: '120px'
      },
      {
        name: 'مكان وجود الوثيقة',
        selector: 'document_place',
        sortable: true,
        center: true,
        minWidth: '120px'
      },
      {
        name: 'المرفقات',
        selector: 'salary',
        sortable: true,
        minWidth: '120px',
        className: 'row w-100',
        style: { width: '100%' },
        center: true,
        cell: row => {
          return (
            <>{fileList(row.files)}</>
          )
        }
      }
    ]
  } else if (type === 'mun_archieve') {
    return [
      {
        name: '#',
        selector: row => row.rowId,
        sortable: true,
        center: true,
        width: '70px'
      },
      {
        name: 'رقم الارشيف',
        selector: 'serisal',
        center: true,
        sortable: true,
        minWidth: '80px',
        maxWidth: '150px'
      },
      {
        name: 'التاريخ',
        selector: 'date',
        sortable: true,
        center: true,
        minWidth: '100px',
        maxWidth: '150px'
      },
      {
        name: 'العنوان',
        selector: 'title',
        sortable: true,
        center: true,
        minWidth: '120px'
      },
      {
        name: 'النوع',
        selector: row => row?.archive_type?.name,
        center: true,
        sortable: true,
        minWidth: '80px',
        maxWidth: '150px'
      },
      {
        name: 'المرفقات',
        selector: 'salary',
        sortable: true,
        minWidth: '120px',
        className: 'row w-100',
        style: { width: '100%' },
        center: true,
        cell: row => {
          return (
            <>{fileList(row.files, type)}</>
          )
        }
      }
    ]
  }
  return [
    {
      name: '#',
      selector: row => row.rowId,
      sortable: true,
      center: true,
      width: '70px'
    },
    {
      name: 'رقم الارشيف',
      selector: 'serisal',
      center: true,
      sortable: true,
      minWidth: '80px',
      maxWidth: '120px'
    },
    {
      name: 'التاريخ',
      selector: 'date',
      sortable: true,
      center: true,
      minWidth: '100px',
      maxWidth: '120px'
    },
    {
      name: 'عنوان الاتفاقية',
      selector: 'title',
      sortable: true,
      center: true,
      minWidth: '120px'
    },
    {
      name: 'نسخة الى',
      selector: 'copyToNames',
      sortable: true,
      center: true,
      minWidth: '120px',
      maxWidth: '200px',
      cell: row => {
        return <div className=''>
          {
            row?.copyToNames
          }
        </div>
      }
    },
    {
      name: 'أنشئ بواسطة',
      selector: row => row?.admin?.nick_name,
      sortable: true,
      center: true,
      minWidth: '120px',
      maxWidth: '200px'
    },
    {
      name: 'المرفقات',
      selector: 'salary',
      sortable: true,
      minWidth: '200px',
      className: 'row w-100',
      style: { width: '100%' },
      center: true,
      cell: row => {
        return (
          <>{fileList(row.files)}</>
        )
      }
    }
  ]
}
export const ArchiveColumns = (type) => (getColumns(type))

