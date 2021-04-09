import React from "react";
import {
  Form,
  Button,
  Input,
  Select,
  InputNumber,
  Radio,
  message,
  DatePicker,
  Row,
  Col,
} from "antd";
import "moment/locale/zh-cn";
import locale from "antd/es/date-picker/locale/zh_CN";
import propTypes from "prop-types";
import { requestUrl } from "@/api/requestUrl";
import { FormSubmit } from "@/api/common";
import SelectCom from "@/components/select/index";
import UploadCom from "@/components/upload/index";
import EditorCom from "@/components/editor/index";
//scss
import "./form.scss";
const { Option } = Select;
export default class FormCom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.form = React.createRef();
    this.initFormItem = this.initFormItem.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.initInputNumber = this.initInputNumber.bind(this);
  }
  componentWillReceiveProps({ formConfig }) {
    this.refs.Form.setFieldsValue(formConfig.setFieldsValue);
  }
  componentDidMount() {
    this.props.onRef && this.props.onRef(this);
  }
  /**
   * Input
   */
  initInput(item) {
    return (
      <Form.Item
        label={item.label}
        name={item.name}
        key={item.name}
        rules={item.rules ?? []}
      >
        <Input style={item.style} />
      </Form.Item>
    );
  }

  /*
   *Select
   */
  initSelect(item) {
    return (
      <Form.Item
        label={item.label}
        name={item.name}
        key={item.name}
        rules={item.rules ?? []}
      >
        <Select style={item.style} placeholder={item.placeholder}>
          {item.options &&
            item.options.map((item) => {
              return <Option value={item.value}>{item.label}</Option>;
            })}
        </Select>
      </Form.Item>
    );
  }
  /**
   * SelectComponent
   */
  initSelectComponent(item) {
    return (
      <Form.Item
        label={item.label}
        name={item.name}
        key={item.name}
        rules={[
          ...(item.rules || []),
          {
            validator: this.validatorSelect,
          },
        ]}
      >
        <SelectCom url={item.url} keyConfig={item.keyConfig} name={item.name} />
      </Form.Item>
    );
  }
  //插槽
  slotElem(item) {
    return (
      <Form.Item
        label={item.label}
        name={item.name}
        key={item.name}
        rules={item.rules}
      >
        {/* {this.props.children ? this.props.children.filter(elem => elem.ref === item.slotName) : ""} */}
        {/* {判断是否是数组} */}
        {this.props.children && Array.isArray(this.props.children)
          ? this.props.children.filter((elem) => elem.ref === item.slotName)
          : this.props.children}
      </Form.Item>
    );
  }
  validatorSelect(rule, value) {
    if (value || value[rule.field]) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("选项不能为空！"));
  }
  /*
    InputNumber
  */
  initInputNumber(item) {
    return (
      <Form.Item
        label={item.label}
        name={item.name}
        key={item.name}
        rules={item.rules ?? []}
      >
        <InputNumber min={item.min} max={item.max} />
      </Form.Item>
    );
  }
  /**
   * Radio
   */
  initRadio(item) {
    return (
      <Form.Item
        label={item.label}
        name={item.name}
        key={item.name}
        rules={item.rules ?? []}
      >
        <Radio.Group>
          {item.options &&
            item.options.map((ele) => {
              return (
                <Radio value={ele.value} key={`${ele.value}.${ele.label}`}>
                  {ele.label}
                </Radio>
              );
            })}
        </Radio.Group>
      </Form.Item>
    );
  }
  /**
   * TextArea
   */
  initTextArea(item) {
    return (
      <Form.Item
        label={item.label}
        name={item.name}
        key={item.name}
        rules={item.rules ?? []}
      >
        <Input.TextArea />
      </Form.Item>
    );
  }
  /**
   * Column
   */
  initColumn(item) {
    return (
      <div className="form-column">
        <h4>{item.label}</h4>
      </div>
    );
  }
  /**
   * Date
   */
  initDate(item) {
    return (
      <Form.Item
        label={item.label}
        name={item.name}
        key={item.name}
        rules={item.rules ?? []}
      >
        <DatePicker locale={locale} format={item.format} picker={item.mode} />
      </Form.Item>
    );
  }
  /**
   * 上传文件
   */
  initUpload(item) {
    return (
      <Form.Item
        label={item.label}
        name={item.name}
        key={item.name}
        rules={item.rules ?? []}
      >
        <UploadCom name={item.name} />
      </Form.Item>
    );
  }
  /**
   * 富文本编辑
   */
  initEditor(item) {
    return (
      <Form.Item
        label={item.label}
        name={item.name}
        key={item.name}
        rules={item.rules ?? []}
      >
        <EditorCom name={item.name} />
      </Form.Item>
    );
  }
  /**行内元素 */
  initFormItemInLine(item) {
    const { inlineItem } = item;

    if (!inlineItem) return;
    return (
      <Row>
        <Col
          span={item.colLabel || 2}
          className="ant-form-item"
          style={{ textAlign: "right" }}
        >
          <div class="ant-form-item-label">
            <label for="name" class=" ant-form-item-required" title="姓名">
              {item.label}
            </label>
          </div>
        </Col>
        <Col span={item.colControl || 22}>
          <Row>
            {inlineItem.map((ele) => {
              return (
                <Col span={ele.col} className="form-item-inline-control">
                  {this.createControl(ele)}
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
    );
  }
  initFormItem() {
    const { formItem } = this.props;
    if (!formItem || (formItem && formItem.length === 0)) {
      return false;
    }
    let formList = formItem.map((item) => {
      return this.createControl(item);
    });
    return formList;
  }
  /**
   * 创建表单控件
   */
  createControl = (item) => {
    if (item.type === "Input") {
      return this.initInput(item);
    }
    if (item.type === "Select") {
      return this.initSelect(item);
    }
    if (item.type === "InputNumber") {
      return this.initInputNumber(item);
    }
    if (item.type === "Radio") {
      return this.initRadio(item);
    }
    if (item.type === "TextArea") {
      return this.initTextArea(item);
    }
    if (item.type === "SelectComponent") {
      return this.initSelectComponent(item);
    }
    if (item.type === "Slot") {
      return this.slotElem(item);
    }
    if (item.type === "Column") {
      return this.initColumn(item);
    }
    if (item.type === "Date") {
      return this.initDate(item);
    }
    if (item.type === "Upload") {
      return this.initUpload(item);
    }
    if (item.type === "Editor") {
      return this.initEditor(item);
    }
    if (item.type === "formItemInLine") {
      return this.initFormItemInLine(item);
    }
  };
  formatData(value) {
    let requestData = JSON.parse(JSON.stringify(value));
    const { formatKey, editKey, setFieldsValue } = this.props.formConfig;
    let keyValue = requestData[formatKey];
    if (Object.prototype.toString.call(keyValue) === "[object Object]") {
      requestData[formatKey] = keyValue[formatKey];
    }
    if (editKey) {
      requestData[editKey] = setFieldsValue[editKey];
    }
    return requestData;
    // if (formatKey && value[formatKey]) {
    //   const dataKey = value[formatKey];
    //   delete value[formatKey];
    //   value = Object.assign(value, dataKey);
    // }
  }
  onSubmit(value) {
    this.setState({
      buttonLoading: true,
    });
    const requestData = this.formatData(value);
    const data = {
      url: requestUrl[this.props.formConfig.url],
      data: requestData,
    };
    FormSubmit(data)
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
  render() {
    const { formLayout, submitButton } = this.props;
    const { buttonLoading } = this.state;
    return (
      <Form ref="Form" {...formLayout} onFinish={this.onSubmit}>
        {this.initFormItem()}
        <Row>
          <Col span={formLayout.labelCol.span}></Col>
          <Col span={formLayout.wrapperCol.span}>
            {submitButton && (
              <Button type="primary" htmlType="submit" loading={buttonLoading}>
                确定
              </Button>
            )}
          </Col>
        </Row>
      </Form>
    );
  }
}
FormCom.propTypes = {
  formConfig: propTypes.object,
  submitButton: propTypes.bool,
};
FormCom.defaultProps = {
  formConfig: {},
  submitButton: true,
};
