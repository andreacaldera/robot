import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { WrappedComponent as Control } from '../Control';

configure({ adapter: new Adapter() });

const playSound = () => {};
const resetMotors = () => {};

describe('Control component', () => {
  it('should render', () => {
    const motorsData = {
      leftMotor: 0,
      rightMotor: 0,
    };
    const wrapper = shallow(
      <Control
        motorsData={motorsData}
        playSound={playSound}
        resetMotors={resetMotors}
      />
    );

    expect(wrapper.find('h2').text()).to.contain('Control');
  });
});
