import React from "react";
import "moment/locale/zh-cn";
import locale from "antd/es/date-picker/locale/zh_CN";
import { Col, Radio, Row, DatePicker } from "antd";
import FormCom from "@/components/form/Index";
import {validate_phone} from "@/utils/validate"
//API
import { Detailed } from "@/api/job";
import { TableList } from "@/api/common";
import { requestUrl } from "@/api/requestUrl";
import { nation, face } from "@/js/data";
// import SelectCom from "@/components/select/index";
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
          name: "a1",
          type: "Input",
          rules: [
            {
              required: true,
              message: "姓名不能为空",
            },
          ],
        },
        {
          label: "性别",
          name: "a2",
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
          name: "a3",
          type: "Input",
          rules: [
            {
              required: true,
              message: "身份证不能为空",
            },
          ],
        },
        {
          label: "头像",
          name: "a13",
          type: "Upload",
        },
        {
          type: "Date",
          label: "出生年月",
          name: "a4",
          format: "YYYY/MM/DD",
          mode: "date",
        },
        {
          label: "手机号",
          name: "a5",
          type: "Input",
          rules: [
            {
              required: true,
              message: "手机号不能为空",
            },
            () => ({
              validator(rule, value) {
                if (validate_phone(value)) {
                  return Promise.resolve();
                } else {
                  return Promise.reject("手机号格式有误");
                }
              },
            }),
          ],
        },
        {
          label: "身份证",
          name: "a6",
          type: "Input",
          rules: [
            {
              required: true,
              message: "身份证不能为空",
            },
          ],
        },
        {
          label: "民族",
          name: "a7",
          type: "Select",
          rules: [
            {
              required: true,
              message: "民族不能为空",
            },
          ],

          options: nation,
        },
        {
          label: "政治面貌",
          name: "a8",
          type: "Select",
          rules: [
            {
              required: true,
              message: "政治面貌不能为空",
            },
          ],

          options: face,
        },
        {
          label: "描述",
          name: "a9",
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
        {
          label: "职位",
          name: "a10",
          type: "Select",
          rules: [
            {
              required: true,
              message: "职位不能为空",
            },
          ],

          options: [
            {
              label: "汉族",
              value: "123",
            },
          ],
        },
        {
          type: "Slot",
          label: "在职情况",
          slotName: "jobSlot",
          name: "a11",
        },
        {
          label: "邮箱",
          name: "a12",
          type: "Input",
          rules: [
            {
              required: true,
              message: "邮箱不能为空",
            },
          ],
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
    const { formItem, formLayout, formConfig } = this.state;
    return (
      <div>
        {/* <SelectCom  url={select.url}  keyConfig={select.keyConfig} name={select.name} /> */}
        <FormCom
          formItem={formItem}
          formLayout={formLayout}
          formConfig={formConfig}
        >
          <div ref="jobSlot">
            <Row gutter={16}>
              <Col className="gutter-row" span={4}>
                <Radio>在职</Radio>
                <DatePicker
                  locale={locale}
                  format="YYYY/MM/DD"
                  picker="date"
                ></DatePicker>
              </Col>
              <Col span={4}>
                <Radio>休假</Radio>
                <DatePicker
                  locale={locale}
                  format="YYYY/MM/DD"
                  picker="date"
                ></DatePicker>
              </Col>
              <Col span={4}>
                <Radio>离职</Radio>
              </Col>
            </Row>
          </div>
        </FormCom>
      </div>
    );
  }
}
