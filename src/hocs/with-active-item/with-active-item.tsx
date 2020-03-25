import * as React from "react";
import { Film } from "../../types";
import {Subtract} from "utility-types";

interface State {
  activeItem: string | Film;
}

interface InjectingProps {
  onActiveItemChange: () => void;
}

const withActiveItem = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>;
  class WithActiveItem extends React.PureComponent<T, State> {
    constructor(props: T) {
      super(props);

      this.state = {activeItem: this.props.activeItem};

      this._handleActiveItemChange = this._handleActiveItemChange.bind(this);
    }

    _handleActiveItemChange(newActiveItem) {
      this.setState({activeItem: newActiveItem});
    }

    render() {
      const {activeItem} = this.state;
      return (
        <Component
          {...this.props}
          activeItem={activeItem}
          onActiveItemChange={this._handleActiveItemChange}
        />
      );
    }
  }

  return WithActiveItem;
};

export default withActiveItem;
