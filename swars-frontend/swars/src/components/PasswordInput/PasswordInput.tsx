import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './PasswordInput.css';

interface PasswordInputProps {
	id: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	label: string;
	required: boolean;
	placeholder?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ id, value, onChange, label, required, placeholder = "" }) => {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const togglePasswordVisibility = () => {
		setIsPasswordVisible(!isPasswordVisible);
	};

	return (
		<div className="form-group">
			<input
				type={isPasswordVisible ? 'text' : 'password'}
				id={id}
				value={value}
				onChange={onChange}
				required={required}
				placeholder={placeholder || ' '}
			/>
			<label htmlFor={id}>{label}</label>
			<span className="password-toggle" onClick={togglePasswordVisibility}>
				<FontAwesomeIcon icon={isPasswordVisible ? faEye :faEyeSlash } />
			</span>
		</div>
	);
};

export default PasswordInput;
