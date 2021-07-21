import React, {useState, useEffect, useReducer} from 'react';
import CityCurrentWeather from '../CityCurrentWeather/CityCurrentWeather';
import CityHeader from '../shared/CityHeader/CityHeader';
import WeatherApi from '../../api/WeatherApi';
import Input from '../shared/Input/Input';

const searchInputReducer = (lastSearchState, action) => {
	if (action.type === 'USER_INPUT') {
		return {
			value: action.value,
			isValid: action.value.trim().length > 4,
			type: action.type,
		};
	}

	if (action.type === 'INPUT_BLUR') {
		return {
			value: lastSearchState.value,
			isValid: lastSearchState.value.trim().length > 4,
			type: lastSearchState.type,
		};
	}

	if (action.type === 'CLEAR') {
		return {
			value: '',
			isValid: false,
		};
	}

	return {value: '', isValid: false};
};

// I Know that I could use useState to handle the input
// In a simpler way, but I wanted to show off using Reducer
// Im going to add the useState solution in a separate file, just for the sake of it

// Use Reducer has more control, allows complex state,and covers more corner case scenarios
// In less steps. Ex, I would hadve to add a useEffect for the blur, changes on the input, and updated values
// Still, reducer is more useful in scenarios where I handle multiple components
// That share similar states, not a single simple input

// Still, it took me more time than if I used useState and handle it with that
// Anyways

const MainView = () => {
	const [searchInputValueIsValid, setSearchFormIsValid] = useState(false);
	const [weatherSingleCityResults, setWeatherSingleCityResults] = useState(null);
	const [alternateSearchAndMainView, setAlternateView] = useState(false);

	const [searchInputState, dispatchSearch] = useReducer(
		searchInputReducer,
		{value: '', isValid: null},
	);

	const {isValid: searchIsValid} = searchInputState;

	useEffect(() => {
		const avoidConstantCallsWithTimeout = setTimeout(() => {
			setSearchFormIsValid(
				searchIsValid,
			);
		}, 500);
		return () => {
			// Basically, this return statement inside useEffect is a cleanup function to clear the timer,
			// Will do anything inside the brackets after the first run of the useEffect;
			// I set it up to avoid constant calls to update the is valid state of the search
			clearTimeout(avoidConstantCallsWithTimeout);
		};
	}, [searchIsValid]);

	useEffect(() => {
		if (alternateSearchAndMainView === false) {
			setWeatherSingleCityResults(null);
			dispatchSearch({type: 'CLEAR'});
		}
	}, [alternateSearchAndMainView]);

	// Basically I'm handling the search using onchange and enter key;
	// Blur will only trigger an update of the value, and pass again on the validation
	// It will only trigger if the search is valid (is not a strong validation tho), after running the dispatchSearch and updating
	// The search input state.

	const searchInputHandler = ({target}) => {
		dispatchSearch({value: target.value, type: 'USER_INPUT'});
		if (searchInputState.isValid) {
			submitSearch();
		}

		setWeatherSingleCityResults(null);
	};

	const validateSearchInput = () => {
		dispatchSearch({type: 'INPUT_BLUR'});
	};

	const handleKeyDown = ({key}) => {
		if (key === 'Enter' && searchInputValueIsValid) {
			submitSearch();
		}

		setWeatherSingleCityResults(null);
	};

	const onHeaderClickHandler = () => {
		setAlternateView(!alternateSearchAndMainView);
	};

	// Kinda security breach to leave api keys in the air like this, but meh
	const submitSearch = async () => {
		const currentCityWeather = await WeatherApi.get('', {
			params: {
				key: '9517264abb80411eb5e132446212007',
				q: searchInputState.value,
				aqui: 'no',
			},
		});
		setWeatherSingleCityResults(currentCityWeather.data);
	};

	return (
		<React.Fragment>
			{weatherSingleCityResults === null
				&& <Input
					type={'text'}
					value={searchInputState.value}
					placeholder={'Search City..'}
					id={Math.random()}
					className={'something'}
					onChangeFn={searchInputHandler}
					onBlurFn={validateSearchInput}
					onKeyDownFn={handleKeyDown}
				/>
			}
			{weatherSingleCityResults !== null
				&& <>
					<CityHeader cityName={weatherSingleCityResults.location.name} onClickHandler={onHeaderClickHandler}/>
					<CityCurrentWeather cityWeatherData={weatherSingleCityResults} />
				</>
			}
		</React.Fragment>
	);
};

export default MainView;
