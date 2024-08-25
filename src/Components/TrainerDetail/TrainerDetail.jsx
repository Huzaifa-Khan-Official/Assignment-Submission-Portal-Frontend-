import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import api from '../../api/api';
import LoaderContext from '../../Context/LoaderContext';
import { toast } from 'react-toastify';
import { Card } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

function TrainerDetail() {
    const { trainerId } = useParams();
    const { loader, setLoader } = useContext(LoaderContext);
    const [trainer, setTrainer] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getTrainerDetail();
    }, []);

    const getTrainerDetail = () => {
        setLoader(true);
        api.get(`/api/users/trainer/${trainerId}`)
            .then(res => {
                setLoader(false);
                setTrainer(res.data);
            })
            .catch(err => {
                setLoader(false);
                toast.error(err.response.data.message, {
                    onClose: () => {
                        navigate(-1);
                    }
                });
            })
    }

    return (
        <div className='ms-3'>
            <div className='max-w-2xl mx-auto px-3 mt-3'>
                <div className="bg-background rounded-lg shadow-md overflow-hidden border-t-2">
                    <div className="px-3 py-5 bg-muted">
                        <h1 className="text-2xl font-bold break-words"><ArrowLeftOutlined className='hover:bg-gray-300 p-2 rounded-full' title='Back to Previous' onClick={() => navigate(-1)} /> Trainer Detail</h1>
                    </div>
                    <div className="px-3 py-5 pt-0">
                        <div className="flex justify-between gap-4 px-3 flex-wrap">
                            <div>
                                <p>Name:</p>
                                <h2 className="text-lg font-semibold capitalize">{trainer?.username}</h2>
                            </div>
                            <div>
                                <p>Trainer Email:</p>
                                <h2 className="text-lg font-semibold">{trainer?.email}</h2>
                            </div>
                        </div>
                        <div className="my-6 border-2" />
                        <h2 className="text-lg font-semibold mb-3">Enrolled Classes</h2>
                        <div className="flex flex-col gap-3">
                            {
                                loader ? <Card loading={loader}></Card> :
                                    trainer?.classes.length > 0 ? trainer.classes.map(cls => (
                                        <Card key={cls._id} styles={{ body: { padding: "10px 15px" } }} className='hover:shadow-lg cursor-pointer hover:-translate-y-1'>
                                            <div className="flex justify-between items-center">
                                                <h1 className='text-2xl font-bold'>{cls.name} <span className='font-light text-md'>({cls.join_code})</span></h1>
                                                <ArrowRightOutlined className='hover:bg-gray-300 p-2 rounded-full h-fit' title='See Detail!' onClick={() => navigate(cls._id, { state: { trainerData: trainer, classData: cls } })} />
                                            </div>
                                            <div className='mt-1 text-lg'>
                                                <p>{cls.description}</p>
                                                <p>No. of students: {cls.students.length}</p>
                                            </div>
                                        </Card>
                                    )) :
                                        (<h1>No Class found of this trainer!</h1>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TrainerDetail