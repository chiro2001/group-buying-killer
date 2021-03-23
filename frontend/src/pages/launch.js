import React from "react"
import Container from '@material-ui/core/Container';

class Launch extends React.Component {
  constructor(props) {
    super(props);
    this.render = this.render.bind(this);
  }
  render() {
    let { config } = this.props;
    return (<Container size="xs">
      启动页
    </Container>)
  }
};

export default Launch;