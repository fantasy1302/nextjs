import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const GoogleAuthComponent = () => {
	const handleLogin = (response) => {
		const idToken = response.credential;

		fetch('http://localhost:10073/wp-json/api/auth/google', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ token: idToken }),
		})
			.then(res => res.json())
			.then(data => {
				console.log('Server Response:', data);
			})
			.catch(error => {
				console.error('Error:', error);
			});
	};

	const handleError = (error) => {
		console.error('Login Failed:', error);
	};

	return (
		<GoogleOAuthProvider clientId="483703634368-6tiqe21fhd9nicug7cepq01kr4rq2bn3.apps.googleusercontent.com">
			<div>
				<h1>Login with Google</h1>
				<GoogleLogin
					onSuccess={handleLogin}
					onError={handleError}
				/>
			</div>
		</GoogleOAuthProvider>
	);
};

export default GoogleAuthComponent;
