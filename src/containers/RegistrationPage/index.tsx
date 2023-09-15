import { useState } from "react";
import { FormPersonalInformation, FormAddressInformation, FormAccountInformation } from "..";

const RegistrationPage = () => {
    const [step, setStep] = useState<number>(1);

    const [formData, setFormData] = useState<{
        fullname: string;
        email: string;
        dateofbirth: string;
        streetaddress: string;
        city: string;
        state: string;
        zipcode: string;
        username: string;
        password: string;
      }>({
        fullname: '',
        email: '',
        dateofbirth: '',
        streetaddress: '',
        city: '',
        state:'',
        zipcode: '',
        username: '',
        password: ''
      });

    const handleNext = () => {
        console.log(formData)
        if(step === 1) {
            setStep((prevStep) => prevStep+1);
        }
        if(step === 2) {
            setStep((prevStep) => prevStep+1);
        }

        return
    }
    const handlePrev = () => {
        if(step === 2) {
            setStep((prevStep) => prevStep - 1);
        }
        if(step === 3) {
            setStep((prevStep) => prevStep - 1);
        }

        return
    }

    return (
        <>
            <div>
                {step === 1 && (
                    <FormPersonalInformation formData={formData} onNext={handleNext} />
                )}
                {step === 2 && (
                    <FormAddressInformation formData={formData} onNext={handleNext} onPrev={handlePrev} />
                )}
                {step === 3 && (
                    <FormAccountInformation formData={formData} onPrev={handlePrev}/>
                )}
            </div>
        </>
    )
}

export default RegistrationPage;