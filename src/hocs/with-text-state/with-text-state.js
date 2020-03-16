import React, {PureComponent} from "react";

const withTextState = (Component) => {
  class WithTextState extends PureComponent {
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
