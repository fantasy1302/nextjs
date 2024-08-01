import React, { useState, useEffect } from 'react';

const YandexAuth = () => {
	const [message, setMessage] = useState('');

	const YANDEX_CLIENT_ID = 'dd18de909fe449fe89073b92a2f73fe1';
	const YANDEX_REDIRECT_URI = 'https://50da-92-241-88-9.ngrok-free.app';

	const handleYandexLogin = async (code) => {
		try {
			const response = await fetch('http://localhost:10073/wp-json/api/auth/yandex/exchange', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ code }),
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

	const redirectToYandexAuth = () => {
		const authUrl = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${YANDEX_CLIENT_ID}&redirect_uri=${YANDEX_REDIRECT_URI}`;
		window.location.href = authUrl;
	};

	const handleRedirect = () => {
		const params = new URLSearchParams(window.location.search);
		const code = params.get('code');

		if (code) {
			handleYandexLogin(code);
		}
	};

	useEffect(() => {
		handleRedirect();
	}, []);

	return (
		<div>
			<h1>Yandex Authentication</h1>
			<button onClick={redirectToYandexAuth}>Login with Yandex</button>
			{message && <p>{message}</p>}
		</div>
	);
};

export default YandexAuth;
