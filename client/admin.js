import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import Root from '../src/admin/Root';
import configureStore from "../src/admin/store/store";
import iostore from '../src/admin/store/configureStore.io';

const store = configureStore();
iostore(store);


render(
	  <Root store={store} history={browserHistory} />,
	  document.getElementById('app'),
	);