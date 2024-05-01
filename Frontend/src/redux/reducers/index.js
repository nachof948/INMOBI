import { combineReducers } from 'redux';

import auth from './auth'
import listing from './listing'

export const reducers = combineReducers({ auth, listing });