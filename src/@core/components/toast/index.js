import { Fragment } from 'react'
import Avatar from '@components/avatar'
import { Check, X, Info, AlertTriangle } from 'react-feather'

export const SuccessToast = props => (
    <Fragment>
      <div className='toastify-header'>
        <div className='title-wrapper'>
          <Avatar size='sm' color='success' icon={<Check size={12} />} />
          <h6 className='toast-title'>تمت العملية بنجاح</h6>
        </div>
      </div>
      <div className='toastify-body' style={{marginLeft: '5px'}}>
        <p>{props.title}</p>
        <span role='img' aria-label='toast-text'>
            {props.result}
        </span>
      </div>
    </Fragment>
)

export const ErrorToast = props => (
    <Fragment>
        <div className='toastify-header'>
        <div className='title-wrapper'>
            <Avatar size='sm' className='mr-1' color='danger' icon={<X size={12} />} />
            {props.title}
        </div>
        </div>
        <div className='toastify-body' style={{marginLeft: '5px'}}>
        <span role='img' aria-label='toast-text'>
            {props.result}
        </span>
        </div>
    </Fragment>
)

export const InfoToast = props => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='info' icon={<Info size={12} />} />
        <h6 className='toast-title'>{props.title}</h6>
      </div>
    </div>
    <div className='toastify-body'>
      <span role='img' aria-label='toast-text'>
        {props.result}
      </span>
    </div>
  </Fragment>
)

export const WarningToast = props => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='warning' icon={<AlertTriangle size={12} />} />
        <h6 className='toast-title'>{props.title}</h6>
      </div>
    </div>
    <div className='toastify-body'>
      <span role='img' aria-label='toast-text'>
        {props.result}
      </span>
    </div>
  </Fragment>
)