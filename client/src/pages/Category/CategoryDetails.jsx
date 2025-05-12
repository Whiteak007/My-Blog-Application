import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RouteAddCategory, RouteEditCategory } from '@/helpers/RouteName';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useFetch } from '@/hooks/useFetch';
import { getEvn } from '@/helpers/getEnv';
import Loading from '@/components/Loading';
import { FiEdit } from 'react-icons/fi';
import { FaRegTrashAlt, FaPlus } from 'react-icons/fa';
import { deleteData } from '@/helpers/handleDelete';
import { showToast } from '@/helpers/showToast';
import { Input } from '@/components/ui/input';

// Animation configurations
const containerAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren"
    }
  }
};

const cardAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

const itemAnimation = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 }
  }
};

const buttonAnimation = {
  hover: { 
    scale: 1.05,
    boxShadow: "0 4px 12px rgba(124, 58, 237, 0.2)"
  },
  tap: { 
    scale: 0.98,
    boxShadow: "0 2px 6px rgba(124, 58, 237, 0.1)"
  }
};

const CategoryDetails = () => {
  const [refreshData, setRefreshData] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { data: categoryData, loading, error } = useFetch(
    `${getEvn('VITE_API_BASE_URL')}/category/all-category`,
    {
      method: 'get',
      credentials: 'include',
    },
    [refreshData]
  );

const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure?");
  if (!confirmDelete) return;
  
  try {
    await deleteData(`${getEvn('VITE_API_BASE_URL')}/category/delete/${id}`);
    setRefreshData(!refreshData);
    showToast('success', 'Deleted successfully');
  } catch (err) {
    showToast('error', err.message || 'Delete failed');
  }
};

  const filteredCategories = categoryData?.category?.filter(category => 
    category?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    category?.slug?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loading />
    </div>
  );

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerAnimation}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div variants={cardAnimation}>
          <Card className="shadow-lg rounded-xl overflow-hidden border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-violet-600 to-indigo-600 p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <CardTitle className="text-white text-2xl font-semibold tracking-tight">
                  Category Management
                </CardTitle>
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="w-full sm:w-64"
                  >
                    <Input
                      type="text"
                      placeholder="Search categories..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-white/90 focus:bg-white rounded-lg px-4 py-2 w-full"
                      aria-label="Search categories"
                    />
                  </motion.div>
                  <motion.div 
                    whileHover="hover"
                    whileTap="tap"
                    variants={buttonAnimation}
                  >
                    <Button 
                      asChild
                      className="bg-white text-violet-600 hover:bg-white/90 font-medium rounded-lg px-6 py-2 shadow-sm whitespace-nowrap"
                    >
                      <Link to={RouteAddCategory}>
                        <FaPlus className="mr-2 h-4 w-4" />
                        Add Category
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0 overflow-x-auto">
              <Table className="min-w-full divide-y divide-gray-200/50">
                <TableHeader className="bg-gray-50/50">
                  <TableRow>
                    <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </TableHead>
                    <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Slug
                    </TableHead>
                    <TableHead className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="bg-white divide-y divide-gray-200/30">
                  <AnimatePresence>
                    {filteredCategories && filteredCategories.length > 0 ? (
                      filteredCategories.map((category, index) => (
                        <motion.tr
                          key={category._id}
                          variants={itemAnimation}
                          initial="hidden"
                          animate="visible"
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
                          whileHover={{ backgroundColor: 'rgba(249, 250, 251, 0.8)' }}
                          className="hover:bg-gray-50/50"
                        >
                          <TableCell className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {category.name}
                            </div>
                          </TableCell>
                          <TableCell className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-full inline-block">
                              {category.slug}
                            </div>
                          </TableCell>
                          <TableCell className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end gap-2">
                              <motion.div 
                                whileHover="hover"
                                whileTap="tap"
                                variants={buttonAnimation}
                              >
                                <Button
                                  variant="outline"
                                  className="text-violet-600 border-violet-300 hover:bg-violet-50 hover:text-violet-700 rounded-lg px-4 py-2 shadow-sm"
                                  asChild
                                  aria-label={`Edit ${category.name}`}
                                >
                                  <Link to={RouteEditCategory(category._id)}>
                                    <FiEdit className="h-4 w-4 mr-2" />
                                    Edit
                                  </Link>
                                </Button>
                              </motion.div>
                              <motion.div 
                                whileHover={{ 
                                  scale: 1.05,
                                  boxShadow: "0 4px 12px rgba(239, 68, 68, 0.2)"
                                }}
                                whileTap={{ 
                                  scale: 0.98,
                                  boxShadow: "0 2px 6px rgba(239, 68, 68, 0.1)"
                                }}
                              >
                                <Button
                                  onClick={() => handleDelete(category._id)}
                                  variant="outline"
                                  className="text-red-600 border-red-300 hover:bg-red-50 hover:text-red-700 rounded-lg px-4 py-2 shadow-sm"
                                  aria-label={`Delete ${category.name}`}
                                >
                                  <FaRegTrashAlt className="h-4 w-4 mr-2" />
                                  Delete
                                </Button>
                              </motion.div>
                            </div>
                          </TableCell>
                        </motion.tr>
                      ))
                    ) : (
                      <motion.tr
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <TableCell colSpan={3} className="px-6 py-12 text-center">
                          <div className="flex flex-col items-center justify-center gap-3">
                            <div className="bg-gray-100 p-4 rounded-full">
                              <FiEdit className="text-gray-400 text-2xl" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">
                              No categories found
                            </h3>
                            <p className="text-gray-500 max-w-md">
                              {searchTerm 
                                ? "No categories match your search. Try a different term."
                                : "There are no categories to display. Create your first category to get started."}
                            </p>
                            {!searchTerm && (
                              <motion.div 
                                whileHover="hover"
                                whileTap="tap"
                                variants={buttonAnimation}
                                className="mt-4"
                              >
                                <Button 
                                  asChild
                                  className="bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg px-6 py-2 shadow-sm"
                                >
                                  <Link to={RouteAddCategory}>
                                    <FaPlus className="mr-2 h-4 w-4" />
                                    Add Category
                                  </Link>
                                </Button>
                              </motion.div>
                            )}
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
      </div>
    </motion.div>
  );
};

export default CategoryDetails;