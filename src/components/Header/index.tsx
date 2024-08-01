import { css } from '@linaria/core';

import { Logo } from './Logo';
import { Nav } from './Nav';
import { Search } from './Search';

const headerStyles = css`
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 75px;
	background-color: #fff;
	border-bottom: 1px solid #e0e0e0;
	font-family: Roboto;
	padding: 0 20px;
	max-width: 1200px;
	margin: 0 auto;

	> div,
	> ul {
		width: 400px;
	}
`;

const Header = () => {
	return (
		<header role="banner" className={headerStyles}>
			<Logo />
			<Nav />
		</header>
	);
};

export default Header;
