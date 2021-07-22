import React from 'react';
import PropTypes from 'prop-types';
import CityHeaderClasses from './CityHeader.module.css';

// Import LeftArrow from '../../../icons/left-arrow-black.png';

const CityHeader = props => (
	<div onClick={props.onClickHandler} className={CityHeaderClasses['city-header']}>
		{/* {console.log(props)} */}
		{/* <div>Arrow     </div> */}
		<label className={CityHeaderClasses['city-name']}>{props.cityName + ',' }</label>
		<label className={CityHeaderClasses['city-country']}>{props.cityCountry}</label>
	</div>
);

CityHeader.propTypes = {
	props: PropTypes.object,
	cityName: PropTypes.string.isRequired,
	cityCountry: PropTypes.string.isRequired,
	onClickHandler: PropTypes.func.isRequired,
};

export default CityHeader;
