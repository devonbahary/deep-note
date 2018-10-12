import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../components/Home';

test('should render Header correctly', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
});
