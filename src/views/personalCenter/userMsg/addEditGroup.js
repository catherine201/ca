import React from 'react';
import { Form, Input, Tooltip, Icon } from 'antd';
import styles from './index.less';

class AddEditGroup extends React.Component {
  state = {
    data: {}
  };

  componentDidMount() {
    this.setState({
      data: this.props.sendData
    });
  }

  onChangeName = e => {
    this.state.data.name = e.target.value;
    this.setState({ data: this.state.data });
  };

  onChangeDesc = e => {
    this.state.data.description = e.target.value;
    this.setState({ data: this.state.data });
  };

  render() {
    const { data } = this.state;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 }
    };
    return (
      <div
        className={`groupMsg_modal_wrapper ${styles.groupMsg_modal_wrapper}`}
      >
        <Form layout="horizontal">
          <Form.Item label="名称" {...formItemLayout}>
            <Input
              placeholder="请输入用户名称"
              value={data.name}
              onChange={this.onChangeName}
            />
          </Form.Item>
          {this.props.showModal === 2 && (
            <Form.Item label="权限模块" {...formItemLayout}>
              <Tooltip
                placement="topLeft"
                title={data.menu_ids && data.menu_ids.join(',')}
              >
                <span className={`${styles.dotSpan}`}>
                  {data.menu_ids && data.menu_ids.join(',')}
                </span>
              </Tooltip>
              <Icon
                type="form"
                onClick={() => {
                  this.props.handleEdit(3, data.menu_ids);
                }}
              />
            </Form.Item>
          )}
        </Form>
      </div>
    );
  }
}

export default AddEditGroup;
