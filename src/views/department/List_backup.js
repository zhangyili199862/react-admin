import React, { Fragment } from "react";
//antd
import { Button, Switch } from "antd";
import { Link } from "react-router-dom";
//组件
import TableComponent from "@/components/tableData/Index";
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
      visible: false,
      confirmLoading: false, //弹窗Loading
      id: "",
      tableLoading: false,
      dataSource: [],
      //控制开关
      changgeId: "",
      tableConfig: {
        url: "department",
        method: "post",
        rowKey: "id",
        checkBox: true,
        batchButton: false,
        thead: [
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
              return (
                <Switch
                  onChange={() => this.handleSwitch(rowData)}
                  loading={rowData.id === this.state.changgeId}
                  defaultChecked={rowData.status}
                ></Switch>
              );
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
                  <Button type="primary">
                    <Link
                      to={{
                        pathname: "/index/department/add",
                        state: { id: rowData.id },
                      }}
                    >
                      编辑
                    </Link>
                  </Button>
                  <Button onClick={() => this.delete(rowData.id)}>删除</Button>
                </div>
              );
            },
          },
        ],
        formItem: [
          {
            type: "Input",
            label: "部门名称",
            name: "name",
            rules: [
              {
                required: true,
                message: "部门名称不能为空",
              },
            ],
            placeholder: "请输入部门名称",
          },
        ],
      },
    };
    this.getChildRef = this.getChildRef.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
  }

  getChildRef(ref) {
    this.tableComponent = ref;
  }
  delete(id) {
    this.tableComponent.onHandleDelete(id);
  }
  handleSwitch(data) {
    this.setState({
      changgeId: data.id,
    });
    this.setState({ id: data.id });
    this.tableComponent.onHandlerSwitch(data);
    this.setState({ changgeId: "" });
  }
  render() {
    const { tableConfig } = this.state;
    return (
      <Fragment>
        <TableComponent
          onRef={this.getChildRef}
          config={tableConfig}
        ></TableComponent>
      </Fragment>
    );
  }
}
