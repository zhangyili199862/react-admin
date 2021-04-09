import React from "react";
import "moment/locale/zh-cn";
import FormCom from "@/components/form/Index";
import { validate_phone } from "@/utils/validate";
//API
import { Detailed } from "@/api/staff";
import { TableList } from "@/api/common";
import { requestUrl } from "@/api/requestUrl";
import { nation, face, education } from "@/js/data";
import moment from "moment";
// import SelectCom from "@/components/select/index";
export default class UserAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonLoading: false,
      buttonDisabled: false,
      id: "",
      job_status: "",
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
        url: "staffAdd",
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
          type: "Input",
          label: "姓名",
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
          type: "Radio",
          label: "性别",
          name: "sex",
          rules: [
            {
              required: true,
              message: "性别不能为空",
            },
          ],
          options: [
            { label: "男", value: true },
            { label: "女", value: false },
          ],
        },
        {
          type: "Input",
          label: "身份证",
          name: "card_id",
          rules: [
            {
              required: true,
              message: "身份证不能为空",
            },
          ],
          placeholder: "请输入身份证",
        },
        {
          type: "Upload",
          label: "头像",
          request: true,
          name: "face_img",
          message: "请上传头像",
        },

        {
          type: "Date",
          label: "出生年月",
          name: "birthday",
          format: "YYYY/MM",
          mode: "month",
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
          type: "Select",
          label: "民族",
          name: "nation",
          rules: [
            {
              required: true,
              message: "民族不能为空",
            },
          ],
          options: nation,
          placeholder: "请输入11位数字的手机号",
        },
        {
          type: "Select",
          label: "政治面貌",
          name: "political",
          rules: [
            {
              required: true,
              message: "政治面貌不能为空",
            },
          ],
          options: face,
          placeholder: "请输入11位数字的手机号",
        },
        {
          type: "Input",
          label: "毕业院校",
          name: "school",
        },
        {
          type: "Select",
          label: "学历",
          name: "education",

          options: education,
        },
        {
          type: "Input",
          label: "专业",
          name: "major",
        },
        {
          type: "Upload",
          label: "毕业证",
          name: "diploma_img",

          message: "请上传毕业证",
        },
        {
          type: "Input",
          label: "微信号",
          name: "wechat",
        },
        {
          type: "Input",
          label: "邮箱",
          name: "email",
        },
        {
          type: "Column",
          label: "就职信息",
        },
        {
          type: "SelectComponent",
          label: "部门",
          url: "getDepartmentList",
          name: "departmen_id",
          keyConfig: {
            label: "name",
            value: "id",
          },
          rules: [
            {
              required: true,
              message: "部门不能为空",
            },
          ],
          style: { width: "200px" },
          placeholder: "请选择邮箱",
        },
        {
          type: "SelectComponent",
          label: "职位",
          url: "jobListAll",
          name: "job_id",
          keyConfig: {
            label: "jobName",
            value: "jobId",
          },
          rules: [
            {
              required: true,
              message: "职位不能为空",
            },
          ],

          style: { width: "200px" },
          placeholder: "请选择邮箱",
        },
        {
          type: "formItemInLine",
          label: "职员状态",
          name: "staffstatis",
          style: { width: "200px" },
          placeholder: "请输入姓名",
          colLabel: 2,
          colControl: 22,
          inlineItem: [
            {
              type: "Date",
              label: "入职时间",
              name: "job_entry_date",

              style: { width: "100%" },
              placeholder: "请输入姓名",
              col: 3,
            },
            {
              type: "Date",
              label: "转正时间",
              name: "job_formal_date",

              style: { width: "100%" },
              placeholder: "请输入姓名",
              col: 3,
            },
            {
              type: "Date",
              label: "离职时间",
              name: "job_quit_date",

              style: { width: "100%" },
              placeholder: "请输入姓名",
              col: 3,
            },
          ],
        },
        {
          type: "Input",
          label: "公司邮箱",
          name: "company_email",
          rules: [
            {
              required: true,
              message: "公司邮箱不能为空",
            },
          ],
          placeholder: "请输入邮箱",
        },
        {
          type: "Editor",
          label: "描述",
          name: "introduce",
          rules: [
            {
              required: true,
              message: "描述不能为空",
            },
          ],
          placeholder: "请输入描述内容",
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
      const basicData = {
        birthday: data.birthday ? moment(data.birthday) : "",
        job_entry_date: data.job_entry_date ? moment(data.job_entry_date) : "",
        job_formal_date: data.job_formal_date ? moment(data.job_formal_date) : "",
        job_quit_date: data.job_quit_date ? moment(data.job_quit_date) : "",
      };
      this.setState({
        formConfig: {
          ...this.state.formConfig,
          editKey: "staff_id",
          url: "staffEdit",
          setFieldsValue: {...data,...basicData},
        },
      });
    });
  }
  handleEditorChange = (value) => {
    console.log(value);
  };
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
        </FormCom>
      </div>
    );
  }
}
