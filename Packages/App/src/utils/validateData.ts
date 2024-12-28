export type Type = 'age' | 'BloodPressure';

const regexRules = {
	age: /^(3[0-9]|[4-9][0-9]|[5-8][0-9]|9[0-9])$/, // check if age is between 30 and 99
	BloodPressure: /^(7[0-9]|[89][0-9]|1[0-9]{2}|2[0-2][0-9]|230)$/, // check if BloodPressure is between 70 and 230
};

const isValid = (data: string | number, type: Type) => {
	return regexRules[type].test(data.toString());
};

export default { isValid };
