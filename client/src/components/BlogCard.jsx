import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { Badge } from "@/components/ui/badge";
import { Avatar } from './ui/avatar';
import { AvatarImage } from '@radix-ui/react-avatar';
import { FaRegCalendarAlt, FaArrowRight } from "react-icons/fa";
import usericon from '@/assets/images/user.png';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { RouteBlogDetails } from '@/helpers/RouteName';

const BlogCard = ({ props }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.03,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const arrowVariants = {
    initial: { x: 0 },
    hover: { x: 5 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={cardVariants}
      className="h-full"
    >
      <Link to={RouteBlogDetails(props.category.slug, props.slug)} className="h-full" onClick={() => window.scrollTo(0, 0)}>
        <Card className="h-full pt-5 overflow-hidden transition-colors duration-300 hover:border-primary/20">
          <CardContent className="h-full flex flex-col">
            <div className='flex items-center justify-between mb-4'>
              <div className='flex items-center gap-2'>
                <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                  <AvatarImage
                    src={props.author.avatar || usericon}
                    alt={props.author.name}
                    className="object-cover"
                  />
                </Avatar>
                <span className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
                  {props.author.name}
                </span>
              </div>
              {props.author.role === 'admin' && (
                <Badge variant="outline" className="bg-violet-500 text-white text-xs sm:text-sm">
                  Admin
                </Badge>
              )}
            </div>

            <motion.div
              className='my-2 rounded-lg overflow-hidden'
              variants={imageVariants}
            >
              <img
                src={props.featuredImage}
                alt={props.title}
                className='w-full h-48 sm:h-56 object-cover rounded-lg'
                loading="lazy"
              />
            </motion.div>

            <div className='mt-4 flex-grow flex flex-col'>
              <p className='flex items-center gap-2 mb-3 text-sm text-gray-500 dark:text-gray-400'>
                <FaRegCalendarAlt className="text-primary" />
                <span>{moment(props.createdAt).format('MMMM DD, YYYY')}</span>
              </p>

              <h2 className='text-xl sm:text-2xl font-bold line-clamp-2 mb-3 text-gray-800 dark:text-gray-100'>
                {props.title}
              </h2>

              <div className="mt-auto pt-2">
                <motion.div
                  className="flex items-center text-primary font-medium"
                  variants={arrowVariants}
                >
                  <span className="text-sm sm:text-base">Read more</span>
                  <FaArrowRight className="ml-2 text-sm" />
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

export default BlogCard;