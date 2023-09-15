import { Card, Text } from '../../components';
import { Input, Button } from 'antd';
import { useFormik } from 'formik';
import * as yup from 'yup'

interface AddressInformation {
    streetaddress: string;
    city: string;
    state: string;
    zipcode: string;
}

const initialValues = {
    streetaddress: '',
    city: '',
    state: '',
    zipcode: ''
}

const validationSchema = yup.object({
    streetaddress: yup.string().required('Street address required'),
    city: yup.string().required('City required'),
    state: yup.string().required('State required'),
    zipcode: yup.string().length(5).matches(/^[0-9]{5}/).required('Zip code required') 
})

const FormAddressInformation = () => {

    const handleSubmit = (values: AddressInformation) => {
        console.log(values)
    }

    const formMik = useFormik({
        initialValues: initialValues,
        onSubmit: handleSubmit,
        validationSchema: validationSchema
    })


    return (
        <Card title={'Address'}>
            <form onSubmit={formMik.handleSubmit}>
                <div>
                    <Text>Street Address: </Text>
                    <Input name={'streetaddress'}
                        value={formMik.values.streetaddress} 
                        onChange={formMik.handleChange('streetaddress')}
                        status={formMik.errors.streetaddress && 'error'}
                    />
                    {formMik.errors.streetaddress && (
                        <Text>{formMik.errors.streetaddress}</Text>
                    )}
                </div>
                <div>
                    <Text>City: </Text>
                    <Input name={'city'} 
                        value={formMik.values.city}
                        onChange={formMik.handleChange('city')}
                        status={formMik.errors.city && 'error'}
                        />
                    {formMik.errors.city && (
                        <Text>{formMik.errors.city}</Text>
                    )}
                    
                </div>
                <div>
                    <Text>State: </Text>
                    <Input name={'state'} 
                        value={formMik.values.state}
                        onChange={formMik.handleChange('state')}
                        status={formMik.errors.state && 'error'}
                    />
                    {formMik.errors.state && (
                        <Text>{formMik.errors.state}</Text>
                    )}
                </div>
                <div>
                    <Text>Zip Code: </Text>
                    <Input name={'zipcode'}
                        value={formMik.values.zipcode} 
                        onChange={formMik.handleChange('zipcode')}
                        status={formMik.errors.zipcode && 'error'}
                    />
                    {formMik.errors.zipcode && (
                        <Text>{formMik.errors.zipcode}</Text>
                    )}
                </div>
                <br></br>
                <Button type={'primary'} >Back </Button>
                <span>&emsp;</span>
                <Button type={'primary'} >Next </Button>
                {/* <Button type={'primary'} htmlType={"submit"}>Submit</Button> */}
            </form>
        </Card>
    )
}

export default FormAddressInformation