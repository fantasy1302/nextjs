import React, { useState, useEffect } from 'react';

const OkAuth = () => {
	const [message, setMessage] = useState('');

	const OK_APP_ID = '512002512941';
	const OK_REDIRECT_URI = 'https://50da-92-241-88-9.ngrok-free.app';

	const redirectToOkAuth = () => {
		const authUrl = `https://connect.ok.ru/oauth/authorize?client_id=${OK_APP_ID}&scope=VALUABLE_ACCESS&response_type=token&redirect_uri=${OK_REDIRECT_URI}`;
		window.location.href = authUrl;
	};

	const handleRedirect = () => {
		const hash = window.location.hash;
		const params = new URLSearchParams(hash.slice(1));
		const accessToken = params.get('access_token');
		const sessionSecretKey = params.get('session_secret_key');

		if (accessToken && sessionSecretKey) {
			handleOkLogin(accessToken, sessionSecretKey);
		}
	};

	const handleOkLogin = async (accessToken, sessionSecretKey) => {
		try {
			const response = await fetch('http://localhost:10073/wp-json/api/auth/ok', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ access_token: accessToken, session_secret_key: sessionSecretKey }),
			});

			const data = await response.json();

			if (response.ok) {
				setMessage('Login successful: ' + JSON.stringify(data.user));
			} else {
				setMessage('Error: ' + data.message);
			}
		} catch (error) {
			setMessage('Network error: ' + error.message);
		}
	};

	useEffect(() => {
		handleRedirect();
	}, []);

	return (
		<div>
			<h1>OK Authentication</h1>
			<button onClick={redirectToOkAuth}>Login with Odnoklassniki</button>
			{message && <p>{message}</p>}
		</div>
	);
};

export default OkAuth;
