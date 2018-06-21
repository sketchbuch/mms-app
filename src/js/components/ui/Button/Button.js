//@flow

import * as React from 'react';
import Icon from '../../Icon/Icon';
import { ICON_BUSY } from '../../../constants/icons';
import { UI_ERROR_CLASS } from '../../../constants/ui';
import './Button.css';

type Props = {
  busy: boolean,
  buttontype?: 'default' | 'warning',
  children?: React.Node,
  className?: string,
  disabled?: boolean,
  name?: string,
  onClick?: Function | null,
  title?: string,
  type?: string,
};

/**
* A button.
*/
class Button extends React.Component<Props> {
  static defaultProps = {
    busy: false,
    buttontype: 'default',
    children: null,
    className: '',
    disabled: false,
    name: '',
    onClick: null,
    title: '',
    type: 'button',
  };

  props: Props;

  render() {
    let classes = 'Button';
    if (this.props.className && this.props.className !== '') classes += ` ${this.props.className}`;
    if (this.props.isValid === false) classes += ` ${UI_ERROR_CLASS}`;

    return (
      <button
        className={classes}
        disabled={this.props.disabled}
        data-buttontype={this.props.buttontype}
        onClick={this.props.onClick}
        title={this.props.title}
        type={this.props.type}
      >
        {this.props.children}{this.props.busy && <span className="Button__busy"><Icon type={ ICON_BUSY } /></span>}
      </button>
    )
  }
}


export default Button;
