import React from 'react';
import {
  Divider,
  Icon,
  Input,
  Form,
  Button,
  notification,
  Checkbox
} from 'antd';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import QRCode from 'qrcode';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styles from './index.less';
import createApi from '../../../api/info';

class DoubleCheck extends React.Component {
  static propTypes = {};

  constructor() {
    // super(props);
    super();
    this.state = {
      url: '',
      // count: 0,
      secret: ''
      // bindStatus: JSON.parse(sessionStorage.getItem('user')).ga_verify
    };
    this.toSubmit = this.toSubmit.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
    this.init();
  }

  init = () => {
    this.props.form.resetFields();
    const obj = {
      url: `${JSON.parse(sessionStorage.getItem('user')).openid}/bind/google`,
      query: {
        access_token: JSON.parse(sessionStorage.getItem('user')).access_token
      }
    };
    this.getBindGoogleInfo(obj);
  };

  getBindGoogleInfo = async obj => {
    const res = await createApi.getBindGoogleInfo(obj);
    console.log(res);
    if (res) {
      console.log(res);
      QRCode.toDataURL(res.data.qrCodeUrl, {
        margin: 1,
        width: this.size
      })
        .then(url => {
          this.setState(
            {
              url,
              // count: res.data.expires_in,
              secret: res.data.secret
            },
            () => {
              // console.log(this.state.count);
              // const timer = setInterval(() => {
              //   this.setState(
              //     preState => ({
              //       count: preState.count - 1
              //     }),
              //     () => {
              //       if (this.state.count === 0) {
              //         clearInterval(timer);
              //       }
              //     }
              //   );
              // }, 1000);
            }
          );
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  bindGoogle = async (obj, val) => {
    const res = await createApi.bindGoogle(obj);
    console.log(res);
    if (res && res.data) {
      console.log(res);
      this.props.form.resetFields();
      // this.$msg.success('绑定成功');
      if (val === 'bind') {
        if (res.data.bind) {
          notification.success({
            message: '绑定成功'
          });
          this.props.getBindStatus(true);
        } else {
          this.$msg.error('绑定失败');
        }
      } else if (res.data.enable) {
        notification.success({
          message: '配置登录需要谷歌验证码成功'
        });
      } else {
        this.$msg.error('配置登录需要谷歌验证码失败');
      }
    }
  };

  unBindGoogle = async (obj, val) => {
    const res = await createApi.unBindGoogle(obj);
    console.log(res);
    if (res && res.data) {
      if (val === 'bind') {
        if (res.data.unbind) {
          this.init();
          this.props.getBindStatus(false);
          notification.success({
            message: '解绑成功'
          });
        } else {
          this.$msg.error('解绑失败');
        }
      } else if (res.data.disable) {
        notification.success({
          message: '配置登录不需要谷歌验证码成功'
        });
      } else {
        this.$msg.error('配置登录不需要谷歌验证码成功');
      }
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const obj = {
          url: `${
            JSON.parse(sessionStorage.getItem('user')).openid
          }/bind/google`,
          query: {
            access_token: JSON.parse(sessionStorage.getItem('user'))
              .access_token,
            code: values.checkCode
          }
        };
        this.props.bindStatus ? this.unBindGoogle(obj) : this.bindGoogle(obj);
      }
    });
  };

  toSubmit = val => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const obj = {
          url: `${
            JSON.parse(sessionStorage.getItem('user')).openid
          }/bind/google`,
          query: {
            access_token: JSON.parse(sessionStorage.getItem('user'))
              .access_token,
            code: values.checkCode
          }
        };
        if (val !== 'config') {
          this.props.bindStatus
            ? this.unBindGoogle(obj, 'bind')
            : this.bindGoogle(obj, 'bind');
        } else {
          const configObj = {
            url: `${
              JSON.parse(sessionStorage.getItem('user')).openid
            }/verify/google`,
            query: {
              access_token: JSON.parse(sessionStorage.getItem('user'))
                .access_token,
              code: values.checkCode
            }
          };
          if (values.login) {
            this.bindGoogle(configObj);
          } else {
            this.unBindGoogle(configObj);
          }
          // this.unBindGoogle(configObj);
        }
      }
    });
  };

  handleCopy = () => {
    notification.success({
      message: '复制成功'
      // description: '复制成功'
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { bindStatus } = this.props;
    return (
      <div className={styles.doubleCheck_wrapper}>
        <h2 className={`add_h2 ${styles.h2}`}>
          {!bindStatus ? '双重认证' : '配置验证模块'}
        </h2>
        <Divider />
        <p>
          <Icon type="exclamation-circle" className={styles.alert_icon} />
          {!bindStatus
            ? '谷歌验证器是一款动态口令工具，工作原理类似短信动态验证。绑定后每30s生成一个动态验证码，验证码可用于登录、提现、修改安全设置等操作的安全验证。'
            : `您正在为账户 ${
                JSON.parse(sessionStorage.getItem('user')).name
              } 配置验证模块`}
        </p>
        <Divider dashed />
        {!bindStatus && (
          <div className="binding_wrap">
            <div>
              <p className="font16">
                <span className={styles.num_icon}>1</span>
                下载谷歌验证器
              </p>
            </div>
            <Divider dashed />
            <div className={styles.section}>
              <p className="font16 mb20">
                <span className={styles.num_icon}>2</span>
                在谷歌验证器中添加密钥并备份在谷歌验证器中添加密钥并备份
              </p>
              <p className={styles.line16}>
                打开谷歌验证器，扫描下方二维码或手动输入下述密钥添加验证令牌。
              </p>
              <p className={`${styles.line16} ${styles.blue_color}`}>
                密钥用于手机更换或遗失时找回谷歌验证器，绑定前请务必将下述密钥备份保存。
              </p>
            </div>
            <div className={styles.dimension_wrap}>
              <img
                alt="dimension"
                src={this.state.url}
                className={styles.dimension_img}
              />
              {/* <span className="count_second">
                {this.state.count
                  ? `${this.state.count}s 后失效`
                  : `二维码已经失效，请刷新页面`}
              </span> */}
              <p>
                密钥
                <br />
                <br />
                {this.state.secret}
              </p>
              <CopyToClipboard
                text={this.state.secret}
                onCopy={this.handleCopy}
              >
                <p className={`mouse_hover ${styles.blue_color}`}>复制</p>
              </CopyToClipboard>
            </div>
            <Divider dashed />
            <div className={styles.section}>
              <p className="font16">
                <span className={styles.num_icon}>3</span>
                输入谷歌验证器中6位验证码
              </p>
            </div>
          </div>
        )}
        {/* onSubmit={this.handleSubmit} */}
        <Form
          layout="horizontal"
          className={`${styles.form_wrapper} ${bindStatus &&
            styles.form_wrapper_mid}`}
        >
          {bindStatus && (
            <Form.Item>
              {getFieldDecorator('login', {
                valuePropName: 'checked',
                initialValue: false
              })(<Checkbox>登录 (登录需输入谷歌验证码)</Checkbox>)}
            </Form.Item>
          )}
          <Form.Item>
            {getFieldDecorator('checkCode', {
              rules: [
                { required: true, message: '请输入验证码!' },
                { min: 6, max: 6, message: '验证码为6位!' }
              ]
            })(<Input placeholder="谷歌验证码" />)}
          </Form.Item>
          {bindStatus && (
            <Form.Item>
              <Button
                className="btn-block btn-lg"
                type="primary"
                onClick={() => this.toSubmit('config')}
              >
                配置
              </Button>
            </Form.Item>
          )}
          {/* htmlType="submit" */}
          <Form.Item>
            <Button
              className="btn-block btn-lg"
              type={!bindStatus && 'primary'}
              onClick={() => this.toSubmit()}
            >
              {bindStatus ? '解绑' : '绑定'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

// export default Form.create()(DoubleCheck);

const mapStateToProps = state => ({
  bindStatus: state.aside.bindStatus
});

const mapDispatchToProps = dispatch => ({
  getBindStatus: dispatch.aside.getBindStatus
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(DoubleCheck));
