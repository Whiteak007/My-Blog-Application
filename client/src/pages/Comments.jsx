import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RouteAddCategory, RouteEditCategory } from '@/helpers/RouteName';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFetch } from '@/hooks/useFetch';
import { getEvn } from '@/helpers/getEnv';
import Loading from '@/components/Loading';
import { FiEdit } from "react-icons/fi";
import { FaRegTrashAlt, FaComment, FaUser, FaBlog } from "react-icons/fa";
import { deleteData } from '@/helpers/handleDelete';
import { showToast } from '@/helpers/showToast';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';

const Comments = () => {
  const [refreshData, setRefreshData] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { data, loading, error } = useFetch(`${getEvn('VITE_API_BASE_URL')}/comment/get-all-comment`, {
    method: 'get',
    credentials: 'include'
  }, [refreshData]);

  const handleDelete = async (id) => {
    const response = await deleteData(`${getEvn('VITE_API_BASE_URL')}/comment/delete/${id}`);
    if (response) {
      setRefreshData(!refreshData);
      showToast('success', 'Comment deleted successfully');
    } else {
      showToast('error', 'Failed to delete comment');
    }
  };

  const filteredComments = data?.comments?.filter(comment => 
    comment?.blogid?.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    comment?.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comment?.comment?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex justify-center items-center h-64"
    >
      <Loading />
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-2 sm:px-4 py-6 md:w-6xl"
    >
      <Card className="shadow-lg rounded-xl overflow-hidden border-0 max-w-full ">
        <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 sm:p-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <CardTitle className="text-white flex items-center gap-2 text-lg sm:text-xl">
              <FaComment className="text-xl" />
              <span>Comments Management</span>
            </CardTitle>
            <motion.div whileHover={{ scale: 1.02 }} className="w-full md:w-auto">
              <Input
                type="text"
                placeholder="Search comments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/90 focus:bg-white rounded-full px-4 py-2 w-full md:w-64"
              />
            </motion.div>
          </div>
        </CardHeader>

        <CardContent className="p-0 overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]">
                  <div className="flex items-center gap-1">
                    <FaBlog className="text-indigo-500" />
                    <span>Blog</span>
                  </div>
                </TableHead>
                <TableHead className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[180px]">
                  <div className="flex items-center gap-1">
                    <FaUser className="text-indigo-500" />
                    <span>Commented By</span>
                  </div>
                </TableHead>
                <TableHead className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[200px]">
                  Comment
                </TableHead>
                <TableHead className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Date
                </TableHead>
                <TableHead className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white divide-y divide-gray-200">
              <AnimatePresence>
                {filteredComments && filteredComments.length > 0 ? (
                  filteredComments.map((comment) => (
                    <motion.tr
                      key={comment._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ backgroundColor: 'rgba(249, 250, 251, 0.8)' }}
                      className="hover:bg-gray-50/80"
                    >
                      <TableCell className="px-3 sm:px-6 py-4">
                        <div className="flex items-center min-w-0">
                          <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                            <FaBlog className="text-indigo-600" />
                          </div>
                          <div className="ml-3 min-w-0">
                            <div className="text-sm font-medium text-gray-900 truncate">
                              {comment?.blogid?.title || 'N/A'}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-3 sm:px-6 py-4">
                        <div className="flex items-center min-w-0">
                          <Avatar className="h-8 w-8 flex-shrink-0">
                            <AvatarImage src={comment?.user?.avatar} />
                            <AvatarFallback className="bg-indigo-100 text-indigo-600">
                              {comment?.user?.name?.charAt(0) || 'U'}
                            </AvatarFallback>
                          </Avatar>
                          <div className="ml-3 min-w-0">
                            <div className="text-sm font-medium text-gray-900 truncate">
                              {comment?.user?.name || 'Anonymous'}
                            </div>
                            <div className="text-sm text-gray-500 truncate">
                              {comment?.user?.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-3 sm:px-6 py-4 min-w-0">
                        <div className="text-sm text-gray-900 line-clamp-2 break-words">
                          {comment?.comment}
                        </div>
                      </TableCell>
                      <TableCell className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {format(new Date(comment.createdAt), 'MMM d, yyyy')}
                        </div>
                      </TableCell>
                      <TableCell className="px-3 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <motion.div 
                          className="flex justify-end gap-2"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Button 
                            onClick={() => handleDelete(comment._id)} 
                            variant="ghost" 
                            className="hover:bg-red-50 text-red-600 hover:text-red-700 p-2 rounded-full"
                            aria-label="Delete comment"
                          >
                            <FaRegTrashAlt className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      </TableCell>
                    </motion.tr>
                  ))
                ) : (
                  <motion.tr
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <TableCell colSpan="5" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <FaComment className="text-gray-400 text-4xl" />
                        <h3 className="text-lg font-medium text-gray-900">No comments found</h3>
                        <p className="text-gray-500">
                          {searchTerm ? 'Try a different search term' : 'There are no comments to display'}
                        </p>
                      </div>
                    </TableCell>
                  </motion.tr>
                )}
              </AnimatePresence>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Comments;