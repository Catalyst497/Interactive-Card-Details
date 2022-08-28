import React, { useState, useEffect } from 'react';
import Button from './Button';

const Form = ({ updateCard, cardDetails, navFunc }) => {
	// STATES
	const [nameErr, setNameErr] = useState(null);
	const [numErr, setNumErr] = useState(null);
	const [mthErr, setMthErr] = useState(null);
	const [yrErr, setYrErr] = useState(null);
	const [cvcErr, setCvcErr] = useState(null);


	const onInputChange = (arg, e) => {
		if (arg.number) {
			if (
				(e.target.value.length === 4 ||
					e.target.value.length === 9 ||
					e.target.value.length === 14) &&
				e.which !== 8
			) {
				e.target.value += ' ';
			}
			updateCard({ number: e.target.value });
		} else {
			updateCard(arg);
		}
	};

	const onSubmit = (details) => {
		if (!details.number) {
			setNumErr("Can't be blank");
		} else if (/[a-zA-Z]/g.test(details.number)) {
			setNumErr('Wrong format. Numbers only.');
		} else {
			setNumErr('');
		}

		Object.values(details).every((val) => val) && navFunc('/complete');

		setNameErr(!details.name ? "Can't be blank." : '');
		setMthErr(!details.month ? "Can't be blank." : '');
		setYrErr(!details.year ? "Can't be blank." : '');
		setCvcErr(!details.cvc ? "Can't be blank." : '');
		console.log(Object.values(details).every((val) => val));
	};
	return (
			<form onSubmit={(e) => e.preventDefault()}>
				<div>
					<label htmlFor="name">CARDHOLDER NAME</label>
					<input
						type="text"
						name="name"
						id="name"
						placeholder="e.g. Jane Appleseed"
						onChange={(e) => onInputChange({ name: e.target.value })}
					/>
					{nameErr && <p style={{ color: 'red', margin: 'none' }}>{nameErr}</p>}{' '}
				</div>

				<div>
					<label htmlFor="number">CARD NUMBER</label>
					<input
						type="text"
						name="number"
						id="number"
						placeholder="e.g. 1234 5678 9123 0000"
						onKeyDown={(e) => {
							(e.target.value.length === 19 || e.which === 32) &&
								e.which !== 8 &&
								e.preventDefault();
						}}
						onKeyUp={(e) => onInputChange({ number: e.target.value }, e)}
					/>
					{numErr && <p style={{ color: 'red', margin: 'none' }}>{numErr}</p>}
				</div>

				<div className="date">
					<div>
						<label>Exp. Date (MM/YY)</label>
						<div>
							<div>
								<input
									type="number"
									id="month"
									placeholder="MM"
									onKeyDown={(e) =>
										e.target.value.length === 2 &&
										e.which !== 8 &&
										e.preventDefault()
									}
									onChange={(e) => onInputChange({ month: e.target.value })}
								/>
								{mthErr && (
									<p style={{ color: 'red', margin: 'none' }}>{mthErr}</p>
								)}
							</div>
							<div>
								<input
									type="number"
									id="year"
									placeholder="YY"
									onKeyDown={(e) =>
										e.target.value.length === 2 &&
										e.which !== 8 &&
										e.preventDefault()
									}
									onChange={(e) => onInputChange({ year: e.target.value })}
								/>
								{yrErr && (
									<p style={{ color: 'red', margin: 'none' }}>{yrErr}</p>
								)}
							</div>
						</div>
					</div>
					<div className="cvc">
						<label htmlFor="CVC">CVC</label>
						<input
							type="number"
							id="CVC"
							placeholder="e.g. 123"
							onInput={(e) => onInputChange({ cvc: e.target.value })}
							onKeyDown={(e) =>
								e.target.value.length === 3 &&
								e.which !== 8 &&
								e.preventDefault()
							}
						/>
						{cvcErr && <p style={{ color: 'red', margin: 'none' }}>{cvcErr}</p>}
					</div>
				</div>
				<div>
					<Button navFunc={() => onSubmit(cardDetails)} value="Confirm" />
				</div>
			</form>
	);
};

export default Form;
