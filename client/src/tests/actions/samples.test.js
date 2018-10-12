import { addSample } from '../../actions/samples';

test('should set up add expense object', () => {
    const sample = { property: 'something' };
    const action = addSample(sample);
    expect(action).toEqual({
      type: 'ADD_SAMPLE',
      sample
    });
});
