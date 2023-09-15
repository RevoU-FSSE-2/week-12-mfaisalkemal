import { Card, Text } from '../../components';
import { Input, Button } from 'antd';
import { useFormik } from 'formik';
import * as yup from 'yup'

interface AccountInformationProps {
    formData: { username: string, password: string };
    onPrev: () => void;
}

interface AccountInformation {
    username: string;
    password: string;
}

const initialValues = {
    username: '',
    password: ''
}

const validationSchema = yup.object({
    username: yup.string().required('Username required'),
    password: yup.string().required('Password required').matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    )
})

const FormAccountInformation: React.FC<AccountInformationProps> = ({ formData, onPrev }) => {

    const handleSubmit = (values: AccountInformation) => {
        console.log(values)
    }

    const formMik = useFormik({
        initialValues: {
            username: formData.username,
            password: formData.password
        },
        onSubmit: handleSubmit,
        validationSchema: validationSchema
    })


    return (
        <Card title={'Account Information'}>
            <form onSubmit={formMik.handleSubmit}>
                <div>
                    <Text>Username: </Text>
                    <Input name={'username'}
                        value={formMik.values.username} 
                        onChange={formMik.handleChange('username')}
                        status={formMik.errors.username && 'error'}
                    />
                    {formMik.errors.username && (
                        <Text>{formMik.errors.username}</Text>
                    )}
                </div>
                <div>
                    <Text>Password: </Text>
                    <Input type="password" name={'password'} 
                        value={formMik.values.password}
                        onChange={formMik.handleChange('password')}
                        status={formMik.errors.password && 'error'}
                        />
                    {formMik.errors.password && (
                        <Text>{formMik.errors.password}</Text>
                    )}
                </div>
                <br></br>
                <Button type={'primary'} onClick={onPrev}>Back </Button>
            </form>
        </Card>
    )
}

export default FormAccountInformation