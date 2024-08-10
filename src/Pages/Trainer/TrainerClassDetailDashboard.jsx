import { Button, Dropdown, Space } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { useNavigate, useParams } from 'react-router';
import LoaderContext from '../../Context/LoaderContext';
import api from '../../api/api';
import { toast } from 'react-toastify';
import ClassDetailPage from './ClassDetailPage';
import AllAssignmentsListing from '../../Components/AllAssignmentsListing';
import AllClassfellowsPage from './AllClassfellowsPage';
import UpdateClassModal from '../../Components/UpdateClassModal/UpdateClassModal';

function TrainerClassDetailDashboard() {
  const [selectedComponent, setSelectedComponent] = useState('Stream');
  const { classId } = useParams();
  const { loader, setLoader } = useContext(LoaderContext);
  const [detail, setDetail] = useState();
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    getClassDetail();
  }, [])


  const getClassDetail = async () => {
    setLoader(true);
    try {
      const res = await api.get(`/api/classes/trainer/class/${classId}`);
      setDetail(res.data);
      setLoader(false);

    } catch (error) {
      toast.error(error.response.data, {
        onClose: () => {
          navigate("/trainer/dashboard");
        }
      })
      setLoader(false);
    }
  }

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'Stream':
        return <ClassDetailPage />;
      case 'Classwork':
        return <AllAssignmentsListing />;
      case 'People':
        return <AllClassfellowsPage />;
      default:
        return null;
    }
  };

  const items = [
    {
      label: <button onClick={() => showModal()}>Settings</button>,
      key: '0',
    },
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className='p-4 ps-6'>
      <header className="bg-teal-600 text-white p-4 rounded-lg mb-4">
        <h1 className="text-2xl">{detail?.name}</h1>
        <p className="text-md">{detail?.description}</p>
      </header>
      <div className='flex justify-between px-1 gap-3 items-center mb-5'>
        <div className="button-group flex gap-3 flex-wrap items-center">
          <Button
            onClick={() => setSelectedComponent('Stream')}
            type={selectedComponent === 'Stream' ? 'primary' : undefined}
          >
            Stream
          </Button>
          <Button
            onClick={() => setSelectedComponent('Classwork')}
            type={selectedComponent === 'Classwork' ? 'primary' : undefined}
          >
            Classwork
          </Button>
          <Button
            onClick={() => setSelectedComponent('People')}
            type={selectedComponent === 'People' ? 'primary' : undefined}
          >
            People
          </Button>
        </div>
        <div>
          <Dropdown
            menu={{
              items,
            }}
            trigger={['click']}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <HiOutlineDotsVertical className='text-2xl' />
              </Space>
            </a>
          </Dropdown>
        </div>
      </div>
      <div className="component-container">
        {renderComponent()}
      </div>
      <UpdateClassModal isModalVisible={isModalVisible} closeModal={closeModal} getClassDetail={getClassDetail} detail={detail} />
    </div>
  )
}

export default TrainerClassDetailDashboard