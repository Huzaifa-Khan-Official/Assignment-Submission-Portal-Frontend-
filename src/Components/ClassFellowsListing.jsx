import { UserOutlined } from '@ant-design/icons'
import React, { memo } from 'react'

function ClassFellowsListing() {
    return (
        <div>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-3xl" data-v0-t="card">
                <div className="p-6 ps-3 grid gap-6 overflow-x-auto">
                    <div className="flex items-start gap-4 border-b pb-3">
                        <span className="relative flex shrink-0 overflow-hidden rounded-full border-2 border-primary w-12 h-12 items-center justify-center">
                            <UserOutlined />
                        </span>
                        <div className="grid gap-1">
                            <div className="flex gap-2">
                                <h3 className="text-lg font-medium">Emma Watson</h3>
                            </div>
                            <div>
                                <p>dummy@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(ClassFellowsListing); 