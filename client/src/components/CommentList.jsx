import { getEvn } from '@/helpers/getEnv';
import { useFetch } from '@/hooks/useFetch';
import React from 'react';
import { Avatar } from './ui/avatar';
import { AvatarImage } from '@radix-ui/react-avatar';
import usericon from '@/assets/images/user.png';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

const containerAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3, delayChildren: 0.2, staggerChildren: 0.1 } },
};

const titleAnimation = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const commentAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

const CommentList = ({ props }) => {
    const user = useSelector(state => state.user);
    const { data, loading, error } = useFetch(
        `${getEvn('VITE_API_BASE_URL')}/comment/get/${props.blogid}`,
        {
            method: 'get',
            credentials: 'include',
        }
    );

    if (loading) return <div>Loading...</div>;

    return (
        <motion.div variants={containerAnimation} initial="initial" animate="animate">
            <motion.h4 className='text-2xl font-bold' variants={titleAnimation}>
                {props.newComment ? (
                    <span className='me-2'> {data && data.comments.length + 1}</span>
                ) : (
                    <span className='me-2'>{data && data.comments.length}</span>
                )}
                Comments
            </motion.h4>
            <div className='mt-5'>
                <AnimatePresence>
                    {props.newComment && (
                        <motion.div className='flex gap-2 mb-3' variants={commentAnimation} key="new-comment">
                            <Avatar>
                                <AvatarImage src={user?.user?.avatar || usericon} />
                            </Avatar>
                            <div>
                                <p className='font-bold'>{user?.user.name}</p>
                                <p>{moment(props.newComment?.createdAt).format('DD-MM-YYYY')}</p>
                                <div className='pt-3'>
                                    {props.newComment?.comment}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {data && data.comments.length > 0 &&
                        data.comments.map(comment => (
                            <motion.div key={comment._id} className='flex gap-2 mb-3' variants={commentAnimation}>
                                <Avatar>
                                    <AvatarImage src={comment?.user.avatar || usericon} />
                                </Avatar>
                                <div>
                                    <p className='font-bold'>{comment?.user.name}</p>
                                    <p>{moment(comment?.createdAt).format('DD-MM-YYYY')}</p>
                                    <div className='pt-3'>
                                        {comment?.comment}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default CommentList;