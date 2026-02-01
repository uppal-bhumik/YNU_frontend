import React from 'react';
import { useReveal } from '../hooks/useReveal';

// Updated testimonials data
// Updated testimonials data with authentic student images from Unsplash
const testimonials = [
	{
		name: 'Aarav Sharma',
		result: 'Delhi → University of Melbourne, Australia',
		text: 'Before I found Your Next University, I was juggling a dozen university websites and still had no clue what actually fit me. Their AI match showed me programs that aligned with my interests, not just my marks. I got into the University of Melbourne, and honestly it feels like my dream finally got roadmap.',
		img: '/aarav.jpg',
	},
	{
		name: 'Sneha Gill',
		result: 'Chandigarh → University of Toronto, Canada',
		text: 'I thought studying abroad was only for people with big budgets or family abroad. But the team at Your Next University made it feel doable they found scholarships, guided my SOP, and even helped me prep for interviews. Today, I’m in Toronto, learning and growing every single day.',
		img: '/sneha.jpg',
	},
	{
		name: 'Riya Mathur',
		result: 'Jaipur → National University of Singapore (NUS), Singapore',
		text: 'I wasn’t sure my small town background would stand out in global applications. But the mentors at Your Next University saw my story differently, they helped me position it as my strength. I’m now studying Computer Science at NUS. I didn’t just apply, I applied confidently.',
		img: '/riya.jpg',
	},
	{
		name: 'Aditya Arora',
		result: 'Pune → Delft University of Technology, Netherlands',
		text: 'I had decent grades but zero clarity. Every consultant I spoke to kept pushing the same popular courses. Your Next University flipped the script. They focused on my goals, my background, and even my personality. Today, I’m in the Netherlands, studying Sustainable Engineering, and I know I chose right.',
		img: '/aditya.jpg',
	},
	{
		name: 'Mehul Thakur',
		result: 'Indore → Technical University of Munich (TUM), Germany',
		text: 'What stood out wasn’t just the admissions help, it was the honesty. They told me which universities were a reach and which were realistic. That transparency changed everything. I’m now in Germany, pursuing a Master’s in Data Science, and for the first time, my future feels clear.',
		img: '/mehul.jpg',
	},
];

interface TestimonialsProps {
	style?: React.CSSProperties;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ style }) => {
	const ref = useReveal();

	return (
		<section
			className="success-stories-section"
			id="testimonials"
			ref={ref as any}
			style={{
				padding: '5rem 0 6rem 0',
				background: 'var(--bg-alt)',
				...style,
			}}
		>
			<div className="success-stories-header" style={{
				textAlign: 'center',
				padding: '0 1.5rem',
				marginBottom: '4rem',
			}}>
				<div style={{
					display: 'inline-block',
					padding: '0.5rem 1.5rem',
					background: 'linear-gradient(90deg, #1A3A4A 0%, #2D6A7A 100%)',
					borderRadius: '50px',
					marginBottom: '1.5rem',
				}}>
					<span style={{
						color: 'white',
						fontWeight: 600,
						fontSize: '1rem',
					}}>
						★ Real Success Stories
					</span>
				</div>
				<h2 style={{
					margin: '0 0 1.2rem 0',
					fontWeight: 900,
					fontSize: '3rem',
					color: '#1E293B',
					letterSpacing: '-1px',
				}}>
					Success Stories That <span style={{ background: 'linear-gradient(90deg, #1A3A4A 0%, #2D6A7A 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Inspire</span>
				</h2>
				<p style={{
					margin: '0 auto',
					maxWidth: 750,
					fontSize: '1.3rem',
					color: '#64748B',
					fontWeight: 500,
					lineHeight: 1.7,
				}}>
					Join thousands of students who turned their study abroad dreams into reality with our personalized guidance.
				</p>
			</div>

			<div style={{
				overflow: 'hidden',
				width: '100vw',
				position: 'relative',
				left: '50%',
				transform: 'translateX(-50%)',
				padding: '2.5rem 0',
			}}>
				<div className="success-stories-container" style={{
					display: 'flex',
					width: 'max-content',
				}}>
					<div className="success-stories-track" style={{
						display: 'flex',
						gap: '2.5rem',
						animation: 'scroll-right-to-left 45s linear infinite',
					}}>
						{[...testimonials, ...testimonials].map((t, idx) => (
							<div
								key={`first-${idx}`}
								className="success-story-card"
								style={{
									flexShrink: 0,
									width: '420px',
									background: 'linear-gradient(135deg, #1A3A4A 0%, #2D6A7A 100%)',
									borderRadius: '24px',
									padding: '2.5rem',
									boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.3)',
									border: 'none',
									position: 'relative',
									overflow: 'hidden',
									transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
								}}>
								<div style={{
									position: 'absolute',
									top: '-50px',
									left: '-50px',
									width: '150px',
									height: '150px',
									background: 'linear-gradient(135deg, rgba(74,138,154,0.3) 0%, rgba(45,106,122,0.2) 100%)',
									borderRadius: '50%',
									zIndex: 0,
								}} />
								<div style={{
									position: 'absolute',
									bottom: '-40px',
									right: '-40px',
									width: '120px',
									height: '120px',
									background: 'linear-gradient(135deg, rgba(208,232,236,0.2) 0%, rgba(74,138,154,0.15) 100%)',
									borderRadius: '50%',
									zIndex: 0,
								}} />
								<div style={{
									position: 'relative',
									zIndex: 1,
								}}>
									<div style={{
										display: 'flex',
										alignItems: 'center',
										gap: '1.2rem',
										marginBottom: '1.8rem',
									}}>
										<img
											src={t.img}
											alt={t.name}
											style={{
												width: '4rem',
												height: '4rem',
												borderRadius: '50%',
												objectFit: 'cover',
												flexShrink: 0,
												boxShadow: '0 4px 12px rgba(45, 106, 122, 0.1)',
											}}
										/>
										<div>
											<h4 style={{
												margin: '0 0 0.3rem 0',
												fontWeight: 800,
												fontSize: '1.4rem',
												color: '#fff',
											}}>{t.name}</h4>
											<p style={{
												margin: '0',
												color: '#D0E8EC',
												fontWeight: 600,
												fontSize: '1rem',
											}}>{t.result}</p>
										</div>
									</div>
									<div style={{
										display: 'flex',
										alignItems: 'flex-start',
										gap: '0.8rem',
										marginBottom: '1.8rem',
									}}>
										<div style={{
											color: '#D0E8EC',
											fontWeight: 800,
											fontSize: '1.2rem',
										}}>
											"
										</div>
										<p style={{
											margin: '0',
											color: '#E8F4F6',
											fontWeight: 400,
											fontSize: '1.1rem',
											lineHeight: 1.6,
											flex: 1,
										}}>
											{t.text}<span style={{
												color: '#D0E8EC',
												fontWeight: 800,
												fontSize: '1.2rem',
												marginLeft: '0.3rem',
											}}>"</span>
										</p>
									</div>
									<div style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-between',
									}}>
										<div style={{
											display: 'flex',
											gap: '0.3rem',
										}}>
											{[1, 2, 3, 4, 5].map((star) => (
												<span key={star} style={{
													color: '#FBBF24',
													fontSize: '1.2rem',
												}}>
													★
												</span>
											))}
										</div>
										<div style={{
											color: '#D0E8EC',
											fontWeight: 600,
											fontSize: '0.9rem',
										}}>
											Verified Success
										</div>
									</div>
								</div>
							</div>
						))}
					</div>

					<div className="success-stories-track" aria-hidden="true" style={{
						display: 'flex',
						gap: '2.5rem',
						animation: 'scroll-right-to-left 45s linear infinite',
					}}>
						{testimonials.map((t, idx) => (
							<div
								key={`second-${idx}`}
								className="success-story-card"
								style={{
									flexShrink: 0,
									width: '420px',
									background: 'linear-gradient(135deg, #1A3A4A 0%, #2D6A7A 100%)',
									borderRadius: '24px',
									padding: '2.5rem',
									boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.3)',
									border: 'none',
									position: 'relative',
									overflow: 'hidden',
									transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
								}}>
								<div style={{
									position: 'absolute',
									top: '-50px',
									left: '-50px',
									width: '150px',
									height: '150px',
									background: 'linear-gradient(135deg, rgba(74,138,154,0.3) 0%, rgba(45,106,122,0.2) 100%)',
									borderRadius: '50%',
									zIndex: 0,
								}} />
								<div style={{
									position: 'absolute',
									bottom: '-40px',
									right: '-40px',
									width: '120px',
									height: '120px',
									background: 'linear-gradient(135deg, rgba(208,232,236,0.2) 0%, rgba(74,138,154,0.15) 100%)',
									borderRadius: '50%',
									zIndex: 0,
								}} />
								<div style={{
									position: 'relative',
									zIndex: 1,
								}}>
									<div style={{
										display: 'flex',
										alignItems: 'center',
										gap: '1.2rem',
										marginBottom: '1.8rem',
									}}>
										<img
											src={t.img}
											alt={t.name}
											style={{
												width: '4rem',
												height: '4rem',
												borderRadius: '50%',
												objectFit: 'cover',
												flexShrink: 0,
												boxShadow: '0 4px 12px rgba(45, 106, 122, 0.1)',
											}}
										/>
										<div>
											<h4 style={{
												margin: '0 0 0.3rem 0',
												fontWeight: 800,
												fontSize: '1.4rem',
												color: '#fff',
											}}>{t.name}</h4>
											<p style={{
												margin: '0',
												color: '#D0E8EC',
												fontWeight: 600,
												fontSize: '1rem',
											}}>{t.result}</p>
										</div>
									</div>
									<div style={{
										display: 'flex',
										alignItems: 'flex-start',
										gap: '0.8rem',
										marginBottom: '1.8rem',
									}}>
										<div style={{
											color: '#D0E8EC',
											fontWeight: 800,
											fontSize: '1.2rem',
										}}>
											"
										</div>
										<p style={{
											margin: '0',
											color: '#E8F4F6',
											fontWeight: 400,
											fontSize: '1.1rem',
											lineHeight: 1.6,
											flex: 1,
										}}>
											{t.text}<span style={{
												color: '#D0E8EC',
												fontWeight: 800,
												fontSize: '1.2rem',
												marginLeft: '0.3rem',
											}}>"</span>
										</p>
									</div>
									<div style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-between',
									}}>
										<div style={{
											display: 'flex',
											gap: '0.3rem',
										}}>
											{[1, 2, 3, 4, 5].map((star) => (
												<span key={star} style={{
													color: '#FBBF24',
													fontSize: '1.2rem',
												}}>
													★
												</span>
											))}
										</div>
										<div style={{
											color: '#D0E8EC',
											fontWeight: 600,
											fontSize: '0.9rem',
										}}>
											Verified Success
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			<style>{`
				@keyframes scroll-right-to-left {
					0% { transform: translateX(0); }
					100% { transform: translateX(-50%); }
				}

				.success-stories-track {
					width: max-content;
				}

				.success-story-card:hover {
					transform: translateY(-12px) scale(1.02);
					box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
					border-color: #D0E8EC;
				}

				.success-stories-container:hover .success-stories-track {
					animation-play-state: paused;
				}
			`}</style>
		</section>
	);
};

export default Testimonials;

