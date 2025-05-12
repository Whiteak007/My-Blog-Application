import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaComments, FaPaperPlane } from "react-icons/fa";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { showToast } from '@/helpers/showToast';
import { getEvn } from '@/helpers/getEnv';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { useSelector } from 'react-redux';
import { RouteSignIn } from '@/helpers/RouteName';
import CommentList from './CommentList';
import { Link } from 'react-router-dom';

const Comment = ({ props }) => {
    const [newComment, setNewComment] = useState();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const user = useSelector((state) => state.user);

    const formSchema = z.object({
        comment: z.string()
            .min(3, 'Comment must be at least 3 characters long.')
            .max(500, 'Comment cannot exceed 500 characters.'),
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            comment: '',
        },
    });

    async function onSubmit(values) {
        setIsSubmitting(true);
        try {
            const newValues = { ...values, blogid: props.blogid, user: user.user._id };
            const response = await fetch(`${getEvn('VITE_API_BASE_URL')}/comment/add`, {
                method: 'post',
                credentials: 'include',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(newValues)
            });
            const data = await response.json();
            
            if (!response.ok) {
                showToast('error', data.message);
                return;
            }
            
            setNewComment(data.comment);
            form.reset();
            showToast('success', data.message);
        } catch (error) {
            showToast('error', error.message || 'Failed to post comment');
        } finally {
            setIsSubmitting(false);
        }
    }

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
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const buttonVariants = {
        hover: {
            scale: 1.03,
            transition: {
                duration: 0.2,
                ease: "easeOut"
            }
        },
        tap: {
            scale: 0.98
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-6"
        >
            <motion.h4 
                variants={itemVariants}
                className="flex items-center gap-3 text-2xl font-bold text-gray-800 dark:text-gray-100"
            >
                <FaComments className="text-violet-500 text-2xl" /> 
                Comments
                <span className="text-sm font-normal text-gray-500 ml-2">
                    ({props.commentCount || 0})
                </span>
            </motion.h4>

            <AnimatePresence mode="wait">
                {user && user.isLoggedIn ? (
                    <motion.div
                        variants={itemVariants}
                        key="comment-form"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="comment"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700 dark:text-gray-300">
                                                Share your thoughts
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Write a thoughtful comment..."
                                                    {...field}
                                                    className="min-h-[120px] resize-none border-2 rounded-2xl border-purple-500"
                                                    disabled={isSubmitting}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-sm" />
                                        </FormItem>
                                    )}
                                />

                                <motion.div
                                    className="flex justify-end "
                                    whileHover="hover"
                                >
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        variants={buttonVariants}
                                        whileHover="hover"
                                        whileTap="tap"
                                        className="gap-2 cursor-pointer  "
                                    >
                                        {isSubmitting ? (
                                            'Posting...'
                                        ) : (
                                            <>
                                                <span>Post Comment</span>
                                                <FaPaperPlane className="text-sm" />
                                            </>
                                        )}
                                    </Button>
                                </motion.div>
                            </form>
                        </Form>
                    </motion.div>
                ) : (
                    <motion.div
                        variants={itemVariants}
                        key="sign-in-prompt"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
                    >
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Join the conversation! Sign in to post a comment.
                        </p>
                        <Button asChild variants={buttonVariants} whileHover="hover" whileTap="tap">
                            <Link to={RouteSignIn} className="gap-2">
                                Sign In to Comment
                            </Link>
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div 
                variants={itemVariants}
                className="mt-8"
            >
                <CommentList props={{ blogid: props.blogid, newComment }} />
            </motion.div>
        </motion.div>
    );
};

export default Comment;