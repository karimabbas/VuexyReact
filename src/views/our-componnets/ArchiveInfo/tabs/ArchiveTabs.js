// ** React Imports
import { useState, useContext } from 'react'

// ** Store & Actions
// import { getUser } from '../store/action'
import { useSelector, useDispatch } from 'react-redux'
import DataTableArchive from './DataTableArchive'
import { AbilityContext } from '@src/utility/context/Can'

// ** Third Party Components
import { User, Info, Share2 } from 'react-feather'
import { Card, CardBody, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane, Alert } from 'reactstrap'
// ** Styles
import '@styles/react/apps/app-users.scss'

const ArchiveTabs = (props) => {
  // ** States & Vars
  const [activeTab, setActiveTab] = useState('1'),
    store = useSelector(state => state.archiveInfo),
    ability = useContext(AbilityContext)

  const toggle = tab => setActiveTab(tab)
  const RenderTabs = () => {
    let modelType
    if (store?.dataFromApi) {
      modelType = store?.modelType
    } else {
      modelType = props.type
    }
    if (modelType === 'show_department') {
      return <>
        <Nav className='wrap-border nav-archive' pills fill >
          {ability.can('read', 'deptOutArchive') && <NavItem>
            <NavLink className='py-1' active={activeTab === '1'} onClick={() => toggle('1')}>
              {/*<User size={18} />*/}
              <span className='align-middle d-none d-sm-block nav-title'>أرشيف الصادر ({store?.tabs?.outArchive?.data.length})</span>
            </NavLink>
          </NavItem>}
          {ability.can('read', 'deptInArchive') && <NavItem>
            <NavLink className='py-1' active={activeTab === '2'} onClick={() => toggle('2')}>
              {/*<Info size={18} />*/}
              <span className='align-middle d-none d-sm-block nav-title'>أرشيف الوارد ({store?.tabs?.inArchive?.data.length})</span>
            </NavLink>
          </NavItem>}
          {ability.can('read', 'deptCopyArchive') && <NavItem>
            <NavLink className='py-1' active={activeTab === '3'} onClick={() => toggle('3')}>
              {/*<Share2 size={18} />*/}
              <span className='align-middle d-none d-sm-block nav-title'>نسخة الى ({store?.tabs?.copyToArchive?.data.length})</span>
            </NavLink>
          </NavItem>}
          {ability.can('read', 'deptOtherArchive') && <NavItem>
            <NavLink className='py-1' active={activeTab === '4'} onClick={() => toggle('4')}>
              {/*<Share2 size={18} />*/}
              <span className='align-middle d-none d-sm-block nav-title'>وثائق متنوعة ({store?.tabs?.model_docs?.data.length})</span>
            </NavLink>
          </NavItem>}
          {ability.can('read', 'deptContractArchive') && <NavItem>
            <NavLink className='py-1' active={activeTab === '5'} onClick={() => toggle('5')}>
              {/*<Share2 size={18} />*/}
              <span className='align-middle d-none d-sm-block nav-title'>أرشيف الاتفاقيات والعقود ({store?.tabs?.contractArchive?.data.length ? store?.tabs?.contractArchive?.data.length : 0})</span>
            </NavLink>
          </NavItem>}
          {ability.can('read', 'deptLawArchive') && <NavItem>
            <NavLink className='py-1' active={activeTab === '6'} onClick={() => toggle('6')}>
              {/*<Share2 size={18} />*/}
              <span className='align-middle d-none d-sm-block nav-title'>أرشيف القوانين والاجراءات ({store?.tabs?.lawArchieve?.data.length})</span>
            </NavLink>
          </NavItem>}
          <NavItem>
            <NavLink className='py-1' active={activeTab === '7'} onClick={() => toggle('7')}>
              {/*<Info size={18} />*/}
              <span className='align-middle d-none d-sm-block nav-title'>أرشيف المالية ({store?.tabs?.financeArchive?.data.length})</span>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          {ability.can('read', 'deptOutArchive') && <TabPane tabId='1'>
            <DataTableArchive data={store?.tabs?.outArchive?.data} columns={store?.tabs?.outArchive?.columns} showHeder={false}/>
          </TabPane>}
          {ability.can('read', 'deptInArchive') && <TabPane tabId='2'>
            <DataTableArchive data={store?.tabs?.inArchive?.data} columns={store?.tabs?.inArchive?.columns} showHeder={false}/>
          </TabPane>}
          {ability.can('read', 'deptCopyArchive') && <TabPane tabId='3'>
            <DataTableArchive data={store?.tabs?.copyToArchive?.data} columns={store?.tabs?.copyToArchive?.columns} showHeder={false}/>
          </TabPane>}
          {ability.can('read', 'deptOtherArchive') && <TabPane tabId='4'>
            <DataTableArchive data={store?.tabs?.model_docs?.data} columns={store?.tabs?.model_docs?.columns} showHeder={false}/>
          </TabPane>}
          {ability.can('read', 'deptContractArchive') && <TabPane tabId='5'>
            <DataTableArchive data={store?.tabs?.contractArchive?.data} columns={store?.tabs?.contractArchive?.columns} showHeder={false}/>
          </TabPane>}
          {ability.can('read', 'deptLawArchive') && <TabPane tabId='6'>
            <DataTableArchive data={store?.tabs?.lawArchieve?.data} columns={store?.tabs?.lawArchieve?.columns} showHeder={false}/>
          </TabPane>}
          <TabPane tabId='7'>
            <DataTableArchive data={store?.tabs?.financeArchive?.data} columns={store?.tabs?.financeArchive?.columns} showHeder={false}/>
          </TabPane>
        </TabContent>
      </>
    } else if (modelType === 'show_projects') {
      return <>
        <Nav className='wrap-border nav-archive' pills fill >
          {ability.can('read', 'projArchive') && <NavItem>
            <NavLink className='py-1' active={activeTab === '1'} onClick={() => toggle('1')}>
              {/*<User size={18} />*/}
              <span className='align-middle d-none d-sm-block nav-title'>الأرشيف ({store?.tabs?.projArchive?.data.length})</span>
            </NavLink>
          </NavItem>}
          {ability.can('read', 'projCopyArchive') && <NavItem>
            <NavLink className='py-1' active={activeTab === '2'} onClick={() => toggle('2')}>
              {/*<Share2 size={18} />*/}
              <span className='align-middle d-none d-sm-block nav-title'>نسخة الى ({store?.tabs?.copyToArchive?.data.length})</span>
            </NavLink>
          </NavItem>}
          {ability.can('read', 'projContractArchive') && <NavItem>
            <NavLink className='py-1' active={activeTab === '3'} onClick={() => toggle('3')}>
              {/*<Share2 size={18} />*/}
              <span className='align-middle d-none d-sm-block nav-title'>أرشيف الاتفاقيات والعقود ({store?.tabs?.contractArchive?.data.length ? store?.tabs?.contractArchive?.data.length : 0})</span>
            </NavLink>
          </NavItem>}
          <NavItem>
            <NavLink className='py-1' active={activeTab === '4'} onClick={() => toggle('4')}>
              {/*<Info size={18} />*/}
              <span className='align-middle d-none d-sm-block nav-title'>أرشيف المالية ({store?.tabs?.financeArchive?.data.length})</span>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          {ability.can('read', 'projArchive') && <TabPane tabId='1'>
            <DataTableArchive data={store?.tabs?.projArchive?.data} columns={store?.tabs?.projArchive?.columns} showHeder={false}/>
          </TabPane>}
          {ability.can('read', 'projCopyArchive') && <TabPane tabId='2'>
            <DataTableArchive data={store?.tabs?.copyToArchive?.data} columns={store?.tabs?.copyToArchive?.columns} showHeder={false}/>
          </TabPane>}
          {ability.can('read', 'projContractArchive') && <TabPane tabId='3'>
            <DataTableArchive data={store?.tabs?.contractArchive?.data} columns={store?.tabs?.contractArchive?.columns} showHeder={false}/>
          </TabPane>}
          <TabPane tabId='4'>
            <DataTableArchive data={store?.tabs?.financeArchive?.data} columns={store?.tabs?.financeArchive?.columns} showHeder={false}/>
          </TabPane>
        </TabContent>
      </>
    } else if (modelType === 'show_customer' || modelType === 'show_citizens') {
      return (
        <>
          <Nav className='wrap-border nav-archive' pills fill >
            {ability.can('read', 'subscriberOutArchive') && <NavItem>
              <NavLink className='py-1' active={activeTab === '1'} onClick={() => toggle('1')}>
                {/*<User size={18} />*/}
                <span className='align-middle d-none d-sm-block nav-title'>أرشيف الصادر ({store?.tabs?.outArchive?.data.length})</span>
              </NavLink>
            </NavItem>}
            {ability.can('read', 'subscriberInArchive') && <NavItem>
              <NavLink className='py-1' active={activeTab === '2'} onClick={() => toggle('2')}>
                {/*<Info size={18} />*/}
                <span className='align-middle d-none d-sm-block nav-title'>أرشيف الوارد ({store?.tabs?.inArchive?.data.length})</span>
              </NavLink>
            </NavItem>}
            {ability.can('read', 'subscriberCopyArchive') && <NavItem>
              <NavLink className='py-1' active={activeTab === '3'} onClick={() => toggle('3')}>
                {/*<Share2 size={18} />*/}
                <span className='align-middle d-none d-sm-block nav-title'>نسخة الى ({store?.tabs?.copyToArchive?.data.length})</span>
              </NavLink>
            </NavItem>}
            {ability.can('read', 'subscriberOtherArchive') && <NavItem>
              <NavLink className='py-1' active={activeTab === '4'} onClick={() => toggle('4')}>
                {/*<Share2 size={18} />*/}
                <span className='align-middle d-none d-sm-block nav-title'>وثائق الزبون ({store?.tabs?.model_docs?.data.length})</span>
              </NavLink>
            </NavItem>}
            {ability.can('read', 'subscriberContractArchive') && <NavItem>
              <NavLink className='py-1' active={activeTab === '5'} onClick={() => toggle('5')}>
                {/*<Share2 size={18} />*/}
                <span className='align-middle d-none d-sm-block nav-title'>أرشيف الاتفاقيات والعقود ({store?.tabs?.contractArchive?.data.length ? store?.tabs?.contractArchive?.data.length : 0})</span>
              </NavLink>
            </NavItem>}
            <NavItem>
              <NavLink className='py-1' active={activeTab === '6'} onClick={() => toggle('6')}>
                {/*<Share2 size={18} />*/}
                <span className='align-middle d-none d-sm-block nav-title'>أرشيف المعاملات ({store?.tabs?.tradeArchive?.data.length ? store?.tabs?.tradeArchive?.data.length : 0})</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className='py-1' active={activeTab === '7'} onClick={() => toggle('7')}>
                {/*<Info size={18} />*/}
                <span className='align-middle d-none d-sm-block nav-title'>أرشيف المالية ({store?.tabs?.financeArchive?.data.length})</span>
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            {ability.can('read', 'subscriberOutArchive') && <TabPane tabId='1'>
              <DataTableArchive data={store?.tabs?.outArchive?.data} columns={store?.tabs?.outArchive?.columns} showHeder={false}/>
            </TabPane>}
            {ability.can('read', 'subscriberInArchive') && <TabPane tabId='2'>
              <DataTableArchive data={store?.tabs?.inArchive?.data} columns={store?.tabs?.inArchive?.columns} showHeder={false}/>
            </TabPane>}
            {ability.can('read', 'subscriberCopyArchive') && <TabPane tabId='3'>
              <DataTableArchive data={store?.tabs?.copyToArchive?.data} columns={store?.tabs?.copyToArchive?.columns} showHeder={false}/>
            </TabPane>}
            {ability.can('read', 'subscriberOtherArchive') && <TabPane tabId='4'>
              <DataTableArchive data={store?.tabs?.model_docs?.data} columns={store?.tabs?.model_docs?.columns} showHeder={false}/>
            </TabPane>}
            {ability.can('read', 'subscriberContractArchive') && <TabPane tabId='5'>
              <DataTableArchive data={store?.tabs?.contractArchive?.data} columns={store?.tabs?.contractArchive?.columns} showHeder={false}/>
            </TabPane>}
            <TabPane tabId='6'>
              <DataTableArchive data={store?.tabs?.tradeArchive?.data} columns={store?.tabs?.tradeArchive?.columns} showHeder={false}/>
            </TabPane>
            <TabPane tabId='7'>
              <DataTableArchive data={store?.tabs?.financeArchive?.data} columns={store?.tabs?.financeArchive?.columns} showHeder={false}/>
            </TabPane>
          </TabContent>
        </>
      )
    } else if (modelType === 'show_employee') {
      return (
        <>
          <Nav className='wrap-border nav-archive' pills fill >
            {ability.can('read', 'empOutArchive') && <NavItem>
              <NavLink className='py-1' active={activeTab === '1'} onClick={() => toggle('1')}>
                {/*<User size={18} />*/}
                <span className='align-middle d-none d-sm-block nav-title'>أرشيف الصادر ({store?.tabs?.outArchive?.data.length})</span>
              </NavLink>
            </NavItem>}
            {ability.can('read', 'empInArchive') && <NavItem>
              <NavLink className='py-1' active={activeTab === '2'} onClick={() => toggle('2')}>
                {/*<Info size={18} />*/}
                <span className='align-middle d-none d-sm-block nav-title'>أرشيف الوارد ({store?.tabs?.inArchive?.data.length})</span>
              </NavLink>
            </NavItem>}
            {ability.can('read', 'empCopyArchive') && <NavItem>
              <NavLink className='py-1' active={activeTab === '3'} onClick={() => toggle('3')}>
                {/*<Share2 size={18} />*/}
                <span className='align-middle d-none d-sm-block nav-title'>نسخة الى ({store?.tabs?.copyToArchive?.data.length})</span>
              </NavLink>
            </NavItem>}
            {ability.can('read', 'empOtherArchive') && <NavItem>
              <NavLink className='py-1' active={activeTab === '4'} onClick={() => toggle('4')}>
                {/*<Share2 size={18} />*/}
                <span className='align-middle d-none d-sm-block nav-title'>وثائق متنوعة ({store?.tabs?.model_docs?.data.length})</span>
              </NavLink>
            </NavItem>}
            {ability.can('read', 'empContractArchive') && <NavItem>
              <NavLink className='py-1' active={activeTab === '5'} onClick={() => toggle('5')}>
                {/*<Share2 size={18} />*/}
                <span className='align-middle d-none d-sm-block nav-title'>أرشيف الاتفاقيات والعقود ({store?.tabs?.contractArchive?.data.length ? store?.tabs?.contractArchive?.data.length : 0})</span>
              </NavLink>
            </NavItem>}
            <NavItem>
              <NavLink className='py-1' active={activeTab === '6'} onClick={() => toggle('6')}>
                {/*<Info size={18} />*/}
                <span className='align-middle d-none d-sm-block nav-title'>أرشيف المالية ({store?.tabs?.financeArchive?.data.length})</span>
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            {ability.can('read', 'empInArchive') && <TabPane tabId='1'>
              <DataTableArchive data={store?.tabs?.outArchive?.data} columns={store?.tabs?.outArchive?.columns} showHeder={false}/>
            </TabPane>}
            {ability.can('read', 'empInArchive') && <TabPane tabId='2'>
              <DataTableArchive data={store?.tabs?.inArchive?.data} columns={store?.tabs?.inArchive?.columns} showHeder={false}/>
            </TabPane>}
            {ability.can('read', 'empCopyArchive') && <TabPane tabId='3'>
              <DataTableArchive data={store?.tabs?.copyToArchive?.data} columns={store?.tabs?.copyToArchive?.columns} showHeder={false}/>
            </TabPane>}
            {ability.can('read', 'empOtherArchive') && <TabPane tabId='4'>
              <DataTableArchive data={store?.tabs?.model_docs?.data} columns={store?.tabs?.model_docs?.columns} showHeder={false}/>
            </TabPane>}
            {ability.can('read', 'empContractArchive') && <TabPane tabId='5'>
              <DataTableArchive data={store?.tabs?.contractArchive?.data} columns={store?.tabs?.contractArchive?.columns} showHeder={false}/>
            </TabPane>}
            <TabPane tabId='6'>
              <DataTableArchive data={store?.tabs?.financeArchive?.data} columns={store?.tabs?.financeArchive?.columns} showHeder={false}/>
            </TabPane>
          </TabContent>
        </>
      )
    } else if (modelType === 'orginzation') {
      return (
        <>
          <Nav className='wrap-border nav-archive' pills fill >
            {ability.can('read', 'orgOutArchive') && <NavItem>
              <NavLink className='py-1' active={activeTab === '1'} onClick={() => toggle('1')}>
                {/*<User size={18} />*/}
                <span className='align-middle d-none d-sm-block nav-title'>أرشيف الصادر ({store?.tabs?.outArchive?.data.length})</span>
              </NavLink>
            </NavItem>}
            {ability.can('read', 'orgInArchive') && <NavItem>
              <NavLink className='py-1' active={activeTab === '2'} onClick={() => toggle('2')}>
                {/*<Info size={18} />*/}
                <span className='align-middle d-none d-sm-block nav-title'>أرشيف الوارد ({store?.tabs?.inArchive?.data.length})</span>
              </NavLink>
            </NavItem>}
            {ability.can('read', 'orgCopyArchive') && <NavItem>
              <NavLink className='py-1' active={activeTab === '3'} onClick={() => toggle('3')}>
                {/*<Share2 size={18} />*/}
                <span className='align-middle d-none d-sm-block nav-title'>نسخة الى ({store?.tabs?.copyToArchive?.data.length})</span>
              </NavLink>
            </NavItem>}
            {ability.can('read', 'orgOtherArchive') && <NavItem>
              <NavLink className='py-1' active={activeTab === '4'} onClick={() => toggle('4')}>
                {/*<Share2 size={18} />*/}
                <span className='align-middle d-none d-sm-block nav-title'>وثائق متنوعة ({store?.tabs?.model_docs?.data.length})</span>
              </NavLink>
            </NavItem>}
            {ability.can('read', 'orgContractArchive') && <NavItem>
              <NavLink className='py-1' active={activeTab === '5'} onClick={() => toggle('5')}>
                {/*<Share2 size={18} />*/}
                <span className='align-middle d-none d-sm-block nav-title'>أرشيف الاتفاقيات والعقود ({store?.tabs?.contractArchive?.data.length ? store?.tabs?.contractArchive?.data.length : 0})</span>
              </NavLink>
            </NavItem>}
            <NavItem>
              <NavLink className='py-1' active={activeTab === '6'} onClick={() => toggle('6')}>
                {/*<Info size={18} />*/}
                <span className='align-middle d-none d-sm-block nav-title'>أرشيف المالية ({store?.tabs?.financeArchive?.data.length})</span>
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            {ability.can('read', 'orgInArchive') && <TabPane tabId='1'>
              <DataTableArchive data={store?.tabs?.outArchive?.data} columns={store?.tabs?.outArchive?.columns} showHeder={false}/>
            </TabPane>}
            {ability.can('read', 'orgInArchive') && <TabPane tabId='2'>
              <DataTableArchive data={store?.tabs?.inArchive?.data} columns={store?.tabs?.inArchive?.columns} showHeder={false}/>
            </TabPane>}
            {ability.can('read', 'orgCopyArchive') && <TabPane tabId='3'>
              <DataTableArchive data={store?.tabs?.copyToArchive?.data} columns={store?.tabs?.copyToArchive?.columns} showHeder={false}/>
            </TabPane>}
            {ability.can('read', 'orgOtherArchive') && <TabPane tabId='4'>
              <DataTableArchive data={store?.tabs?.model_docs?.data} columns={store?.tabs?.model_docs?.columns} showHeder={false}/>
            </TabPane>}
            {ability.can('read', 'orgContractArchive') && <TabPane tabId='5'>
              <DataTableArchive data={store?.tabs?.contractArchive?.data} columns={store?.tabs?.contractArchive?.columns} showHeder={false}/>
            </TabPane>}
            <TabPane tabId='6'>
              <DataTableArchive data={store?.tabs?.financeArchive?.data} columns={store?.tabs?.financeArchive?.columns} showHeder={false}/>
            </TabPane>
          </TabContent>
        </>
      )
    } else if (modelType === 'suppliers') {
      return (
        <>
          <Nav className='wrap-border nav-archive' pills fill >
            {ability.can('read', 'suppOutArchive') && <NavItem>
              <NavLink className='py-1' active={activeTab === '1'} onClick={() => toggle('1')}>
                {/*<User size={18} />*/}
                <span className='align-middle d-none d-sm-block nav-title'>أرشيف الصادر ({store?.tabs?.outArchive?.data.length})</span>
              </NavLink>
            </NavItem>}
            {ability.can('read', 'suppInArchive') && <NavItem>
              <NavLink className='py-1' active={activeTab === '2'} onClick={() => toggle('2')}>
                {/*<Info size={18} />*/}
                <span className='align-middle d-none d-sm-block nav-title'>أرشيف الوارد ({store?.tabs?.inArchive?.data.length})</span>
              </NavLink>
            </NavItem>}
            {ability.can('read', 'finaceArchive') && <NavItem>
              <NavLink className='py-1' active={activeTab === '3'} onClick={() => toggle('3')}>
                {/*<Info size={18} />*/}
                <span className='align-middle d-none d-sm-block nav-title'>أرشيف المالية ({store?.tabs?.financeArchive?.data.length})</span>
              </NavLink>
            </NavItem>}
            {ability.can('read', 'suppCopyArchive') && <NavItem>
              <NavLink className='py-1' active={activeTab === '4'} onClick={() => toggle('4')}>
                {/*<Share2 size={18} />*/}
                <span className='align-middle d-none d-sm-block nav-title'>نسخة الى ({store?.tabs?.copyToArchive?.data.length})</span>
              </NavLink>
            </NavItem>}
            {ability.can('read', 'suppOtherArchive') && <NavItem>
              <NavLink className='py-1' active={activeTab === '5'} onClick={() => toggle('5')}>
                {/*<Share2 size={18} />*/}
                <span className='align-middle d-none d-sm-block nav-title'>وثائق متنوعة ({store?.tabs?.model_docs?.data.length})</span>
              </NavLink>
            </NavItem>}
            {ability.can('read', 'suppContractArchive') && <NavItem>
              <NavLink className='py-1' active={activeTab === '6'} onClick={() => toggle('6')}>
                {/*<Share2 size={18} />*/}
                <span className='align-middle d-none d-sm-block nav-title'>أرشيف الاتفاقيات والعقود ({store?.tabs?.contractArchive?.data.length ? store?.tabs?.contractArchive?.data.length : 0})</span>
              </NavLink>
            </NavItem>}
          </Nav>
          <TabContent activeTab={activeTab}>
            {ability.can('read', 'suppInArchive') && <TabPane tabId='1'>
              <DataTableArchive data={store?.tabs?.outArchive?.data} columns={store?.tabs?.outArchive?.columns} showHeder={false}/>
            </TabPane>}
            {ability.can('read', 'suppInArchive') && <TabPane tabId='2'>
              <DataTableArchive data={store?.tabs?.inArchive?.data} columns={store?.tabs?.inArchive?.columns} showHeder={false}/>
            </TabPane>}
            {ability.can('read', 'finaceArchive') && <TabPane tabId='3'>
              <DataTableArchive data={store?.tabs?.financeArchive?.data} columns={store?.tabs?.financeArchive?.columns} showHeder={false}/>
            </TabPane>}
            {ability.can('read', 'suppCopyArchive') && <TabPane tabId='4'>
              <DataTableArchive data={store?.tabs?.copyToArchive?.data} columns={store?.tabs?.copyToArchive?.columns} showHeder={false}/>
            </TabPane>}
            {ability.can('read', 'suppOtherArchive') && <TabPane tabId='5'>
              <DataTableArchive data={store?.tabs?.model_docs?.data} columns={store?.tabs?.model_docs?.columns} showHeder={false}/>
            </TabPane>}
            {ability.can('read', 'suppContractArchive') && <TabPane tabId='6'>
              <DataTableArchive data={store?.tabs?.contractArchive?.data} columns={store?.tabs?.contractArchive?.columns} showHeder={false}/>
            </TabPane>}
          </TabContent>
        </>
      )
    } else if (modelType === 'banks') {
      return (
        <>
          <Nav className='wrap-border nav-archive' pills fill >
            {ability.can('read', 'bankOutArchive') && <NavItem>
              <NavLink className='py-1' active={activeTab === '1'} onClick={() => toggle('1')}>
                {/*<User size={18} />*/}
                <span className='align-middle d-none d-sm-block nav-title'>أرشيف الصادر ({store?.tabs?.outArchive?.data.length})</span>
              </NavLink>
            </NavItem>}
            {ability.can('read', 'bankInArchive') && <NavItem>
              <NavLink className='py-1' active={activeTab === '2'} onClick={() => toggle('2')}>
                {/*<Info size={18} />*/}
                <span className='align-middle d-none d-sm-block nav-title'>أرشيف الوارد ({store?.tabs?.inArchive?.data.length})</span>
              </NavLink>
            </NavItem>}
            {ability.can('read', 'bankCopyArchive') && <NavItem>
              <NavLink className='py-1' active={activeTab === '3'} onClick={() => toggle('3')}>
                {/*<Share2 size={18} />*/}
                <span className='align-middle d-none d-sm-block nav-title'>نسخة الى ({store?.tabs?.copyToArchive?.data.length})</span>
              </NavLink>
            </NavItem>}
            {ability.can('read', 'bankOtherArchive') && <NavItem>
              <NavLink className='py-1' active={activeTab === '4'} onClick={() => toggle('4')}>
                {/*<Share2 size={18} />*/}
                <span className='align-middle d-none d-sm-block nav-title'>وثائق متنوعة ({store?.tabs?.model_docs?.data.length})</span>
              </NavLink>
            </NavItem>}
            {ability.can('read', 'bankContractArchive') && <NavItem>
              <NavLink className='py-1' active={activeTab === '5'} onClick={() => toggle('5')}>
                {/*<Share2 size={18} />*/}
                <span className='align-middle d-none d-sm-block nav-title'>أرشيف الاتفاقيات والعقود ({store?.tabs?.contractArchive?.data.length ? store?.tabs?.contractArchive?.data.length : 0})</span>
              </NavLink>
            </NavItem>}
            <NavItem>
              <NavLink className='py-1' active={activeTab === '6'} onClick={() => toggle('6')}>
                {/*<Info size={18} />*/}
                <span className='align-middle d-none d-sm-block nav-title'>أرشيف المالية ({store?.tabs?.financeArchive?.data.length})</span>
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            {ability.can('read', 'bankInArchive') && <TabPane tabId='1'>
              <DataTableArchive data={store?.tabs?.outArchive?.data} columns={store?.tabs?.outArchive?.columns} showHeder={false}/>
            </TabPane>}
            {ability.can('read', 'bankInArchive') && <TabPane tabId='2'>
              <DataTableArchive data={store?.tabs?.inArchive?.data} columns={store?.tabs?.inArchive?.columns} showHeder={false}/>
            </TabPane>}
            {ability.can('read', 'bankCopyArchive') && <TabPane tabId='3'>
              <DataTableArchive data={store?.tabs?.copyToArchive?.data} columns={store?.tabs?.copyToArchive?.columns} showHeder={false}/>
            </TabPane>}
            {ability.can('read', 'bankOtherArchive') && <TabPane tabId='4'>
              <DataTableArchive data={store?.tabs?.model_docs?.data} columns={store?.tabs?.model_docs?.columns} showHeder={false}/>
            </TabPane>}
            {ability.can('read', 'bankContractArchive') && <TabPane tabId='5'>
              <DataTableArchive data={store?.tabs?.contractArchive?.data} columns={store?.tabs?.contractArchive?.columns} showHeder={false}/>
            </TabPane>}
            <TabPane tabId='6'>
              <DataTableArchive data={store?.tabs?.financeArchive?.data} columns={store?.tabs?.financeArchive?.columns} showHeder={false}/>
            </TabPane>
          </TabContent>
        </>
      )
    } else if (modelType === 'enginering' || modelType === 'space') {
      return (
        <>
          <Nav className='wrap-border nav-archive' pills fill >
            {ability.can('read', 'officeOutArchive') && <NavItem>
              <NavLink className='py-1' active={activeTab === '1'} onClick={() => toggle('1')}>
                {/*<User size={18} />*/}
                <span className='align-middle d-none d-sm-block nav-title'>أرشيف الصادر ({store?.tabs?.outArchive?.data.length})</span>
              </NavLink>
            </NavItem>}
            {ability.can('read', 'officeInArchive') && <NavItem>
              <NavLink className='py-1' active={activeTab === '2'} onClick={() => toggle('2')}>
                {/*<Info size={18} />*/}
                <span className='align-middle d-none d-sm-block nav-title'>أرشيف الوارد ({store?.tabs?.inArchive?.data.length})</span>
              </NavLink>
            </NavItem>}
            {ability.can('read', 'officeCopyArchive') && <NavItem>
              <NavLink className='py-1' active={activeTab === '3'} onClick={() => toggle('3')}>
                {/*<Share2 size={18} />*/}
                <span className='align-middle d-none d-sm-block nav-title'>نسخة الى ({store?.tabs?.copyToArchive?.data.length})</span>
              </NavLink>
            </NavItem>}
            {ability.can('read', 'officeOtherArchive') && <NavItem>
              <NavLink className='py-1' active={activeTab === '4'} onClick={() => toggle('4')}>
                {/*<Share2 size={18} />*/}
                <span className='align-middle d-none d-sm-block nav-title'>وثائق متنوعة ({store?.tabs?.model_docs?.data.length})</span>
              </NavLink>
            </NavItem>}
            {ability.can('read', 'officeContractArchive') && <NavItem>
              <NavLink className='py-1' active={activeTab === '5'} onClick={() => toggle('5')}>
                {/*<Share2 size={18} />*/}
                <span className='align-middle d-none d-sm-block nav-title'>أرشيف الاتفاقيات والعقود ({store?.tabs?.contractArchive?.data.length ? store?.tabs?.contractArchive?.data.length : 0})</span>
              </NavLink>
            </NavItem>}
            <NavItem>
              <NavLink className='py-1' active={activeTab === '6'} onClick={() => toggle('6')}>
                {/*<Info size={18} />*/}
                <span className='align-middle d-none d-sm-block nav-title'>أرشيف المالية ({store?.tabs?.financeArchive?.data.length})</span>
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            {ability.can('read', 'officeInArchive') && <TabPane tabId='1'>
              <DataTableArchive data={store?.tabs?.outArchive?.data} columns={store?.tabs?.outArchive?.columns} showHeder={false}/>
            </TabPane>}
            {ability.can('read', 'officeInArchive') && <TabPane tabId='2'>
              <DataTableArchive data={store?.tabs?.inArchive?.data} columns={store?.tabs?.inArchive?.columns} showHeder={false}/>
            </TabPane>}
            {ability.can('read', 'officeCopyArchive') && <TabPane tabId='3'>
              <DataTableArchive data={store?.tabs?.copyToArchive?.data} columns={store?.tabs?.copyToArchive?.columns} showHeder={false}/>
            </TabPane>}
            {ability.can('read', 'officeOtherArchive') && <TabPane tabId='4'>
              <DataTableArchive data={store?.tabs?.model_docs?.data} columns={store?.tabs?.model_docs?.columns} showHeder={false}/>
            </TabPane>}
            {ability.can('read', 'officeContractArchive') && <TabPane tabId='5'>
              <DataTableArchive data={store?.tabs?.contractArchive?.data} columns={store?.tabs?.contractArchive?.columns} showHeder={false}/>
            </TabPane>}
            <TabPane tabId='6'>
              <DataTableArchive data={store?.tabs?.financeArchive?.data} columns={store?.tabs?.financeArchive?.columns} showHeder={false}/>
            </TabPane>
          </TabContent>
        </>
      )
    } else if (modelType === 'equip') {
      return (
        <>
          <Nav className='wrap-border nav-archive' pills fill >
            {ability.can('read', 'equipArchive') && <NavItem>
              <NavLink className='py-1' active={activeTab === '1'} onClick={() => toggle('1')}>
                {/*<User size={18} />*/}
                <span className='align-middle d-none d-sm-block nav-title'>الأرشيف ({store?.tabs?.assetsArchive?.data.length ? store?.tabs?.assetsArchive?.data.length : 0})</span>
              </NavLink>
            </NavItem>}
            {ability.can('read', 'equipCopyArchive') && <NavItem>
              <NavLink className='py-1' active={activeTab === '2'} onClick={() => toggle('2')}>
                {/*<Share2 size={18} />*/}
                <span className='align-middle d-none d-sm-block nav-title'>نسخة الى ({store?.tabs?.copyToArchive?.data.length})</span>
              </NavLink>
            </NavItem>}
            {ability.can('read', 'equipContractArchive') && <NavItem>
              <NavLink className='py-1' active={activeTab === '3'} onClick={() => toggle('3')}>
                {/*<Share2 size={18} />*/}
                <span className='align-middle d-none d-sm-block nav-title'>أرشيف الاتفاقيات والعقود ({store?.tabs?.contractArchive?.data.length ? store?.tabs?.contractArchive?.data.length : 0})</span>
              </NavLink>
            </NavItem>}
            <NavItem>
              <NavLink className='py-1' active={activeTab === '4'} onClick={() => toggle('4')}>
                {/*<Info size={18} />*/}
                <span className='align-middle d-none d-sm-block nav-title'>أرشيف المالية ({store?.tabs?.financeArchive?.data.length})</span>
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            {ability.can('read', 'equipArchive') && <TabPane tabId='1'>
              <DataTableArchive data={store?.tabs?.assetsArchive?.data} columns={store?.tabs?.assetsArchive?.columns} showHeder={false}/>
            </TabPane>}
            {ability.can('read', 'equipCopyArchive') && <TabPane tabId='2'>
              <DataTableArchive data={store?.tabs?.copyToArchive?.data} columns={store?.tabs?.copyToArchive?.columns} showHeder={false}/>
            </TabPane>}
            {ability.can('read', 'equipContractArchive') && <TabPane tabId='3'>
              <DataTableArchive data={store?.tabs?.contractArchive?.data} columns={store?.tabs?.contractArchive?.columns} showHeder={false}/>
            </TabPane>}
            <TabPane tabId='4'>
              <DataTableArchive data={store?.tabs?.financeArchive?.data} columns={store?.tabs?.financeArchive?.columns} showHeder={false}/>
            </TabPane>
          </TabContent>
        </>
      )
    } else if (modelType === 'vehicle') {
      return <>
        <Nav className='wrap-border nav-archive' pills fill >
          {ability.can('read', 'vehcileArchive') && <NavItem>
            <NavLink className='py-1' active={activeTab === '1'} onClick={() => toggle('1')}>
              {/*<User size={18} />*/}
              <span className='align-middle d-none d-sm-block nav-title'>الأرشيف ({store?.tabs?.assetsArchive?.data.length ? store?.tabs?.assetsArchive?.data.length : 0})</span>
            </NavLink>
          </NavItem>}
          {ability.can('read', 'vehcileCopyArchive') && <NavItem>
            <NavLink className='py-1' active={activeTab === '2'} onClick={() => toggle('2')}>
              {/*<Share2 size={18} />*/}
              <span className='align-middle d-none d-sm-block nav-title'>نسخة الى ({store?.tabs?.copyToArchive?.data.length})</span>
            </NavLink>
          </NavItem>}
          {ability.can('read', 'vehcileContractArchive') && <NavItem>
            <NavLink className='py-1' active={activeTab === '3'} onClick={() => toggle('3')}>
              {/*<Share2 size={18} />*/}
              <span className='align-middle d-none d-sm-block nav-title'>أرشيف الاتفاقيات والعقود ({store?.tabs?.contractArchive?.data.length ? store?.tabs?.contractArchive?.data.length : 0})</span>
            </NavLink>
          </NavItem>}
          <NavItem>
            <NavLink className='py-1' active={activeTab === '4'} onClick={() => toggle('4')}>
              {/*<Share2 size={18} />*/}
              <span className='align-middle d-none d-sm-block nav-title'>أرشيف المعاملات ({store?.tabs?.tradeArchive?.data.length ? store?.tabs?.tradeArchive?.data.length : 0})</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className='py-1' active={activeTab === '5'} onClick={() => toggle('5')}>
              {/*<Info size={18} />*/}
              <span className='align-middle d-none d-sm-block nav-title'>أرشيف المالية ({store?.tabs?.financeArchive?.data.length})</span>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          {ability.can('read', 'vehcileArchive') && <TabPane tabId='1'>
            <DataTableArchive data={store?.tabs?.assetsArchive?.data} columns={store?.tabs?.assetsArchive?.columns} showHeder={false}/>
          </TabPane>}
          {ability.can('read', 'vehcileCopyArchive') && <TabPane tabId='2'>
            <DataTableArchive data={store?.tabs?.copyToArchive?.data} columns={store?.tabs?.copyToArchive?.columns} showHeder={false}/>
          </TabPane>}
          {ability.can('read', 'vehcileContractArchive') && <TabPane tabId='3'>
            <DataTableArchive data={store?.tabs?.contractArchive?.data} columns={store?.tabs?.contractArchive?.columns} showHeder={false}/>
          </TabPane>}
          <TabPane tabId='4'>
            <DataTableArchive data={store?.tabs?.tradeArchive?.data} columns={store?.tabs?.tradeArchive?.columns} showHeder={false}/>
          </TabPane>
          <TabPane tabId='5'>
            <DataTableArchive data={store?.tabs?.financeArchive?.data} columns={store?.tabs?.financeArchive?.columns} showHeder={false}/>
          </TabPane>
        </TabContent>
      </>
    } else if (modelType === 'show_buildings' || modelType === 'show_warehouses' || modelType === 'show_gardens_lands') {
      return <>
        <Nav className='wrap-border nav-archive' pills fill >
          {ability.can('read', 'assetsArchive') && <NavItem>
            <NavLink className='py-1' active={activeTab === '1'} onClick={() => toggle('1')}>
              {/*<User size={18} />*/}
              <span className='align-middle d-none d-sm-block nav-title'>الأرشيف ({store?.tabs?.assetsArchive?.data.length ? store?.tabs?.assetsArchive?.data.length : 0})</span>
            </NavLink>
          </NavItem>}
          {ability.can('read', 'assetsCopyArchive') && <NavItem>
            <NavLink className='py-1' active={activeTab === '2'} onClick={() => toggle('2')}>
              {/*<Share2 size={18} />*/}
              <span className='align-middle d-none d-sm-block nav-title'>نسخة الى ({store?.tabs?.copyToArchive?.data.length})</span>
            </NavLink>
          </NavItem>}
          {ability.can('read', 'assetsContractArchive') && <NavItem>
            <NavLink className='py-1' active={activeTab === '3'} onClick={() => toggle('3')}>
              {/*<Share2 size={18} />*/}
              <span className='align-middle d-none d-sm-block nav-title'>أرشيف الاتفاقيات والعقود ({store?.tabs?.contractArchive?.data.length ? store?.tabs?.contractArchive?.data.length : 0})</span>
            </NavLink>
          </NavItem>}
          <NavItem>
            <NavLink className='py-1' active={activeTab === '4'} onClick={() => toggle('4')}>
              {/*<Info size={18} />*/}
              <span className='align-middle d-none d-sm-block nav-title'>أرشيف المالية ({store?.tabs?.financeArchive?.data.length})</span>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          {ability.can('read', 'assetsArchive') && <TabPane tabId='1'>
            <DataTableArchive data={store?.tabs?.assetsArchive?.data} columns={store?.tabs?.assetsArchive?.columns} showHeder={false}/>
          </TabPane>}
          {ability.can('read', 'assetsCopyArchive') && <TabPane tabId='2'>
            <DataTableArchive data={store?.tabs?.copyToArchive?.data} columns={store?.tabs?.copyToArchive?.columns} showHeder={false}/>
          </TabPane>}
          {ability.can('read', 'assetsContractArchive') && <TabPane tabId='3'>
            <DataTableArchive data={store?.tabs?.contractArchive?.data} columns={store?.tabs?.contractArchive?.columns} showHeder={false}/>
          </TabPane>}
          <TabPane tabId='4'>
            <DataTableArchive data={store?.tabs?.financeArchive?.data} columns={store?.tabs?.financeArchive?.columns} showHeder={false}/>
          </TabPane>
        </TabContent>
      </>
    } else if (modelType === 'orgnization_details') {
      return <>
        <Nav className='wrap-border nav-archive' pills fill >
          <NavItem>
            <NavLink className='py-1' active={activeTab === '1'} onClick={() => toggle('1')}>
              {/*<User size={18} />*/}
              <span className='align-middle d-none d-sm-block nav-title'>ارشيف المؤسسة ({store?.tabs?.munArchive?.data.length ? store?.tabs?.munArchive?.data.length : 0})</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className='py-1' active={activeTab === '2'} onClick={() => toggle('2')}>
              {/*<Share2 size={18} />*/}
              <span className='align-middle d-none d-sm-block nav-title'>ارشيف القوانين والاجراءات ({store?.tabs?.lawArchieve?.data.length})</span>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId='1'>
            <DataTableArchive data={store?.tabs?.munArchive?.data} columns={store?.tabs?.munArchive?.columns} showHeder={false}/>
          </TabPane>
          <TabPane tabId='2'>
            <DataTableArchive data={store?.tabs?.lawArchieve?.data} columns={store?.tabs?.lawArchieve?.columns} showHeder={false}/>
          </TabPane>
        </TabContent>
      </>
    }
    return (
      <>
        <Nav className='wrap-border nav-archive' pills fill >
          <NavItem>
            <NavLink className='py-1' active={activeTab === '1'} onClick={() => toggle('1')}>
              {/*<User size={18} />*/}
              <span className='align-middle d-none d-sm-block nav-title'>أرشيف الصادر ({store?.tabs?.outArchive?.data.length})</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className='py-1' active={activeTab === '2'} onClick={() => toggle('2')}>
              {/*<Info size={18} />*/}
              <span className='align-middle d-none d-sm-block nav-title'>أرشيف الوارد ({store?.tabs?.inArchive?.data.length})</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className='py-1' active={activeTab === '3'} onClick={() => toggle('3')}>
              {/*<Share2 size={18} />*/}
              <span className='align-middle d-none d-sm-block nav-title'>نسخة الى ({store?.tabs?.copyToArchive?.data.length})</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className='py-1' active={activeTab === '4'} onClick={() => toggle('4')}>
              {/*<Share2 size={18} />*/}
              <span className='align-middle d-none d-sm-block nav-title'>وثائق متنوعة ({store?.tabs?.model_docs?.data.length})</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className='py-1' active={activeTab === '5'} onClick={() => toggle('5')}>
              {/*<Share2 size={18} />*/}
              <span className='align-middle d-none d-sm-block nav-title'>أرشيف الاتفاقيات والعقود ({store?.tabs?.contractArchive?.data.length ? store?.tabs?.contractArchive?.data.length : 0})</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className='py-1' active={activeTab === '6'} onClick={() => toggle('6')}>
              {/*<Info size={18} />*/}
              <span className='align-middle d-none d-sm-block nav-title'>أرشيف المالية ({store?.tabs?.financeArchive?.data.length})</span>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId='1'>
            <DataTableArchive data={store?.tabs?.outArchive?.data} columns={store?.tabs?.outArchive?.columns} showHeder={false}/>
          </TabPane>
          <TabPane tabId='2'>
            <DataTableArchive data={store?.tabs?.inArchive?.data} columns={store?.tabs?.inArchive?.columns} showHeder={false}/>
          </TabPane>
          <TabPane tabId='3'>
            <DataTableArchive data={store?.tabs?.copyToArchive?.data} columns={store?.tabs?.copyToArchive?.columns} showHeder={false}/>
          </TabPane>
          <TabPane tabId='4'>
            <DataTableArchive data={store?.tabs?.model_docs?.data} columns={store?.tabs?.model_docs?.columns} showHeder={false}/>
          </TabPane>
          <TabPane tabId='5'>
            <DataTableArchive data={store?.tabs?.contractArchive?.data} columns={store?.tabs?.contractArchive?.columns} showHeder={false}/>
          </TabPane>
          <TabPane tabId='6'>
            <DataTableArchive data={store?.tabs?.financeArchive?.data} columns={store?.tabs?.financeArchive?.columns} showHeder={false}/>
          </TabPane>
        </TabContent>
      </>
    )
  }
  return (
    <Row className='app-user-edit'>
      <Col sm='12'>
        <RenderTabs />
      </Col>
    </Row>
  )
}
export default ArchiveTabs
