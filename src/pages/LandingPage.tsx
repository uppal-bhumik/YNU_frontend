import React, { useRef, useEffect, useState } from 'react';
import { Hero } from '../sections/Hero';
import { FeaturedUniversities } from '../sections/FeaturedUniversities';
import { HowItWorks } from '../sections/HowItWorks';
import { Testimonials } from '../sections/Testimonials';
import PeerCounsellorModal from '../components/PeerCounsellorModal';

import { useNavigate } from 'react-router-dom';

const allServices = [
	{
		code: 'peer-counselling',
		name: 'Peer Counselling',
		desc: 'Get honest advice from real students and expert counsellors.',
		path: '/services/peer-counselling',
		img: 'https://pub-e63ee2f49d7e4f94b98011a5350eea0f.r2.dev/meeting-5395615_1920.jpg',
	},
	{
		code: 'accommodation-assistance',
		name: 'Accommodation Help',
		desc: 'Secure safe, student-friendly housing before you arrive.',
		path: '/accommodation',
		img: 'https://pub-e63ee2f49d7e4f94b98011a5350eea0f.r2.dev/school_photos/original/hotel-6862159_1920.jpg',
	},
	{
		code: 'airport-pickup',
		name: 'Airport Pickup',
		desc: 'Book your airport pickup for a smooth landing.',
		path: '/services/airport-pickup',
		img: 'https://pub-e63ee2f49d7e4f94b98011a5350eea0f.r2.dev/school_photos/original/airplane-7359232.jpg',
	},
	{
		code: 'financial',
		name: 'Funding & Loans',
		desc: 'Compare and secure education loans and scholarships.',
		path: '/financial-services',
		img: 'https://pub-e63ee2f49d7e4f94b98011a5350eea0f.r2.dev/mentor-3512369_1920.jpg',
	},
	{
		code: 'international-application-process',
		name: 'Application Process',
		desc: 'Step-by-step help for your study abroad application.',
		path: '/services/international-application-process',
		img: 'https://pub-e63ee2f49d7e4f94b98011a5350eea0f.r2.dev/desk-3139127_1920.jpg',
	},
	{
		code: 'university-counsellors',
		name: 'University Counsellors',
		desc: 'Get guidance from official university representatives for your application and admission process.',
		path: '/services/university-representative-counselling',
		img: 'https://pub-e63ee2f49d7e4f94b98011a5350eea0f.r2.dev/university-counsellor.jpg',
	},
];

const heroSectionStyle: React.CSSProperties = {
	display: 'flex',
	flexWrap: 'wrap',
	justifyContent: 'center',
	alignItems: 'center',
	gap: '2.5rem',
	padding: '2.2rem 1.5rem 0.2rem 1.5rem',
	maxWidth: 1300,
	margin: '0 auto',
	position: 'relative',
};
const heroTextStyle: React.CSSProperties = {
	flex: 1,
	minWidth: 320,
	zIndex: 1,
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	height: '100%',
	maxWidth: 600,
};
const heroImagesWrapper: React.CSSProperties = {
	flex: 1,
	minWidth: 320,
	textAlign: 'center',
	position: 'relative',
	zIndex: 1,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	maxWidth: 600,
};
const heroImagesInner: React.CSSProperties = {
	position: 'relative',
	width: 540,
	height: 420,
	margin: '60px auto 1.5rem auto',
	perspective: 900,
	display: 'block',
	maxWidth: '100%',
	maxHeight: '70vw',
};
const responsiveStyle = `
  @media (max-width: 1100px) {
    .accom-hero-images-inner {
      width: 95vw !important;
      max-width: 380px !important;
      height: 220px !important;
    }
    .accom-hero-img-center {
      width: 170px !important;
      height: 170px !important;
      left: 50% !important;
      transform: translateX(-50%) scale(1.05) !important;
    }
    .accom-hero-img-side {
      width: 110px !important;
      height: 110px !important;
      top: 40px !important;
    }
    .accom-hero-img-side.left {
      left: 10px !important;
      right: auto !important;
    //   transform: rotate(-18deg) scale(1) !important;
    }
    .accom-hero-img-side.right {
      right: 10px !important;
      left: auto !important;
    //   transform: rotate(18deg) scale(1) !important;
    }
  }
  .accom-hero-images-inner::-webkit-scrollbar {
    display: none;
  }
`;

export const LandingPage: React.FC = () => {
	const navigate = useNavigate();
	const carouselRef = useRef<HTMLDivElement>(null);
	const financialServicesSectionRef = useRef<HTMLDivElement>(null);

	// --- 3D About Section Animation State ---
	const aboutSectionRef = useRef<HTMLDivElement>(null);
	const [aboutInView, setAboutInView] = useState(false);

	// --- 3D Services Section Animation State ---
	const servicesSectionRef = useRef<HTMLDivElement>(null);
	const [servicesInView, setServicesInView] = useState(false);

	// Peer counsellors API data
	const [peerCounsellors, setPeerCounsellors] = useState<
		{
			id: number;
			name: string;
			email: string;
			university: string;
			profile_image_url: string;
			location: string;
			program: string;
			charges: number;
			about?: string;
			languages?: string;
		}[]
	>([]);
	const [scrollIndex, setScrollIndex] = useState(0);

	// Modal state
	const [selectedPeer, setSelectedPeer] = useState<typeof peerCounsellors[0] | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		fetch('https://studconnect-backend.onrender.com/peer-counsellors')
			.then(res => res.json())
			.then(data => {
				// Only pick required fields for display
				const mapped = (data || []).map((c: any) => ({
					id: c.id,
					name: c.name,
					email: c.email,
					university: c.university,
					profile_image_url: c.profile_image_url,
					location: c.location,
					program: c.program,
					charges: c.charges,
					about: c.about,
					languages: c.languages,
				}));

				// Strict whitelist of valid emails to prevent duplicates/ghost records
				const VALID_COUNSELLOR_EMAILS = [
					"n0aveen0@gmail.com",
					"reetika7700@yahoo.com",
					"nathansofia25@gmail.com",
					"mihirnagpal1@gmail.com",
					"deeyar2005@gmail.com",
					"vijayantrikha1998@gmail.com",
					"zubiamaryam6@gmail.com",
					"adarshrana141@gmail.com",
					"suhanimehta300@gmail.com",
					"shrit7@icloud.com",
					"itsted2407@gmail.com",
					"suryanshsp14@icloud.com",
					"tushar241999@gmail.com",
					"chauhancharchit81@gmail.com",
					"navjotnv15@gmail.com",
					"nandinipandey083@gmail.com"
				];

				// Filter to keep only valid emails
				const filteredCounsellors = mapped.filter((c: any) =>
					c.email && VALID_COUNSELLOR_EMAILS.includes(c.email.trim().toLowerCase())
				);

				// Filter out duplicates based on email just in case (though whitelist handles most issues)
				const uniqueCounsellors = filteredCounsellors.filter((c: any, index: number, self: any[]) =>
					index === self.findIndex((t: any) => t.email?.trim().toLowerCase() === c.email?.trim().toLowerCase())
				);

				setPeerCounsellors(uniqueCounsellors);
			})
			.catch(() => setPeerCounsellors([]));
	}, []);

	useEffect(() => {
		if (peerCounsellors.length === 0) return;
		const interval = setInterval(() => {
			setScrollIndex(idx => (idx + 1) % peerCounsellors.length);
		}, 2200);
		return () => clearInterval(interval);
	}, [peerCounsellors]);

	useEffect(() => {
		const el = aboutSectionRef.current;
		if (!el) return;
		const observer = new window.IntersectionObserver(
			([entry]) => setAboutInView(entry.isIntersecting),
			{ threshold: 0.4 }
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	// Observe services section for animation (fade/slide-in)
	useEffect(() => {
		const el = servicesSectionRef.current;
		if (!el) return;
		const observer = new window.IntersectionObserver(
			([entry]) => setServicesInView(entry.isIntersecting),
			{ threshold: 0.2 }
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	// Auto-scroll effect for the peer counsellors carousel - now using CSS animation
	useEffect(() => {
		// No JavaScript scrolling needed, using CSS animation instead
	}, [peerCounsellors]);

	const peerCounsellingSection = (
		<section
			style={{
				width: '100%',
				maxWidth: 1300,
				padding: '2.5rem 1.5rem 2.5rem 1.5rem',
				borderRadius: 36,
				background: 'linear-gradient(100deg, #F0E6FF 0%, #D6C5F0 60%, #fff 100%)',
				boxShadow: '0 8px 32px 0 #9F7AEA22',
				display: 'flex',
				flexWrap: 'wrap',
				alignItems: 'center',
				justifyContent: 'center',
				gap: '2.5rem',
				position: 'relative',
				overflow: 'hidden',
			}}
			className="peer-counselling-hero-section"
		>
			{/* Decorative background blobs */}
			<div style={{
				position: 'absolute',
				top: -80,
				left: -120,
				width: 320,
				height: 320,
				background: 'radial-gradient(circle at 60% 40%, #9F7AEA33 0%, #fff0 100%)',
				borderRadius: '50%',
				filter: 'blur(40px)',
				zIndex: 0,
				opacity: 0.7,
				pointerEvents: 'none',
			}} />
			<div style={{
				position: 'absolute',
				bottom: -100,
				right: -120,
				width: 320,
				height: 320,
				background: 'radial-gradient(circle at 40% 60%, #5727A322 0%, #fff0 100%)',
				borderRadius: '50%',
				filter: 'blur(40px)',
				zIndex: 0,
				opacity: 0.6,
				pointerEvents: 'none',
			}} />
			{/* Text content */}
			<div style={{
				flex: 1,
				minWidth: 320,
				maxWidth: 600,
				zIndex: 2,
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
			}}>
				<h1 style={{
					fontSize: '2.7rem',
					fontWeight: 900,
					letterSpacing: '-2px',
					lineHeight: 1.08,
					marginBottom: '1.1rem',
					// background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
					// WebkitBackgroundClip: 'text',
					// WebkitTextFillColor: 'transparent',
					color: '#1B0044', // <-- dark color
					textShadow: '0 4px 24px #9F7AEA22, 0 1px 2px #fff8',
				}}>
					India’s 1st <span style={{ color: '#7e22c5ff' }}>Peer Counselling</span> Platform for Study Abroad
				</h1>
				<h2 style={{
					fontSize: '1.45rem',
					fontWeight: 700,
					color: '#1e3a8a',
					marginBottom: '1.1rem',
					lineHeight: 1.3,
					textShadow: '0 2px 8px #fff8, 0 1px 2px #0002',
				}}>
					Real Students. Real Stories. Real Guidance.<br />
					No Agents. No Gimmicks. Just Honest Help.
				</h2>
				<p style={{
					fontSize: '1.13rem',
					color: '#334155',
					fontWeight: 500,
					marginBottom: '1.5rem',
					lineHeight: 1.6,
				}}>
					Connect directly with students who’ve already walked the path you’re about to take. Get answers, clarity, and confidence from those who know the journey best—your peers. <br />
					<b>Book a 1:1 call and get the truth, not the sales pitch.</b>
				</p>
				<button
					onClick={() => navigate('/services/peer-counselling')}
					style={{
						background: 'linear-gradient(90deg, #5727A3 0%, #9F7AEA 100%)',
						boxShadow: '0 2px 8px #9F7AEA22',
						color: '#fff',
						border: 'none',
						borderRadius: 14,
						padding: '1.1rem 2.7rem',
						fontWeight: 800,
						fontSize: '1.18rem',
						cursor: 'pointer',
						transition: 'background 0.18s',
						letterSpacing: '.5px',
						marginTop: '0.2rem',
					}}
				>
					Book Session Now !!
				</button>
			</div>
			{/* Illustration */}
			<div style={{
				flex: 1,
				minWidth: 320,
				maxWidth: 420,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				zIndex: 2,
				position: 'relative',
			}}>
				<div style={{
					background: 'rgba(255,255,255,0.85)',
					borderRadius: 32,
					boxShadow: '0 8px 32px #9F7AEA22',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					position: 'relative',
					width: '100%',
					maxWidth: 380,
					backdropFilter: 'blur(6px) saturate(1.1)',
					WebkitBackdropFilter: 'blur(6px) saturate(1.1)',
				}}>
					<img
						src="https://pub-e63ee2f49d7e4f94b98011a5350eea0f.r2.dev/steptodown.com982213.jpg"
						alt="Peer Counselling Illustration"
						style={{
							width: '100%',
							display: 'block',
							borderRadius: 24,
							boxShadow: '0 4px 24px #9F7AEA22'
						}}
					/>
				</div>
			</div>
			{/* Horizontally scrolling peer counsellors list */}
			<div
				style={{
					width: '100%',
					overflow: 'hidden',
					padding: '1.2rem 0',
					marginTop: '2.5rem',
					position: 'relative',
				}}
			>
				<div
					ref={carouselRef}
					className="scroll-container"
					style={{
						display: 'flex',
						flexDirection: 'row',
						gap: '1.7rem',
						padding: '0 0.5rem',
						width: 'max-content',
					}}
				>
					{[...peerCounsellors, ...peerCounsellors].map((counsellor, idx) => (
						<div
							key={`${counsellor.id}-${Math.floor(idx / peerCounsellors.length)}`}
							// Replace href with onClick navigation
							onClick={() => {
								setSelectedPeer(counsellor);
								setIsModalOpen(true);
							}}
							style={{
								background: 'rgba(255,255,255,0.98)',
								boxShadow: '0 4px 18px #9F7AEA22',
								borderRadius: 18,
								minWidth: 180,
								width: 180,
								maxWidth: 220,
								padding: '1.2rem 1rem',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								textAlign: 'center',
								transition: 'box-shadow .18s, transform .18s',
								cursor: 'pointer',
								border: '1.5px solid #e0c3fc',
								position: 'relative',
								flexShrink: 0,
							}}
							className="peer-counsellor-card"
							tabIndex={0}
							role="button"
						>
							<div style={{
								width: '80px',
								height: '80px',
								borderRadius: '16px',
								overflow: 'hidden',
								position: 'relative',
								marginBottom: '0.7rem',
							}}>
								<img
									src={counsellor.profile_image_url && (counsellor.profile_image_url.startsWith('http://') || counsellor.profile_image_url.startsWith('https://')) ? counsellor.profile_image_url : `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(counsellor.name)}&backgroundColor=9f7aea,e0c3fc&radius=50`}
									alt={counsellor.name}
									referrerPolicy="no-referrer"
									onError={(e) => {
										const target = e.target as HTMLImageElement;
										target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(counsellor.name)}&backgroundColor=9f7aea,e0c3fc&radius=50`;
									}}
									style={{
										width: '100%',
										height: '100%',
										objectFit: 'cover',
										borderRadius: '16px',
										boxShadow: '0 2px 12px #9F7AEA22',
										border: '2px solid #fff',
										background: '#f0e6ff',
									}}
								/>
							</div>
							<div style={{
								fontWeight: 700,
								fontSize: '1.08rem',
								color: '#5727A3',
								marginBottom: '0.2rem',
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								whiteSpace: 'nowrap',
								width: '100%',
							}}>
								{counsellor.name}
							</div>
							<div style={{
								fontSize: '.97rem',
								color: '#1B0044',
								fontWeight: 500,
								marginBottom: '0.2rem',
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								whiteSpace: 'nowrap',
								width: '100%',
							}}>
								{counsellor.university}
							</div>
							<div style={{
								fontSize: '.93rem',
								color: '#9F7AEA',
								fontWeight: 500,
								marginBottom: '0.2rem',
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								whiteSpace: 'nowrap',
								width: '100%',
							}}>
								{counsellor.location}
							</div>
							<div style={{
								fontSize: '.93rem',
								color: '#5727A3',
								fontWeight: 500,
								marginBottom: '0.2rem',
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								whiteSpace: 'nowrap',
								width: '100%',
							}}>
								{counsellor.program}
							</div>

						</div>
					))}
				</div>
				<style>{`
						.scroll-container {
							animation: scrollCounsellors 120s linear infinite;
						}
						@keyframes scrollCounsellors {
							0% { transform: translateX(0); }
							100% { transform: translateX(-50%); }
						}
						.peer-counsellor-card:hover {
							box-shadow: 0 12px 32px #9F7AEA44;
							transform: scale(1.07) translateY(-4px);
							border-color: #9F7AEA;
						}
					`}</style>
			</div>

		</section>
	);


	// AboutPage Hero Section only (first section)
	const aboutHeroSection = (
		<section
			ref={aboutSectionRef}
			style={{
				display: 'flex',
				alignItems: 'center',
				gap: '2.5rem',
				flexWrap: 'wrap',
				padding: '3rem 1.5rem 2rem 1.5rem',
				boxSizing: 'border-box',
				width: '100%',
				overflow: 'hidden',
				position: 'relative',
				borderRadius: 32,
				margin: '2.5rem auto 0 auto',
				background: 'transparent', // <-- Make background transparent
			}}
			className={`about-hero-section${aboutInView ? ' about-3d-inview' : ''}`}
		>
			<div
				style={{ flex: 1, minWidth: 320 }}
				className={`about-3d-text${aboutInView ? ' about-3d-animate' : ''}`}
			>
				<h1
					style={{
						fontSize: '2.2rem',
						fontWeight: 900,
						color: '#5727A3',
						marginBottom: '1.2rem',
						letterSpacing: '-2px',
						lineHeight: 1.1,
					}}
				>
					Our Story:{' '}
					<span
						style={{
							background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
						}}
					>
						The Amazon for Studying Abroad
					</span>
				</h1>
				<p
					style={{
						fontSize: '1.13rem',
						color: '#1B0044',
						fontWeight: 500,
						marginBottom: '1.2rem',
					}}
				>
					We didn't build <b>Your Next University</b> because we wanted to be another
					consultancy. We built it because we got tired of watching students get
					lost in a system full of half-truths, hidden costs, and overhyped
					promises.
				</p>
				<p
					style={{
						fontSize: '1.13rem',
						color: '#1B0044',
						fontWeight: 500,
						marginBottom: '1.2rem',
					}}
				>
					We’ve sat in the university offices. We’ve worked as official
					representatives for many international universities. We’ve seen
					firsthand how students are pushed into courses they don’t need, charged
					for services they never asked for, and left clueless once they land
					abroad.
				</p>
				<button
					onClick={() => navigate('/about')}
					style={{
						marginTop: '1.2rem',
						background: 'linear-gradient(90deg, #5727A3 0%, #9F7AEA 100%)',
						color: '#fff',
						border: 'none',
						borderRadius: 8,
						padding: '0.7rem 1.6rem',
						fontWeight: 700,
						fontSize: '1.07rem',
						cursor: 'pointer',
						boxShadow: '0 2px 8px #9F7AEA22',
						transition: 'background 0.18s',
					}}
				>
					Show more
				</button>
			</div>
			<div
				style={{
					flex: 1,
					minWidth: 320,
					textAlign: 'center',
					position: 'relative',
					minHeight: 420,
				}}
				className={`about-3d-img${aboutInView ? ' about-3d-animate' : ''}`}
			>
				{/* Radiant effect behind the girl */}
				<div
					style={{
						position: 'absolute',
						left: '50%',
						top: 170,
						transform: 'translateX(-50%)',
						width: 340,
						height: 340,
						borderRadius: '50%',
						background:
							'radial-gradient(circle at 50% 50%, #D6C5F0 0%, #9F7AEA88 40%, #5727A333 70%, transparent 100%)',
						filter: 'blur(18px) brightness(1.15)',
						zIndex: 1,
						pointerEvents: 'none',
					}}
				/>
				{/* Girl image */}
				<img
					src="https://pub-e63ee2f49d7e4f94b98011a5350eea0f.r2.dev/image-from-rawpixel-id-15542441-png.png"
					alt="Thinking Girl"
					style={{
						width: 300,
						height: 420,
						objectFit: 'contain',
						borderRadius: 32,
						margin: '0 auto',
						display: 'block',
						position: 'relative',
						zIndex: 2,
					}}
					className={`about-3d-girl${aboutInView ? ' about-3d-animate' : ''}`}
				/>
				{/* Dotted line (thinking effect) in gap between girl head and globe */}
				{/* <svg
					width={90}
					height={70}
					style={{
						position: 'absolute',
						left: 350,
						top: 30,
						zIndex: 4,
						pointerEvents: 'none',
					}}
				>
					<path
						d="M0,60 Q30,-30 80,10"
						stroke="#5727A3"
						strokeWidth={3}
						fill="none"
						strokeDasharray="8,10"
						opacity={0.7}
					/>
				</svg> */}
				{/* Animated Globe */}
				{/* <img
					src="https://pub-e63ee2f49d7e4f94b98011a5350eea0f.r2.dev/Adobe%20Express%20-%20file.png"
					alt="Dreaming of Abroad"
					style={{
						width: 110,
						height: 110,
						objectFit: 'contain',
						position: 'absolute',
						left: 380,
						top: 0,
						zIndex: 3,
						filter: 'drop-shadow(0 4px 16px #9F7AEA22)',
						willChange: 'transform',
						pointerEvents: 'none',
						animation: 'aboutGlobeFloat 2.2s infinite cubic-bezier(.4,2,.6,1)',
					}}
					className={`about-3d-globe${aboutInView ? ' about-3d-animate' : ''}`}
				/> */}
				<style>{`
          @keyframes aboutGlobeFloat {
            0%, 100% { transform: translateY(0) scale(1);}
            50% { transform: translateY(-10px) scale(1.07);}
          }
        `}</style>
			</div>
			<style>{`
        /* 3D animation for About section */
        .about-3d-text, .about-3d-img, .about-3d-girl, .about-3d-globe {
          will-change: transform, opacity;
        }
        .about-3d-text {
          transform: perspective(900px) rotateY(-18deg) scale3d(0.96,0.96,1);
          opacity: 0.7;
          transition: transform 0.7s cubic-bezier(.4,2,.6,1), opacity 0.7s cubic-bezier(.4,2,.6,1);
        }
        .about-3d-img {
          transform: perspective(900px) rotateY(18deg) scale3d(0.96,0.96,1);
          opacity: 0.7;
          transition: transform 0.7s cubic-bezier(.4,2,.6,1), opacity 0.7s cubic-bezier(.4,2,.6,1);
        }
        .about-3d-girl {
          transform: perspective(900px) rotateX(12deg) scale3d(0.93,0.93,1);
          opacity: 0.8;
          transition: transform 0.7s cubic-bezier(.4,2,.6,1), opacity 0.7s cubic-bezier(.4,2,.6,1);
        }
        .about-3d-globe {
          filter: drop-shadow(0 4px 16px #9F7AEA22);
          transform: perspective(900px) rotateY(-30deg) rotateZ(-10deg) scale3d(0.9,0.9,1);
          opacity: 0.7;
          transition: transform 0.8s cubic-bezier(.4,2,.6,1), opacity 0.8s cubic-bezier(.4,2,.6,1);
        }
        .about-3d-inview .about-3d-text,
        .about-3d-inview .about-3d-img {
          transform: none;
          opacity: 1;
        }
        .about-3d-girl.about-3d-animate {
          transform: perspective(900px) rotateX(0deg) scale3d(1,1,1);
          opacity: 1;
        }
        .about-3d-globe.about-3d-animate {
          animation: aboutGlobeFloat 2.2s infinite cubic-bezier(.4,2,.6,1), aboutGlobeSpin3D 2.8s cubic-bezier(.4,2,.6,1) 1 both;
          transform: none;
          opacity: 1;
        }
        @keyframes aboutGlobeSpin3D {
          0% { transform: perspective(900px) rotateY(-30deg) rotateZ(-10deg) scale3d(0.9,0.9,1);}
          100% { transform: none;}
        }
      `}</style>
		</section>
	);


	// --- Simple Services Grid Section ---
	const SimpleServiceCard: React.FC<{
		service: typeof allServices[0];
		onClick: () => void;
		index: number;
	}> = ({ service, onClick, index }) => {
		const cardRef = useRef<HTMLDivElement>(null);

		// 3D tilt effect on mouse move
		useEffect(() => {
			const card = cardRef.current;
			if (!card) return;
			const handleMouseMove = (e: MouseEvent) => {
				const rect = card.getBoundingClientRect();
				const x = e.clientX - rect.left;
				const y = e.clientY - rect.top;
				const centerX = rect.width / 2;
				const centerY = rect.height / 2;
				const rotateX = ((y - centerY) / centerY) * 10; // max 10deg
				const rotateY = ((x - centerX) / centerX) * -10;
				card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
			};
			const handleMouseLeave = () => {
				card.style.transform = '';
			};
			card.addEventListener('mousemove', handleMouseMove);
			card.addEventListener('mouseleave', handleMouseLeave);
			return () => {
				card.removeEventListener('mouseleave', handleMouseLeave);
			};
		}, []);

		// Use the same icons as before
		const icons = [
			// Peer Counselling: chat bubbles
			<svg width="54" height="54" viewBox="0 0 54 54" fill="none" key="chat" style={{ filter: 'drop-shadow(0 2px 12px #9F7AEA33)' }}>
				<ellipse cx="27" cy="27" rx="22" ry="18" fill="#F0E6FF" />
				<ellipse cx="27" cy="27" rx="18" ry="14" fill="#D6C5F0" />
				<ellipse cx="27" cy="27" rx="12" ry="9" fill="#9F7AEA" opacity="0.7">
					<animate attributeName="rx" values="12;14;12" dur="2.5s" repeatCount="indefinite" />
					<animate attributeName="ry" values="9;11;9" dur="2.5s" repeatCount="indefinite" />
				</ellipse>
				<circle cx="22" cy="27" r="1.7" fill="#fff" />
				<circle cx="27" cy="27" r="1.7" fill="#fff" />
				<circle cx="32" cy="27" r="1.7" fill="#fff" />
			</svg>,
			// Accommodation: 3D house
			<svg width="54" height="54" viewBox="0 0 54 54" fill="none" key="house" style={{ filter: 'drop-shadow(0 2px 12px #9F7AEA33)' }}>
				<rect x="13" y="26" width="28" height="15" rx="4" fill="#F0E6FF" />
				<rect x="17" y="30" width="20" height="11" rx="3" fill="#D6C5F0" />
				<rect x="23" y="34" width="8" height="7" rx="2" fill="#9F7AEA" opacity="0.7">
					<animate attributeName="y" values="34;32;34" dur="2.2s" repeatCount="indefinite" />
				</rect>
				<polygon points="27,16 12,28 42,28" fill="#9F7AEA" opacity="0.8">
					<animate attributeName="points" values="27,16 12,28 42,28;27,14 12,28 42,28;27,16 12,28 42,28" dur="2.2s" repeatCount="indefinite" />
				</polygon>
			</svg>,
			// Airport Pickup: 3D car
			<svg width="54" height="54" viewBox="0 0 54 54" fill="none" key="car" style={{ filter: 'drop-shadow(0 2px 12px #9F7AEA33)' }}>
				<rect x="14" y="32" width="26" height="7" rx="3.5" fill="#D6C5F0" />
				<rect x="17" y="28" width="20" height="8" rx="3" fill="#9F7AEA" opacity="0.7">
					<animate attributeName="y" values="28;26;28" dur="2.2s" repeatCount="indefinite" />
				</rect>
				<circle cx="19" cy="40" r="3" fill="#5727A3" />
				<circle cx="35" cy="40" r="3" fill="#5727A3" />
				<rect x="22" y="30" width="10" height="4" rx="2" fill="#fff" opacity="0.7" />
			</svg>,
			// Financial: 3D coin stack
			<svg width="54" height="54" viewBox="0 0 54 54" fill="none" key="coins" style={{ filter: 'drop-shadow(0 2px 12px #9F7AEA33)' }}>
				<ellipse cx="27" cy="38" rx="10" ry="4" fill="#D6C5F0" />
				<ellipse cx="27" cy="34" rx="10" ry="4" fill="#F0E6FF" />
				<ellipse cx="27" cy="30" rx="10" ry="4" fill="#9F7AEA" opacity="0.7">
					<animate attributeName="cy" values="30;28;30" dur="2.2s" repeatCount="indefinite" />
				</ellipse>
				<ellipse cx="27" cy="26" rx="10" ry="4" fill="#D6C5F0" />
				<ellipse cx="27" cy="22" rx="10" ry="4" fill="#F0E6FF" />
			</svg>,
			// Application Process: 3D document
			<svg width="54" height="54" viewBox="0 0 54 54" fill="none" key="doc" style={{ filter: 'drop-shadow(0 2px 12px #9F7AEA33)' }}>
				<rect x="16" y="16" width="22" height="28" rx="5" fill="#F0E6FF" />
				<rect x="19" y="20" width="16" height="4" rx="2" fill="#9F7AEA" opacity="0.7">
					<animate attributeName="width" values="16;20;16" dur="2.2s" repeatCount="indefinite" />
				</rect>
				<rect x="19" y="27" width="12" height="3" rx="1.5" fill="#D6C5F0" />
				<rect x="19" y="33" width="10" height="3" rx="1.5" fill="#D6C5F0" />
			</svg>
		];
		const icon = icons[index % icons.length];
		return (
			<div
				ref={cardRef}
				className="simple-service-card"
				tabIndex={0}
				onClick={onClick}
				onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
				style={{
					background: 'rgba(255,255,255,0.82)',
					borderRadius: 22,
					boxShadow: '0 8px 32px 0 #9F7AEA11, 0 2px 8px 0 #D6C5F011',
					border: '1.5px solid #D6C5F0',
					cursor: 'pointer',
					transition: 'box-shadow 0.18s, transform 0.28s cubic-bezier(.4,2,.6,1), background 0.18s',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					padding: '2.2rem 1.2rem 1.5rem 1.2rem',
					minWidth: 220,
					maxWidth: 320,
					userSelect: 'none',
					outline: 'none',
					backdropFilter: 'blur(4px) saturate(1.1)',
					WebkitBackdropFilter: 'blur(4px) saturate(1.1)',
					margin: '0 auto',
					willChange: 'transform',
				}}
				aria-label={service.name}
			>
				<div style={{
					width: 70,
					height: 70,
					marginBottom: '1.1rem',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					borderRadius: '50%',
					background: 'linear-gradient(120deg,#F0E6FF 60%,#D6C5F0 100%)',
					boxShadow: '0 2px 12px #9F7AEA11',
					position: 'relative',
					animation: `serviceIconFloat${index} 2.8s ease-in-out infinite alternate`
				}}>
					{icon}
				</div>
				<h3 style={{
					fontSize: '1.13rem',
					fontWeight: 800,
					color: '#5727A3',
					margin: '1.1rem 0 .5rem 0',
					textAlign: 'center',
					width: '100%',
					whiteSpace: 'normal',
					overflow: 'visible',
				}}>{service.name}</h3>
				<p style={{
					fontSize: '1.01rem',
					color: '#334155',
					fontWeight: 500,
					margin: 0,
					textAlign: 'center',
					padding: '0 1.1rem',
					width: '100%',
					boxSizing: 'border-box',
					whiteSpace: 'normal',
					overflow: 'visible',
				}}>{service.desc}</p>
				<style>{`
					@keyframes serviceIconFloat${index} {
						0% { transform: translateY(0) scale(1);}
						100% { transform: translateY(-10px) scale(1.08);}
					}
					.simple-service-card:focus,
					.simple-service-card:hover {
						box-shadow: 0 24px 64px 0 #9F7AEA33, 0 4px 16px 0 #D6C5F033 !important;
						border-color: #9F7AEA !important;
					}
					.simple-service-card:focus {
						transform: perspective(600px) rotateX(0deg) rotateY(0deg) scale(1.04) !important;
					}
				`}</style>
			</div>
		);
	};

	const servicesSection = (
		<section
			className="services-section"
			style={{
				maxWidth: 1400,
				background: 'linear-gradient(90deg,#D6C5F0 0%,#fff 100%)',
				boxShadow: '0 4px 24px #9F7AEA22',
				border: '2px solid #D6C5F0',
				textAlign: 'center',
				position: 'relative',
				margin: '2.5rem auto 0 auto',
				overflow: 'visible',
				padding: '2.5rem 1.5rem',
			}}
		>
			<div style={{ marginBottom: '2.2rem' }}>
				<h2
					className="services-section-title"
					style={{
						fontSize: '2.1rem',
						fontWeight: 800,
						color: '#5727A3',
						marginBottom: '.7rem',
						letterSpacing: '-1px',
					}}
				>
					<span
						style={{
							display: 'inline-block',
							perspective: 400,
							textShadow: '0 2px 12px #9F7AEA11',
						}}
					>
						<span style={{ display: 'inline-block' }}>Our</span>{' '}
						<span style={{ display: 'inline-block' }}>Services</span>
					</span>
				</h2>
			</div>
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
					gap: '2.2rem',
					justifyContent: 'center',
					alignItems: 'stretch',
					maxWidth: 1100,
					margin: '0 auto',
				}}
			>
				{allServices.map((service, idx) => (
					<SimpleServiceCard
						key={service.code}
						service={service}
						index={idx}
						onClick={() => navigate(service.path)}
					/>
				))}
			</div>
		</section>
	);

	// Accommodation Hero Section for landing page
	const accommodationHeroSection = (
		<>
			<style>{responsiveStyle}</style>
			<section className="accom-hero-section" style={{
				...heroSectionStyle,
				background: 'linear-gradient(90deg,#D6C5F0 0%,#fff 100%)',
				boxShadow: '0 8px 32px 0 #9F7AEA22',
				margin: '2.5rem auto 0 auto',
			}}>
				{/* Decorative Globe/Blob */}
				<div
					style={{
						position: 'absolute',
						left: -120,
						top: -80,
						width: 320,
						height: 320,
						background:
							'radial-gradient(circle at 60% 40%, #D6C5F0 0%, #9F7AEA22 100%)',
						borderRadius: '50%',
						filter: 'blur(40px)',
						zIndex: 0,
						opacity: 0.7,
						pointerEvents: 'none',
					}}
				/>
				<div className="accom-hero-text" style={heroTextStyle}>
					<h1
						style={{
							fontSize: '2.6rem',
							fontWeight: 900,
							color: '#1e3a8a',
							marginBottom: '1.2rem',
							letterSpacing: '-2px',
							lineHeight: 1.1,
							textShadow:
								'0 4px 24px #2563eb22, 0 1px 2px #fff8',
						}}
					>
						Find Your Home Abroad
					</h1>
					<p
						style={{
							fontSize: '1.18rem',
							color: '#334155',
							fontWeight: 500,
							marginBottom: '1.2rem',
							lineHeight: 1.6,
						}}
					>
						Landing in a new country? Don’t stress. With our accommodation
						partners your student housing is sorted, safe, and student-approved—
						before you even step on the plane.
					</p>
					<button
						onClick={() =>
							window.open(
								'/accommodation',
								'_blank',
								'noopener,noreferrer'
							)
						}
						style={{
							marginTop: '1.2rem',
							background: 'linear-gradient(90deg, #5727A3 0%, #9F7AEA 100%)',
							color: '#fff',
							border: 'none',
							borderRadius: 14,
							padding: '1rem 2.3rem',
							fontWeight: 700,
							fontSize: '1.13rem',
							cursor: 'pointer',
							boxShadow: '0 2px 8px #9F7AEA22',
							transition: 'background 0.18s',
							letterSpacing: '.5px',
						}}
					>
						Explore Housing Options
					</button>
				</div>
				<div style={heroImagesWrapper}>
					<div className="accom-hero-images-inner" style={heroImagesInner}>
						<img
							className="accom-hero-img-side left"
							src="https://pub-e63ee2f49d7e4f94b98011a5350eea0f.r2.dev/Screenshot%202025-08-27%20at%201.10.57%E2%80%AFPM.png"
							alt="Student Room"
							style={{
								position: 'absolute',
								left: 0,
								top: 70,
								width: 240,
								height: 240,
								objectFit: 'cover',
								borderRadius: 28,
								boxShadow: '0 8px 32px #2563eb22',
								border: '4px solid #fff',
								transform: 'rotate(-18deg) scale(1.06)',
								zIndex: 1,
								transition: 'transform 0.18s',
							}}
						/>
						<img
							className="accom-hero-img-center"
							src="https://pub-e63ee2f49d7e4f94b98011a5350eea0f.r2.dev/Screenshot%202025-08-27%20at%201.07.41%E2%80%AFPM.png"
							alt="Student Accommodation"
							style={{
								position: 'absolute',
								left: '50%',
								top: 0,
								width: 300,
								height: 300,
								objectFit: 'cover',
								borderRadius: 36,
								boxShadow: '0 8px 32px #2563eb33',
								border: '5px solid #fff',
								transform: 'translateX(-50%) scale(1.18)',
								zIndex: 3,
								transition: 'transform 0.18s',
							}}
						/>
						<img
							className="accom-hero-img-side right"
							src="https://pub-e63ee2f49d7e4f94b98011a5350eea0f.r2.dev/dillon-kydd-2keCPb73aQY-unsplash.jpg"
							alt="Student Apartment"
							style={{
								position: 'absolute',
								right: 0,
								top: 70,
								width: 240,
								height: 240,
								objectFit: 'cover',
								borderRadius: 28,
								boxShadow: '0 12px 48px #2563eb22',
								border: '4px solid #fff',
								transform: 'rotate(18deg) scale(1.06)',
								zIndex: 2,
								transition: 'transform 0.18s',
							}}
						/>
					</div>
				</div>
			</section>
		</>
	);

	const financialServicesSection = (
		<section
			ref={financialServicesSectionRef}
			style={{
				background: 'transparent', // <-- Make background transparent
				boxShadow: 'none', // <-- Remove box shadow for clarity
				borderRadius: 32,
				padding: '2.2rem 1.5rem 1.5rem 1.5rem',
				marginTop: '2.5rem',
				color: '#1B0044',
				marginLeft: 'auto',
				marginRight: 'auto',
				display: 'flex',
				alignItems: 'center',
				gap: '2.2rem',
				flexWrap: 'wrap',
				maxWidth: 1200,
			}}
		>
			<div style={{
				flex: 1,
				minWidth: 220,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				textAlign: 'center'
			}}>
				<img
					src="https://framerusercontent.com/images/B9TBGTwN0hDvfPhPzcP3N4twFpM.png"
					alt="Education Loan Illustration"
					style={{
						width: '100%',
						maxWidth: 320,
						borderRadius: 18,
						boxShadow: '0 2px 12px #9F7AEA22',
						objectFit: 'cover'
					}}
				/>
			</div>
			<div style={{ flex: 1, minWidth: 260 }}>
				<h1 style={{
					fontSize: '2.3rem',
					fontWeight: 800,
					marginBottom: '0.5rem',
					background: 'linear-gradient(90deg, #5727A3 0%, #9F7AEA 100%)',
					WebkitBackgroundClip: 'text',
					WebkitTextFillColor: 'transparent'
				}}>
					<span role="img" aria-label="money">💸</span> Funding &amp; Loans Made Easy
				</h1>
				<p style={{
					fontSize: '1.15rem',
					color: '#1B0044',
					marginBottom: '1.2rem',
					fontWeight: 500
				}}>
					Studying abroad is a dream—but funding it shouldn't be stressful. <b>Your Next University</b> helps you plan, compare, and secure loans and scholarships so you can focus on your journey, not your finances.
				</p>
				<a
					href="#"
					onClick={e => {
						e.preventDefault();
						navigate('/financial-services');
					}}
					style={{
						display: 'inline-block',
						background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
						color: '#fff',
						fontWeight: 700,
						fontSize: '1.13rem',
						borderRadius: 12,
						padding: '1rem 2.5rem',
						textDecoration: 'none',
						margin: '0.5rem 0 0 0',
						boxShadow: '0 2px 8px #9F7AEA22',
						transition: 'background 0.18s',
						cursor: 'pointer'
					}}
				>
					Explore Funding Options
				</a>
			</div>
		</section>
	);

	return (
		<>
			<Hero />
			{peerCounsellingSection}
			{aboutHeroSection}
			{servicesSection}
			<FeaturedUniversities
				style={{
					background: 'linear-gradient(90deg,#D6C5F0 0%,#fff 100%)',
					borderRadius: 32,
					boxShadow: '0 8px 32px 0 #9F7AEA22',
					margin: '2.5rem auto 0 auto',
					padding: '2.5rem 1.5rem',
					maxWidth: 1400,
				}}
			/>
			{accommodationHeroSection}
			{financialServicesSection}
			<HowItWorks
				style={{
					background: 'linear-gradient(90deg,#D6C5F0 0%,#fff 100%)',
					borderRadius: 32,
					boxShadow: '0 8px 32px 0 #9F7AEA22',
					margin: '2.5rem auto 0 auto',
					padding: '2.5rem 1.5rem',
					maxWidth: 1400,
				}}
			/>
			<Testimonials
				style={{
					background: 'linear-gradient(90deg,#D6C5F0 0%,#fff 100%)',
					borderRadius: 32,
					boxShadow: '0 8px 32px 0 #9F7AEA22',
					margin: '2.5rem auto 0 auto',
					padding: '2.5rem 1.5rem',
					maxWidth: 1400,
				}}
			/>
			<PeerCounsellorModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				counsellor={selectedPeer || { id: 0, name: '', university: '', profile_image_url: '', location: '', program: '', charges: 0 }}
				onConnect={() => {
					if (selectedPeer) {
						navigate(`/peer/${selectedPeer.id}`);
						setIsModalOpen(false);
					}
				}}
			/>
			<style>{`
				html, body, #root {
					width: 100vw;
					overflow-x: hidden !important;
				}
				body {
					margin: 0;
					padding: 0;
				}
				section, header, footer, main, .container {
					max-width: 100vw !important;
				}
				[class*="blob"], [class*="hero__bg"], [class*="accom-hero-img-side"], [class*="accom-hero-img-center"] {
					max-width: 100vw !important;
					overflow-x: hidden !important;
				}
				/* Optional: Add text shadow for readability */
				section, .about-hero-section, .services-section, .accom-hero-section {
					text-shadow: 0 2px 8px #fff8, 0 1px 2px #0002;
				}
			`}</style>
		</>
	);
};
