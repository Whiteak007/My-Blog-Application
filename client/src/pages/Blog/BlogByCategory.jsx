import BlogCard from '@/components/BlogCard';
import Loading from '@/components/Loading';
import { getEvn } from '@/helpers/getEnv';
import { useFetch } from '@/hooks/useFetch';
import React from 'react';
import { useParams } from 'react-router-dom';
import { BiCategory } from 'react-icons/bi';
import { motion, AnimatePresence } from 'framer-motion';

const BlogByCategory = () => {
    const { category } = useParams();
    const { data: blogData, loading, error } = useFetch(
        `${getEvn('VITE_API_BASE_URL')}/blog/get-blog-by-category/${category}`,
        {
            method: 'get',
            credentials: 'include',
        },
        [category]
    );

    // Animation variants for cleaner code
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                when: "beforeChildren"
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: "easeOut" }
        }
    };

    const headerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, type: "spring", stiffness: 100 }
        }
    };

    if (loading) return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <Loading size="lg" />
        </div>
    );

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            className="bg-gradient-to-b from-gray-50 to-white py-12 min-h-screen"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                {/* Category Header */}
                <motion.div
                    variants={headerVariants}
                    className="flex items-center gap-3 mb-12"
                >
                    <motion.div 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 bg-indigo-100 rounded-lg shadow-sm"
                    >
                        <BiCategory className="text-3xl text-indigo-600" />
                    </motion.div>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                            {blogData && blogData.categoryData?.name}
                        </h1>
                        <p className="text-gray-500 mt-2">
                            {blogData?.blog.length || 0} articles available
                        </p>
                    </div>
                </motion.div>

                {/* Blog Grid */}
                <AnimatePresence>
                    {blogData && blogData.blog.length > 0 ? (
                        <motion.div
                            variants={containerVariants}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                        >
                            {blogData.blog.map((blog, index) => (
                                <motion.div
                                    key={blog._id}
                                    variants={itemVariants}
                                    whileHover={{ 
                                        y: -5,
                                        transition: { duration: 0.2 }
                                    }}
                                    className="shadow-sm hover:shadow-md transition-shadow duration-300 rounded-xl overflow-hidden"
                                >
                                    <BlogCard props={blog} />
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="text-center py-16"
                        >
                            <div className="max-w-md mx-auto">
                                <div className="text-6xl mb-4 text-gray-300">📭</div>
                                <h3 className="text-xl font-medium text-gray-700 mb-2">
                                    No blogs found in this category
                                </h3>
                                <p className="text-gray-500">
                                    Check back later or explore other categories
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default BlogByCategory;