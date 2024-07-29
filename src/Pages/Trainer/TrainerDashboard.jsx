import React, { useContext, useEffect, useState } from 'react';
import { BellFilled, PlusOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import api from '../../api/api';
import userIcon from "../../assets/userIcon.png";
import ClassPic from "../../assets/ClassPic.jpeg";
import ClassModal from '../../Components/ClassModal/ClassModal';
import LoaderContext from '../../Context/LoaderContext';
import { toast } from 'react-toastify';
const { Meta } = Card;

export default function TrainerDashboard() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { loader, setLoader } = useContext(LoaderContext);
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        setLoader(true);
        if (classes.length === 0) {
            getAllClasses();
            setLoader(false);
        }
    }, []);

    const getAllClasses = () => {
        setLoader(true);
        api.get("/api/classes")
            .then(res => {
                setClasses(res.data);
                setLoader(false);
            })
            .catch(err => {
                setLoader(false);
                toast.error("Something went wrong!");
            });
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    return (
        <div>
            <ClassModal isModalVisible={isModalVisible} closeModal={closeModal} getAllClasses={getAllClasses} />
            <div className='flex m-5 text-2xl font-mono font-extrabold'>
                <h1 className='flex-1'>Trainer Dashboard</h1>
                <button onClick={showModal}>
                    <PlusOutlined className='hover:bg-gray-200 rounded-full p-2' title='Add Trainer' />
                </button>
                <BellFilled className='flex-2 ml-4 text-amber-400' />
            </div>
            <div className='mx-6'>
                <h1 className='my-4 text-xl font-sans font-bold text-sky-500'>My Classes</h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-[20px] justify-items-center'>
                    {classes.length === 0 ? (
                        <div className='text-2xl'>You haven't created any class yet!</div>
                    ) : classes.map((eachClass, index) => (
                        <div key={index}>
                            <Card
                                hoverable
                                cover={<img alt="example" className='w-full' style={{ borderRadius: "10px" }} src={eachClass.classImage} />}
                            >
                                <div className='flex relative bottom-12'>
                                    <h1 className='flex-1 relative top-8 right-3 font-semibold'>{eachClass.name}</h1>
                                    <img className='size-12 rounded-full' src={userIcon} alt="" />
                                </div>
                                <div className='flex'>
                                    <Meta title={eachClass.teacher?.username} className='relative left-3' />
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}