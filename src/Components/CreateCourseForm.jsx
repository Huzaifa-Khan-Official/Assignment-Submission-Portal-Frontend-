import React, { useState } from 'react'
import { Button, Input, Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import './CreateCourseForm.css'

export default function CreateCourseForm() {

    const [courseName, setCourseName] = useState("");
    const [courseDuration, setCourseDuration] = useState("");
    const [imageUrl, setImageUrl] = useState(null);

    const handleChange = (info) => {
        if (info.file.status === "uploading") {
            message.loading({ content: "Uploading...", key: "upload" });
        }
        if (info.file.status === "done") {
            message.success({ content: "Uploaded successfully", key: "upload" });
            setImageUrl(info.file.response.url);
        } else if (info.file.status === "error") {
            message.error({ content: "Upload failed", key: "upload" });
        }
    };

    const uploadButton = (
        <div>
            <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e77"
                onChange={handleChange}
            >
                {imageUrl ? (
                    <img src={imageUrl} alt="course" style={{ width: "100%" }} />
                ) : (
                    <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                )}
            </Upload>
        </div>
    );

    return (
        <div>

            <form className="form max-w-md mx-auto my-10">
                <div className="form-group">
                    <label htmlFor="course-name">Course Name:</label>
                    <Input
                        id="course-name"
                        type="text"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                        placeholder="Enter Course Name"
                        className="w-full"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="course-duration">Course Duration:</label>
                    <Input
                        id="course-duration"
                        type="text"
                        value={courseDuration}
                        onChange={(e) => setCourseDuration(e.target.value)}
                        placeholder="Enter Course Duration"
                        className="w-full"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="course-image">Course Image:</label>
                    {uploadButton}
                </div>
                <div className="form-group">
                    <Button type="primary" htmlType="submit">
                        Create
                    </Button>
                    <Button type="secondary" htmlType="reset">
                        Cancel
                    </Button>
                </div>
            </form>

        </div>
    )
}
