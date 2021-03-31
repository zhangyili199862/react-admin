import React from "react";
import { Upload, message } from "antd";
// import propTypes from "prop-types";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { UploadToken } from "@/api/common";
export default class UploadCom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: "",
      loading: false,
      uploadKey:"",
      uploadToken:""
    };
  }
  componentDidMount() {
      this.getUploadToken();
  }
  beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    const name = file.name;
    const key = encodeURI(`${name}`);
    this.setState({
        uploadKey:key
    })
    return isJpgOrPng && isLt2M;
  }
  getUploadToken = () => {
    return UploadToken({
      ak: "dfawTwXxmuWJywb6LFiAn1a_xU8qz58dl3v7Bp74",
      sk: "gynIo9E-zyKeKBrPqeWmmgeA4DQSsl8gpuyYl9dT",
      buckety: "bigbigtime",
    }).then((response) => {
      const data = response.data.data;
      this.setState({
        uploadToken:data.token
      })
      localStorage.setItem("uploadTokey", data.token);
      return data.token;
    });
  };
  getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  handleChange = (info) => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, (imageUrl) =>
        this.setState(
          {
            imageUrl,
            loading: false,
          },
          () => {
            this.triggerChange(imageUrl);
          }
        )
      );
    }
  };
  triggerChange = (changedValue) => {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange({ [this.props.name]: changedValue });
    }
  };
  render() {
    const { loading, imageUrl,uploadKey,uploadToken } = this.state;
    const uploadData = {uploadKey,uploadToken}
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        data={uploadData}
        action="https://up-z2.qiniup.com"
        beforeUpload={this.beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
        ) : (
          uploadButton
        )}
      </Upload>
    );
  }
}
// SelectCom
