import React from 'react';
import { connect } from 'react-redux';
// import { Form, Input, Tooltip, Icon } from 'antd';
// import { Divider } from 'antd';
import { Table, Tag, Tooltip } from 'antd';
import styles from './index.less';

// const Search = Input.Search;
class ResiveControl extends React.Component {
  state = {
    tags: []
    // data: []
  };

  componentDidMount() {
    this.setState(
      {
        tags: this.props.controlData
      },
      () => {
        console.log(this.state.tags);
      }
    );
  }

  handleClose = removedTag => {
    // const tags = this.state.tags.filter(tag => tag !== removedTag);
    const tags = this.state.tags;
    tags.forEach(item => {
      if (item === removedTag) {
        tags.splice(tags.indexOf(item), 1);
      }
    });
    this.setState({ tags });
  };

  render() {
    const { groupArr } = this.props;
    console.log(groupArr);
    const { tags } = this.state;
    console.log(tags);
    const columns = [
      {
        title: '分组',
        dataIndex: 'name'
      }
    ];
    const rowSelection = {
      selectedRowKeys: tags,
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          'selectedRows: ',
          selectedRows
        );
        // 先在tag里面把data 里面的数据删除，再把最新的selectedRows 添加进去
        const tags = this.state.tags;
        groupArr.forEach(item => {
          if (tags.indexOf(item._id) !== -1) {
            tags.splice(tags.indexOf(item._id), 1);
          }
        });
        selectedRows.forEach(item => {
          // tags = [...tags, item.module];
          tags.push(item._id);
        });
        this.setState({
          tags
        });
      },
      getCheckboxProps: record => ({
        module: record.name
      })
    };
    return (
      <div
        className={`reviseControl_modal_wrapper ${
          styles.reviseControl_modal_wrapper
        }`}
      >
        <div
          className={`reviseControl_modal_left ${
            styles.reviseControl_modal_left
          }`}
        >
          <h2>添加权限模块</h2>
          {/* <Search
            placeholder="请输入您要添加的模块"
            onSearch={value => console.log(value)}
            enterButton
          /> */}
          <Table
            rowKey={record => record._id}
            className={styles.search_tab}
            bordered
            rowSelection={rowSelection}
            columns={columns}
            dataSource={groupArr}
            pagination={false}
            scroll={{ y: 240 }}
          />
          <div className="text-right">
            {/* <Button
              type="primary"
              onClick={() => {
                this.addHandle(templateSelectedRows);
              }}
            >
              添加
            </Button> */}
          </div>
          {/* <Divider dashed /> */}
        </div>
        {/* <Divider type="vertical" /> */}
        <div
          className={`reviseControl_modal_right ${
            styles.reviseControl_modal_right
          }`}
        >
          <h2>已有权限模块</h2>
          {tags &&
            tags.map(tag => {
              const ind = groupArr.findIndex(item => item._id === tag);
              if (ind !== -1) {
                const tagName = groupArr[ind].name;
                const isLongTag = tagName.length > 20;
                // const isLongTag = tag.length > 20;
                const tagElem = (
                  <Tag
                    key={tag}
                    closable
                    afterClose={() => this.handleClose(tag)}
                  >
                    {isLongTag ? `${tagName.slice(0, 20)}...` : tagName}
                  </Tag>
                );
                return isLongTag ? (
                  <Tooltip title={tagName} key={tag}>
                    {tagElem}
                  </Tooltip>
                ) : (
                  tagElem
                );
              }
            })}
        </div>
      </div>
    );
  }
}

// export default ResiveControl;
const mapStateToProps = state => ({
  groupArr: state.menu.groupArr
});
export default connect(mapStateToProps)(ResiveControl);
