import { Mail, User, Users } from 'react-feather'
import { MdCallReceived } from "react-icons/md"
import { FiSend } from "react-icons/fi"
import { FcWorkflow } from "react-icons/fc"
import { BsBuilding } from "react-icons/bs"
import Avatar from '@components/avatar'
const CustomAvatar = props => {
  return <Avatar color={'primary'} style={{ textAlign: 'center', marginLeft: '5px' }} icon={props.icon} />
}

export default [
  {
    id: 'archive',
    title: 'Archive',
    icon: <Mail />,
    action: 'read',
    resource: 'Auth',
    children: [
      {
        id: 'outArchive',
        title: 'outArchive',
        icon: <CustomAvatar icon={ <FiSend style={ { marginLeft: '0' } } size={ 14 } /> } />,
        navLink: '/archive/out_archieve',
        action: 'read',
        resource: 'out_archieve'
      },
      {
        id: 'inArchive',
        title: 'inArchive',
        icon: <CustomAvatar icon={ <MdCallReceived style={ { marginLeft: '0' } } size={ 14 } /> } />,
        navLink: '/archive/in_archieve',
        action: 'read',
        resource: 'in_archieve'
      },
      {
        id: 'munArchive',
        title: 'MunArchive',
        icon: <CustomAvatar icon={ <FcWorkflow style={ { marginLeft: '0' } } size={ 14 } /> } />,
        navLink: '/archive/mun_archieve',
        action: 'read',
        resource: 'mun_archieve'
      },
      {
        id: 'projArchive',
        title: 'projArchive',
        icon: <CustomAvatar icon={ <FcWorkflow style={ { marginLeft: '0' } } size={ 14 } /> } />,
        navLink: '/archive/proj_archieve',
        action: 'read',
        resource: 'proj_archieve'
      },
      {
        id: 'assetsArchive',
        title: 'assetsArchive',
        icon: <CustomAvatar icon={ <BsBuilding style={ { marginLeft: '0' } } size={ 14 } /> } />,
        navLink: '/archive/assets_archieve',
        action: 'read',
        resource: 'assets_archieve'
      },
      {
        id: 'empArchive',
        title: 'empArchive',
        icon: <CustomAvatar icon={ <User style={ { marginLeft: '0' } } size={ 14 } /> } />,
        navLink: '/archive/emp_archieve',
        action: 'read',
        resource: 'emp_archieve'
      },
      {
        id: 'citArchive',
        title: 'citArchive',
        icon: <CustomAvatar icon={ <Users style={ { marginLeft: '0' } } size={ 14 } /> } />,
        navLink: '/archive/cit_archieve',
        action: 'read',
        resource: 'cit_archieve'
      },
      {
        id: 'depArchive',
        title: 'depArchive',
        icon: <CustomAvatar icon={ <Users style={ { marginLeft: '0' } } size={ 14 } /> } />,
        navLink: '/archive/dep_archieve',
        action: 'read',
        resource: 'dep_archieve'
      },
      {
        id: 'LicenseArchive',
        title: 'LicenseArchive',
        icon: <CustomAvatar icon={ <Users style={ { marginLeft: '0' } } size={ 14 } /> } />,
        navLink: '/archive/lic_archieve',
        action: 'read',
        resource: 'lic_archieve'
      },
      {
        id: 'lawArchieve',
        title: 'lawArchieve',
        icon: <CustomAvatar icon={ <Users style={ { marginLeft: '0' } } size={ 14 } /> } />,
        navLink: '/archive/law_archieve',
        action: 'read',
        resource: 'law_archieve'
      },
      {
        id: 'financeArchive',
        title: 'financeArchive',
        icon: <CustomAvatar icon={ <Users style={ { marginLeft: '0' } } size={ 14 } /> } />,
        navLink: '/archive/finance_archive',
        action: 'read',
        resource: 'finance_archive'
      },
      {
        id: 'tradeArchive',
        title: 'tradeArchive',
        icon: <CustomAvatar icon={ <Users style={ { marginLeft: '0' } } size={ 14 } /> } />,
        navLink: '/archive/trade_archive',
        action: 'read',
        resource: 'trade_archive'
      }
    ]
  }
]
