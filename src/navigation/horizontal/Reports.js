import { icon } from 'leaflet'
import { Box, Mail, MessageSquare, CheckSquare, Calendar, FileText, Circle, ShoppingCart, User, Users, CheckCircle, Code, Codesandbox } from 'react-feather'
import { MdFindInPage } from "react-icons/md"
import Avatar from '@components/avatar'
const CustomAvatar = props => {
    return <Avatar color={'primary'} style={{ textAlign: 'center', marginLeft: '5px' }} icon={props.icon} />
}
export default [
    {
        id: 'Reports',
        title: 'Reports',
        // icon: <CustomAvatar icon={<MdFindInPage style={{ marginLeft: '0' }} size={14} />} />,
        // icon: <MdFindInPage />,
        children: [
            {
                id: 'Central Archive Report',
                title: 'Central Archive Report',
                // icon: <FileText />,
                navLink: '/Reports/CentralArchive'
            },
            {
                id: 'Daily Archive Report',
                title: 'Daily  Archive Report',
                // icon: <FileText />,
                navLink: '/Reports/DailyReport'
            },
            {
                id: 'Remove Archive Report',
                title: 'Remove Archive Report',
                // icon: <FileText />,
                navLink: '/Reports/DeletedArchive'
            },
            {
                id: 'Delete Tariffs Report',
                title: 'Delete Tariffs Report',
                // icon: <FileText />,
                navLink: '/Reports/DeletedDef'
            }
        ]
    }
]
