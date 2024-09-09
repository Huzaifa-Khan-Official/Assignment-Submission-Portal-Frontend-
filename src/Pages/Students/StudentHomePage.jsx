import React, { useEffect, useState } from 'react';
import { BellFilled, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Modal } from 'antd';
import OTPInput from 'react-otp-input';
import api from '../../api/api';
import { toast } from 'react-toastify';
import userIcon from "../../assets/userIcon.png";
import ClassPic from "../../assets/ClassPic.jpeg";
import { useNavigate } from 'react-router';
const { Meta } = Card;

export default function StudentHomePage() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [otp, setOtp] = useState('');
    const [loadings, setLoadings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [classes, setClasses] = useState([]);
    const [imageLoading, setImageLoading] = useState([]);
    const navigate = useNavigate();

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
    };

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
        setLoading(true);
        api.get("/api/classes/getClasses")
            .then(res => {
                setClasses(res.data);
                setImageLoading(Array(res.data.length).fill(true));
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    };

    const handleImageLoad = (index) => {
        setImageLoading(prevState => {
            const newState = [...prevState];
            newState[index] = false;
            return newState;
        });
    };

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
                    <div className='flex items-center gap-4 flex-wrap justify-center'>
                        <Button disabled={otp.length !== 7} loading={loadings[1]} type='primary' onClick={() => joinClass(1)} className='p-5'>
                            Join Class
                        </Button>
                        <Button onClick={() => setIsModalVisible(false)} className='p-5'>
                            Cancel
                        </Button>
                    </div>
                </div>
            </Modal>
            <div className='flex m-5 text-2xl font-mono font-extrabold flex-wrap gap-3'>
                <h1 className='flex-1'>Student Dashboard</h1>
                <div>
                    <button onClick={showModal}>
                        <PlusOutlined className='hover:bg-gray-200 rounded-full p-2' />
                    </button>
                    <BellFilled className='flex-2 ml-4 text-amber-400' />
                </div>
            </div>
            <div className='mx-6'>
                <h1 className='my-4 text-xl font-sans font-bold text-sky-500'>My Classes</h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-[20px] justify-items-center'>
                    {
                        loading ? <Card loading={loading} className='w-full'></Card> :
                            classes.length === 0 ? (
                                <div className='text-2xl'>You haven't enrolled in any class yet!</div>
                            ) : classes.map((course, index) => (
                                <div key={index}>
                                    <Card
                                        hoverable
                                        cover={
                                            <div>
                                                {imageLoading[index] && (
                                                    <Card loading={imageLoading[index]} className='w-full'></Card>
                                                )}
                                                <img 
                                                    alt="example"
                                                    className='w-full'
                                                    style={{ borderRadius: "10px", display: imageLoading[index] ? 'none' : 'block' }}
                                                    src={course.classImage || ClassPic} 
                                                    onLoad={() => handleImageLoad(index)}
                                                />
                                            </div>
                                        }
                                        onClick={() => navigate(`student/class/${course._id}`)}
                                        className='hover:-translate-y-1 duration-200 transition h-full'
                                    >
                                        <div className='flex relative bottom-12'>
                                            <h1 className='flex-1 relative top-8 right-0 text-2xl font-semibold'>{course.name}</h1>
                                            {
                                                course.teacher?.profileImg ? (
                                                    <img className='w-12 h-12 rounded-full' src={course.teacher?.profileImg} alt="" />
                                                ) : (
                                                    <img className='size-12 rounded-full' src={userIcon} alt="" />
                                                )
                                            }
                                        </div>
                                        <div className='flex'>
                                            <Meta title={course.teacher?.username} className='relative left-3' />
                                        </div>
                                    </Card>
                                </div>
                            ))}
                </div>
            </div>
        </div>
    );
}
