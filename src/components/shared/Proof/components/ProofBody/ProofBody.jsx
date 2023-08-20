import React from 'react';
import styles from '../../Proof.module.css';
import remarkGfm from 'remark-gfm';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

export const ProofBody = ({ content }) => {
	return (
		<div className={`${styles.content} markdownDiv`}>
			<ReactMarkdown remarkPlugins={[remarkGfm]}>
				{content}
			</ReactMarkdown>
		</div>
	);
};
