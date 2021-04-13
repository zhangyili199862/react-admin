import React, { Fragment } from "react";
//antd
import { Button, Switch } from "antd";
import { Link } from "react-router-dom";
//组件
import TableComponent from "@/components/tableDataUse/Index";
import UserModal from "./components/userModal";
//Store
// import Store from "@/store/Index"

// import {addStatus,updateStatus} from "@/store/action/config"
export default class UserList extends React.Component {
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
        url: "userList",
        method: "post",
        rowKey: "staff_id",
        checkBox: true,
        batchButton: false,
        thead: [
          {
            title: "用户名",
            dataIndex: "username",
            key: "username",
          },
          {
            title: "真实姓名",
            dataIndex: "truename",
            key: "truename",
          },
          {
            title: "手机号",
            dataIndex: "phone",
            key: "phone",
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
            title: "权限",
            dataIndex: "role_str",
            key: "role_str",
          },
          {
            title: "操作",
            dataIndex: "operation",
            key: "operation",
            width: 215,
            render: (text, rowData) => {
              return (
                <div className="inline-button">
                  <Button type="primary" onClick={()=> this.onHandleEdit(rowData.id)}>
                    {/* <Link
                      to={{
                        pathname: "/index/staff/add",
                        state: { id: rowData.staff_id },
                      }}
                    > */}
                      编辑
                    {/* </Link> */}
                  </Button>
                  <Button onClick={() => this.delete(rowData.staff_id)}>
                    删除
                  </Button>
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
            type: "Select",
            label: "禁启用",
            name: "status",
            key: "status",
          },
        ],
        formSearchFilter: 18,
        formSearchRight: 6,
      },
    };
    this.getChildRef = this.getChildRef.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
  }
  componentDidMount() {
    // Store.subscribe(()=>{
    // })
    // Store.dispatch(addStatus("所有","all"));
    // Store.dispatch(updateStatus("不禁用",false))
  }
  getChildRef(ref) {
    this.tableComponent = ref;
  }
  onHandleEdit = (id) =>{
    this.userModalShow({status:true,id})
  }
  getUserModalRef = (ref) => {
    this.child = ref;
  };
  userModalShow = (data) => {
    this.child.showModal(data);
  };
  delete(id) {
    this.tableComponent.onHandleDelete(id);
  }
  handleSwitch(data) {
    this.setState({
      changgeId: data.staff_id,
    });
    this.setState({ id: data.staff_id });
    this.tableComponent.onHandlerSwitch(data);
    this.setState({ changgeId: "" });
  }
  render() {
    const { tableConfig } = this.state;
    return (
      <Fragment>
        <TableComponent
          onRef={this.getChildRef}
          batchButton={true}
          config={tableConfig}
        >
          <Button type="primary" ref="userAdd" onClick={()=>this.userModalShow({status:true})}>
            新增用户
          </Button>
        </TableComponent>
        <UserModal onRef={this.getUserModalRef}></UserModal>
      </Fragment>
    );
  }
}
