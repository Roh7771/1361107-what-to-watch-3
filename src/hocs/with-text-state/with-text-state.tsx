import * as React from "react";
import {Subtract} from "utility-types";

interface State {
  text: string;
}

interface InjectingProps {
  onTextChange: (text: string) => void;
}

const withTextState = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>;
  class WithTextState extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);

      this.state = {
        text: ``
      };
      this._handleTextChange = this._handleTextChange.bind(this);
    }

    _handleTextChange(newText) {
      this.setState({text: newText});
    }

    render() {
      return (
        <Component
          {...this.props}
          text={this.state.text}
          onTextChange={this._handleTextChange}
        />
      );
    }
  }
  return WithTextState;
};

export default withTextState;
