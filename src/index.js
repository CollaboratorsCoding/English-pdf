import 'semantic-ui-css/semantic.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const Render = Component => {
	ReactDOM.render(<Component />, document.getElementById('root'));
}

Render(App);

if (module.hot && process.env.NODE_ENV === 'development') {
	module.hot.accept('./App.js', () => {
		const newApp = require('./App').default;
		Render(newApp);
	})
}



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
