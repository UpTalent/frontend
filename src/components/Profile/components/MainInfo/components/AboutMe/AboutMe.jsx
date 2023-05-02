import React from 'react';
import styles from './AboutMe.module.css';
import { useOutletContext } from 'react-router-dom';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

export const AboutMe = () => {
	const { aboutMe } = useOutletContext();
	return (
		<div className={styles.about}>
			{aboutMe ? (
				<ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
					{aboutMe}
				</ReactMarkdown>
			) : (
				<b className={styles.noData}>No data provided</b>
			)}
		</div>
	);
};
