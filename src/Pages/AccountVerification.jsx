import React, { useState } from 'react'
import PageTitle from '../Components/PageTitle'
import OTPInput from 'react-otp-input'
import { Button } from 'antd';
import emailPic from "../assets/emailPic.jpeg";
import useFetchProfile from '../utils/useFetchProfile';

function AccountVerification() {
    const [otp, setOtp] = useState('');
    const { user, setUser } = useFetchProfile();
    const [loadings, setLoadings] = useState([]);


    const joinClass = (index) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });

        console.log("otp ==>", otp);
        setTimeout(() => {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;
                return newLoadings;
            });
        }, 3000)
    };

    console.log("user==>", user);
    

    return (
        <div className='px-2 bg-blue-50'>
            <PageTitle title={"Account Verification"} />
            <div className="flex items-center justify-center min-h-screen ">
                <div className="bg-white py-8 px-3 sm:px-8 rounded-lg shadow-lg max-w-md w-full text-center">
                    <img
                        src={emailPic}
                        alt="Verification"
                        className="mx-auto mb-6"
                        width="100"
                        height="100"
                        style={{ aspectRatio: "100/100", objectFit: "cover" }}
                    />
                    <h2 className="text-2xl font-bold mb-4">Please Verify Account</h2>
                    <p className="text-gray-600 mb-6">
                        Enter the six digit code we sent to your email address to verify your new account:
                    </p>
                    <div className="flex justify-center space-x-2 mb-6">
                        <OTPInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={7}
                            renderInput={(props) => <input {...props} />}
                            inputStyle={{ border: "1px solid #d1d5db", fontSize: "20px", textAlign: "center", width: "40px", height: "40px", borderRadius: "5px", color: "black", }}
                            placeholder='1a2b3cd'
                            containerStyle={{ flexWrap: "wrap", gap: "10px", justifyContent: "center" }}
                        />
                    </div>
                    <Button disabled={otp.length !== 7} loading={loadings[1]} type='primary' onClick={() => joinClass(1)} className='bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700'>
                        Verify & Continue
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AccountVerification