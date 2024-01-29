import { useContext } from 'react'
import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap'
import { ThemeColors } from '@src/utility/context/ThemeColors'
import Earnings from '@src/views/ui-elements/cards/analytics/Earnings'
import CardMedal from '@src/views/ui-elements/cards/advance/CardMedal'
import StatsCard from '@src/views/ui-elements/cards/statistics/StatsCard'
import RevenueReport from '@src/views/ui-elements/cards/analytics/RevenueReport'
import OrdersBarChart from '@src/views/ui-elements/cards/statistics/OrdersBarChart'
import ProfitLineChart from '@src/views/ui-elements/cards/statistics/ProfitLineChart'

import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/base/pages/dashboard-ecommerce.scss'
// import LOGO from '@outAssets/images/icon/LOGO.png'
// import '@outAssets/scss/pages/dashboard.scss'
import CustomNavbarSearchMain from '@src/@core/layouts/components/navbar/CustomNavbarSearchMain'
const Dashboard = () => {
  const { colors } = useContext(ThemeColors)
  return (
    <div id='dashboard-ecommerce'>
      <Row className='match-height'>
        <Col md='4' xs='12'>
          <Row>
            <Col md='12'>
              <CardMedal />
            </Col>
            <Col md='6'>
              <OrdersBarChart warning={colors.warning.main} />
            </Col>
            <Col md='6'>
              <ProfitLineChart info={colors.info.main} />
            </Col>
            <Col md='12'>
              <Earnings success={colors.success.main} />
            </Col>
          </Row>
        </Col>
        <Col md='8' xs='12'>
          <Card className=''>
            <img src={'https://t.palexpand.ps/assets/images/ico/user.png'} alt='expand' className='mx-auto logo-main-expand' />
            <CardBody className='d-flex justify-content-center'>
              <CustomNavbarSearchMain />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard
