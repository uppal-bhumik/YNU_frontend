import React, { useEffect, useRef } from 'react';
import { useReveal } from '../hooks/useReveal';

// Example images, replace with your own or use static imports
const stepImages = [
	'https://studconnect-assets.s3.amazonaws.com/step1.png',
	'https://studconnect-assets.s3.amazonaws.com/step2.png',
	'https://pub-e63ee2f49d7e4f94b98011a5350eea0f.r2.dev/school_photos/original/1_-_LakeheadU_Simcoe_Hall_Orillia_Campus.jpg',
	'https://studconnect-assets.s3.amazonaws.com/step4.png',
];

const steps = [
	{
		title: 'Real Stories, Real Advice',
		desc: 'No hidden agendas, just honest guidance.',
	},
	{
		title: 'Affordable and Flexible',
		desc: 'Pay per session, not overpriced “packages.”',
	},
	{
		title: 'Complete Student Journey Support',
		desc: 'From shortlisting courses to settling into your new home abroad.',
	},
	{
		title: 'Built for Gen Z ',
		desc: 'A modern, mobile-first platform with community vibes and tools that make sense.',
	},
];

interface HowItWorksProps {
  style?: React.CSSProperties;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ style }) => {
	const ref = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const element = ref.current;
		if (!element) return;
		const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if(entry.isIntersecting){
					entry.target.classList.add('reveal--visible');
					observer.unobserve(entry.target);
				}
			});
		}, { threshold: 0.15 });
		observer.observe(element);
		return () => observer.disconnect();
	}, []);
	return (
		<div
			ref={ref}
			style={{
				position: 'relative',
				zIndex: 1,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				minHeight: '100vh',
				background: 'radial-gradient(circle at 50% 50%, #D6C5F0 0%, #9F7AEA88 40%, #5727A333 70%, #fff 100%)',
				overflow: 'hidden',
				...style,
			}}
		>
			{/* Dreamy overlay */}
			<div
				aria-hidden
				style={{
					position: 'absolute',
					inset: 0,
					zIndex: 0,
					background: 'linear-gradient(120deg, #5727A322 0%, #9F7AEA22 60%, #fff 100%)',
					backdropFilter: 'blur(2.5px)',
					WebkitBackdropFilter: 'blur(2.5px)',
					pointerEvents: 'none',
					mixBlendMode: 'lighten',
				}}
			/>
			{/* Unique Decorative SVG Waves, Sparkles, and Animated Gradient Orbs */}
			<div
				aria-hidden
				style={{
					position: 'absolute',
					zIndex: 0,
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					pointerEvents: 'none',
					overflow: 'hidden',
				}}
			>
				{/* Soft pastel wave at top */}
				<svg
					width="100%"
					height="180"
					viewBox="0 0 1440 180"
					fill="none"
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						height: 180,
						zIndex: 1,
						opacity: 0.7,
					}}
				>
					<path
						d="M0,80 Q360,160 720,80 T1440,80 V180 H0 Z"
						fill="url(#howitworks-wave1)"
					/>
					<defs>
						<linearGradient id="howitworks-wave1" x1="0" y1="0" x2="1" y2="1">
							<stop offset="0%" stopColor="#5727A3" />
							<stop offset="100%" stopColor="#9F7AEA" />
						</linearGradient>
					</defs>
				</svg>
				{/* Subtle bottom wave */}
				<svg
					width="100%"
					height="120"
					viewBox="0 0 1440 120"
					fill="none"
					style={{
						position: 'absolute',
						bottom: 0,
						left: 0,
						width: '100%',
						height: 120,
						zIndex: 1,
						opacity: 0.6,
					}}
				>
					<path
						d="M0,40 Q480,120 960,40 T1440,40 V120 H0 Z"
						fill="url(#howitworks-wave2)"
					/>
					<defs>
						<linearGradient id="howitworks-wave2" x1="0" y1="0" x2="1" y2="1">
							<stop offset="0%" stopColor="#9F7AEA" />
							<stop offset="100%" stopColor="#5727A3" />
						</linearGradient>
					</defs>
				</svg>
				{/* Animated sparkles */}
				{[...Array(18)].map((_, i) => (
					<div
						key={i}
						style={{
							position: 'absolute',
							left: `${8 + Math.random() * 84}%`,
							top: `${10 + Math.random() * 75}%`,
							width: 2 + Math.random() * 3,
							height: 2 + Math.random() * 3,
							background: 'linear-gradient(90deg,#9F7AEA 0%,#5727A3 100%)',
							borderRadius: '50%',
							opacity: 0.13 + Math.random() * 0.18,
							filter: 'blur(0.5px)',
							animation: `sparkle-move-${i} 7s ease-in-out infinite alternate`,
						}}
					/>
				))}
				{/* Animated floating gradient orbs */}
				<div
					style={{
						position: 'absolute',
						top: '18%',
						left: '7%',
						width: 110,
						height: 110,
						borderRadius: '50%',
						background: 'radial-gradient(circle at 30% 30%, #5727A3cc 0%, #5727A300 80%)',
						filter: 'blur(8px)',
						opacity: 0.45,
						animation: 'orbFloat1 9s ease-in-out infinite alternate'
					}}
				/>
				<div
					style={{
						position: 'absolute',
						bottom: '12%',
						right: '10%',
						width: 140,
						height: 140,
						borderRadius: '50%',
						background: 'radial-gradient(circle at 70% 70%, #9F7AEA99 0%, #9F7AEA00 80%)',
						filter: 'blur(12px)',
						opacity: 0.38,
						animation: 'orbFloat2 11s ease-in-out infinite alternate'
					}}
				/>
				<div
					style={{
						position: 'absolute',
						top: '40%',
						left: '60%',
						width: 70,
						height: 70,
						borderRadius: '50%',
						background: 'radial-gradient(circle at 50% 50%, #D6C5F0cc 0%, #D6C5F000 80%)',
						filter: 'blur(6px)',
						opacity: 0.32,
						animation: 'orbFloat3 13s ease-in-out infinite alternate'
					}}
				/>
				<style>
					{[...Array(18)].map((_, i) => `
						@keyframes sparkle-move-${i} {
							0% { transform: scale(1) translateY(0);}
							100% { transform: scale(${0.8 + Math.random() * 0.7}) translateY(${Math.random() * 30 - 15}px);}
						}
					`).join('\n') +
`
@keyframes orbFloat1 {
	0% { transform: translateY(0) scale(1);}
	100% { transform: translateY(-30px) scale(1.08);}
}
@keyframes orbFloat2 {
	0% { transform: translateY(0) scale(1);}
	100% { transform: translateY(40px) scale(1.12);}
}
@keyframes orbFloat3 {
	0% { transform: translateY(0) scale(1);}
	100% { transform: translateY(-20px) scale(1.05);}
}
`}
				</style>
			</div>
			<div
				style={{
					position: 'relative',
					zIndex: 1,
					maxWidth: 1300,
					margin: '0 auto',
					borderRadius: 32,
					background: 'rgba(214,197,240,0.92)', // #D6C5F0
					boxShadow: '0 8px 48px #5727A318, 0 1.5px 0 #9F7AEA33',
					border: '1.5px solid #D6C5F0',
					backdropFilter: 'blur(1.5px)',
					WebkitBackdropFilter: 'blur(1.5px)',
					overflow: 'hidden',
					paddingBottom: '2rem', // moved padding here
				}}
			>
				{/* Section Heading */}
				<div
					style={{
						maxWidth: 900,
						margin: '0 auto',
						padding: '2.5rem 1.5rem 0 1.5rem',
					}}
				>
					<h2
						style={{
							fontSize: '2.1rem',
							fontWeight: 900,
							textAlign: 'center',
							letterSpacing: '-1px',
							color: '#5727A3',
							marginBottom: '1.5rem',
							lineHeight: 1.1,
							textShadow: '0 2px 8px #5727A311',
						}}
					>
						Why Students Choose Us
					</h2>
				</div>
				{/* Cards in a row, no scroll */}
				<div
					style={{
						maxWidth: 900,
						margin: '0 auto',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'stretch',
						gap: '1.2rem',
						flexWrap: 'wrap',
						padding: '0 1.5rem 2.5rem 1.5rem',
					}}
				>
					{steps.map((step, idx) => (
						<div
							key={step.title}
							className="howitworks-step-card"
							style={{
								flex: '1 1 180px',
								minWidth: 180,
								maxWidth: 220,
								background: '#fff',
								borderRadius: 14,
								boxShadow: '0 2px 12px #5727A311',
								padding: '1.2rem 0.7rem 1rem 0.7rem',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								position: 'relative',
								transition: 'box-shadow .18s, transform .18s',
								cursor: 'pointer',
								borderLeft: `5px solid ${idx % 2 === 0 ? '#5727A3' : '#9F7AEA'}`,
								zIndex: 1,
								margin: '0',
							}}
							onMouseOver={(e) => {
								(e.currentTarget as HTMLDivElement).style.boxShadow =
									'0 8px 32px #5727A322';
								(e.currentTarget as HTMLDivElement).style.transform =
									'translateY(-4px) scale(1.03)';
							}}
							onMouseOut={(e) => {
								(e.currentTarget as HTMLDivElement).style.boxShadow =
									'0 2px 12px #5727A311';
								(e.currentTarget as HTMLDivElement).style.transform = '';
							}}
						>
							<div
								style={{
									position: 'absolute',
									top: -18,
									left: 16,
									width: 32,
									height: 32,
									background:
										idx % 2 === 0
											? 'linear-gradient(135deg,#5727A3 0%,#9F7AEA 100%)'
											: 'linear-gradient(135deg,#9F7AEA 0%,#5727A3 100%)',
									color: '#fff',
									borderRadius: '50%',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									fontWeight: 800,
									fontSize: '1rem',
									boxShadow: '0 2px 8px #5727A322',
									border: '2px solid #fff',
									zIndex: 2,
								}}
							>
								{idx + 1}
							</div>
							<div
								style={{
									width: 44,
									height: 44,
									margin: '1rem auto 0.7rem auto',
									borderRadius: '50%',
									background:
										idx % 2 === 0
											? 'linear-gradient(135deg,#D6C5F0 60%,#9F7AEA 100%)'
											: 'linear-gradient(135deg,#fff 60%,#D6C5F0 100%)',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									boxShadow: '0 2px 8px #5727A318',
								}}
							>
								{/* ...existing icon SVGs... */}
								{idx === 0 && (
									<svg width="28" height="28" viewBox="0 0 44 44" fill="none">
										<circle cx="22" cy="22" r="20" fill="#fff" opacity="0.92"/>
										<rect x="13" y="15" width="18" height="12" rx="6" stroke="#5727A3" strokeWidth="2.5" fill="none"/>
										<path d="M19 27L17 31L22 29L27 31L25 27" stroke="#5727A3" strokeWidth="2" strokeLinejoin="round" fill="none"/>
									</svg>
								)}
								{idx === 1 && (
									<svg width="28" height="28" viewBox="0 0 44 44" fill="none">
										<circle cx="22" cy="22" r="20" fill="#fff" opacity="0.92"/>
										<rect x="13" y="17" width="18" height="10" rx="3" stroke="#5727A3" strokeWidth="2.5" fill="none"/>
										<circle cx="29" cy="22" r="1.5" fill="#5727A3"/>
										<path d="M13 21h18" stroke="#5727A3" strokeWidth="2"/>
									</svg>
								)}
								{idx === 2 && (
									<svg width="28" height="28" viewBox="0 0 44 44" fill="none">
										<circle cx="22" cy="22" r="20" fill="#fff" opacity="0.92"/>
										<circle cx="22" cy="22" r="10" stroke="#5727A3" strokeWidth="2.5"/>
										<ellipse cx="22" cy="22" rx="10" ry="4" stroke="#5727A3" strokeWidth="2"/>
										<path d="M22 12v20M12 22h20" stroke="#5727A3" strokeWidth="2"/>
									</svg>
								)}
								{idx === 3 && (
									<svg width="28" height="28" viewBox="0 0 44 44" fill="none">
										<circle cx="22" cy="22" r="20" fill="#fff" opacity="0.92"/>
										<rect x="16" y="12" width="12" height="20" rx="3" stroke="#5727A3" strokeWidth="2.5" fill="none"/>
										<rect x="20" y="28" width="4" height="2" rx="1" fill="#5727A3"/>
									</svg>
								)}
							</div>
							<h4
								style={{
									fontSize: '.98rem',
									color: '#5727A3',
									fontWeight: 800,
									margin: '0 0 .3rem 0',
									textAlign: 'center',
									letterSpacing: '-.5px',
								}}
							>
								{step.title}
							</h4>
							<p
								style={{
									fontSize: '.93rem',
									color: '#3B2562',
									textAlign: 'center',
									margin: 0,
									fontWeight: 500,
									minHeight: 32,
								}}
							>
								{step.desc}
							</p>
						</div>
					))}
				</div>
			</div>
			{/* Responsive styles */}
			<style>
				{`
        @media (max-width: 900px) {
          .howitworks-step-card {
            min-width: 140px !important;
            max-width: 180px !important;
            padding: .7rem .4rem .7rem .4rem !important;
          }
        }
        @media (max-width: 600px) {
          .howitworks-step-card {
            max-width: 100vw !important;
            min-width: 140px !important;
            padding: .7rem .4rem .7rem .4rem !important;
          }
        }
        `}
			</style>
		</div>
	);
};