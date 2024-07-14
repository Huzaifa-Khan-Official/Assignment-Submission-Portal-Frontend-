import React, { useEffect } from 'react'
import { BellFilled } from '@ant-design/icons'
import { Card } from 'antd';
const { Meta } = Card;


export default function StudentHomePage() {
    return (
        <div>

            <div className='flex m-5 text-2xl font-mono font-extrabold'>
                <h1 className='flex-1'>Student Dashboard</h1>
                <BellFilled className='flex-2 text-amber-400' />
            </div>

            <div className='mx-6'>
                <h1 className='my-4 text-xl font-sans font-bold text-sky-500'>My Courses</h1>

                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-[20px] justify-items-center'>

                    <div>
                        <Card
                            hoverable
                            style={{
                                width: 300,
                            }}
                            cover={<img alt="example" className='w-full' style={{ borderRadius: "10px" }} src="https://s3-alpha-sig.figma.com/img/2ebd/a06f/cba634dae41e756ff7f59d1390872737?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=muV73o7cCh55NLYEvtXRN9-ZKTw7h70lC8vyxJjrmYVJdAV1qGywJg0M6KhcYuBfgXnSmKbo3V4OKOK45bbJXCC4mwXxjDRYUDm7tChQwkxh2iBT04EgqbfdQ3KQVd7hP6KlD4B7Q2h4MSlFdUMZ8feFW8ODwHUswCd-lwyIIQQqIrFofBY9M-FppPnZqQ6bUSy2cmOMUJKJ66excVRO-8oCkdoz~g1Zb0mvtdYsqg9k5gZ1N7gF5A9fpNUiYxbkZy8LZla4LwBCnaMmr2FZ~~D2guH02btUlRkrMzQQmKxSWlgFv~Lt0Y42DHBreVOiGOeoCPTiM~4KhlM3GL93bQ__" />}
                        >
                            <div className='flex relative bottom-12'>
                                <h1 className='flex-1 relative top-8 right-3 font-semibold'>Web development</h1>
                                <img className='size-12 rounded-full' src="https://s3-alpha-sig.figma.com/img/8ada/4b5e/9db6fa638fd610ae56566f29347fa6cc?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fWSqsY4VvzM~x0gruLGZjF0bF3Eq7DdonFd4SE2tPv1W61PIMFaxq5ppIfTyAm1362Iw9nDH~TImlshZUariPxUjLhPdgbHW5DAT8Ftd2vOw37Rgtp1pNvlSEvSCzrn27w1jh0jh0uTFR05UPPwLoo9Q76r6LCYtrwev1gXETiP5w2qyazgUoz6K~QDTRnWXLxlESFt4dDwVNMFl7k3cPs~XAYBRC1pM4HsQ8Riv0r0xBcNoLWOMI9OA6t1mWHmIZjJy~65u71jnLGNpT2NC0~qgbLnpLIOzelc9LVO33iZxX62pHpx40e86Nzur0tGyDoNUqfnR~-1gL9d1bGe2lQ__" alt="" />
                            </div>

                            <div className='flex'>
                                <Meta title="Batch-10" className='flex-1 relative right-3' />
                                <Meta title="Sir Saad" className='relative left-3' />
                            </div>
                        </Card>
                    </div>

                    <div>
                        <Card
                            hoverable
                            style={{
                                width: 300,
                            }}
                            cover={<img alt="example" className='w-full' style={{ borderRadius: "10px" }} src="https://s3-alpha-sig.figma.com/img/2ebd/a06f/cba634dae41e756ff7f59d1390872737?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=muV73o7cCh55NLYEvtXRN9-ZKTw7h70lC8vyxJjrmYVJdAV1qGywJg0M6KhcYuBfgXnSmKbo3V4OKOK45bbJXCC4mwXxjDRYUDm7tChQwkxh2iBT04EgqbfdQ3KQVd7hP6KlD4B7Q2h4MSlFdUMZ8feFW8ODwHUswCd-lwyIIQQqIrFofBY9M-FppPnZqQ6bUSy2cmOMUJKJ66excVRO-8oCkdoz~g1Zb0mvtdYsqg9k5gZ1N7gF5A9fpNUiYxbkZy8LZla4LwBCnaMmr2FZ~~D2guH02btUlRkrMzQQmKxSWlgFv~Lt0Y42DHBreVOiGOeoCPTiM~4KhlM3GL93bQ__" />}
                        >
                            <div className='flex relative bottom-12'>
                                <h1 className='flex-1 relative top-8 right-3 font-semibold'>Python development</h1>
                                <img className='size-12 rounded-full' src="https://s3-alpha-sig.figma.com/img/8ada/4b5e/9db6fa638fd610ae56566f29347fa6cc?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fWSqsY4VvzM~x0gruLGZjF0bF3Eq7DdonFd4SE2tPv1W61PIMFaxq5ppIfTyAm1362Iw9nDH~TImlshZUariPxUjLhPdgbHW5DAT8Ftd2vOw37Rgtp1pNvlSEvSCzrn27w1jh0jh0uTFR05UPPwLoo9Q76r6LCYtrwev1gXETiP5w2qyazgUoz6K~QDTRnWXLxlESFt4dDwVNMFl7k3cPs~XAYBRC1pM4HsQ8Riv0r0xBcNoLWOMI9OA6t1mWHmIZjJy~65u71jnLGNpT2NC0~qgbLnpLIOzelc9LVO33iZxX62pHpx40e86Nzur0tGyDoNUqfnR~-1gL9d1bGe2lQ__" alt="" />
                            </div>

                            <div className='flex'>
                                <Meta title="Batch-8" className='flex-1 relative right-3' />
                                <Meta title="Sir Huzaifa" className='relative left-3' />
                            </div>
                        </Card>
                    </div>
                    <div>
                        <Card
                            hoverable
                            style={{
                                width: 300,
                            }}
                            cover={<img alt="example" className='w-full' style={{ borderRadius: "10px" }} src="https://s3-alpha-sig.figma.com/img/2ebd/a06f/cba634dae41e756ff7f59d1390872737?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=muV73o7cCh55NLYEvtXRN9-ZKTw7h70lC8vyxJjrmYVJdAV1qGywJg0M6KhcYuBfgXnSmKbo3V4OKOK45bbJXCC4mwXxjDRYUDm7tChQwkxh2iBT04EgqbfdQ3KQVd7hP6KlD4B7Q2h4MSlFdUMZ8feFW8ODwHUswCd-lwyIIQQqIrFofBY9M-FppPnZqQ6bUSy2cmOMUJKJ66excVRO-8oCkdoz~g1Zb0mvtdYsqg9k5gZ1N7gF5A9fpNUiYxbkZy8LZla4LwBCnaMmr2FZ~~D2guH02btUlRkrMzQQmKxSWlgFv~Lt0Y42DHBreVOiGOeoCPTiM~4KhlM3GL93bQ__" />}
                        >
                            <div className='flex relative bottom-12'>
                                <h1 className='flex-1 relative top-8 right-3 font-semibold'>Python development</h1>
                                <img className='size-12 rounded-full' src="https://s3-alpha-sig.figma.com/img/8ada/4b5e/9db6fa638fd610ae56566f29347fa6cc?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fWSqsY4VvzM~x0gruLGZjF0bF3Eq7DdonFd4SE2tPv1W61PIMFaxq5ppIfTyAm1362Iw9nDH~TImlshZUariPxUjLhPdgbHW5DAT8Ftd2vOw37Rgtp1pNvlSEvSCzrn27w1jh0jh0uTFR05UPPwLoo9Q76r6LCYtrwev1gXETiP5w2qyazgUoz6K~QDTRnWXLxlESFt4dDwVNMFl7k3cPs~XAYBRC1pM4HsQ8Riv0r0xBcNoLWOMI9OA6t1mWHmIZjJy~65u71jnLGNpT2NC0~qgbLnpLIOzelc9LVO33iZxX62pHpx40e86Nzur0tGyDoNUqfnR~-1gL9d1bGe2lQ__" alt="" />
                            </div>

                            <div className='flex'>
                                <Meta title="Batch-8" className='flex-1 relative right-3' />
                                <Meta title="Sir Huzaifa" className='relative left-3' />
                            </div>
                        </Card>
                    </div>



                </div>
            </div>


        </div>
    )
}

