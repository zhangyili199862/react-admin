import React, { Fragment } from "react";
//antd
import { Button, Switch } from "antd";
import { Link } from "react-router-dom";
//组件
import TableComponent from "@/components/tableDataUse/Index";
//Store
// import Store from "@/store/Index"

// import {addStatus,updateStatus} from "@/store/action/config"
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
        url: "job",
        method: "post",
        rowKey: "jobId",
        checkBox: true,
        batchButton: false,
        thead: [
          {
            title: "职位名称",
            dataIndex: "jobName",
            key: "jobName",
          },
          {
            title: "部门名称",
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
                        pathname: "/index/job/add",
                        state: { id: rowData.jobId },
                      }}
                    >
                      编辑
                    </Link>
                  </Button>
                  <Button onClick={() => this.delete(rowData.jobId)}>删除</Button>
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
            placeholder: "请输入部门名称",
          },
          {
            type:"Select",
            label:"禁启用",
            name:"status",
            key:'status'
          }
        ],
      },
    };
    this.getChildRef = this.getChildRef.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
  }
  componentDidMount(){
    // Store.subscribe(()=>{
    // })
    // Store.dispatch(addStatus("所有","all"));
    // Store.dispatch(updateStatus("不禁用",false))
  }
  getChildRef(ref) {
    this.tableComponent = ref;
  }
  delete(id) {
    this.tableComponent.onHandleDelete(id);
  }
  handleSwitch(data) {
    this.setState({
      changgeId: data.jobId,
    });
    this.setState({ id: data.jobId });
    this.tableComponent.onHandlerSwitch(data);
    this.setState({ changgeId: "" });
  }
  render() {
    const { tableConfig } = this.state;
    return (
      <Fragment>
        <TableComponent onRef={this.getChildRef} batchButton={true} config={tableConfig} />
      </Fragment>
    );
  }
}
