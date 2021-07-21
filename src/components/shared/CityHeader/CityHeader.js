import React from 'react';
import PropTypes from 'prop-types';

const CityHeader = props => (
	<div onClick={props.onClickHandler}>
		{/* {console.log(props)} */}
		<div>Arrow     </div>
		<label>{props.cityName}</label>
	</div>
);

CityHeader.propTypes = {
	props: PropTypes.object,
	cityName: PropTypes.string.isRequired,
	onClickHandler: PropTypes.func.isRequired,
};

export default CityHeader;
