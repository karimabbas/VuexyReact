import Avatar from '@components/avatar'
const CustomAvatar = props => {
  return <Avatar color={'primary'} style={{ textAlign: 'center', marginLeft: '5px' }} icon={props.icon} />
}

export default [
  {
    id: 'agenda-archive',
    title: 'Agenda Manager',
    // icon: <Mail />,
    action: 'read',
    resource: 'Auth',
    children: [
      {
        id: 'agenda_archive',
        title: 'Agenda Archive',
        // icon: <CustomAvatar icon={ <FiSend style={ { marginLeft: '0' } } size={ 14 } /> } />,
        navLink: '/agenda_archive',
        action: 'read',
        resource: 'agenda_archieve'
      },
      {
        id: 'agenda_report',
        title: 'Agenda Report',
        // icon: <CustomAvatar icon={ <MdCallReceived style={ { marginLeft: '0' } } size={ 14 } /> } />,
        navLink: '/agenda_report',
        action: 'read',
        resource: 'agenda_report'
      }
    ]
  }
]
