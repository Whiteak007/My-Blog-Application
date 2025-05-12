import { getEvn } from '@/helpers/getEnv'
import { RouteBlogDetails } from '@/helpers/RouteName'
import { useFetch } from '@/hooks/useFetch'
import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const RelatedBlog = ({ props }) => {
    const { data, loading, error } = useFetch(`${getEvn('VITE_API_BASE_URL')}/blog/get-related-blog/${props.category}/${props.currentBlog}`, {
        method: 'get',
        credentials: 'include',
    })

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <section className="related-blog-container p-4 max-w-7xl mx-auto">
            <h2 className="section-title mb-6 text-2xl font-bold">Related Blogs</h2>
            {data?.relatedBlog?.length > 0 ? (
                <div className="flex flex-col space-y-4">
                    {data.relatedBlog.map((blog) => (
                        <motion.div
                            key={blog._id}
                            whileHover={{ scale: 1.02, boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            className="blog-item flex items-center gap-4 p-3 rounded-md bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" onClick={() => window.scrollTo(0, 0)}
                        >
                            <Link
                                to={RouteBlogDetails(props.category, blog.slug)}
                                className="flex items-center gap-4 w-full"
                                aria-label={`Read more about ${blog.title}`}
                            >
                                <img
                                    className="w-24 h-16 object-cover rounded-md flex-shrink-0"
                                    src={blog.featuredImage}
                                    alt={`Thumbnail for ${blog.title}`}
                                />
                                <h4 className="text-lg font-semibold text-gray-800 line-clamp-2">{blog.title}</h4>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 text-center">No Related Blogs available.</p>
            )}
        </section>
    );
};

export default RelatedBlog;  