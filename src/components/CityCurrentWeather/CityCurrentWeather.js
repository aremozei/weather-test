import React from 'react';
import PropTypes from 'prop-types';

const CityCurrentWeather = ({cityWeatherData: {current, location}}) => (
	<React.Fragment>
		<div>
			<img src={current.condition.icon} alt={current.condition.text}/>
			<label>{current.condition.text}</label>
			<label>{location.localtime_epoch}</label>
			<label>{current.temp_c}</label>
		</div>
		<div>
			<div>
				<div>
					{current.wind_kph}
				</div>
				<div>
					{current.feelslike_c}
				</div>
			</div>
			<div>
				<div>
					{current.uv}
				</div>
				<div>
					{current.pressure_mb}
				</div>
			</div>
		</div>
	</React.Fragment>
);

CityCurrentWeather.propTypes = {
	current: PropTypes.object,
	location: PropTypes.object,
	cityWeatherData: PropTypes.object.isRequired,
};

// I can set the proptypes like that or set each one of them, like in Input;
// It is a validation to see if the props I need are coming with the component, like in TS
// I liked that so I am using the js react option here

export default CityCurrentWeather;
