import React from "react";
import { Table, Pagination, Row, Col, Button } from "antd";

import { connect } from "react-redux";
import propTypes from "prop-types";
import FormSearch from "../formSearch/Index";
class TableBasics extends React.Component {
  render() {
    const {config,list} = this.props;
    const { thead ,rowKey } = config;
    return (
      <React.Fragment>
        {/* dataSource={dataSource}
        rowSelection={rowSelection}
        rowKey={rowKey} */}
        <div style={{ marginBottom: "30px" }}></div>
        <Table rowKey={rowKey} pagination={false} columns={thead} dataSource={list} bordered />
        {/* 
        <Row>
          <Col span={8} className="float-left">
            {batchButton && <Button onClick={handlerDelete}>批量删除</Button>}
          </Col>
          <Col span={16}>
            <Pagination
              defaultCurrent={1}
              onChange={changePageCurrent}
              onShowSizeChange={changePageSize}
              className="float-right"
              total={total}
              showSizeChanger
              showQuickJumper
              showTotal={(total) => `Total ${total} items`}
            />
          </Col>
        </Row> */}
      </React.Fragment>
    );
  }
}
TableBasics.propTypes = {
  config:propTypes.object,
  rowKey:propTypes.string
};
TableBasics.defaultProps = {
  config:{},
  rowKey:"id"
};
const mapStateToProps = (state)=>{
  const {departmentList} = state.department;
  return {list:departmentList}
}
const mapDispatchToProps = (state)=>{
  
}
export default connect(mapStateToProps,mapDispatchToProps)(TableBasics);
