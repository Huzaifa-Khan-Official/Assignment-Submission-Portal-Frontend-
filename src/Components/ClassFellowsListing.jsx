import { UserOutlined } from '@ant-design/icons'
import React, { memo } from 'react'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

function ClassFellowsListing({ data, classId }) {
    return (
        <div>
            <div className="bg-white rounded-lg border bg-card text-card-foreground shadow-lg w-full max-w-3xl" data-v0-t="card">
                <div className="p-6 ps-3 grid gap-6 overflow-x-auto">
                    {
                        (data && classId) ?
                            data.map((data, i) => {
                                return (
                                    <div key={i}>
                                        <Link to={`/trainer/class/${classId}/student/${data._id}/`}>
                                            <div className="flex items-start gap-4 border-b pb-3">
                                                <span className="relative flex shrink-0 overflow-hidden rounded-full border-2 border-primary w-12 h-12 items-center justify-center">
                                                    {
                                                        data.profileImg ? <img src={data.profileImg} alt="" className='w-full h-full' /> : <UserOutlined />
                                                    }
                                                </span>
                                                <div className="grid gap-1">
                                                    <div className="flex gap-2">
                                                        <h3 className="text-lg font-medium capitalize">{data.username}</h3>
                                                    </div>
                                                    <div>
                                                        <p>{data.email}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            }) :
                            data.map((data, i) => {
                                return (
                                    <div key={i}>
                                        <div className="flex items-start gap-4 border-b pb-3">
                                            <span className="relative flex shrink-0 overflow-hidden rounded-full border-2 border-primary w-12 h-12 items-center justify-center">
                                                {
                                                    data.profileImg ? <img src={data.profileImg} alt="" className='w-full h-full' /> : <UserOutlined />
                                                }
                                            </span>
                                            <div className="grid gap-1">
                                                <div className="flex gap-2">
                                                    <h3 className="text-lg font-medium capitalize">{data.username}</h3>
                                                </div>
                                                <div>
                                                    <p>{data.email}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                    }
                </div>
            </div>
        </div>
    )
}

export default memo(ClassFellowsListing); 