import React from "react";

import { message } from "antd";

import FormCom from "@/components/form/Index";
//API
import {
  DepartmentAdd,
  DepartmentDetailed,
  DepartmentEdit,
} from "@/api/department";
export default class DepartAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonLoading: false,
      buttonDisabled: false,
      id: "",
      formConfig: {
        url: "departmentAdd",
        initValue: {
          status: true,
          number: 0,
        },
      },
      formLayout: {
        labelCol: { span: 2 },
        wrapperCol: { span: 22 },
      },
      formItem: [
        {
          label: "部门名称",
          name: "name",
          type: "Input",
          rules: [
            {
              required: true,
              message: "部门名称不能为空",
            },
          ],
          style: {
            width: "150px",
          },
        },
        {
          label: "人员数量",
          name: "number",
          type: "InputNumber",
          min: 0,
          max: 100,
          rules: [
            {
              required: true,
              message: "人员数量名称不能为空",
            },
          ],
        },
        {
          label: "禁启用",
          name: "status",
          type: "Radio",
          options: [
            { label: "禁用", value: false },
            { label: "启动", value: true },
          ],
          rules: [
            {
              required: true,
              message: "禁启用不能为空",
            },
          ],
          defaultValue: true,
        },
        {
          label: "描述",
          name: "content",
          type: "TextArea",
          rules: [
            {
              required: true,
              message: "描述不能为空",
            },
          ],
        },
      ],
    };
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(formObj) {
    if (!formObj) return;
    this.state.id === ""
      ? this.handlerDepartAdd(formObj)
      : this.handlerDepartEdit(formObj);
  }
  handlerDepartAdd(formObj) {
    DepartmentAdd(formObj)
      .then((res) => {
        message.success(res.data.message);
        // this.refs.form.resetFields();
      })
      .finally(() => {
        this.setState({
          buttonLoading: false,
        });
      });
  }
  handlerDepartEdit(formObj) {
    const requestData = formObj;
    requestData.id = this.state.id;
    DepartmentEdit(requestData)
      .then((res) => {
        message.success(res.data.message);
      })
      .finally(() => {
        this.setState({
          buttonLoading: false,
        });
      });
  }
  componentWillMount() {
    if (this.props.location.state) {
      this.setState({
        id: this.props.location.state.id,
      });
    }
  }
  componentDidMount() {
    this.getDetail();
  }
  getDetail() {
    if (!this.props.location.state) return;
    const { id } = this.state;
    DepartmentDetailed({ id }).then((res) => {
      const data = res.data.data;
      this.setState({
        formConfig:{
          ...this.state.formConfig,
          setFieldsValue:data
        }
      })
    });
  }
  render() {
    const { formItem, formLayout, formConfig } = this.state;
    return (
      <div>
        <FormCom
          formItem={formItem}
          formLayout={formLayout}
          formConfig={formConfig}
        />
      </div>
    );
  }
}
