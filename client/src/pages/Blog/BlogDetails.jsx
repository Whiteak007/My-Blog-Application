import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import {
    Table,
    TableBody,
    TableCaption,
    TableHeader,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table"
import { RouteBlogAdd, RouteBlogEdit } from '@/helpers/RouteName'
import { useFetch } from '@/hooks/useFetch'
import { getEvn } from '@/helpers/getEnv'
import { deleteData } from '@/helpers/handleDelete'
import { showToast } from '@/helpers/showToast'
import Loading from '@/components/Loading'
import { useState } from 'react'
import { FiEdit, FiPlusCircle } from "react-icons/fi";
import { FaRegTrashAlt, FaSearch } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import moment from 'moment'
import { motion } from 'framer-motion'
import { fadeIn, staggerContainer, textVariant } from '@/utils/motion'
import { FiCalendar, FiUser, FiTag } from "react-icons/fi";

const BlogDetails = () => {
    const [refreshData, setRefreshData] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const { data: blogData, loading, error } = useFetch(`${getEvn('VITE_API_BASE_URL')}/blog/get-all`, {
        method: 'get',
        credentials: 'include'
    }, [refreshData])

    const handleDelete = (id) => {
        const response = deleteData(`${getEvn('VITE_API_BASE_URL')}/blog/delete/${id}`)
        if (response) {
            setRefreshData(!refreshData)
            showToast('success', 'Data deleted successfully!')
        } else {
            showToast('error', 'Failed to delete data.')
        }
    }

    const filteredBlogs = blogData?.blog?.filter(blog => 
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog?.author?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog?.category?.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (loading) return <Loading />

    return (
        <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="min-h-screen p-4 md:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-violet-50"
        >
            <motion.div variants={textVariant(0.1)}>
                <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-pink-500">
                    Blog Management
                </h1>
                <div className="flex items-center text-sm text-gray-600 mb-6">
                    <Link to="/dashboard" className="hover:text-violet-600">Dashboard</Link>
                    <IoIosArrowForward className="mx-2" />
                    <span className="text-violet-600">Blogs</span>
                </div>
            </motion.div>

            <motion.div variants={fadeIn('up', 'tween', 0.2, 1)}>
                <Card className="border-0 shadow-lg rounded-xl overflow-hidden bg-white/80 backdrop-blur-sm">
                    <CardHeader className="bg-gradient-to-r from-violet-600 to-indigo-600 p-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <motion.div 
                                variants={textVariant(0.3)}
                                className="text-white"
                            >
                                <h2 className="text-xl md:text-2xl font-semibold">All Blog Posts</h2>
                                <p className="text-sm opacity-90">
                                    {filteredBlogs?.length || 0} posts found
                                </p>
                            </motion.div>
                            
                            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                                <motion.div
                                    variants={fadeIn('left', 'tween', 0.4, 1)}
                                    className="relative flex-1"
                                >
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaSearch className="text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search blogs..."
                                        className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </motion.div>
                                
                                <motion.div variants={fadeIn('left', 'tween', 0.5, 1)}>
                                    <Button 
                                        asChild
                                        className="gap-2 bg-white text-violet-600 hover:bg-violet-50 hover:text-violet-700 transition-all duration-300 shadow-md"
                                    >
                                        <Link to={RouteBlogAdd}>
                                            <FiPlusCircle size={18} />
                                            <span>Add Blog</span>
                                        </Link>
                                    </Button>
                                </motion.div>
                            </div>
                        </div>
                    </CardHeader>
                    
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <Table className="min-w-full">
                                <TableHeader className="bg-gray-100">
                                    <TableRow className="hover:bg-transparent">
                                        <TableHead className="py-4 px-6 font-semibold text-gray-700">Author</TableHead>
                                        <TableHead className="py-4 px-6 font-semibold text-gray-700">Category</TableHead>
                                        <TableHead className="py-4 px-6 font-semibold text-gray-700">Title</TableHead>
                                        <TableHead className="py-4 px-6 font-semibold text-gray-700">Slug</TableHead>
                                        <TableHead className="py-4 px-6 font-semibold text-gray-700">Date</TableHead>
                                        <TableHead className="py-4 px-6 font-semibold text-gray-700 text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                
                                <TableBody>
                                    {filteredBlogs && filteredBlogs.length > 0 ? (
                                        filteredBlogs.map((blog, index) => (
                                            <motion.tr
                                                key={blog._id}
                                                variants={fadeIn('up', 'tween', 0.1 * index, 0.5)}
                                                initial="hidden"
                                                animate="show"
                                                whileHover={{ scale: 1.01, boxShadow: '0 4px 20px rgba(124, 58, 237, 0.1)' }}
                                                className="border-b border-gray-200 hover:bg-violet-50/50 transition-colors duration-200"
                                            >
                                                <TableCell className="py-4 px-6">
                                                    <div className="flex items-center gap-2">
                                                        <FiUser className="text-violet-600" />
                                                        {blog?.author?.name || 'Unknown'}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="py-4 px-6">
                                                    <div className="flex items-center gap-2">
                                                        <FiTag className="text-violet-600" />
                                                        {blog?.category?.name || 'Uncategorized'}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="py-4 px-6 font-medium">
                                                    {blog?.title}
                                                </TableCell>
                                                <TableCell className="py-4 px-6 text-gray-600">
                                                    {blog?.slug}
                                                </TableCell>
                                                <TableCell className="py-4 px-6">
                                                    <div className="flex items-center gap-2">
                                                        <FiCalendar className="text-violet-600" />
                                                        {moment(blog?.createdAt).format('MMM D, YYYY')}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="py-4 px-6">
                                                    <div className="flex justify-end gap-2">
                                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                                            <Button 
                                                                variant="outline" 
                                                                className="gap-2 hover:bg-violet-600 hover:text-white transition-colors"
                                                                asChild
                                                            >
                                                                <Link to={RouteBlogEdit(blog._id)}>
                                                                    <FiEdit size={16} />
                                                                    <span className="hidden sm:inline">Edit</span>
                                                                </Link>
                                                            </Button>
                                                        </motion.div>
                                                        
                                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                                            <Button 
                                                                onClick={() => handleDelete(blog._id)} 
                                                                variant="outline" 
                                                                className="gap-2 hover:bg-red-600 hover:text-white transition-colors"
                                                            >
                                                                <FaRegTrashAlt size={16} />
                                                                <span className="hidden sm:inline">Delete</span>
                                                            </Button>
                                                        </motion.div>
                                                    </div>
                                                </TableCell>
                                            </motion.tr>
                                        ))
                                    ) : (
                                        <motion.tr 
                                            variants={fadeIn('up', 'tween', 0.2, 1)}
                                            className="border-b border-gray-200"
                                        >
                                            <TableCell colSpan={6} className="py-8 text-center text-gray-500">
                                                {searchTerm ? (
                                                    <div className="flex flex-col items-center justify-center gap-2">
                                                        <FaSearch size={24} className="text-gray-400" />
                                                        <p>No blogs found matching your search</p>
                                                        <Button 
                                                            variant="ghost" 
                                                            className="text-violet-600 hover:bg-violet-50"
                                                            onClick={() => setSearchTerm('')}
                                                        >
                                                            Clear search
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col items-center justify-center gap-2">
                                                        <p>No blog posts available</p>
                                                        <Button 
                                                            asChild
                                                            className="gap-2 bg-violet-600 hover:bg-violet-700"
                                                        >
                                                            <Link to={RouteBlogAdd}>
                                                                <FiPlusCircle size={18} />
                                                                <span>Create your first blog</span>
                                                            </Link>
                                                        </Button>
                                                    </div>
                                                )}
                                            </TableCell>
                                        </motion.tr>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    )
}

export default BlogDetails