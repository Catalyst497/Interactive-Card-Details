const Card = ({ cardDetails }) => {
	return (
		<div className="card-front">
			<div className="logos">
				<div className="logo1"></div>
				<div className="logo2"></div>
			</div>
			<div className="number">
				{cardDetails.number ? cardDetails.number : '0000 0000 0000 0000'}
			</div>
			<div className="footer-details">
				<div className="name">
					{cardDetails.name ? cardDetails.name : 'Jane Appleseed'}
				</div>
				<div className="exp-d">
					{cardDetails.month ? cardDetails.month : '00'}/
					{cardDetails.year ? cardDetails.year : '00'}
				</div>
			</div>
		</div>
	);
};

export default Card;
