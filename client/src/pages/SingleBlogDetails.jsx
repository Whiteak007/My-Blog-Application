import Comment from '@/components/Comment';
import CommentCount from '@/components/CommentCount';
import LikeCount from '@/components/LikeCount';
import Loading from '@/components/Loading';
import RelatedBlog from '@/components/RelatedBlog';
import { Avatar } from '@/components/ui/avatar';
import { getEvn } from '@/helpers/getEnv';
import { useFetch } from '@/hooks/useFetch';
import { AvatarImage } from '@radix-ui/react-avatar';
import { decode } from 'entities';
import moment from 'moment';
import React from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const containerAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
};

const blogDetailsAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const relatedBlogAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.2 } },
};

const SingleBlogDetails = () => {
    const { blog, category } = useParams();

    const { data, loading, error } = useFetch(
        `${getEvn('VITE_API_BASE_URL')}/blog/get-blog/${blog}`,
        {
            method: 'get',
            credentials: 'include',
        },
        [blog, category]
    );

    if (loading) return <Loading />;

    return (
        <motion.div
            className='md:flex-nowrap flex-wrap flex justify-between gap-20'
            variants={containerAnimation}
            initial="initial"
            animate="animate"
        >
            {data && data.blog && (
                <>
                    <motion.div className='border rounded md:w-[70%] w-full p-5' variants={blogDetailsAnimation}>
                        <motion.h1 className='text-2xl font-bold mb-5' initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}>
                            {data.blog.title}
                        </motion.h1>
                        <motion.div className='flex justify-between items-center' initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.1 } }}>
                            <div className='flex justify-between items-center gap-5'>
                                <Avatar>
                                    <AvatarImage src={data.blog.author.avatar} />
                                </Avatar>
                                <div>
                                    <p className='font-bold'>{data.blog.author.name}</p>
                                    <p>Date: {moment(data.blog.createdAt).format('DD-MM-YYYY')}</p>
                                </div>
                            </div>
                            <div className='flex justify-between items-center gap-5'>
                                <LikeCount props={{ blogid: data.blog._id }} />
                                <CommentCount props={{ blogid: data.blog._id }} />
                            </div>
                        </motion.div>
                        <motion.div className='my-5' initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }}>
                            <img src={data.blog.featuredImage} className='rounded' alt={data.blog.title} />
                        </motion.div>
                        <motion.div
                            dangerouslySetInnerHTML={{ __html: decode(data.blog.blogContent) || '' }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, transition: { delay: 0.3 } }}
                        />

                        <motion.div className='border-t mt-5 pt-5' initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.4 } }}>
                            <Comment props={{ blogid: data.blog._id }} />
                        </motion.div>
                    </motion.div>
                </>
            )}
            <motion.div className='border rounded md:w-[30%] w-full p-5' variants={relatedBlogAnimation}>
                <RelatedBlog props={{ category: category, currentBlog: blog }} />
            </motion.div>
        </motion.div>
    );
};

export default SingleBlogDetails;