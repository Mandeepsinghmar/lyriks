import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers/index';

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

const DataProvider = ({ children }) => <Provider store={store}>{children}</Provider>;

export default DataProvider;
