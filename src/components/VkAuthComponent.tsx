import React, { useState } from 'react';

const VkAuth = () => {
	const [message, setMessage] = useState('');

	const VK_CLIENT_ID = '52072268';
	const VK_REDIRECT_URI = 'https://50da-92-241-88-9.ngrok-free.app/';

	const redirectToVkAuth = () => {
		const authUrl = `https://oauth.vk.com/authorize?client_id=${VK_CLIENT_ID}&display=page&redirect_uri=${VK_REDIRECT_URI}&scope=email&response_type=token&v=5.131`;
		window.location.href = authUrl;
	};

	const handleRedirect = () => {
		const hash = window.location.hash;
		const params = new URLSearchParams(hash.slice(1));
		const token = params.get('access_token');

		if (token) {
			handleVkLogin(token);
		}
	};

	const handleVkLogin = async (token) => {
		try {
			const response = await fetch('http://localhost:10073/wp-json/api/auth/vk', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ token }),
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

	React.useEffect(() => {
		handleRedirect();
	}, []);

	return (
		<div>
			<h1>VK Authentication</h1>
			<button onClick={redirectToVkAuth}>Login with VK</button>
			{message && <p>{message}</p>}
		</div>
	);
};

export default VkAuth;
