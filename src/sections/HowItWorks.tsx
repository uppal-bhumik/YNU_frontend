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
		title: "Built for Gen Z's",
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
				if (entry.isIntersecting) {
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
				background: '#fff',
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
					background: 'linear-gradient(120deg, #1A3A4A22 0%, #2D6A7A22 60%, #fff 100%)',
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
							<stop offset="0%" stopColor="#1A3A4A" />
							<stop offset="100%" stopColor="#2D6A7A" />
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
							background: 'linear-gradient(90deg,#2D6A7A 0%,#1A3A4A 100%)',
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
						background: 'radial-gradient(circle at 30% 30%, #1A3A4Acc 0%, #1A3A4A00 80%)',
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
						background: 'radial-gradient(circle at 70% 70%, #2D6A7A99 0%, #2D6A7A00 80%)',
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
						background: 'radial-gradient(circle at 50% 50%, #D0E8ECcc 0%, #D0E8EC00 80%)',
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
					background: 'linear-gradient(135deg, #1A3A4A 0%, #2D6A7A 100%)',
					boxShadow: '0 8px 48px rgba(15, 23, 42, 0.3)',
					border: 'none',
					backdropFilter: 'blur(1.5px)',
					WebkitBackdropFilter: 'blur(1.5px)',
					overflow: 'hidden',
					paddingBottom: '2rem',
				}}
			>
				{/* Section Heading */}
				<div
					style={{
						maxWidth: 1100,
						margin: '0 auto',
						padding: '3rem 2rem 0 2rem',
					}}
				>
					<div style={{ textAlign: 'center', marginBottom: '0.8rem' }}>
						<span
							style={{
								display: 'inline-block',
								padding: '0.4rem 1.2rem',
								background: 'linear-gradient(135deg, rgba(45, 106, 122, 0.3) 0%, rgba(26, 58, 74, 0.3) 100%)',
								borderRadius: 30,
								fontSize: '0.85rem',
								fontWeight: 600,
								color: '#7dd3e8',
								letterSpacing: '1.5px',
								textTransform: 'uppercase',
								border: '1px solid rgba(125, 211, 232, 0.2)',
							}}
						>
							Why Us
						</span>
					</div>
					<h2
						style={{
							fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
							fontWeight: 800,
							textAlign: 'center',
							letterSpacing: '-1.5px',
							color: '#fff',
							marginBottom: '0.6rem',
							lineHeight: 1.15,
						}}
					>
						Why Students Choose Us
					</h2>
					<p
						style={{
							fontSize: '1.1rem',
							color: 'rgba(255, 255, 255, 0.7)',
							textAlign: 'center',
							maxWidth: 600,
							margin: '0 auto 2.5rem auto',
							lineHeight: 1.6,
						}}
					>
						We're not just another platform — we're your personal guide through every step of your study abroad journey.
					</p>
				</div>
				{/* Premium glassmorphism cards */}
				<div
					style={{
						maxWidth: 1100,
						margin: '0 auto',
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
						gap: '1.5rem',
						padding: '0 2rem 3rem 2rem',
					}}
				>
					{steps.map((step, idx) => (
						<div
							key={step.title}
							className="howitworks-step-card"
							style={{
								position: 'relative',
								background: 'rgba(255, 255, 255, 0.95)',
								backdropFilter: 'blur(20px)',
								WebkitBackdropFilter: 'blur(20px)',
								borderRadius: 20,
								padding: '2rem 1.5rem 1.8rem 1.5rem',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								border: '1px solid rgba(255, 255, 255, 0.6)',
								transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
								cursor: 'pointer',
								overflow: 'hidden',
								boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
							}}
							onMouseOver={(e) => {
								const card = e.currentTarget as HTMLDivElement;
								card.style.transform = 'translateY(-8px)';
								card.style.background = '#ffffff';
								card.style.borderColor = 'rgba(125, 211, 232, 0.5)';
								card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1), 0 0 20px rgba(125, 211, 232, 0.2)';
							}}
							onMouseOut={(e) => {
								const card = e.currentTarget as HTMLDivElement;
								card.style.transform = '';
								card.style.background = 'rgba(255, 255, 255, 0.95)';
								card.style.borderColor = 'rgba(255, 255, 255, 0.6)';
								card.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
							}}
						>
							{/* Gradient glow effect behind icon - Adjusted for light theme */}
							<div
								style={{
									position: 'absolute',
									top: 40,
									left: '50%',
									transform: 'translateX(-50%)',
									width: 100,
									height: 100,
									background: idx % 2 === 0
										? 'radial-gradient(circle, rgba(125, 211, 232, 0.15) 0%, transparent 70%)'
										: 'radial-gradient(circle, rgba(45, 106, 122, 0.1) 0%, transparent 70%)',
									borderRadius: '50%',
									filter: 'blur(20px)',
									pointerEvents: 'none',
								}}
							/>
							{/* Step number badge - Dark background, Light text */}
							<div
								style={{
									position: 'absolute',
									top: 16,
									right: 16,
									width: 28,
									height: 28,
									background: '#1A3A4A',
									color: '#ffffff',
									borderRadius: 8,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									fontWeight: 700,
									fontSize: '0.85rem',
									border: '1px solid rgba(26, 58, 74, 0.1)',
									boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
								}}
							>
								{idx + 1}
							</div>
							{/* Icon container - Dark background */}
							<div
								style={{
									position: 'relative',
									width: 70,
									height: 70,
									marginBottom: '1.5rem',
									borderRadius: 18,
									background: '#1A3A4A',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									border: '1px solid rgba(255, 255, 255, 0.1)',
									boxShadow: '0 8px 20px rgba(26, 58, 74, 0.2)',
								}}
							>
								{idx === 0 && (
									<svg width="32" height="32" viewBox="0 0 44 44" fill="none">
										<path d="M22 8C14.268 8 8 14.268 8 22s6.268 14 14 14 14-6.268 14-14S29.732 8 22 8z" stroke="#fff" strokeWidth="2" fill="none" />
										<path d="M17 22l3 3 7-7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
								)}
								{idx === 1 && (
									<svg width="32" height="32" viewBox="0 0 44 44" fill="none">
										<rect x="10" y="16" width="24" height="16" rx="3" stroke="#fff" strokeWidth="2" fill="none" />
										<path d="M18 12h8v4H18z" stroke="#fff" strokeWidth="2" fill="none" />
										<circle cx="22" cy="24" r="3" stroke="#fff" strokeWidth="2" fill="none" />
									</svg>
								)}
								{idx === 2 && (
									<svg width="32" height="32" viewBox="0 0 44 44" fill="none">
										<circle cx="22" cy="22" r="12" stroke="#fff" strokeWidth="2" fill="none" />
										<ellipse cx="22" cy="22" rx="12" ry="5" stroke="#fff" strokeWidth="1.5" fill="none" />
										<path d="M22 10v24M10 22h24" stroke="#fff" strokeWidth="1.5" />
										<circle cx="22" cy="22" r="2" fill="#fff" />
									</svg>
								)}
								{idx === 3 && (
									<svg width="32" height="32" viewBox="0 0 44 44" fill="none">
										<rect x="14" y="8" width="16" height="28" rx="4" stroke="#fff" strokeWidth="2" fill="none" />
										<path d="M18 12h8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
										<circle cx="22" cy="30" r="2" fill="#fff" />
									</svg>
								)}
							</div>
							<h4
								style={{
									fontSize: '1.15rem',
									color: '#1A3A4A',
									fontWeight: 700,
									margin: '0 0 0.6rem 0',
									textAlign: 'center',
									letterSpacing: '-0.3px',
									lineHeight: 1.3,
								}}
							>
								{step.title}
							</h4>
							<p
								style={{
									fontSize: '0.95rem',
									color: '#2D6A7A',
									textAlign: 'center',
									margin: 0,
									fontWeight: 500,
									lineHeight: 1.6,
									opacity: 0.9,
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
            padding: 1.5rem 1.2rem 1.4rem 1.2rem !important;
          }
        }
        @media (max-width: 600px) {
          .howitworks-step-card {
            padding: 1.5rem 1rem 1.4rem 1rem !important;
          }
        }
        .howitworks-step-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(125, 211, 232, 0.3), transparent);
        }
        `}
			</style>
		</div>
	);
};

