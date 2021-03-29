import React from "react";

import { message } from "antd";
import FormCom from "@/components/form/Index";
//API
import {
  Detailed
} from "@/api/job";
export default class DepartAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonLoading: false,
      buttonDisabled: false,
      id: "",
      formConfig: {
        url: "jobAdd",
        initValue: {
          status: true,
          number: 0,
        },
        formatKey: "parentId",
      },
      formLayout: {
        labelCol: { span: 2 },
        wrapperCol: { span: 22 },
      },
      formItem: [
        {
          label: "部门名称",
          name: "parentId",
          type: "SelectComponent",
          rules: [
            {
              required: true,
              message: "部门名称不能为空",
            },
          ],
          url: "getDepartmentList",
          keyConfig: {
            value: "id",
            label: "name",
          },
          style: {
            width: "150px",
          },
          options: [
            {
              value: "4953",
              label: "张毅力",
            },
            {
              value: "4952",
              label: "123",
            },
            {
              value: "4949",
              label: "划水部",
            },
          ],
        },
        {
          label: "职位名称",
          name: "jobName",
          type: "Input",
          rules: [
            {
              required: true,
              message: "职位名称不能为空",
            },
          ],
          style: {
            width: "150px",
          },
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
  }
  handlerDepartAdd(formObj) {
  }
  handlerDepartEdit(formObj) {
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
    Detailed({ id }).then((res) => {
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
