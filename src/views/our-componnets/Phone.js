import {Col, FormFeedback, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Label} from "reactstrap"

const PhoneComponent = (props) => {
   return (
       <Col sm={(props.sm ?? 12)} md={(props.md ?? 4)}>
        <FormGroup>
            <Label for='phone1'>رقم الهاتف</Label>
            <InputGroup className='input-group-merge' tag={FormGroup}>
                <InputGroupAddon addonType='prepend'>
                    <InputGroupText>
                        <img src={(props.img ?? '')} style={{ width: '22px' }} className='headings' />
                    </InputGroupText>
                </InputGroupAddon>
                <Input
                    id={props.id}
                    name={props.name}
                    type='text'
                    maxLength="10"
                    innerRef={props?.register({ required: true })}
                    invalid={(props?.errors?.phone1 ?? true) && true}
                    placeholder='رقم الهاتف'
                />
            </InputGroup>
            {props.errors && props?.errors?.phone1 &&
                <FormFeedback>{props?.errors?.phone1?.message}</FormFeedback>}
        </FormGroup>
    </Col>
   )
}
export default PhoneComponent