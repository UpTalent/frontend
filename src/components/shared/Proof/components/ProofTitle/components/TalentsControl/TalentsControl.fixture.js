import React from 'react';
import { TalentsControl } from './TalentsControl';

export default {
	HIDDEN: <TalentsControl status='HIDDEN' proofId={0} />,
	DRAFT: <TalentsControl status='DRAFT' proofId={0} />,
	PUBLISHED: <TalentsControl status='PUBLISHED' proofId={0} />,
};
