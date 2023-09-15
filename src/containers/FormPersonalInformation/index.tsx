import { Card, Text } from '../../components';
import { Input, Button } from 'antd';
import { useFormik } from 'formik';
import * as yup from 'yup'
import { sub } from "date-fns/fp"
import { parse } from "date-fns"

interface PersonalInformationProps {
    formData: { fullname: string; email: string, dateofbirth: string  };
    onNext: () => void;
}

interface PersonalInformation {
    fullname: string;
    email: string;
    dateofbirth: string;
}

const validationSchema = yup.object({
    fullname: yup.string().required('Full name required'),
    email: yup.string().email().required('Email required'),
    dateofbirth: yup.date().transform((value, originalValue, context) => {
        if (context.isType(value)) return value;
  
        return parse(originalValue, 'dd/MM/yyyy', new Date());
    }).required('Date of birth required').max(sub({years:18}, new Date()), "Age must be over 18 years old")
})

const FormPersonalInformation: React.FC<PersonalInformationProps> = ({ formData, onNext }) => {

    const handleSubmit = (values: PersonalInformation) => {
        console.log(values)
    }

    const formMik = useFormik({
        initialValues: {
            fullname: formData.fullname,
            email: formData.email,
            dateofbirth: formData.dateofbirth
        },
        onSubmit: handleSubmit,
        validationSchema: validationSchema
    })

    const handleNext = () => {
        formMik.handleSubmit();
        if (formMik.isValid) {
            onNext();
        }
    };
    return (
        <Card title={'Personal Information'}>
            <form onSubmit={formMik.handleSubmit}>
                <div>
                    <Text>Full Name: </Text>
                    <Input name={'fullname'}
                        value={formMik.values.fullname} 
                        onChange={formMik.handleChange('fullname')}
                        status={formMik.errors.fullname && 'error'}
                    />
                    {formMik.errors.fullname && (
                        <Text>{formMik.errors.fullname}</Text>
                    )}
                </div>
                <div>
                    <Text>Email: </Text>
                    <Input name={'email'} 
                        value={formMik.values.email}
                        onChange={formMik.handleChange('email')}
                        status={formMik.errors.email && 'error'}
                        />
                    {formMik.errors.email && (
                        <Text>{formMik.errors.email}</Text>
                    )}
                    
                </div>
                <div>
                    <Text>Date Of Birth: </Text>
                    <Input name={'dateofbirth'} 
                        value={formMik.values.dateofbirth}
                        onChange={formMik.handleChange('dateofbirth')}
                        status={formMik.errors.dateofbirth && 'error'}
                    />
                    {formMik.errors.dateofbirth && (
                        <Text>{formMik.errors.dateofbirth}</Text>
                    )}
                </div>
                <br></br>
                <Button type={'primary'} onClick={handleNext} >Next </Button>
            </form>
        </Card>
    )
}

export default FormPersonalInformation