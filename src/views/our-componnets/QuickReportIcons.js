import {CardText, Col, Row} from "reactstrap"
import {FaCar} from "react-icons/fa"
import ArchiveInfo from './ArchiveInfo/index'

const QuickReportIcons = (props) => {
    const citizenIconController = props.citizenIconController
    return (
        <Col sm={"12"} md={"12"}>
            <Row>
                {citizenIconController.lic && <Col sm={"2"} md={"2"}>
                    <center>
                        <img src={'https://db.expand.ps/images/Eng64.png'} alt='user-avatar'
                             className='img-fluid rounded' height='65' width='65'/>
                        <CardText>
                            رخص بناء
                            (0)
                        </CardText>
                    </center>
                </Col>}
                {citizenIconController.elec && <Col sm={"2"} md={"2"}>
                    <center>
                        <img src={'https://db.expand.ps/images/electric64.png'}
                             alt='user-avatar'
                             className='img-fluid rounded' height='45' width='45'/>
                        <CardText>
                            قسم الكهرباء
                            (0)
                        </CardText>
                    </center>
                </Col>}
                {citizenIconController.water && <Col sm={"2"} md={"2"}>
                    <center>
                        <img src={'https://db.expand.ps/images/water-faucet64.png'}
                             alt='user-avatar'
                             className='img-fluid rounded' height='65' width='65'/>
                        <CardText>
                            قسم المياه
                            (0)
                        </CardText>
                    </center>
                </Col>}
                {citizenIconController.archive && <Col sm={"2"} md={"2"}>
                    <center>
                    <ArchiveInfo modelData={props.modelData} type={props.type} />
                    </center>
                </Col>}
                {citizenIconController.job && <Col sm={"2"} md={"2"}>
                    <center>
                        <img src={'https://db.expand.ps/images/ico6.jpg'} alt='user-avatar'
                             className='img-fluid rounded' height='65' width='65'/>
                        <CardText>
                            رخص حرف
                            (0)
                        </CardText>
                    </center>
                </Col>}
                {citizenIconController.tasks && <Col sm={"2"} md={"2"}>
                    <center>
                        <img src={'https://db.expand.ps/images/rep.png'} alt='user-avatar'
                             className='img-fluid rounded' height='65' width='65'/>
                        <CardText>
                            تقارير
                            (0)
                        </CardText>
                    </center>
                </Col>}
                {citizenIconController.car && <Col sm={"2"} md={"2"}>
                    <center>
                        <FaCar size={70}/>
                        <CardText>
                            السيارات
                            (0)
                        </CardText>
                    </center>
                </Col>}
            </Row>
        </Col>
    )
}
export default QuickReportIcons