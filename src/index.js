import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';
import Amplify from 'aws-amplify';

// Routes
import Routes from './routes/routes';
Amplify.configure({
	Auth: {
		// identityPoolId: 'us-east-1:5bb5461a-7637-43c4-b014-0b4bf5fa991b',
		userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
		userPoolWebClientId: process.env.REACT_APP_COGNITO_WEB_CLIENT_ID,
		clientId: process.env.REACT_APP_COGNITO_WEB_CLIENT_ID,
		region: process.env.REACT_APP_COGNITO_REGION,

		oauth: {
			domain: process.env.REACT_APP_DOMAIN,
			redirectSignIn: process.env.REACT_APP_REDIRECT_SIGNIN,
			redirectSignOut: process.env.REACT_APP_REDIRECT_SIGNOUT,
			responseType: "token"
		}
	}
});


ReactDOM.render((
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<Routes />
		</PersistGate>
	</Provider>
), document.getElementById('root'));

serviceWorkerRegistration.register();
