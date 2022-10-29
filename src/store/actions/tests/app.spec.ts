import 'regenerator-runtime/runtime';
import app, { getState } from '@store/actions/app';
import { actions } from '@store/reducers/app';

describe('app-actions', () => {
  beforeEach(() => {
    // clear store data, to have always empty store data in single test
    app.resetData();
  });

  it('setLoading', () => {
    app.setLoading(true);
    expect(getState().loading).toEqual(true);
    app.setLoading(false);
    expect(getState().loading).toEqual(false);
  });


  it('resetData', () => {
    const resetData = jest.spyOn(actions, 'resetData');
    app.setLoading(true)
    expect(getState()).toEqual({
      version: '0.0.1',
      loading: true,
    });
    app.resetData();
    expect(resetData).toHaveBeenCalled();
    expect(getState()).toEqual({
      version: '0.0.1',
      loading: false,
    });
  });
});
