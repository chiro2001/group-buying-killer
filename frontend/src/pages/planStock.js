import React from "react"
import Container from '@material-ui/core/Container';

class PlanStock extends React.Component {
  constructor(props) {
    super(props);
    this.render = this.render.bind(this);
  }
  render() {
    let { config } = this.props;
    return (<Container size="xs">
      库存设置
    </Container>)
  }
};

export default PlanStock;