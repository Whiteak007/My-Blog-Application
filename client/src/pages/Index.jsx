import BlogCard from '@/components/BlogCard';
import Loading from '@/components/Loading';
import { getEvn } from '@/helpers/getEnv';
import { useFetch } from '@/hooks/useFetch';
import React from 'react';
import { motion } from 'framer-motion'; // Import Framer Motion

const containerAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const cardAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const Index = () => {
    const { data: blogData, loading, error } = useFetch(
        `${getEvn('VITE_API_BASE_URL')}/blog/blogs`,
        {
            method: 'get',
            credentials: 'include',
        }
    );

    if (loading) return <Loading />;

    return (
        <motion.div
            variants={containerAnimation}
            initial="initial"
            animate="animate"
            className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10"
        >
            {blogData && blogData.blog.length > 0 ? (
                blogData.blog.map(blog => (
                    <motion.div key={blog._id} variants={cardAnimation}>
                        <BlogCard props={blog} />
                    </motion.div>
                ))
            ) : (
                <div className="text-gray-500 py-5 text-center">No blogs found.</div>
            )}
        </motion.div>
    );
};

export default Index;