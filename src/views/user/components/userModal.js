import React from "react";
import { validate_phone } from "@/utils/validate";
import { Modal } from "antd";
import FormCom from "@/components/form/Index";
class userModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      formConfig: {
        url: "staffAdd",
        initValue: {
          status: true,
          number: 0,
        },
        formatKey: "parentId",
        editKey: "",
      },
      formLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
      },
      formItem: [
        {
          type: "Input",
          label: "用户名",
          name: "name",
          rules: [
            {
              required: true,
              message: "姓名不能为空",
            },
          ],
          style: { width: "200px" },
          placeholder: "请输入姓名",
        },
        {
          type: "Input",
          label: "密码",
          name: "password",
          rules: [
            {
              required: true,
              message: "姓名不能为空",
            },
          ],
          style: { width: "200px" },
          placeholder: "请输入姓名",
        },
        {
          type: "Input",
          label: "确认密码",
          name: "passwords",
          rules: [
            {
              required: true,
              message: "姓名不能为空",
            },
          ],
          style: { width: "200px" },
          placeholder: "请输入再次输入密码",
        },
        {
          type: "Input",
          label: "真实姓名",
          name: "truename",
          rules: [
            {
              required: true,
              message: "姓名不能为空",
            },
          ],
          style: { width: "200px" },
          placeholder: "请输入姓名",
        },
        {
          type: "Input",
          label: "手机号",
          name: "phone",

          placeholder: "请输入11位数字的手机号",
          rules: [
            {
              required: true,
              message: "手机号不能为空",
            },
            () => ({
              validator(rule, value) {
                // 验证手机号
                // let regPhone = /^1[3456789]\d{9}$/;  // 1 3 713746864  ^首位字符是什么，$结束字符是什么  \d代表数字  11位手机号
                if (validate_phone(value)) {
                  return Promise.resolve();
                }
                return Promise.reject("手机号格式有误");
              },
            }),
          ],
        },
        {
          type: "Radio",
          label: "禁启用",
          name: "status",
          rules: [
            {
              required: true,
              message: "禁启用不能为空",
            },
          ],
          options: [
            { label: "禁用", value: false },
            { label: "启用", value: true },
          ],
        },
      ],
    };
  }
  componentDidMount() {
    this.props.onRef(this);
  }
  showModal = (value) => {
    this.setState({
      isModalVisible: value,
    });
  };
//   getRef = (ref) =>{
//       this.child = ref;
//   }
  handleOk = () => {
    this.showModal(false);
  };
  handleCancel = () => {
    this.showModal(false);
  };
  render() {
    const { isModalVisible, formItem, formLayout, formConfig } = this.state;
    return (
      <React.Fragment>
        <Modal
          title="新增用户"
          visible={isModalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <FormCom
            formItem={formItem}
            formLayout={formLayout}
            formConfig={formConfig}
          ></FormCom>
        </Modal>
      </React.Fragment>
    );
  }
}
export default userModal;
