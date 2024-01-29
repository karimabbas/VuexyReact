// ** User List Component
import Table from './Table'
import WaterForm from './WaterForm'
// ** Styles
import '@styles/react/apps/app-users.scss'
import { Fragment } from 'react'
import { Card, CardBody, CardHeader, CardTitle } from 'reactstrap'

const UsersList = () => {
  return (
    <div className='app-user-list'>
      <Fragment>
        <Card>
          <CardHeader>
            <CardTitle tag='h4'>إضافة إشتراك مياة</CardTitle>
          </CardHeader>
          <CardBody>
          <WaterForm />

          </CardBody>
        </Card>
        <Table />

      </Fragment>
    </div>
  )
}

export default UsersList
