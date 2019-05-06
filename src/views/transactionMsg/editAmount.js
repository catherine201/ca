import React, { Component } from 'react';
import { Modal, Form, InputNumber } from 'antd';
import createApi from '../../api/list';

class EditAmount extends Component {
  state = { visible: true };

  componentDidMount() {
    const { form, editData } = this.props;
    console.log(editData);
    form.setFieldsValue({
      amount: editData.amount,
      price: editData.price
    });
  }

  handleCancel = e => {
    console.log(e);
    // this.setState({
    //   visible: false
    // });
    const obj = {
      show: false
    };
    this.props.handleClose(obj);
  };

  handleSubmit = e => {
    e.preventDefault();
    const { editData } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const obj = {
          url: this.props.editData.id,
          query: {
            amount: values.amount
          }
        };
        console.log(editData.type === 'AuctionCoinTypeSell');
        editData.type === 'AuctionCoinTypeSell' &&
          (obj.query.price = values.price);
        this.editAuctionOrders(obj);
      }
    });
  };

  editAuctionOrders = async obj => {
    const res = await createApi.editAuctionOrders(obj);
    console.log(res);
    if (res) {
      const sendObj = {
        show: false,
        queryAgain: true
      };
      this.props.handleClose(sendObj);
    }
  };

  render() {
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
    const { getFieldDecorator } = this.props.form;
    const { editData } = this.props;
    return (
      <div>
        <Modal
          title="编辑数量"
          visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
        >
          <Form
            // layout="inline"
            onSubmit={this.handleSubmit}
            className="search_form"
          >
            {editData.type === 'AuctionCoinTypeSell' && (
              <Form.Item label="单价" {...formItemLayout}>
                {getFieldDecorator('price')(
                  <InputNumber placeholder="单价" className="search_input" />
                )}
              </Form.Item>
            )}
            <Form.Item label="数量" {...formItemLayout}>
              {getFieldDecorator('amount')(
                <InputNumber placeholder="数量" className="search_input" />
              )}
            </Form.Item>
            {/* <Form.Item {...subItemLayout}>
              <Button htmlType="submit" className="mr20">
                确定
              </Button>
            </Form.Item> */}
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(EditAmount);
