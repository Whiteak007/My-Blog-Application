import BlogCard from '@/components/BlogCard';
import { getEvn } from '@/helpers/getEnv';
import { useFetch } from '@/hooks/useFetch';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const containerAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const titleAnimation = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const cardAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const SearchResult = () => {
    const [searchParams] = useSearchParams();
    const q = searchParams.get('q');
    const { data: blogData, loading, error } = useFetch(
        `${getEvn('VITE_API_BASE_URL')}/blog/search?q=${q}`,
        {
            method: 'get',
            credentials: 'include',
        }
    );

    return (
        <motion.div
            variants={containerAnimation}
            initial="initial"
            animate="animate"
        >
            <motion.div
                variants={titleAnimation}
                className="flex items-center gap-3 text-2xl font-bold text-violet-500 border-b pb-3 mb-5"
            >
                <h4>Search Result For: {q} </h4>
            </motion.div>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
                {blogData && blogData.blog.length > 0 ? (
                    blogData.blog.map(blog => (
                        <motion.div key={blog._id} variants={cardAnimation}>
                            <BlogCard props={blog} />
                        </motion.div>
                    ))
                ) : (
                    <motion.div
                        variants={cardAnimation}
                        className="text-gray-500 py-5 text-center col-span-full"
                    >
                        No blogs found for your search query.
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default SearchResult;