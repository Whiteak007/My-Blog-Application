import React, {useState} from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { FaRegTrashAlt, FaUserPlus } from "react-icons/fa";
import { deleteData } from '@/helpers/handleDelete';
import { showToast } from '@/helpers/showToast';
import usericon from '@/assets/images/user.png';
import moment from 'moment';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const User = () => {
  const [refreshData, setRefreshData] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data, loading, error } = useFetch(`${getEvn('VITE_API_BASE_URL')}/user/get-all-user`, {
    method: 'get',
    credentials: 'include'
  }, [refreshData]);

  const handleDelete = async (id) => {
    const response = await deleteData(`${getEvn('VITE_API_BASE_URL')}/user/delete/${id}`);
    if (response) {
      setRefreshData(!refreshData);
      showToast('success', 'User deleted successfully');
    } else {
      showToast('error', 'Failed to delete user');
    }
  };

  // Filter users based on search term
  const filteredUsers = data?.user?.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (loading) return <Loading />;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const hoverEffect = {
    scale: 1.03,
    transition: { duration: 0.2 }
  };

  const tapEffect = {
    scale: 0.98
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4 md:p-6 lg:p-8"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-none shadow-sm bg-gradient-to-br from-white to-gray-50">
          <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-semibold text-gray-800">User Management</CardTitle>
              <p className="text-sm text-gray-500 mt-1">Manage all registered users in the system</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-xs"
              />
              <Button asChild className="gap-2 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg px-6 py-2 shadow-sm">
                <Link to="/add-user">
                  <FaUserPlus className="w-4 h-4" />
                  <span>Add User</span>
                </Link>
              </Button>
            </div>
          </CardHeader>
          
          <CardContent>
            {error ? (
              <div className="text-center py-8 text-red-500">
                Failed to load users. Please try again.
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <Table className="min-w-full">
                  <TableCaption className="text-gray-500">
                    {filteredUsers.length} user(s) found
                  </TableCaption>
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead className="w-[100px]">Avatar</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user, index) => (
                        <motion.tr
                          key={user._id}
                          variants={itemVariants}
                          whileHover={{ backgroundColor: 'rgba(249, 250, 251, 0.8)' }}
                          className="border-b border-gray-100"
                        >
                          <TableCell>
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={user.avatar || usericon} alt={user.name} />
                              <AvatarFallback>
                                {user.name.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                          </TableCell>
                          <TableCell className="font-medium">
                            {user.name}
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {user.email}
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={user.role === 'admin' ? 'default' : 'secondary'}
                              className="capitalize"
                            >
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm text-gray-500">
                              {moment(user.createdAt).format('MMM D, YYYY')}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <motion.button
                                whileHover={hoverEffect}
                                whileTap={tapEffect}
                                onClick={() => handleDelete(user._id)}
                                className="p-2 rounded-full text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors"
                                aria-label={`Delete user ${user.name}`}
                              >
                                <FaRegTrashAlt className="w-4 h-4" />
                              </motion.button>
                              <motion.button
                                whileHover={hoverEffect}
                                whileTap={tapEffect}
                                className="p-2 rounded-full text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                                aria-label={`Edit user ${user.name}`}
                              >
                                <FiEdit className="w-4 h-4" />
                              </motion.button>
                            </div>
                          </TableCell>
                        </motion.tr>
                      ))
                    ) : (
                      <motion.tr
                        variants={itemVariants}
                        className="hover:bg-gray-50"
                      >
                        <TableCell colSpan={6} className="py-8 text-center text-gray-500">
                          {searchTerm ? 'No matching users found' : 'No users available'}
                        </TableCell>
                      </motion.tr>
                    )}
                  </TableBody>
                </Table>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default User;