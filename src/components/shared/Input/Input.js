import React from 'react';
import PropTypes from 'prop-types';

const Input = props => (
	<React.Fragment>
		<input
			type={props.type}
			value={props.value}
			placeholder={props.placeholder}
			id={props.id}
			className={props.className}
			onKeyDown={props.onKeyDownFn}
			onChange={props.onChangeFn}
			onBlur={props.onBlurFn}
		/>
	</React.Fragment>
);

Input.propTypes = {
	value: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	id: PropTypes.number.isRequired,
	className: PropTypes.string.isRequired,
	onKeyDownFn: PropTypes.func.isRequired,
	onChangeFn: PropTypes.func.isRequired,
	onBlurFn: PropTypes.func.isRequired,
};

export default Input;
