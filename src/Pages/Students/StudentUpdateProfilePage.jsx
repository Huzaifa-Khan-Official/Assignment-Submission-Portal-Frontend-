import React, { useCallback, useState } from 'react'
import { BellFilled, UserOutlined } from '@ant-design/icons'
import { MdOutlineMail, MdOutlinePhoneEnabled } from "react-icons/md";
import { Button, Input } from 'antd';
import NotificationModal from '../../Components/NotificationModal/NotificationModal';

export default function StudentUpdateProfilePage() {
    const [visible, setVisible] = useState(false);
    let [ProfileImg, setProfileImg] = useState("");
    let [ImgFiles, setImgFiles] = useState([]);


    const handleNotification = useCallback(() => {
        setVisible(true);
    }, []);

    const handleCancel = useCallback(() => {
        setVisible(false);
    }, []);

    const ProfileImgIcon = (e) => {
        setProfileImg(URL.createObjectURL(e.target.files[0]));
        setImgFiles(e.target.files[0])
    }

    return (
        <div>
            <div className='flex m-5 text-2xl font-mono font-extrabold mx-8'>
                <h1 className='flex-1'>Update Profile</h1>
                <BellFilled className='flex-2 text-amber-400 hover:text-amber-500 transition delay-100 cursor-pointer' onClick={handleNotification} />
            </div>

            <div className='bg-white mx-7 p-7 rounded-lg shadow-lg shadow-slate-300'>
                <div>
                    <h1 className='text-lg font-bold uppercase'>User Inforamtion</h1>
                </div>

                <div className='flex justify-around'>
                    <div className='my-5 text-base'>

                        <label>Username</label>
                        <Input size="large" placeholder="username" prefix={<UserOutlined />} className='mb-5' />

                        <label>Email</label>
                        <Input size="large" type='email' placeholder="email" prefix={<MdOutlineMail />} className='mb-5' />

                        <label>Number</label>
                        <Input size="large" type='number' placeholder="number" prefix={<MdOutlinePhoneEnabled />} className='mb-5' />

                    </div>
                    <div className='my-20 mx-10'>
                        {ProfileImg ? (
                            <img className='w-20 h-20 object-contain bg-stone-200 rounded-full mx-5' src={ProfileImg} alt="#" />
                        ) : (
                            <img className='w-20 h-20 object-contain rounded-full mx-5' src="https://s3-alpha-sig.figma.com/img/8ada/4b5e/9db6fa638fd610ae56566f29347fa6cc?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Wwu6z8Xi7sIWeGo6Pzjn4-LlHu~wZlAD1muA4yTTw6Ma9T~P4eDY~9QCBgvalkiNET5L4Ujlz5ECjEebn55eGZwCIRQDpGYBA~QhH~3GsLeeUaZ4YN~1~CNi2kzKgabotarM1nJTBhMi~Eg5UHNtaiuCFlyFecupe2~5R7tecGkGmzptR1t1pVrz4~HQE5sy~onYRl2pQQdfHwc0x7J7dpFXpgfT5CuBky8lhsh040wfRBUcxJqIO8RIytEVw0j-IWwjoocxnnxWkhpGCztoi4bGgVo0O1K34Z3t~6UC~gIkpB-CvB61lgiNf8dWu9p8vL~B3jhp-AwNXtPMnO6ZfA__" alt="#" />
                        )}
                        <input type="file" hidden id="changeImg" onChange={(e) => ProfileImgIcon(e)} />
                        <Button className='my-3' type='primary' ghost><label className='cursor-pointer' htmlFor="changeImg">Change image</label></Button>
                    </div>
                </div>

                <div className='mx-2'>
                    <Button type='primary' danger>Cancel</Button>
                    <Button type='primary' className='mx-2'>Save Changes</Button>
                </div>

            </div>

            <NotificationModal visible={visible} handleCancel={handleCancel} />
        </div>
    )
}