import samplesReducer from '../../reducers/samples';

// @@INIT
test('should set up default state', () => {
    const state = samplesReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({

    });
});
