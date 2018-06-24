// @flow

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  fetchIssues,
  fetchIssuesError,
  fetchIssuesSuccess,
  searchIssues,
} from '../issueActions';
import {
  ISSUES_FETCH,
  ISSUES_FETCH_ERROR,
  ISSUES_FETCH_SUCCESS,
  ISSUES_SEARCH,
} from '../../constants/actionTypes';
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares);


/**
* Issue Actions Tests
*/

describe('Actions: issueActions', () => {
  test('fetchIssuesError() returns the correct ISSUES_FETCH_ERROR action', () => {
    const EXPECTED_ACTION = {
      type: ISSUES_FETCH_ERROR,
      error: true,
      payload: {},
    };

    expect(fetchIssuesError({})).toEqual(EXPECTED_ACTION);
  });

  test('fetchIssuesSuccess() returns the correct ISSUES_FETCH_SUCCESS action', () => {
    const EXPECTED_ACTION = {
      type: ISSUES_FETCH_SUCCESS,
      payload: {},
    };

    expect(fetchIssuesSuccess({})).toEqual(EXPECTED_ACTION);
  });

    // Messy... refactor later if time!
  describe('fetchIssues()', () => {
    const store = mockStore({});
    const mockConfig =  {
      repoName: '',
      repoOwner: '',
      sort: '',
      sortField: '',
      states: '',
      token: '',
    };
    const mockAxios = {
      get: jest.fn(() => Promise.resolve({ data: {}})),
    };
    const mockAxiosError = {
      get: jest.fn(() => Promise.reject({})),
    };
    const mockAxiosErrorServer = {
      get: jest.fn(() => Promise.resolve({ data: { errors: {}}})),
    };
    const mockGqlQuery = async (queryStr: string, token: string) => {
      const result = await mockAxios.get();
      return result;
    };
    const mockGqlQueryError = async (queryStr: string, token: string) => {
      const result = await mockAxiosError.get();
      return result;
    };
    const mockGqlQueryErrorServer = async (queryStr: string, token: string) => {
      const result = await mockAxiosErrorServer.get();
      return result;
    };

    test('Dispatches on success ISSUES_FETCH && ISSUES_FETCH_SUCCESS actions', () => {
      const expectedActions = [
        { type: ISSUES_FETCH },
        { type: ISSUES_FETCH_SUCCESS, payload: {} },
      ];

      expect.assertions(1);
      store.dispatch(fetchIssues(mockGqlQuery, mockConfig)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        store.clearActions();
      })
    });

    test('Dispatches on errors ISSUES_FETCH && ISSUES_FETCH_ERROR actions', () => {
      const expectedActions = [
        { type: ISSUES_FETCH },
        { type: ISSUES_FETCH_ERROR, payload: {}, error: true },
      ];

      expect.assertions(1);
      store.dispatch(fetchIssues(mockGqlQueryError, mockConfig)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        store.clearActions();
      });
    });

    test('Dispatches on serverside errors ISSUES_FETCH && ISSUES_FETCH_ERROR actions', () => {
      const expectedActions = [
        { type: ISSUES_FETCH },
        { type: ISSUES_FETCH_ERROR, payload: {}, error: true },
      ];

      expect.assertions(1);
      store.dispatch(fetchIssues(mockGqlQueryErrorServer, mockConfig)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        store.clearActions();
      });

    });
  });

  test('searchIssues() should set the term', () => {
    const searchTerm = 'Test';
    const EXPECTED_ACTION = {
      type: ISSUES_SEARCH,
      payload: { term: searchTerm },
    };

    expect(searchIssues(searchTerm)).toEqual(EXPECTED_ACTION);
  });
});