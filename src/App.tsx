import { useEffect, useState } from 'react';
import './App.css';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import {
	BsBuilding,
	BsFillGeoAltFill,
	BsLink45Deg,
	BsMoonFill,
	BsSunFill,
	BsTwitter,
} from 'react-icons/bs';
import { FiSearch } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import * as yup from 'yup';
import { githubApi } from './services/api';

interface IFormInputs {
	username: string;
}

interface GithubUserData {
	login: string | null;
	name: string | null;
	bio: string | null;
	public_repos: number;
	followers: number | null;
	following: number | null;
	company: string | null;
	twitter_username: string | null;
	blog: string | null;
	location: string | null;
	created_at: string | null;
	avatar_url: string | null;
	html_url: string | null;
}

const App = () => {
	const [darkModeActive, setDarkModeActive] = useState(true);
	const [userData, setUserData] = useState<GithubUserData | null>();
	const [isLoading, setIsLoading] = useState(false);

	const schema = yup
		.object({
			username: yup.string().required(),
		})
		.required();

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<IFormInputs>({
		resolver: yupResolver(schema),
	});

	const getDataHandler = async ({ username }: IFormInputs) => {
		try {
			setIsLoading(true);
			const {
				data: {
					login,
					name,
					bio,
					public_repos,
					following,
					followers,
					company,
					twitter_username,
					blog,
					location,
					created_at,
					avatar_url,
					html_url,
					...data
				},
				status,
			} = await githubApi.get(`/${username}`);

			if (status === 200) {
				setUserData({
					login,
					name,
					bio,
					public_repos,
					followers,
					following,
					company,
					twitter_username,
					blog,
					location,
					avatar_url,
					created_at,
					html_url,
				});
				console.log(data);
			}
		} catch (err: any) {
			if (err.response.status === 404) {
				toast.error('Usuário não encontrado');
			}
		} finally {
			setIsLoading(false);
		}
	};

	const getFormattedDate = (date: string) => {
		const dateObject = new Date(date);

		return `${dateObject.toLocaleDateString('pt-BR', {
			day: '2-digit',
			month: 'short',
			year: 'numeric',
		})}`;
	};

	const toggleSystemTheme = () => {
		setDarkModeActive((prevState) => !prevState);
		document.documentElement.setAttribute(
			'data-theme',
			darkModeActive ? 'light' : 'dark'
		);
	};

	useEffect(() => {
		document.documentElement.setAttribute(
			'data-theme',
			darkModeActive ? 'light' : 'dark'
		);
	});

	return (
		<div className="page">
			<main>
				<header className="page-header">
					<h1 className="page-title">devfinder</h1>
					<button
						className="toogle-system-color-button"
						onClick={toggleSystemTheme}
					>
						<span>{darkModeActive ? 'Light' : 'Dark'}</span>
						<span className="icon">
							{darkModeActive ? <BsSunFill /> : <BsMoonFill />}
						</span>
					</button>
				</header>
				<section className="search-bar">
					<form className="search-form" onSubmit={handleSubmit(getDataHandler)}>
						<div className="search-input-container">
							<span className="search-icon">
								<FiSearch />
							</span>
							<input
								className="search-input"
								type="text"
								placeholder="Pesquise um usuário do github..."
								{...register('username')}
							/>
						</div>
						<button
							className="search-button"
							type="submit"
							disabled={isLoading}
						>
							Pesquisar
						</button>
					</form>
				</section>

				{userData ? (
					<section className="card profile-card">
						<div className="avatar">
							<img
								src={userData.avatar_url || '../../public/github.svg'}
								alt={userData.name || 'Github Logo'}
							/>
						</div>

						<div className="content-header">
							<h2 className="user-name">{userData.name}</h2>
							<a
								href={userData.html_url || '#'}
								className="user-username"
								target="_blank"
							>
								@{userData.login}
							</a>
							<span className="user-joined-date">
								Entrou em{' '}
								{userData.created_at && getFormattedDate(userData.created_at)}
							</span>
						</div>

						<p className="user-description">{userData.bio}</p>

						<div className="metrics-container">
							<div className="metric-item">
								<span>Repositórios</span>
								<p>{userData.public_repos}</p>
							</div>
							<div className="metric-item">
								<span>Seguidores</span>
								<p>{userData.followers}</p>
							</div>
							<div className="metric-item">
								<span>Seguindo</span>
								<p>{userData.following}</p>
							</div>
						</div>

						<div className="user-details">
							<div className="detail-item">
								<BsFillGeoAltFill />
								<span>{userData.location || 'Desconhecido'}</span>
							</div>

							<div className="detail-item">
								<BsTwitter />
								<span>{userData.twitter_username || 'Desconhecido'}</span>
							</div>
							<div className="detail-item">
								<BsLink45Deg />
								<span>{userData.blog || 'Desconhecido'}</span>
							</div>
							<div className="detail-item">
								<BsBuilding />
								<span>{userData.company || 'Desconhecido'}</span>
							</div>
						</div>
					</section>
				) : (
					<div className="card empty-card"></div>
				)}
			</main>
			<ToastContainer
				theme={darkModeActive ? 'dark' : 'light'}
				toastStyle={{
					borderRadius: 12,
				}}
			/>
		</div>
	);
};

export default App;
