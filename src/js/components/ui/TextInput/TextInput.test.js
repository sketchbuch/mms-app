import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TextInput from './TextInput';
import { UI_ERROR_CLASS } from '../../../constants/ui';

configure({ adapter: new Adapter() });

describe('<TextInput />', () => {
  test('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TextInput />, div);
  });

  test('Handles disabled property', () => {
    const props = {
      onChange: jest.fn(),
      disabled: true,
    };
    const wrapper = mount(<TextInput {...props} />);
    wrapper.simulate('change')
    expect(props.onChange.mock.calls.length).toBe(0);
  });

  test('Handles className property', () => {
    const cn1Props = { className: '' };
    const cn1Wrapper = shallow(<TextInput {...cn1Props} />);
    const cn2Props = { className: 'TestClass' };
    const cn2Wrapper = shallow(<TextInput {...cn2Props} />);

    expect(cn1Wrapper.find('.TextInput').hasClass('TestClass')).toEqual(false);
    expect(cn2Wrapper.find('.TextInput').hasClass('TestClass')).toEqual(true);
  });

  test('Handles isValid property', () => {
    const iv1Props = { isValid: true };
    const iv1Wrapper = shallow(<TextInput {...iv1Props} />);
    const iv2Props = { isValid: false };
    const iv2Wrapper = shallow(<TextInput {...iv2Props} />);

    expect(iv1Wrapper.find('.TextInput').hasClass(UI_ERROR_CLASS)).toEqual(false);
    expect(iv2Wrapper.find('.TextInput').hasClass(UI_ERROR_CLASS)).toEqual(true);
  });

  test('Handles autoFocus property', () => {
    const af1Props = { autoFocus: true };
    const af1Wrapper = shallow(<TextInput {...af1Props} />);
    const af2Props = { autoFocus: false };
    const af2Wrapper = shallow(<TextInput {...af2Props} />);

    expect(af1Wrapper.find('.TextInput').prop('autoFocus')).toEqual(true);
    expect(af2Wrapper.find('.TextInput').prop('autoFocus')).toEqual(false);
  });
});
