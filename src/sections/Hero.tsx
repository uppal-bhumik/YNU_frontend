import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Hero: React.FC = () => {
	const navigate = useNavigate();

	return (
		<header
			style={{
				width: '100%',
				minHeight: '100vh',
				position: 'relative',
				overflow: 'hidden',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			{/* Background Image with Overlay */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					zIndex: 0,
				}}
			>
				<img
					src="/university-bg.jpg"
					alt=""
					aria-hidden="true"
					style={{
						width: '100%',
						height: '100%',
						objectFit: 'cover',
						objectPosition: 'center',
						filter: 'blur(3px)',
					}}
				/>
				{/* Dark gradient overlay from left for text readability */}
				<div
					style={{
						position: 'absolute',
						inset: 0,
						background: 'linear-gradient(100deg, rgba(26, 58, 74, 0.92) 0%, rgba(26, 58, 74, 0.75) 40%, rgba(26, 58, 74, 0.5) 70%, rgba(26, 58, 74, 0.35) 100%)',
					}}
				/>
			</div>

			{/* Main Content Container */}
			<div
				style={{
					position: 'relative',
					zIndex: 1,
					width: '100%',
					maxWidth: 1400,
					margin: '0 auto',
					padding: '120px 40px 80px 40px',
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-between',
					gap: '40px',
					flexWrap: 'wrap',
				}}
				className="hero-main-container"
			>
				{/* Left Side - Logo */}
				<div
					style={{
						flex: '0 0 auto',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
					className="hero-logo-container"
				>
					<div
						style={{
							position: 'relative',
							width: 'clamp(260px, 28vw, 380px)',
							height: 'clamp(260px, 28vw, 380px)',
						}}
					>
						{/* White gradient glow behind logo */}
						<div
							style={{
								position: 'absolute',
								inset: '-20%',
								borderRadius: '50%',
								background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.4) 40%, rgba(255, 255, 255, 0) 70%)',
								filter: 'blur(20px)',
								zIndex: 0,
								pointerEvents: 'none',
							}}
						/>
						<img
							src="/ynu-logo.png"
							alt="Your Next University Logo"
							style={{
								width: '100%',
								height: '100%',
								objectFit: 'contain',
								borderRadius: '50%',
								boxSizing: 'border-box',
								position: 'relative',
								zIndex: 1,
							}}
						/>
					</div>
				</div>

				{/* Center/Right Side - Content */}
				<div
					style={{
						flex: '1 1 500px',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'flex-start',
						gap: '20px',
					}}
					className="hero-content-container"
				>
					{/* Main Title */}
					<h1
						style={{
							margin: 0,
							padding: 0,
							fontSize: 'clamp(2rem, 5vw, 4rem)',
							fontWeight: 900,
							lineHeight: 1.05,
							letterSpacing: '-2px',
							color: '#fff',
							textShadow: '0 4px 24px rgba(0, 0, 0, 0.3)',
						}}
					>
						<span style={{ fontStyle: 'italic', fontWeight: 400 }}>YOUR</span>{' '}
						<span
							style={{
								fontStyle: 'normal',
								fontWeight: 900,
								color: '#1F4E5F',
								textShadow: '0 0 20px rgba(255, 255, 255, 0.6), 0 0 40px rgba(255, 255, 255, 0.4), 0 0 60px rgba(255, 255, 255, 0.2)'
							}}
						>NEXT</span>{' '}
						<span
							style={{
								fontStyle: 'normal',
								fontWeight: 900,
								color: '#fff',
								position: 'relative',
								display: 'inline-block',
							}}
						>
							UNIVERSITY.
							{/* Accent Line */}
							<span
								style={{
									position: 'absolute',
									bottom: '-12px',
									left: '0',
									width: '75%',
									height: '4px',
									background: 'linear-gradient(90deg, #2F6F82 0%, rgba(168, 213, 226, 0.3) 70%, transparent 100%)',
									borderRadius: '100px',
								}}
							/>
						</span>
					</h1>

					{/* Tagline */}
					<h2
						style={{
							margin: 0,
							fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
							fontWeight: 400,
							fontStyle: 'italic',
							color: '#E8F4F6',
							letterSpacing: '0.5px',
						}}
					>
						Study Abroad, Simplified.
					</h2>

					{/* Supporting Text */}
					<p
						style={{
							margin: 0,
							fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
							fontWeight: 400,
							color: 'rgba(255, 255, 255, 0.95)',
							lineHeight: 1.6,
							maxWidth: 600,
							marginTop: '8px',
						}}
					>
						Connect directly with students already living your dream.
						<br />
						Real advice. Real experiences. Zero commission.
					</p>

					{/* CTA Buttons */}
					<div
						style={{
							display: 'flex',
							flexWrap: 'wrap',
							gap: '16px',
							marginTop: '12px',
						}}
						className="hero-cta-container"
					>
						{/* Primary CTA */}
						<button
							onClick={() => navigate('/services/peer-counselling')}
							style={{
								display: 'inline-flex',
								alignItems: 'center',
								gap: '10px',
								padding: '16px 32px',
								background: 'linear-gradient(135deg, #2D6A7A 0%, #4A8A9A 100%)',
								border: 'none',
								borderRadius: '50px',
								color: '#fff',
								fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
								fontWeight: 700,
								cursor: 'pointer',
								transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
								boxShadow: '0 4px 20px rgba(45, 106, 122, 0.4)',
								letterSpacing: '0.5px',
							}}
							className="hero-btn-primary"
							onMouseOver={(e) => {
								e.currentTarget.style.background = 'linear-gradient(135deg, #4A8A9A 0%, #2D6A7A 100%)';
								e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
								e.currentTarget.style.boxShadow = '0 8px 28px rgba(45, 106, 122, 0.5)';
							}}
							onMouseOut={(e) => {
								e.currentTarget.style.background = 'linear-gradient(135deg, #2D6A7A 0%, #4A8A9A 100%)';
								e.currentTarget.style.transform = '';
								e.currentTarget.style.boxShadow = '0 4px 20px rgba(45, 106, 122, 0.4)';
							}}
						>
							<span>Book a Session</span>
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M5 12h14M13 6l6 6-6 6"
									stroke="currentColor"
									strokeWidth="2.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</button>

						{/* Secondary CTA */}
						<button
							onClick={() => navigate('/universities')}
							style={{
								display: 'inline-flex',
								alignItems: 'center',
								gap: '8px',
								padding: '16px 28px',
								background: 'transparent',
								border: 'none',
								borderRadius: '50px',
								color: '#E8F4F6',
								fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
								fontWeight: 600,
								cursor: 'pointer',
								transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
								letterSpacing: '0.5px',
								textDecoration: 'underline',
								textUnderlineOffset: '4px',
							}}
							className="hero-btn-secondary"
							onMouseOver={(e) => {
								e.currentTarget.style.color = '#fff';
								e.currentTarget.style.textUnderlineOffset = '6px';
							}}
							onMouseOut={(e) => {
								e.currentTarget.style.color = '#E8F4F6';
								e.currentTarget.style.textUnderlineOffset = '4px';
							}}
						>
							<span>Explore Universities</span>
						</button>
					</div>
				</div>
			</div>

			{/* Embedded Styles */}
			<style>
				{`
				/* Responsive adjustments */
				@media (max-width: 900px) {
					.hero-main-container {
						flex-direction: column !important;
						align-items: center !important;
						text-align: center !important;
						padding: 100px 24px 60px 24px !important;
						gap: 30px !important;
					}
					.hero-logo-container {
						order: 1;
					}
					.hero-content-container {
						order: 2;
						align-items: center !important;
					}
					.hero-cta-container {
						justify-content: center !important;
					}
				}

				@media (max-width: 600px) {
					.hero-main-container {
						padding: 90px 16px 50px 16px !important;
						gap: 24px !important;
					}
					.hero-cta-container {
						flex-direction: column !important;
						width: 100% !important;
					}
					.hero-btn-primary,
					.hero-btn-secondary {
						width: 100% !important;
						justify-content: center !important;
					}
				}

				/* Subtle animation for logo */
				.hero-logo-container > div {
					animation: heroLogoFloat 4s ease-in-out infinite;
				}
				@keyframes heroLogoFloat {
					0%, 100% { transform: translateY(0); }
					50% { transform: translateY(-8px); }
				}
				`}
			</style>
		</header>
	);
};
