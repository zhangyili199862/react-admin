import React from "react";
import { Table, Pagination, Row, Col, Button } from "antd";
import propTypes from "prop-types";
export default class TableBasics extends React.Component {
  render() {
    const {
      columns,
      dataSource,
      total,
      batchButton,
      changePageCurrent,
      changePageSize,
      handlerDelete,
      rowSelection,
      rowKey
    } = this.props;
    
    return (
      <React.Fragment>
        <div style={{marginTop:'30px'}}></div>
        <Table
          pagination={false}
          columns={columns}
          dataSource={dataSource}
          rowSelection={rowSelection}
          rowKey={rowKey}
          bordered
        />
        <div style={{marginBottom:'30px'}}></div>
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
        </Row>
      </React.Fragment>
    );
  }
}
TableBasics.propTypes = {
  columns: propTypes.array,
  dataSource: propTypes.array,
  total:propTypes.number,
  changePageCurrent:propTypes.func,
  changePageSize:propTypes.func,
  batchButton:propTypes.bool,
  rowSelection:propTypes.object,
  rowKey:propTypes.string
};
TableBasics.defaultProps = {
  columns: [],
  dataSource: [],
  total:0,
  batchButton:true,
  rowSelection:null,
  rowKey:"id"
};
