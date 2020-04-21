import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

class MouseTracker extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    render: PropTypes.func,
    style: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      positionX: 0,
      positionY: 0,
    };
    this.elem = createRef();
  }

  handleMouseMove = debounce(event => {
    this.setState({
      positionX: event.nativeEvent.offsetX,
      positionY: event.nativeEvent.offsetY,
    });
  }, 1);

  render() {
    const { children, style } = this.props;

    if (this.props.render) {
      return (
        <div
          ref={this.elem}
          style={style}
          onMouseMove={event => {
            event.persist();
            this.handleMouseMove(event);
          }}
        >
          {this.props.render(this.state)}
        </div>
      );
    }

    return <span>{children}</span>;
  }
}

export default MouseTracker;
