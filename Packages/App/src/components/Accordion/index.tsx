import React, { useState } from 'react';
import { View } from 'react-native';
import AccordionHeader from './Header';
import AccordionBody from './Body';
import RecipeI from '@/src/assets/svg/icons/RecipeIcon.svg';
import InstructionsI from '@/src/assets/svg/icons/InstructionIcon.svg';
import ArrowI from '@/src/assets/svg/icons/HighlightLinkIcon.svg';
import IngredientsIlustration from '@/src/assets/svg/ilustrations/ingredientsRecipe.svg';
import InstructionsIlustration from '@/src/assets/svg/ilustrations/InstructionsRecipe.svg';

type Props = {
	type: 'Ingredients' | 'Instructions';
	data: any;
};

const Accordion: React.FC<Props> = ({ type, data }): React.JSX.Element => {
	const [isToogle, setIsToogle] = useState<boolean>(false);

	return (
		<View
			className="flex justify-center items-center mt-6 

			"
		>
			<AccordionHeader
				onPress={() => setIsToogle(!isToogle)}
				isToogle={isToogle}
				toogleIcon={ArrowI}
				icon={type === 'Ingredients' ? RecipeI : InstructionsI}
				title={type === 'Ingredients' ? 'Ingredients' : 'Instructions'}
			/>
			<AccordionBody
				type={type === 'Ingredients' ? 'Ingredient' : 'Instruction'}
				isToogle={isToogle}
				data={type === 'Ingredients' ? data?.ingredients : data?.instructions}
				ilustration={type === 'Ingredients' ? IngredientsIlustration : InstructionsIlustration}
			/>
		</View>
	);
};

export default Accordion;
