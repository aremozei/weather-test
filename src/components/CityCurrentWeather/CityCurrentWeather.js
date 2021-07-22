import React from 'react';
import PropTypes from 'prop-types';
import './CityCurrentWeather.css';
import AirIcon from '../../icons/airblack.svg';
import PressureIcon from '../../icons/pressureblack.svg';
import SunIcon from '../../icons/sunblack.svg';
import ThermosIcon from '../../icons/thermostatblack.svg';

const CityCurrentWeather = ({cityWeatherData: {current}}) => (
	<div className="city-weather-main-data">
		<div className="city-weather-index">
			<img src={current.condition.icon} alt={current.condition.text}/>
			<label className="condition-label">{current.condition.text}</label>
			<label className="last-updated">{current.last_updated}</label>
			<label className="temperature-label">{current.temp_c + '°'}</label>
		</div>
		<div className="city-weather-misc">
			<div>
				<div className="city-weather-wind">
					<img src={AirIcon} alt="Air"/>
					<label className="left-title-label">Wind</label>
					{current.wind_kph + ' kmph'}
				</div>
				<div className="city-weather-uv">
					<img src={SunIcon} alt="Sun"/>
					<label className="left-title-label">Index UV</label>
					{current.uv}
				</div>
			</div>
			<div>
				<div className="city-weather-feels">
					<img src={ThermosIcon} alt="Thermo"/>
					<label className="right-title-label">Feels Like</label>
					{current.feelslike_c + '°'}
				</div>
				<div className="city-weather-pressure">
					<img src={PressureIcon} alt="Pressure"/>
					<label className="right-title-label">Pressure</label>
					{current.pressure_mb + ' mbor'}
				</div>
			</div>
		</div>
	</div>
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
