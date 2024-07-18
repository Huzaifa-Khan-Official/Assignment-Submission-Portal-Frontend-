import React, { useEffect, useState } from 'react'
import { BellFilled, PlusOutlined } from '@ant-design/icons'
import { Button, Card, Modal } from 'antd';
import OTPInput from 'react-otp-input';
import api from '../../api/api';
import { toast } from 'react-toastify';
const { Meta } = Card;

export default function StudentHomePage() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [otp, setOtp] = useState('');
    const [loadings, setLoadings] = useState([]);
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        getAllClasses();
    }, []);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    }

    const joinClass = (index) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });

        api.post("/api/classes/enroll", { join_code: otp })
            .then(res => {
                setLoadings((prevLoadings) => {
                    const newLoadings = [...prevLoadings];
                    newLoadings[index] = false;
                    return newLoadings;
                });
                setIsModalVisible(false);
                getAllClasses();
                toast.success(res.data);
            })
            .catch(err => {
                setLoadings((prevLoadings) => {
                    const newLoadings = [...prevLoadings];
                    newLoadings[index] = false;
                    return newLoadings;
                });
                toast.error(err?.response.data);
            });
    };

    const getAllClasses = () => {
        api.get("/api/classes/getClasses")
            .then(res => {
                setClasses(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div>
            <Modal
                title="Join Class"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >
                <div className='flex justify-center flex-col items-center gap-4 flex-wrap w-full'>
                    <h1 className='text-4xl font-bold'>Class code</h1>
                    <p className='text-xl text-center'>Ask your teacher for the class code, then enter it here.</p>
                    <OTPInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={7}
                        renderInput={(props) => <input {...props} />}
                        inputStyle={{ border: "1px solid grey", fontSize: "20px", textAlign: "center", width: "72px", height: "72px", borderRadius: "10px", color: "black" }}
                        placeholder='1a2b3cd'
                        containerStyle={{ flexWrap: "wrap", gap: "10px", justifyContent: "center" }}
                    />
                    <div className='flex items-center gap-4'>
                        <Button disabled={otp.length !== 7} loading={loadings[1]} type='primary' onClick={() => joinClass(1)} className='p-5'>
                            Join Class
                        </Button>
                        <Button onClick={() => setIsModalVisible(false)} className='p-5'>
                            Cancel
                        </Button>
                    </div>
                </div>
            </Modal>
            <div className='flex m-5 text-2xl font-mono font-extrabold'>
                <h1 className='flex-1'>Student Dashboard</h1>
                <button onClick={showModal}>
                    <PlusOutlined className='hover:bg-gray-200 rounded-full p-2' />
                </button>
                <BellFilled className='flex-2 ml-4 text-amber-400' />
            </div>
            <div className='mx-6'>
                <h1 className='my-4 text-xl font-sans font-bold text-sky-500'>My Courses</h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-[20px] justify-items-center'>
                    {classes.length === 0 ? (
                        <div className='text-2xl'>You haven't enrolled in any class yet!</div>
                    ) : classes.map((course, index) => (
                        <div key={index}>
                            <Card
                                hoverable
                                cover={<img alt="example" className='w-full' style={{ borderRadius: "10px" }} src="https://s3-alpha-sig.figma.com/img/2ebd/a06f/cba634dae41e756ff7f59d1390872737?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=muV73o7cCh55NLYEvtXRN9-ZKTw7h70lC8vyxJjrmYVJdAV1qGywJg0M6KhcYuBfgXnSmKbo3V4OKOK45bbJXCC4mwXxjDRYUDm7tChQwkxh2iBT04EgqbfdQ3KQVd7hP6KlD4B7Q2h4MSlFdUMZ8feFW8ODwHUswCd-lwyIIQQqIrFofBY9M-FppPnZqQ6bUSy2cmOMUJKJ66excVRO-8oCkdoz~g1Zb0mvtdYsqg9k5gZ1N7gF5A9fpNUiYxbkZy8LZla4LwBCnaMmr2FZ~~D2guH02btUlRkrMzQQmKxSWlgFv~Lt0Y42DHBreVOiGOeoCPTiM~4KhlM3GL93bQ__" />}
                            >
                                <div className='flex relative bottom-12'>
                                    <h1 className='flex-1 relative top-8 right-3 font-semibold'>{course.name}</h1>
                                    <img className='size-12 rounded-full' src="https://s3-alpha-sig.figma.com/img/8ada/4b5e/9db6fa638fd610ae56566f29347fa6cc?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fWSqsY4VvzM~x0gruLGZjF0bF3Eq7DdonFd4SE2tPv1W61PIMFaxq5ppIfTyAm1362Iw9nDH~TImlshZUariPxUjLhPdgbHW5DAT8Ftd2vOw37Rgtp1pNvlSEvSCzrn27w1jh0jh0uTFR05UPPwLoo9Q76r6LCYtrwev1gXETiP5w2qyazgUoz6K~QDTRnWXLxlESFt4dDwVNMFl7k3cPs~XAYBRC1pM4HsQ8Riv0r0xBcNoLWOMI9OA6t1mWHmIZjJy~65u71jnLGNpT2NC0~qgbLnpLIOzelc9LVO33iZxX62pHpx40e86Nzur0tGyDoNUqfnR~-1gL9d1bGe2lQ__" alt="" />
                                </div>
                                <div className='flex'>
                                    <Meta title={course.teacher.username} className='relative left-3' />
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
