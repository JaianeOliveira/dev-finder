import { useState } from 'react';
import './App.css';

import {
	BsBuilding,
	BsFillGeoAltFill,
	BsLink45Deg,
	BsMoonFill,
	BsSunFill,
	BsTwitter,
} from 'react-icons/bs';
import { FiSearch } from 'react-icons/fi';

const App = () => {
	const [darkModeActive, setDarkModeActive] = useState(true);

	return (
		<div className="page">
			<main>
				<header className="page-header">
					<h1 className="page-title">devfinder</h1>
					<button className="toogle-system-color-button">
						<span>{darkModeActive ? 'Light' : 'Dark'}</span>
						<span className="icon">
							{darkModeActive ? <BsSunFill /> : <BsMoonFill />}
						</span>
					</button>
				</header>
				<section className="search-bar">
					<form className="search-form">
						<div className="search-input-container">
							<span className="search-icon">
								<FiSearch />
							</span>
							<input
								className="search-input"
								type="text"
								name="search"
								id="search-input"
								placeholder="Search Github username..."
							/>
						</div>
						<button className="search-button" type="submit">
							Search
						</button>
					</form>
				</section>

				<section className="profile-card">
					<div className="avatar"></div>

					<div className="content-header">
						<h2 className="user-name">The Octocat</h2>
						<span className="user-username">@octocat</span>
						<span className="user-joined-date">Joined 25 Jan 2011</span>
					</div>

					<p className="user-description">This profile has no bio</p>

					<div className="metrics-container">
						<div className="metric-item">
							<span>Repos</span>
							<p>8</p>
						</div>
						<div className="metric-item">
							<span>Followers</span>
							<p>3038</p>
						</div>
						<div className="metric-item">
							<span>Following</span>
							<p>9</p>
						</div>
					</div>

					<div className="user-details">
						<div className="detail-item">
							<BsFillGeoAltFill />
							<span>San Frncisco</span>
						</div>

						<div className="detail-item">
							<BsTwitter />
							<span>Not Available</span>
						</div>
						<div className="detail-item">
							<BsLink45Deg />
							<span>https://github.blog</span>
						</div>
						<div className="detail-item">
							<BsBuilding />
							<span>@github</span>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
};

export default App;
