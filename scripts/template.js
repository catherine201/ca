// template.js
module.exports = {
    reactTemplate: compoenntName => {
      return `import React, { Component } from 'react';
      // import styles from './index.less'
      
      class dd extends Component {
        constructor(props) {
          super(props);
          this.state = {};
        }
      
        render() {
          // const {} = this.state;
          return <div className="dd_wrap">dd组件</div>;
        }
      }
      
      export default dd;     
  `
    },
    entryTemplate: `import Main from './main.vue'
  export default Main`
  }
  