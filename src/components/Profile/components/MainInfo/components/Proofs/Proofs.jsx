import React from 'react';
import { Proof } from '../../../../../shared/Proof';

export const Proofs = () => {
  const testProof={
    title: 'A boring blog about doing nothing',
    summary: 'How’s your creativity these days? Feel like your brain is zinging with new ideas and inspiration? Thought not.',
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nec lacus ipsum. Aenean ullamcorper leo non diam sagittis fringilla. Mauris sed mi convallis, malesuada metus ac, imperdiet mauris. Phasellus id suscipit lorem. Sed efficitur, mauris vel vehicula volutpat, felis arcu maximus ipsum, vitae sagittis enim nulla sed mi. Vivamus egestas semper magna, ut semper erat ullamcorper non. Ut quis est a odio dictum malesuada.
    Morbi non enim in nibh dictum mattis eget vitae libero. Vestibulum in dictum massa. Donec commodo ullamcorper dignissim. Pellentesque sit amet odio eget diam molestie accumsan ac at erat. 
    
    Phasellus imperdiet odio quis odio feugiat commodo. Sed a dui viverra, cursus eros in, consectetur nibh. Phasellus sodales vel odio a scelerisque. Phasellus nec hendrerit elit, id accumsan nisl. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam nec gravida metus. Etiam sit amet urna sed orci finibus tempus at eget neque. Duis lectus orci, lobortis eget sodales eu, pellentesque ut enim. Nunc quis eros id elit commodo tincidunt. 
    
    Vestibulum rhoncus volutpat urna dictum dignissim. Etiam ut justo tincidunt, pellentesque mauris in, elementum metus.
    Mauris et nulla mattis, tincidunt tellus eget, placerat turpis. Nulla feugiat elit non mauris rutrum, quis mollis felis eleifend. Donec ultrices sodales mi eu tristique....`,
    published: 'May 3 2020'
  }
	return (
		<div>
			<Proof proof={testProof}/>
		</div>
	);
};
