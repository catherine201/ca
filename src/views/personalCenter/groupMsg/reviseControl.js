import React from 'react';
import { connect } from 'react-redux';
import { Table, Tag, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import styles from './index.less';

// const Search = Input.Search;
class ResiveControl extends React.Component {
  static propTypes = {
    menuArr: PropTypes.any.isRequired
  };

  state = {
    tags: []
  };

  componentDidMount() {
    this.setState(
      {
        tags: this.props.controlData
      },
      () => {
        // console.log(this.state.tags);
      }
    );
  }

  handleClose = removedTag => {
    const tags = this.state.tags;
    tags.forEach(item => {
      if (item === removedTag) {
        tags.splice(tags.indexOf(item), 1);
      }
    });
    this.setState({ tags });
  };

  render() {
    const { menuArr } = this.props;
    const { tags } = this.state;
    const columns = [
      {
        title: '菜单',
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
        menuArr.forEach(item => {
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
        name: record.name
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
            dataSource={menuArr}
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
              const ind = menuArr.findIndex(item => item._id === tag);
              console.log(ind);
              const tagName = ind !== -1 && menuArr[ind].name;
              const isLongTag = tagName.length > 20;
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
            })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  menuArr: state.menu.menuArr
});
export default connect(mapStateToProps)(ResiveControl);
