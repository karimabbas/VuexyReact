// ** React Imports
import { Fragment, useState, forwardRef, useEffect, lazy } from 'react'

// ** Table Data & Columns

import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus } from 'react-feather'
import {
  Card,
  CardHeader,
  CardTitle,
  Button,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Label,
  Row,
  Col,
  Spinner,
  Table,
  CustomInput
} from 'reactstrap'
import { handlerArabicSearch } from '@utils'
import dataTableIcon from "../../assets/images/icon/data-table-icon.png"
import '@styles/react/libs/tables/react-dataTable-component.scss'
// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef(({ onClick, ...rest }, ref) => (
  <div className='custom-control custom-checkbox'>
    <input type='checkbox' className='custom-control-input' ref={ref} {...rest} />
    <label className='custom-control-label' onClick={onClick} />
  </div>
))
const customStyles = {
  cells: {
    style: {
      // paddingTop: '1rem!important',
      // overflow: 'hidden !important',
      fontSize: '14px!important',
      height: 'fill-available !important'
      // paddingBottom: '0.5rem!important'
    }
  },
  rows: {
    style: {
      alignItems: 'center'
    }
  },
  headCells: {
    style: {
      fontSize: '16px'
    }
  }
}
const CustomHeader = ({ handlePerPage, rowsPerPage, handleFilter, searchTerm }) => {
  return (
    <div className='invoice-list-table-header w-100 mr-1 ml-50 my-0'>
      <Row>
        <Col className='d-flex align-items-center justify-content-start' md='6' sm='12'>
          <Label className='mr-1' for='search-input' style={{ color: ' #000000' }}>
            ابحث:
          </Label>
          <Input
            className='dataTable-filter mb-50'
            type='text'
            bsSize='sm'
            id='search-input'
            value={searchTerm}
            onChange={handleFilter}
          />
        </Col>
        <Col xl='6' className='d-flex align-items-center justify-content-end p-0'>
          <div className='d-flex align-items-center w-100 justify-content-end'>
            <Label for='rows-per-page' style={{ color: ' #000000' }}>اظهر</Label>
            <CustomInput
              className='form-control mx-50'
              type='select'
              id='rows-per-page'
              value={rowsPerPage}
              onChange={handlePerPage}
              style={{
                width: '5rem',
                padding: '0 0.8rem',
                backgroundPosition: 'calc(100% - 3px) 11px, calc(100% - 20px) 13px, 100% 0'
              }}
            >
              <option value='10'>10</option>
              <option value='25'>25</option>
              <option value='50'>50</option>
              <option value='all'>الكل</option>
            </CustomInput>
            <Label for='rows-per-page' style={{ color: ' #000000' }}>صفوف</Label>
          </div>
        </Col>
      </Row>
    </div>
  )
}
const initialState = {
  currentPage: 1,
  searchValue: '',
  rowsPerPage: 10,
  filteredData: [],
  title: '',
  loading: true,
  data: [],
  columns: [],
  total: 0
}
const DataTableArchive = (props) => {
  // ** States
  const [tableConfig, setTableConfig] = useState(initialState)
  useEffect(() => {
    setTableConfig(initialState)
  }, [props.type])
  useEffect(() => {
    setTableConfig(prev => {
      return { ...prev, columns: props.columns, data: props.data, title: props.title, loading: false }
    })
    return () => {
      setTableConfig((prevState) => {
        return { ...prevState, loading: true, title: '', total: 0, data: [], columns: [] }
      })
    }
  }, [props.data, props.columns])
  // ** Function to handle filter

  const handleFilter = e => {
    const value = e.target.value
    let updatedData = []
    setTableConfig(prev => {
      return { ...prev, searchValue: value, currentPage: 1 }
    })
    if (value.length) {
      updatedData = tableConfig?.data?.filter(item => {
        let startsWith = false
        let includes = false
        Object.keys(item).map(key => {
          try {
            const element = item[key]
            if (element) {
              if (!startsWith) startsWith = handlerArabicSearch(element).startsWith(handlerArabicSearch(value))
              if (!includes) includes = handlerArabicSearch(element).includes(handlerArabicSearch(value))
            }
          } catch (error) {
            console.log(error)
          }
        })
        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })
      setTableConfig(prev => {
        return { ...prev, searchValue: value, filteredData: updatedData }
      })
    }
  }

  const paginateArray = (array) => {
    return array?.slice(
      (tableConfig?.currentPage - 1) * tableConfig?.rowsPerPage, tableConfig?.currentPage * tableConfig?.rowsPerPage
    )
  }

  const dataToRender = () => {
    if (tableConfig?.data?.length === 0) {
      return []
    } else if (tableConfig?.searchValue !== '') {
      if (tableConfig?.rowsPerPage === 'all') {
        return tableConfig?.filteredData
      }
      return paginateArray(tableConfig?.filteredData)
    } else {
      if (tableConfig?.rowsPerPage === 'all') {
        return tableConfig?.data
      }
      return paginateArray(tableConfig?.data)
    }
  }
  // ** Function to handle Pagination
  const handlePagination = page => {
    setTableConfig(prev => {
      return { ...prev, currentPage: page.selected + 1 }
    })
  }
  const handlePerPage = e => {
    const page = (e.target.value)
    setTableConfig(prev => {
      return { ...prev, rowsPerPage: page }
    })
  }
  // ** Custom Pagination
  const CustomPagination = () => {
    const count = tableConfig?.searchValue === '' ? (
      Math.ceil(tableConfig?.data.length / tableConfig?.rowsPerPage)
    ) : (
      Math.ceil(tableConfig?.filteredData.length / tableConfig?.rowsPerPage)
    )
    return (
      <ReactPaginate
        previousLabel=''
        nextLabel=''
        forcePage={tableConfig?.currentPage !== 0 ? tableConfig?.currentPage - 1 : 0}
        onPageChange={page => handlePagination(page)}
        // pageCount={ searchValue.length ? filteredData.length / rowsPerPage : data.length / rowsPerPage || 1 }
        pageCount={count || 1}
        breakLabel='...'
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        activeClassName='active'
        pageClassName='page-item'
        breakClassName='page-item'
        breakLinkClassName='page-link'
        nextLinkClassName='page-link'
        nextClassName='page-item next'
        previousClassName='page-item prev'
        previousLinkClassName='page-link'
        pageLinkClassName='page-link'
        containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1'
      />
    )
  }

  return (
    <Fragment>
      <Card>
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
          <CardTitle tag='h4'>
            <img src={dataTableIcon} style={{ width: '25px' }} className='headings mr-1' />
            {tableConfig?.title}
          </CardTitle>
        </CardHeader>
        <DataTable
          noHeader
          pagination
          paginationServer
          // selectableRows
          // subHeader={ !tableConfig?.loading }
          subHeader={true}
          columns={tableConfig?.columns}
          paginationPerPage={tableConfig?.rowsPerPage}
          customStyles={customStyles}
          className='react-dataTable'
          subHeaderComponent={
            <CustomHeader
              handlePerPage={handlePerPage}
              rowsPerPage={tableConfig?.rowsPerPage}
              searchTerm={tableConfig?.searchValue}
              handleFilter={handleFilter}
            />
          }
          progressPending={tableConfig?.loading}
          progressComponent={
            <Table responsive className='custom-responsive-table' style={{ fontSize: '16px!important' }}>
              <tbody className='custom-table-body'>
                <tr>
                  <td className='text-center pt-2' colSpan='11'>
                    <Spinner color='primary' className='my-1' />
                  </td>
                </tr>
              </tbody>
            </Table>
          }
          noDataComponent={
            <Table responsive className='custom-responsive-table' style={{ fontSize: '16px!important' }}>
              <tbody className='custom-table-body'>
                <tr>
                  <td className='text-center pt-2' colSpan='11'>
                    {tableConfig?.loading ? (
                      <Spinner color='primary' className='my-1' />
                    ) : (
                      <p className='mb-0 pt-1'>لا يوجد بيانات في الجدول</p>
                    )}
                  </td>
                </tr>
              </tbody>
            </Table>
          }
          sortIcon={<ChevronDown size={10} />}
          paginationDefaultPage={tableConfig?.currentPage + 1}
          paginationComponent={CustomPagination}
          data={dataToRender()}
        // selectableRowsComponent={ BootstrapCheckbox }
        />
      </Card>
    </Fragment>
  )
}

export default DataTableArchive
