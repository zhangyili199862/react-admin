import React from "react";
import { Table, Pagination, Row, Col, Button } from "antd";

// import { connect } from "react-redux";
import propTypes from "prop-types";
import FormSearch from "../formSearch/Index";
class TableBasics extends React.Component {
  render() {
    const { thead } = this.props.config;

    return (
      <React.Fragment>
        {/* dataSource={dataSource}
        rowSelection={rowSelection}
        rowKey={rowKey} */}
        <div style={{ marginBottom: "30px" }}></div>
        <Table pagination={false} columns={thead} bordered />
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
  columns: propTypes.array,
  dataSource: propTypes.array,
  total: propTypes.number,
  changePageCurrent: propTypes.func,
  changePageSize: propTypes.func,
  batchButton: propTypes.bool,
  rowSelection: propTypes.object,
  rowKey: propTypes.string,
};
TableBasics.defaultProps = {
  columns: [],
  dataSource: [],
  total: 0,
  batchButton: true,
  rowSelection: null,
  rowKey: "id",
};
// const mapStateToProps = (state)=>{
//   return {config:state.config}
// }
// const mapDispatchToProps = (state)=>{
//   return {config:state.config}
// }
export default TableBasics;
