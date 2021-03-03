import React, { Fragment } from "react";
//antd
import { Form, Input, message, Button, Table, Switch,Modal } from "antd";
import { DepartmentList, DepartmentDelete } from "@/api/department";
export default class DepartList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNumber: 1,
      pageSize: 10,
      keyWork: "",
      //复选框数据
      selectRowKeys: [],
      //警告弹窗
      visible:false,
      id:"",
      columns: [
        {
          title: "部门",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "禁启用",
          dataIndex: "status",
          key: "status",
          render: (text, rowData) => {
            return <Switch defaultChecked={rowData.status}></Switch>;
          },
        },
        {
          title: "人员数量",
          dataIndex: "number",
          key: "number",
        },
        {
          title: "操作",
          dataIndex: "operation",
          key: "operation",
          width: 215,
          render: (text, rowData) => {
            return (
              <div className="inline-button">
                <Button type="primary">编辑</Button>
                <Button onClick={() => this.onHandleDelete(rowData.id)}>
                  删除
                </Button>
              </div>
            );
          },
        },
      ],
      dataSource: [],
    };
    this.onFinish = this.onFinish.bind(this);
    this.loadData = this.loadData.bind(this);
    this.onCheckBox = this.onCheckBox.bind(this);
    this.onHandleDelete = this.onHandleDelete.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.modalThen = this.modalThen.bind(this);
  }
  onFinish(value) {
    this.setState({
      keyWork: value.name,
    });
    this.loadData();
  }
  componentDidMount() {
    this.loadData();
  }
  loadData() {
    const { pageNumber, pageSize, keyWork } = this.state;
    const requestData = {
      pageNumber,
      pageSize,
    };
    if (keyWork !== "") {
      requestData.name = keyWork;
    }
    DepartmentList(requestData).then((res) => {
      const resData = res.data.data;
      if (resData) {
        this.setState({
          dataSource: resData.data,
        });
      }
    });
  }
  onCheckBox(selectKeys) {
    this.setState({
      selectRowKeys: selectKeys,
    });
  };
  onHandleDelete(id) {
    if (!id) {
      return false;
    }
    this.setState({
      id
    })
  };
  modalThen(){
    const {id} = this.state;
    DepartmentDelete({ id })
      .then((res) => {
        message.info("删除成功！");
      })
      .finally(() => {
        this.loadData();
      });
  }
  hideModal(){
    this.setState({
      visible:false
    })
  }
  render() {
    const { columns, dataSource } = this.state;
    const rowSelection = {
      onChange: this.onCheckBox,
    };
    return (
      <Fragment>
        <Form layout="inline" onFinish={this.onFinish}>
          <Form.Item label="部门名称" name="name">
            <Input placeholder="请输入部门名称" />
          </Form.Item>
          <Form.Item shouldUpdate={true}>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
          </Form.Item>
        </Form>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={dataSource}
          bordered
          rowSelection={rowSelection}
        ></Table>
        <Modal
          title="Modal"
          visible={this.state.visible}
          onOk={this.modalThen}
          onCancel={this.hideModal}
          okText="确认"
          cancelText="取消"
        >
          <p className="text-center">确认删除信息？<strong className="text-red">删除后降无法恢复。</strong></p>
        </Modal>
      </Fragment>
    );
  }
}
