import React from "react";

import propTypes from "prop-types";
import { requestUrl } from "@/api/requestUrl";
import { TableList, TableDelete, TableStatus } from "@/api/common";
import TableBasics from "./Table";
import FormSearch from "@/components/formSearch/Index";
import { Modal, message } from "antd";
export default class TableComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //请求参数
      pageNumber: 1,
      pageSize: 10,
      searchData: "",
      //数据
      data: [],
      //加载
      tableLoading: false,
      //页码
      total: 0,
      //弹窗
      visible: false,
      confirmLoading: false, //弹窗Loading
    };
    this.onChangeCurrentPage = this.onChangeCurrentPage.bind(this);
    this.onChangeCurrentSize = this.onChangeCurrentSize.bind(this);
    this.onCheckBox = this.onCheckBox.bind(this);
    this.onHandleDelete = this.onHandleDelete.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.modalThen = this.modalThen.bind(this);
    this.search = this.search.bind(this);
  }
  componentDidMount() {
    this.loadData();
    this.props.onRef(this);
  }
  loadData() {
    const { pageNumber, pageSize, searchData } = this.state;
    console.log(searchData);
    const requestData = {
      url: requestUrl[this.props.config.url],
      method: "post",
      data: {
        pageNumber,
        pageSize,
      },
    };
    if (Object.keys(searchData).length !== 0) {
      for (let key in searchData) {
        requestData.data[key] = searchData[key];
      }
    }
    TableList(requestData).then((res) => {
      const resData = res.data.data;
      if (resData) {
        this.setState({
          data: resData.data,
          total: resData.total,
        });
      }
    });
    this.setState({
      tableLoading: false,
    });
  }
  onCheckBox(selectKeys) {
    this.setState({
      selectRowKeys: selectKeys,
    });
  }
  onChangeCurrentPage(value) {
    console.log(value);
    this.setState(
      {
        pageNumber: value,
      },
      () => {
        this.loadData();
      }
    );
  }
  onChangeCurrentSize(value, page) {
    this.setState(
      {
        pageNumber: page,
        pageSize: value,
      },
      () => {
        this.loadData();
      }
    );
  }
  hideModal() {
    this.setState({
      visible: false,
      id: "",
    });
  }
  onHandleDelete(id) {
    if (!id) {
      if (this.state.selectRowKeys.length === 0) return false;

      id = this.state.selectRowKeys.join();
    }
    this.setState({
      id,
      visible: true,
    });
  }
  onHandlerSwitch(data) {
    const requestData = {
      url: requestUrl[`${this.props.config.url}Status`],
      data: {
        id: data.id,
        status: data.status ? false : true,
      },
    };
    TableStatus(requestData).then((res) => {
      message.info("修改成功！");
    });
  }
  search(value) {
    this.setState({
      pageNumber: 1,
      pageSize: 10,
      searchData: value,
    });
    this.loadData();
  }
  modalThen() {
    this.setState({
      confirmLoading: true,
    });
    const { id } = this.state;
    let requestData = {
      url: requestUrl[`${this.props.config.url}Delete`],
      data: {
        id,
      },
    };
    TableDelete(requestData)
      .then((res) => {
        this.setState({
          visible: false,
          id: "",
          confirmLoading: false,
          selectRowKeys: [],
        });
        message.info("删除成功！");
        this.loadData();
      })
      .catch((err) => {
        this.setState({
          confirmLoading: false,
        });
        message.error("删除失败！");
      })
      .finally(() => {});
  }
  render() {
    const {
      thead,
      checkBox,
      batchButton,
      rowKey,
      formItem,
    } = this.props.config;
    console.log(thead)
    const { data, total } = this.state;
    const rowSelection = {
      onChange: this.onCheckBox,
    };
    return (
      <React.Fragment>
        <FormSearch formItem={formItem} search={this.search} />
        {/* <Form layout="inline" onFinish={this.onFinish}>
          <Form.Item label="部门名称" name="name">
            <Input placeholder="请输入部门名称" />
          </Form.Item>
          <Form.Item shouldUpdate={true}>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
          </Form.Item>
          <Form.Item></Form.Item>
        </Form> */}
        <TableBasics
          columns={thead}
          dataSource={data}
          total={total}
          changePageCurrent={this.onChangeCurrentPage}
          changePageSize={this.onChangeCurrentSize}
          handlerDelete={() => this.handlerDelete()}
          batchButton={batchButton}
          checkBox={checkBox}
          rowSelection={checkBox ? rowSelection : null}
          rowKey={rowKey}
        />
        <Modal
          title="Modal"
          visible={this.state.visible}
          onOk={this.modalThen}
          onCancel={this.hideModal}
          confirmLoading={this.confirmLoading}
          okText="确认"
          cancelText="取消"
        >
          <p className="text-center">
            确认删除信息？
            <strong className="text-red">删除后将无法恢复。</strong>
          </p>
        </Modal>
      </React.Fragment>
    );
  }
}

TableComponent.propTypes = {
  config: propTypes.object,
};
TableComponent.defaultProps = {
  batchButton: false,
};
