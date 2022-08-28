import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Form from './components/Form';
import Card from './components/Card';
import Button from './components/Button';
import bgMainDesktop from './images/bg-main-desktop.png';
import bgMainMobile from './images/bg-main-mobile.png';
import bgCardFront from './images/bg-card-front.png';
import bgCardBack from './images/bg-card-back.png';
import iconComplete from './images/icon-complete.svg';

function App() {
	const px = (ems) => ems * 16;
	const navigate = useNavigate();
	const initCardState = {
		name: null,
		number: null,
		month: null,
		year: null,
		cvc: null,
	};

	// STATES
	const [isMobile, setIsMobile] = useState(window.innerWidth < px(64));
	const [cardDetails, setCardDetails] = useState(initCardState);

	// Update page with screen size
	const updateMedia = () => {
		setIsMobile(window.innerWidth < px(64));
	};
	useEffect(() => {
		window.addEventListener('resize', updateMedia);
		return () => window.removeEventListener('resize', updateMedia);
	}, []);

	// Update Card Details
	const updateCardDetails = (details) => setCardDetails({...cardDetails, ...details});

	// Clear Card details
	const clrDetails = () => {
		setCardDetails(initCardState);
	}

	const navFunc = (path) => navigate(path);
	return (
			<>
				<aside className="gradient">
					<img
						src={isMobile ? bgMainMobile : bgMainDesktop}
						alt="bg-main-desktop"
					/>
				</aside>
				<main>
					<Routes>
						<Route
							path="/"
							element={
								<Form
									updateCard={updateCardDetails}
									cardDetails={cardDetails}
									navFunc={navFunc}
								/>
							}
						/>
						<Route path='/complete' element={
							<form className='thank-you'>
								<div className="icon"><img src={iconComplete} alt="" /></div>
								<h1>THANK YOU</h1>
								<p>We've added your card details</p>
								<Button clrDetails={clrDetails} navFunc={() => navFunc('/')} value='Continue' />
							</form>
						}/>
					</Routes>
					<Card cardDetails={cardDetails} />
					<div className="card-back">
						<img src={bgCardBack} alt="bg-card-back" />
					</div>
				</main>
			</>
	);
}

export default App;
