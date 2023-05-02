import React from 'react';
import styles from '../../Proof.module.css';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

export const ProofBody = ({ content }) => {
	return (
		<div className={styles.content}>
			<ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
				{content}
			</ReactMarkdown>
		</div>
	);
};
