export type Type = 'age' | 'BloodPressure' | 'HDL' | 'TotalCholesterol';

const regexRules = {
	age: /^(3[0-9]|[4-9][0-9]|[5-8][0-9]|9[0-9])$/, // check if age is between 30 and 99
	BloodPressure: /^(7[0-9]|[89][0-9]|1[0-9]{2}|2[0-2][0-9]|230)$/, // check if BloodPressure is between 70 and 230
	HDL: /^([2-9][0-9]|100)$/, // check if HDL is between 20 and 100
	TotalCholesterol: /^(1[0-9]{2}|2[0-9]{2}|300)$/, // check if Total Cholesterol is between 100 and 300
};

const isValid = (data: string | number, type: Type) => {
	return regexRules[type].test(data.toString());
};

export default { isValid };