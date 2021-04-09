import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Upload } from "@/api/common";
export default class EditorComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value:""
    };
  }
  static getDerivedStateFromProps(nextProps, prevState){  // 1、静态的，无法获取 this.state，2、必须有返回
    let { value } = nextProps;
    if(!value) { return false; }
    // 判断是否是JSON对象
    if(value !== prevState.value) {
        return {
            value
        }
    }
    // 直接放在最后面
    return null;
}
  handleEditorChange = (value) => {
    this.triggerChange(value);
  };
  triggerChange = (changedValue) => {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(changedValue);
    }
  };
  render() {
    const editorObj = {
      height: "800px",
      language: "zh_CN",
      plugins: "table lists link image preview code",
      toolbar: `formatselect | code | preview | bold italic strikethrough forecolor backcolor | 
        link image | alignleft aligncenter alignright alignjustify  | 
        numlist bullist outdent indent`,
      relative_urls: false,
      file_picker_types: "image",
      images_upload_url: "http",
      image_advtab: true,
      image_uploadtab: true,
      images_upload_handler: (blobInfo, success, failure) => {
        var formData;
        var file = blobInfo.blob(); //转化为易于理解的file对象
        formData = new FormData();
        formData.append("file", file, file.name); //此处与源文档不一样

        Upload(formData)
          .then((response) => {
            const data = response.data.data.url;
            success(data);
          })
          .catch((error) => {
            failure(error.data.message);
          });
      },
    };
    return (
      <React.Fragment>
        <Editor
          ref="content"
          inline={false}
          selector="editorStateRef" // 选择器
          apiKey="7rvy5hdnd9pi7lphvjr9r81nrb2uaa6ofyltm0ydstptyd3t"
          initialValue={this.state.value}
          init={{ ...editorObj }}
          onEditorChange={this.handleEditorChange}
        />
      </React.Fragment>
    );
  }
}
