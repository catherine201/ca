import React from 'react';
import { Form, Input, Tooltip, Icon } from 'antd';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './index.less';
import { idToName } from '../../../utils';

class AddEditGroup extends React.Component {
  static propTypes = {
    // form: PropTypes.any.isRequired
  };

  state = {
    data: {}
  };

  componentDidMount() {
    this.setState(
      {
        data: this.props.sendData
      },
      () => {
        this.props.form.setFieldsValue({
          name: this.state.data.name,
          description: this.state.data.description
        });
      }
    );
  }

  onChangeName = e => {
    console.log(e.target.value);
    console.log(this.state.data);
    this.state.data.name = e.target.value;
    console.log(this.state.data);
  };

  onChangeDesc = e => {
    this.state.data.description = e.target.value;
  };

  render() {
    // console.log(this.props.form);
    const { getFieldDecorator } = this.props.form;
    const { menuArr } = this.props;
    const { data } = this.state;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 }
    };
    return (
      <div
        className={`groupMsg_modal_wrapper ${styles.groupMsg_modal_wrapper}`}
      >
        <Form layout="horizontal" onSubmit={this.onSubmit}>
          <Form.Item label="名称" {...formItemLayout}>
            {getFieldDecorator('name', {
              rules: [
                { required: true, message: '请输入分组名称!' },
                { min: 2, max: 16, message: '最少2位,最多16位!' }
              ]
            })(
              <Input
                placeholder="请输入分组名称"
                // value={data.name}
                onChange={this.onChangeName}
              />
            )}
          </Form.Item>
          <Form.Item label="描述" {...formItemLayout}>
            {getFieldDecorator('description', {
              rules: [{ max: 128, message: '最多128位!' }]
            })(
              <Input
                placeholder="请输入描述"
                // value={data.description}
                onChange={this.onChangeDesc}
              />
            )}
          </Form.Item>
          {this.props.showModal === 2 && (
            <Form.Item label="权限模块" {...formItemLayout}>
              <Tooltip
                placement="topLeft"
                title={data.menu_ids && idToName(data.menu_ids, menuArr)}
              >
                <span className={`${styles.dotSpan}`}>
                  {/* {data.menu_ids && data.menu_ids.join(',')} */}
                  {data.menu_ids && idToName(data.menu_ids, menuArr)}
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

// export default AddEditGroup;
const mapStateToProps = state => ({
  menuArr: state.menu.menuArr
});

export default connect(mapStateToProps)(Form.create()(AddEditGroup));
