import React from 'react';
import { Form, Input, Button, Divider } from 'antd';
import createApi from '../../../api/info';
import styles from './changePassword.less';
import { regular } from '../../../utils/validate';

const FormItem = Form.Item;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false
  };

  revisePassWord = async obj => {
    const res = await createApi.reviseUserInfo(obj);
    if (res && res.error_code === 1) {
      this.$msg.success('更改密码成功');
      this.props.history.push('/login');
    } else {
      this.$msg.success('更改密码失败');
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const obj = {
          url: `${JSON.parse(sessionStorage.getItem('user')).openid}/password`,
          query: {
            access_token: JSON.parse(sessionStorage.getItem('user'))
              .access_token,
            old_password: values.oldPassword,
            new_password: values.newPassword,
            confirm_password: values.confirm
          }
        };
        this.revisePassWord(obj);
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('newPassword')) {
      callback('您输入的两次密码不一致!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    if (value && !regular.passWord.test(value)) {
      callback('密码至少为8位的字母,数字,字符任意两种的组合!');
    } else {
      callback();
    }
  };

  validateToOldPassword = (rule, value, callback) => {
    if (value && !regular.passWord.test(value)) {
      callback('密码至少为8位的字母,数字,字符任意两种的组合!');
    } else {
      callback();
    }
  };

  toLogin = e => {
    e.preventDefault();
    this.props.history.push('/login');
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    return (
      <div className={styles.changePasWord_wrapper}>
        <h2 className={`add_h2 ${styles.h2}`}>更新密码</h2>
        <Divider />
        <Form onSubmit={this.handleSubmit} className={styles['ant-form']}>
          <FormItem {...formItemLayout} label="旧密码">
            {getFieldDecorator('oldPassword', {
              rules: [
                {
                  required: true,
                  message: '请输入旧密码!'
                },
                {
                  validator: this.validateToOldPassword
                }
              ]
            })(<Input className={styles['ant-input']} type="password" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="新密码">
            {getFieldDecorator('newPassword', {
              rules: [
                {
                  required: true,
                  message: '请输入您要设置的新密码!'
                },
                {
                  validator: this.validateToNextPassword
                }
              ]
            })(<Input type="password" className={styles['ant-input']} />)}
          </FormItem>
          <FormItem {...formItemLayout} label="确认新密码">
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: '请再次确认您要设置的新密码!'
                },
                {
                  validator: this.compareToFirstPassword
                }
              ]
            })(
              <Input
                type="password"
                onBlur={this.handleConfirmBlur}
                className={styles['ant-input']}
              />
            )}
          </FormItem>
          <FormItem
            {...tailFormItemLayout}
            // className={styles['form-text-right']}
          >
            <Button type="primary" htmlType="submit">
              更新密码
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(RegistrationForm);
