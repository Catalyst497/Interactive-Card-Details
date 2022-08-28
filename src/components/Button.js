import React from 'react';

const Button = ({ value, navFunc, clrDetails }) => {
	return (
		<button
			onClick={() => {
				navFunc();
				clrDetails && clrDetails();
			}}
			className="submit"
			type="submit"
		>
			{value}
		</button>
	);
};

export default Button;
