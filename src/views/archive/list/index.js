// ** Custom Components
import { React, useMemo } from 'react'

// ** Third Party Components
import { renderFilePreview } from './attachment'

import { MoreVertical, Edit, FileText, Archive, Trash, Image, Printer } from 'react-feather'
import { Link } from 'react-router-dom'
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Col, Row } from 'reactstrap'
import Url from '../../../@core/util/base-url'
// import { handleDeleteArchive } from '../store/action/index'

const Scrolling = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
const fileList = files => {
  return <Row className='w-100 d-flex align-items-center justify-content-between'>
    {
      files?.map((file, index) => (
        <div key={`${file.real_name.slice(0, 10)}-${index}`} style={{ padding: '.2rem' }} className='d-flex align-items-center justify-content-end border-0 col-md-6'>
          <a href={`${Url.BASE_URL}${file.url}`} target='_blank'>
            <div className='file-details d-flex align-items-center'>
              <div className='file-preview d-flex justify-content-center'>
                <span className='file-name mb-0'>
                  <span style={{ fontSize: '15px' }}>
                    {file.real_name.slice(0, 10)}
                  </span>
                  <span style={{ marginRight: '3px' }}>
                    {renderFilePreview(file)}
                  </span>
                </span>

              </div>
            </div>
          </a>

        </div>
      ))
    }
  </Row>
}
const getColumns = (type, handleDeleteArchive, permissions, handleShowModal) => {
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
        minWidth: '120px',
        maxWidth: '250px'
      },
      {
        name: 'مرتبط ب',
        selector: row => row.name,
        center: true,
        sortable: true,
        minWidth: '120px',
        cell: row => {
          const obj = {
            type: row?.model_name,
            modelData: {
              model_id: row?.model_id,
              model: row?.model_name,
              name: row?.name
            }
          }
          return <a style={{ cursor: 'pointer', color: '#7367f0' }} onClick={() => { handleShowModal(obj) }}>{row?.name}</a>
        }
      },
      // {
      //   name: 'نسخة الى',
      //   selector: 'copyToNames',
      //   sortable: true,
      //   center: true,
      //   minWidth: '120px',
      //   cell: row => {
      //     return <div className=''>
      //       {
      //         row?.copyToNames
      //       }
      //     </div>
      //   }
      // },
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

                  <Link to={`/archive/${type}/${row.id}`}>
                    <DropdownItem onClick={Scrolling} className='w-100'>
                      {/* <Edit size={ 15 } /> */}
                      <Edit size={15} />
                      <span className='align-middle ml-50'>تعديل</span>
                    </DropdownItem>
                  </Link >

                  <DropdownItem onClick={() => {
                    handleDeleteArchive(row.id)
                  }} className='w-100'>
                    <Trash size={15} />
                    <span className='align-middle ml-50'>حذف</span>
                  </DropdownItem>
                  <Link to={`/archive_print/${type}/${row.id}`} target='_blank'>
                    <DropdownItem className='w-100'>
                      {/* <Edit size={ 15 } /> */}
                      <Printer size={15} />
                      <span className='align-middle ml-50'>طباعة</span>
                    </DropdownItem>
                  </Link >
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
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
        name: 'الرقم',
        selector: 'serisal',
        center: true,
        sortable: true,
        minWidth: '80px',
        maxWidth: '150px'
      },
      {
        name: 'تاريخ الارسال',
        selector: 'date',
        sortable: true,
        center: true,
        width: '140px',
        cell: row => {
          return <div style={{ paddingLeft: '18px' }}>{row?.date}</div>
        }
      },
      {
        name: 'عنوان المراسلة',
        selector: 'title',
        sortable: true,
        center: true,
        minWidth: '120px',
        cell: row => {
          return <div style={{ paddingLeft: '18px' }}>{row?.title}</div>
        }
      },
      {
        name: 'مرتبط ب',
        selector: row => row.name,
        center: true,
        sortable: true,
        minWidth: '120px',
        cell: row => {
          const obj = {
            type: row?.model_name,
            modelData: {
              model_id: row?.model_id,
              model: row?.model_name,
              name: row?.name
            }
          }
          return <a style={{ paddingLeft: '18px', cursor: 'pointer', color: '#7367f0' }} onClick={() => { handleShowModal(obj) }}>{row?.name}</a>
        }
      },
      {
        name: 'نسخة الى',
        selector: 'copyToNames',
        sortable: true,
        center: true,
        minWidth: '120px',
        cell: row => {
          return <div className='d-flex justify-content-between'>
            {row?.copy_to.map((item, index) => {
              const obj = {
                modelData: {
                  model_id: item?.model_id,
                  model: item?.model_name,
                  name: item?.name
                }
              }
              return <a key={item.model_id} className='text-brake' style={{ cursor: 'pointer', color: '#7367f0' }} onClick={() => { handleShowModal(obj) }}>{item?.name}{index !== (row?.copy_to.length - 1) && ' , '}</a>
            })}
          </div>
        }
      },
      {
        name: 'المرفقات',
        selector: 'salary',
        sortable: true,
        minWidth: '120px',
        // className: 'row w-100',
        // style: { width: '100%' },
        center: true,
        cell: row => {
          return (
            <>{fileList(row.files)}</>
          )
        }
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

                  {permissions.store_archive && <Link to={`/archive/${type}/${row.id}`}>
                    <DropdownItem onClick={Scrolling} className='w-100'>
                      {/* <Edit size={ 15 } /> */}
                      <Edit size={15} />
                      <span className='align-middle ml-50'>تعديل</span>
                    </DropdownItem>
                  </Link >}

                  {permissions.delete_archive && <DropdownItem onClick={() => {
                    handleDeleteArchive(row.id)
                  }} className='w-100'>
                    <Trash size={15} />
                    <span className='align-middle ml-50'>حذف</span>
                  </DropdownItem>}
                  <Link to={`/archive_print/${type}/${row.id}`} target='_blank'>
                    <DropdownItem className='w-100'>
                      {/* <Edit size={ 15 } /> */}
                      <Printer size={15} />
                      <span className='align-middle ml-50'>طباعة</span>
                    </DropdownItem>
                  </Link >
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
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
        name: 'اسم المورد',
        selector: 'name',
        center: true,
        sortable: true,
        minWidth: '130px',
        cell: row => {
          const obj = {
            type: row?.model_name,
            modelData: {
              model_id: row?.model_id,
              model: row?.model_name,
              name: row?.name
            }
          }
          return <a style={{ cursor: 'pointer', color: '#7367f0' }} onClick={() => { handleShowModal(obj) }}>{row?.name}</a>
        }
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

                  <Link to={`/archive/${type}/${row.id}`}>
                    <DropdownItem onClick={Scrolling} className='w-100'>
                      {/* <Edit size={ 15 } /> */}
                      <Edit size={15} />
                      <span className='align-middle ml-50'>تعديل</span>
                    </DropdownItem>
                  </Link >

                  <DropdownItem onClick={() => {
                    handleDeleteArchive(row.id)
                  }} className='w-100'>
                    <Trash size={15} />
                    <span className='align-middle ml-50'>حذف</span>
                  </DropdownItem>
                  <Link to={`/archive_print/${type}/${row.id}`} target='_blank'>
                    <DropdownItem className='w-100'>
                      {/* <Edit size={ 15 } /> */}
                      <Printer size={15} />
                      <span className='align-middle ml-50'>طباعة</span>
                    </DropdownItem>
                  </Link >
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
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
        minWidth: '120px',
        cell: row => {
          const obj = {
            type: row?.model_name,
            modelData: {
              model_id: row?.model_id,
              model: row?.model_name,
              name: row?.name
            }
          }
          return <a style={{ cursor: 'pointer', color: '#7367f0' }} onClick={() => { handleShowModal(obj) }}>{row?.name}</a>
        }
      },
      {
        name: 'اسم المركبة',
        selector: 'vehicle_name',
        sortable: true,
        center: true,
        minWidth: '120px',
        cell: row => {
          const obj = {
            type: row?.model_name,
            modelData: {
              model_id: row?.vehicle_id,
              model: 'App\\Models\\Vehicle',
              name: row?.vehicle_name
            }
          }
          return <a style={{ cursor: 'pointer', color: '#7367f0' }} onClick={() => { handleShowModal(obj) }}>{row?.vehicle_name}</a>
        }
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

                  <Link to={`/archive/${type}/${row.id}`}>
                    <DropdownItem onClick={Scrolling} className='w-100'>
                      {/* <Edit size={ 15 } /> */}
                      <Edit size={15} />
                      <span className='align-middle ml-50'>تعديل</span>
                    </DropdownItem>
                  </Link >

                  <DropdownItem onClick={() => {
                    handleDeleteArchive(row.id)
                  }} className='w-100'>
                    <Trash size={15} />
                    <span className='align-middle ml-50'>حذف</span>
                  </DropdownItem>
                  <Link to={`/archive_print/${type}/${row.id}`} target='_blank'>
                    <DropdownItem className='w-100'>
                      {/* <Edit size={ 15 } /> */}
                      <Printer size={15} />
                      <span className='align-middle ml-50'>طباعة</span>
                    </DropdownItem>
                  </Link >
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          )
        }
      }
    ]
  } else if (type === 'lic_archieve') {
    return [
      {
        name: '#',
        selector: row => row.rowId,
        sortable: true,
        center: true,
        width: '70px'
      },
      {
        name: 'اسم المواطن',
        selector: 'name',
        center: true,
        sortable: true,
        minWidth: '100px',
        maxWidth: '210px',
        cell: row => {
          const obj = {
            type: row?.model_name,
            modelData: {
              model_id: row?.model_id,
              model: row?.model_name,
              name: row?.name
            }
          }
          return <a style={{ cursor: 'pointer', color: '#7367f0' }} onClick={() => { handleShowModal(obj) }}>{row?.name}</a>
        }
      },
      {
        name: 'رقم الملف',
        selector: 'fileNo',
        sortable: true,
        center: true,
        minWidth: '130px'
      },
      {
        name: 'رقم الرخصة',
        selector: 'licNo',
        center: true,
        sortable: true,
        minWidth: '120px'

      },
      {
        name: 'الغاية من الاستعمال',
        selector: 'use_desc',
        sortable: true,
        center: true,
        minWidth: '120px'
      },
      {
        name: 'رقم الحوض',
        selector: 'licn',
        sortable: true,
        center: true,
        minWidth: '120px'
      },
      {
        name: 'رقم القطعة',
        selector: 'pieceNo',
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

                  <Link to={`/archive/${type}/${row.id}`}>
                    <DropdownItem onClick={Scrolling} className='w-100'>
                      {/* <Edit size={ 15 } /> */}
                      <Edit size={15} />
                      <span className='align-middle ml-50'>تعديل</span>
                    </DropdownItem>
                  </Link >

                  <DropdownItem onClick={() => {
                    handleDeleteArchive(row.id)
                  }} className='w-100'>
                    <Trash size={15} />
                    <span className='align-middle ml-50'>حذف</span>
                  </DropdownItem>
                  <Link to={`/archive_print/${type}/${row.id}`} target='_blank'>
                    <DropdownItem className='w-100'>
                      {/* <Edit size={ 15 } /> */}
                      <Printer size={15} />
                      <span className='align-middle ml-50'>طباعة</span>
                    </DropdownItem>
                  </Link >
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
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
      name: 'مرتبط ب',
      selector: row => row.name,
      center: true,
      sortable: true,
      minWidth: '120px',
      cell: row => {
        const obj = {
          type: row?.model_name,
          modelData: {
            model_id: row?.model_id,
            model: row?.model_name,
            name: row?.name
          }
        }
        return <a style={{ cursor: 'pointer', color: '#7367f0' }} onClick={() => { handleShowModal(obj) }}>{row?.name}</a>
      }
    },
    {
      name: 'نسخة الى',
      selector: 'copyToNames',
      sortable: true,
      center: true,
      minWidth: '120px',
      cell: row => {
        return row?.copy_to.map((item, index) => {
          const obj = {
            modelData: {
              model_id: item?.model_id,
              model: item?.model_name,
              name: item?.name
            }
          }
          return <a key={item.model_id} className='text-brake' style={{ cursor: 'pointer', color: '#7367f0' }} onClick={() => { handleShowModal(obj) }}>{item?.name}{index !== (row?.copy_to.length - 1) && ' , '}</a>
        })
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
                <Link to={`/archive/${type}/${row.id}`}>
                  <DropdownItem onClick={Scrolling} className='w-100'>
                    {/* <Edit size={ 15 } /> */}
                    <Edit size={15} />
                    <span className='align-middle ml-50'>تعديل</span>
                  </DropdownItem>
                </Link >

                <DropdownItem onClick={() => {
                  handleDeleteArchive(row.id)
                }} className='w-100'>
                  <Trash size={15} />
                  <span className='align-middle ml-50'>حذف</span>
                </DropdownItem>
                <Link to={`/archive_print/${type}/${row.id}`} target='_blank'>
                  <DropdownItem className='w-100'>
                    {/* <Edit size={ 15 } /> */}
                    <Printer size={15} />
                    <span className='align-middle ml-50'>طباعة</span>
                  </DropdownItem>
                </Link >
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        )
      }
    }
  ]
}
export const ArchiveColumns = (type, handleDeleteArchive, permissions, handleShowModal) => (getColumns(type, handleDeleteArchive, permissions, handleShowModal))

