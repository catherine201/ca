import React from 'react';
import { Divider, Button, Input, Icon } from 'antd';
// import PropTypes from 'prop-types';
import { DraggableArea } from '../../../components/draggable';
import styles from './index.less';

export default class Console extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      //   nickName: '冰琉璃2050',
      //   srcImg: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
      consoleArr: [
        {
          id: 1,
          address: '客服组',
          name: '客服组',
          authorGroup: ['https://zos.alipayobjects'],
          user: ['老刘', '老王'],
          foldFlag: false
        },
        {
          id: 2,
          address: '技术组',
          name: '客服组',
          authorGroup: [
            'https://zos.alipayobjects',
            'https://zos.alipayobjects'
          ],
          user: ['老刘', '老王'],
          foldFlag: false
        },
        {
          id: 3,
          address: '人事组',
          name: '人事组',
          authorGroup: ['https://zos.alipayobjects'],
          user: ['老刘', '老王'],
          foldFlag: false
        }
      ]
    };
  }

  onChangeNickName = (id, e) => {
    // this.setState({ nickName: e.target.value });
    console.log(id, e);
    // tag.name = e.target.value;
    const consoleArr = this.state.consoleArr.slice();
    consoleArr.some((item, index) => {
      if (item.id === id) {
        consoleArr[index].name = e.target.value;
      }
    });
    this.setState({
      consoleArr
    });
  };

  unFoldClick(id) {
    const consoleArr = this.state.consoleArr.slice();
    consoleArr.some((item, index) => {
      if (item.id === id) {
        consoleArr[index].foldFlag = true;
      }
    });
    this.setState({
      consoleArr
    });
  }

  foldClick(id) {
    const consoleArr = this.state.consoleArr.slice();
    consoleArr.some((item, index) => {
      if (item.id === id) {
        consoleArr[index].foldFlag = false;
      }
    });
    this.setState({
      consoleArr
    });
  }

  render() {
    return (
      <div className={styles.console_wrapper}>
        <h2 className={`add_h2 ${styles.h2}`}>控制台</h2>
        <Divider />
        <div className={`drag_wrapper ${styles.drag_wrapper}`}>
          <DraggableArea
            isList
            initialTags={this.state.consoleArr}
            render={({ tag }) => (
              // console.log(this.state.consoleArr);
              // console.log(tag);
              <div className={styles.row}>
                <div className={`drag ${styles.rowTop}`} ref="drag">
                  <p className={styles.address}>分组: {tag.address}</p>
                  <div>
                    <Button
                      type="primary"
                      className={styles.fold_btn}
                      size="large"
                      onClick={() => {
                        this.unFoldClick(tag.id);
                      }}
                    >
                      展开
                    </Button>
                    <Icon type="delete" className={styles.deleteIcon} />
                  </div>
                </div>
                {/* {tag.foldFlag} tag.foldFlag && */}
                {tag.foldFlag && (
                  <div className={`foldContent ${styles.foldContent}`}>
                    <div className={styles.foldName}>
                      <p className={styles.name}>
                        <span>名字:</span>
                        <Input
                          value={tag.name}
                          onChange={e => this.onChangeNickName(tag.id, e)}
                          className={styles.foldName_input}
                          onMouseDown={() => false}
                          onMouseUp={() => false}
                          onMouseMove={() => false}
                        />
                      </p>
                      <div className={styles.name_revise}>
                        <Button type="primary" size="large">
                          修改
                        </Button>
                      </div>
                    </div>
                    <div className={styles.foldName}>
                      <div className={styles.name}>
                        <p>权限:</p>
                        <ul>
                          {tag.authorGroup.map((item, index) => (
                            <li key={index} className={styles.userLi}>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className={styles.name_revise}>
                        <Button type="primary" size="large">
                          添加用户组
                        </Button>
                      </div>
                      <Divider dashed />
                      <div className={styles.name}>
                        <p>用户:</p>
                        <ul>
                          {tag.user.map((item, index) => (
                            <li key={index} className={styles.userLi}>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className={styles.name_revise}>
                        <Button type="primary" size="large">
                          添加用户
                        </Button>
                      </div>
                    </div>
                    <div className={styles.name_revise}>
                      <Button
                        type="primary"
                        size="large"
                        onClick={() => {
                          this.foldClick(tag.id);
                        }}
                      >
                        收起
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
            onChange={tags => console.log(tags)}
          />
        </div>
      </div>
    );
  }
}
