// ** React Imports
import { Fragment, useEffect, useState, useRef } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import {
  Button,
  Badge,
  Media,
  CustomInput,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Row,
  Col,
  CardBody
} from 'reactstrap'
import api from '../../../util/api'
import { Link } from 'react-router-dom'
import Url from '../../../util/base-url'

import { renderFilePreview } from '../../../../views/archive/list/attachment'

import { Bell } from 'react-feather'

const NotificationDropdown = () => {
  // ** Notification Array
  const [notifications, setNotifications] = useState({
    notificationsArray: [],
    notificationsCount: 0
  })
  const listRef = useRef()
  useEffect(() => {
    api().post('get_notifications').then((res) => {
      setNotifications({
        notificationsArray: res?.data?.copyTo,
        notificationsCount: res?.data?.CopyToCount
      })
    })
  }, [])

  // ** Function to render Notifications
  /*eslint-disable */
  const renderDate = (timeStamp) => {
    const timestamp = timeStamp
    const date = new Date(timestamp);
    return `بتاريخ: 
    ${date.getDate()}/${(date.getMonth() + 1)}/${date.getFullYear()}
    الساعة : ${date.getSeconds()} : ${date.getMinutes()} : ${date.getHours()}`
  }
  const fileList = files => {
    return <Row className='w-100 d-flex align-items-center justify-content-between'>
      {
        files?.map((file, index) => (
          <div key={`${file.real_name.slice(0, 10)}-${index}`} className='d-flex align-items-center justify-content-end border-0 col-md-6'>
            <a href={`${Url.BASE_URL}${file.url}`} target='_blank'>
              <span className='file-name mb-0'>
                <span style={{ fontSize: '15px' }}>
                  {file.real_name.slice(0, 10)}
                </span>
                <span style={{ marginRight: '3px' }}>
                  {renderFilePreview(file)}
                </span>
              </span>
            </a>
          </div>
        ))
      }
    </Row>
  }
  const renderNotificationItems = () => {
    return (
      <PerfectScrollbar
        component='li'
        className='media-list scrollable-container'
        options={{
          wheelPropagation: false
        }}
      >
        <div className='media-list-div'>
          {notifications?.notificationsArray.map((item, index) => {
            return (
              <div key={index} className='pt-1 pb-0' >
                <Link className='d-flex' to={`/archive/${item?.archive?.url}/${item?.archive?.id}`} onClick={() => {
                  listRef.current.context.toggle()
                  console.log(listRef)
                }} >
                  <Media
                    className={classnames('d-flex', {
                      'align-items-start': !item.switch,
                      'align-items-center': item.switch
                    })}
                  >
                    {!item.switch ? (
                      <Fragment>
                        <Media body>
                          <span className='font-weight-bolder notification-title-header'>{`أرشيف بعنوان : ${item?.archive?.title}`}</span>
                          <Media tag='p' heading>
                            {`تمت اضافة ارشيف ${(item.archive.name && item.archive.name != "") ? `على ${item.archive.name}` : ''} من قبل ${item.archive.admin.nick_name}`}
                          </Media>
                          <small className='notification-text'>
                            {renderDate(item.archive.created_at)}
                          </small>
                        </Media>
                      </Fragment>
                    ) : (
                      <Fragment>
                        {item.title}
                        {item.switch}
                      </Fragment>
                    )}
                  </Media>
                </Link>
                <Media
                  className={classnames('d-flex', {
                    'align-items-start': !item.switch,
                    'align-items-center': item.switch
                  })}
                  style={{ paddingTop: '0' }}
                >
                  {fileList(item.archive.files)}
                </Media>
              </div>
            )
          })}
        </div>
      </PerfectScrollbar>
    )
  }
  /*eslint-enable */

  return (
    <UncontrolledDropdown tag='li' className='dropdown-notification nav-item mr-25'>
      <DropdownToggle tag='a' className='nav-link' href='/' onClick={e => e.preventDefault()} ref={listRef}>
        <Bell size={21} />
        <Badge pill color='danger' className='badge-up'>
          {notifications.notificationsCount}
        </Badge>
      </DropdownToggle>
      <DropdownMenu tag='ul' right className='dropdown-menu-media mt-0'>
        <li className='dropdown-menu-header'>
          <DropdownItem className='d-flex' tag='div' header>
            <h4 className='notification-title mb-0 mr-auto'>الاشعارات</h4>
            {/* <Badge tag='div' color='light-primary' pill>
              6 New
            </Badge> */}
          </DropdownItem>
        </li>
        {renderNotificationItems()}
        {/* <li className='dropdown-menu-footer'>
          <Button.Ripple color='primary' block>
            Read all notifications
          </Button.Ripple>
        </li> */}
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default NotificationDropdown
