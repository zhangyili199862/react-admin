import React from "react";
import { validate_phone, validate_pass } from "@/utils/validate";
import { message, Modal } from "antd";
import FormCom from "@/components/form/Index";
import CryptoJS from "crypto-js";
import { UserAdd, UserDetail,UserEdit } from "@/api/user";
class userModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      id: "",
      formConfig: {
        url: "userEdit",
        initValue: {
          status: true,
          number: 0,
        },
        formatKey: "id",
        editKey: "id",
      },
      formLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
      },
      passwordRule: [
        () => ({
          validator(rule, value) {
            // 验证手机号
            // let regPhone = /^1[3456789]\d{9}$/;  // 1 3 713746864  ^首位字符是什么，$结束字符是什么  \d代表数字  11位手机号
            if (validate_pass(value)) {
              return Promise.resolve();
            }
            return Promise.reject("密码格式有误");
          },
        }),
      ],
      passwordsRule: [
        () => ({
          validator(rule, value) {
            // 验证手机号
            // let regPhone = /^1[3456789]\d{9}$/;  // 1 3 713746864  ^首位字符是什么，$结束字符是什么  \d代表数字  11位手机号
            if (validate_pass(value)) {
              return Promise.resolve();
            }
            return Promise.reject("密码格式有误");
          },
        }),
      ],
      formItem: [
        {
          type: "Input",
          label: "用户名",
          name: "username",
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
          valueType:"password",
          label: "密码",
          name: "password",
          updateItem:true,
          trigger:['onBlur'],
          rules: [
            {
              required: true,
              message: "姓名不能为空",
            },
          ],
          style: { width: "200px" },
          placeholder: "请输入姓名",
          blurEvent:true
        },
        {
          type: "Input",
          label: "确认密码",
          valueType:"password",
          name: "passwords",
          updateItem:true,
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
      isEdit:false
    };
  }
  componentDidMount() {
    this.props.onRef(this);
  }
  /**修改数组对象 */
  updateFormItem = (updateIndex = [], key) => {
    console.log(key);
    this.setState({
      formItem: this.state.formItem.map((item, index) =>
        updateIndex.includes(index) ? { ...item, ...key[index] } : item
      ),
    });
  };
  updateArray = (id) => {
    console.log(id);
    if (!id) return;
    this.updateFormItem([1, 2], {
      1: {
        rules: [
          {
            required: false,
            message: "密码不能为空",
          },
        ],
      },
      2: {
        rules: [
          {
            required: false,
            message: "请再次输入密码",
          },
        ],
      },
    });
  };
  showModal = ({ status, id }) => {
    this.setState(
      {
        isModalVisible: status,
        id: id,
      },
      () => {
        this.getDetailed();
        this.updateArray(id);
      }
    );
  };
  getDetailed = () => {
    if (!this.state.id) return false;
    UserDetail({ id: this.state.id }).then((res) => {
      const resData = res.data;
      this.setState({
        formConfig: {
          setFieldsValue: resData.data,
        },
      });
    });
    this.setState({
      isEdit:true
    })
  };
  submit = (value) => {
    let requestData = value,{isEdit} = this.state;
    if(requestData.password){
      requestData.password = CryptoJS.MD5(requestData.password).toString();
    }
    const password  = value.password;
    const passwords = value.passwords;
    if(!isEdit){
      UserAdd(requestData).then((res) => {
        const resData = res.data;
        message.info(resData.message);
      });
    }else {
      UserEdit(requestData).then((res) => {
        const resData = res.data;
        message.info(resData.message);
      });
    }
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
  onBlurEvent = (e) =>{
    console.log(e);
  }
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
            onBlur={this.onBlurEvent}
            formItem={formItem}
            formLayout={formLayout}
            formConfig={formConfig}
            submit={this.submit}
          ></FormCom>
        </Modal>
      </React.Fragment>
    );
  }
}
export default userModal;
