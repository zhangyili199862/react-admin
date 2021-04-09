import React from "react";
import { Upload, message } from "antd";
import propTypes from "prop-types";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { UploadToken } from "@/api/common";
class UploadCom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: "",
      loading: false,
      uploadKey: "",
      uploadToken: "",
    };
  }
  componentDidMount() {}
  static getDerivedStateFromProps(nextProps, prevState){  // 1、静态的，无法获取 this.state，2、必须有返回
    let { value } = nextProps;
    if(!value) { return false; }
    // 判断是否是JSON对象
    if(value !== prevState.value) {
        return {
            imageUrl: value
        }
    }
    // 直接放在最后面
    return null;
}
  beforeUpload = async (file) => {
    const uploadToken = localStorage.getItem("uploadToken");
    const token = uploadToken || await this.getUploadToken();
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
      uploadToken: token,
      uploadKey: key,
    });
    return isJpgOrPng && isLt2M;
  };
  getUploadToken = () => {
    return UploadToken({
      ak: "dfawTwXxmuWJywb6LFiAn1a_xU8qz58dl3v7Bp74",
      sk: "gynIo9E-zyKeKBrPqeWmmgeA4DQSsl8gpuyYl9dT",
      buckety: "bigbigtime",
    }).then((response) => {
      const data = response.data.data;
      localStorage.setItem("uploadToken", data.token);
      return data.token;
    });
  };
  getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  // 选择图片时
  handleChange = (info) => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      const fileInfo = info.file.response;
      const imageUrl = `http://qkronr45u.hn-bkt.clouddn.com/${fileInfo.key}`;

      this.setState(
        {
          imageUrl,
          loading: false,
        },
        () => {
          this.triggerChange(this.state.imageUrl);
        }
      );
    }
  };
  //   handleChange = (info) => {
  //     if (info.file.status === "uploading") {
  //       this.setState({ loading: true });
  //       return;
  //     }
  //     if (info.file.status === "done") {
  //       // Get this url from response in real world.
  //       this.getBase64(info.file.originFileObj, (imageUrl) =>
  //         this.setState(
  //           {
  //             imageUrl,
  //             loading: false,
  //           },
  //           () => {
  //             this.triggerChange(imageUrl);
  //           }
  //         )
  //       );
  //     }
  //   };
  triggerChange = (changedValue) => {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(changedValue);
    }
  };
  render() {
    const { loading, imageUrl, uploadKey, uploadToken } = this.state;
    const uploadData = { uploadKey, uploadToken };
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
UploadCom.prototypes = {
  request: propTypes.bool,
};
UploadCom.defaultProps = {
  request: false,
};
export default UploadCom;
