import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';

class ResiveControl extends React.Component {
  static propTypes = {};

  state = {};

  componentDidMount() {}

  render() {
    const columns = [
      {
        title: '用户',
        dataIndex: 'name'
      }
    ];
    return (
      <Table
        rowKey={record => record._id}
        className="user_tab"
        bordered
        columns={columns}
        dataSource={this.props.userInfo}
        pagination={false}
        scroll={{ y: 240 }}
      />
    );
  }
}

const mapStateToProps = state => ({
  menuArr: state.menu.menuArr
});
export default connect(mapStateToProps)(ResiveControl);
