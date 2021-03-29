import React from "react";

import { Select } from "antd";
import FormCom from "@/components/form/Index";
//API
import { Detailed } from "@/api/job";
import { TableList } from "@/api/common";
import { requestUrl } from "@/api/requestUrl";
// import SelectCom from "@/components/select/index";
const { Option } = Select;
export default class StaffAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonLoading: false,
      buttonDisabled: false,
      id: "",
      select: [],
      // select: {
      //   name: "parentId",
      //   url: "getDepartmentList",
      //   keyConfig: {
      //     value: "id",
      //     label: "name",
      //   },
      // },
      formConfig: {
        url: "jobAdd",
        initValue: {
          status: true,
          number: 0,
        },
        formatKey: "parentId",
        editKey: "",
      },
      formLayout: {
        labelCol: { span: 2 },
        wrapperCol: { span: 22 },
      },
      formItem: [
        {
          type: "Column",
          label: "个人信息",
        },
        {
          label: "姓名",
          name: "jobName",
          type: "Input",
          rules: [
            {
              required: true,
              message: "姓名不能为空",
            },
          ],
          style: {
            width: "150px",
          },
        },
        {
          label: "性别",
          name: "status",
          type: "Radio",
          options: [
            { label: "男", value: 1 },
            { label: "女", value: 2 },
          ],
          rules: [
            {
              required: true,
              message: "禁启用不能为空",
            },
          ],
          defaultValue: 1,
        },
        {
          label: "身份证",
          name: "jobName",
          type: "Input",
          rules: [
            {
              required: true,
              message: "身份证不能为空",
            },
          ],
          style: {
            width: "150px",
          },
        },
        {
          type: "Date",
          label: "出生年月",
          format: "YYYY/MM/DD",
          mode: "date",
        },
        {
          label: "手机号",
          name: "jobName",
          type: "Input",
          rules: [
            {
              required: true,
              message: "手机号不能为空",
            },
          ],
          style: {
            width: "150px",
          },
        },
        {
          label: "身份证",
          name: "jobName",
          type: "Input",
          rules: [
            {
              required: true,
              message: "身份证不能为空",
            },
          ],
          style: {
            width: "150px",
          },
        },
        {
          label: "民族",
          name: "jobName",
          type: "Select",
          rules: [
            {
              required: true,
              message: "民族不能为空",
            },
          ],
          style: {
            width: "150px",
          },
          options: [
            {
              label: "汉族",
              value: "123",
            },
          ],
        },
        {
          label: "政治面貌",
          name: "jobName",
          type: "Select",
          rules: [
            {
              required: true,
              message: "政治面貌不能为空",
            },
          ],
          style: {
            width: "150px",
          },
          options: [
            {
              label: "汉族",
              value: "123",
            },
          ],
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
        {
          type: "Column",
          label: "职位信息",
        },
      ],
    };
    this.getSelectList = this.getSelectList.bind(this);
  }
  handlerDepartAdd(formObj) {}
  handlerDepartEdit(formObj) {}
  componentWillMount() {
    if (this.props.location.state) {
      this.setState({
        id: this.props.location.state.id,
      });
    }
  }
  componentDidMount() {
    this.getDetail();
    this.getSelectList();
  }
  getSelectList() {
    const data = {
      url: requestUrl["getDepartmentList"],
      data: {},
    };
    if (!data.url) return false;
    TableList(data).then((res) => {
      this.setState({
        select: res.data.data.data,
      });
    });
  }
  getDetail() {
    if (!this.props.location.state) return;
    const { id } = this.state;
    Detailed({ id }).then((res) => {
      const data = res.data.data;
      this.setState({
        formConfig: {
          ...this.state.formConfig,
          editKey: "jobId",
          url: "jobEdit",
          setFieldsValue: data,
        },
      });
    });
  }
  render() {
    const { formItem, formLayout, formConfig, select } = this.state;
    return (
      <div>
        {/* <SelectCom  url={select.url}  keyConfig={select.keyConfig} name={select.name} /> */}
        <FormCom
          formItem={formItem}
          formLayout={formLayout}
          formConfig={formConfig}
        >
          <Select ref="department">
            {select &&
              select.map((elem) => {
                return (
                  <Option value={elem.id} key={elem.id}>
                    {elem.name}
                  </Option>
                );
              })}
          </Select>
        </FormCom>
      </div>
    );
  }
}
