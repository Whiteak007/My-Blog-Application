import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { getEvn } from '@/helpers/getEnv'
import { showToast } from '@/helpers/showToast'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Textarea } from "@/components/ui/textarea"
import { useFetch } from '@/hooks/useFetch'
import Loading from '@/components/Loading'
import { IoCameraOutline } from "react-icons/io5";
import Dropzone from 'react-dropzone'
import { setUser } from '@/redux/user/user.slice'
import { motion, AnimatePresence } from "framer-motion"
import { FiSave, FiEdit2, FiUser, FiMail, FiLock, FiInfo, FiX, FiCheck } from "react-icons/fi"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useNavigate } from 'react-router-dom'

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
};

const slideUp = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const hoverEffect = {
  scale: 1.02,
  transition: { duration: 0.3 }
};

const tapEffect = {
  scale: 0.98
};

const rotate = {
  rotate: 360,
  transition: { duration: 1, repeat: Infinity, ease: "linear" }
};

const Profile = () => {
  const [filePreview, setPreview] = useState()
  const [file, setFile] = useState()
  const [isEditing, setIsEditing] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()

  const { data: userData, loading, error } = useFetch(
    `${getEvn('VITE_API_BASE_URL')}/user/get-user/${user.user._id}`,
    { method: 'get', credentials: 'include' }
  )

  const dispatch = useDispatch()

  const formSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 character long.'),
    email: z.string().email(),
    bio: z.string().min(3, 'Bio must be at least 3 character long.'),
    password: z.string().min(6, 'Password must be at least 6 characters').optional().or(z.literal(''))
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      bio: '',
      password: '',
    },
  })

  useEffect(() => {
    if (userData && userData.success) {
      form.reset({
        name: userData.user.name,
        email: userData.user.email,
        bio: userData.user.bio,
        password: ''
      })
    }
  }, [userData])

  useEffect(() => {
    if (form.watch('password')) {
      const strength = calculatePasswordStrength(form.watch('password'))
      setPasswordStrength(strength)
    } else {
      setPasswordStrength(0)
    }
  }, [form.watch('password')])

  const calculatePasswordStrength = (password) => {
    let strength = 0
    if (password.length > 7) strength += 1
    if (/[A-Z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1
    return strength
  }

  async function onSubmit(values) {
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      if (file) formData.append('file', file)
      formData.append('data', JSON.stringify(values))

      const response = await fetch(`${getEvn('VITE_API_BASE_URL')}/user/update-user/${userData.user._id}`, {
        method: 'put',
        credentials: 'include',
        body: formData
      })
      const data = await response.json()
      if (!response.ok) {
        showToast('error', data.message)
        return
      }
      dispatch(setUser(data.user))
      showToast('success', data.message)
      setIsEditing(false)
      if (filePreview) {
        setPreview(null)
      }
    } catch (error) {
      showToast('error', error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFileSelection = (files) => {
    const file = files[0]
    if (file.size > 2 * 1024 * 1024) {
      showToast('error', 'File size should be less than 2MB')
      return
    }
    const preview = URL.createObjectURL(file)
    setFile(file)
    setPreview(preview)
  }

  const handleCancel = () => {
    form.reset({
      name: userData.user.name,
      email: userData.user.email,
      bio: userData.user.bio,
      password: ''
    })
    setIsEditing(false)
    if (filePreview) {
      URL.revokeObjectURL(filePreview)
      setPreview(null)
      setFile(null)
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.div
        animate={rotate}
        className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full"
      />
    </div>
  )

  if (error) {
    showToast('error', 'Failed to load profile data')
    navigate('/')
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <AnimatePresence>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="flex justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="w-full max-w-screen-md"
          >
            <Card className="rounded-xl shadow-lg overflow-hidden border-0 bg-white/90 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 py-6 px-6 text-center relative"
              >
                <h1 className="text-2xl sm:text-3xl font-bold text-white">Profile Settings</h1>
                <p className="text-indigo-100 mt-2">Update your personal information</p>
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-4 right-4 cursor-pointer"
                  onClick={() => navigate('/')}
                >
                  <FiX className="text-white text-xl" />
                </motion.div>
              </motion.div>

              <CardContent className="p-6 sm:p-8">
                <motion.div 
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="space-y-6"
                >
                  <motion.div variants={slideUp} className="flex flex-col items-center">
                    <Dropzone 
                      onDrop={acceptedFiles => handleFileSelection(acceptedFiles)}
                      accept={{
                        'image/*': ['.jpeg', '.jpg', '.png', '.webp']
                      }}
                      maxSize={2 * 1024 * 1024}
                      multiple={false}
                    >
                      {({ getRootProps, getInputProps, isDragActive }) => (
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative group cursor-pointer"
                          >
                            <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                              <AvatarImage 
                                src={filePreview ? filePreview : userData?.user?.avatar} 
                                className="object-cover"
                              />
                            </Avatar>
                            <motion.div 
                              initial={{ opacity: 0 }}
                              whileHover={{ opacity: 1 }}
                              className={`absolute inset-0 flex items-center justify-center rounded-full ${isDragActive ? 'bg-indigo-600/80 opacity-100' : 'bg-black/40 opacity-0'}`}
                            >
                              {isDragActive ? (
                                <motion.div
                                  animate={{ scale: [1, 1.1, 1] }}
                                  transition={{ duration: 1, repeat: Infinity }}
                                  className="text-white text-center p-4"
                                >
                                  Drop to upload
                                </motion.div>
                              ) : (
                                <IoCameraOutline className="text-white text-2xl" />
                              )}
                            </motion.div>
                          </motion.div>
                        </div>
                      )}
                    </Dropzone>
                    <motion.p 
                      className="text-sm text-gray-500 mt-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      Click to change profile picture
                    </motion.p>
                  </motion.div>

                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <motion.div variants={slideUp}>
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2 text-gray-700">
                                <FiUser className="text-indigo-600" />
                                Name
                              </FormLabel>
                              <FormControl>
                                <motion.div whileHover={hoverEffect} whileTap={tapEffect}>
                                  <Input 
                                    placeholder="Enter your name" 
                                    {...field} 
                                    disabled={!isEditing}
                                    className="disabled:opacity-80 disabled:cursor-not-allowed"
                                  />
                                </motion.div>
                              </FormControl>
                              <FormMessage className="text-red-500 text-sm" />
                            </FormItem>
                          )}
                        />
                      </motion.div>

                      <motion.div variants={slideUp}>
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2 text-gray-700">
                                <FiMail className="text-indigo-600" />
                                Email
                              </FormLabel>
                              <FormControl>
                                <motion.div whileHover={hoverEffect} whileTap={tapEffect}>
                                  <Input 
                                    placeholder="Enter your email address" 
                                    {...field} 
                                    disabled={!isEditing}
                                    className="disabled:opacity-80 disabled:cursor-not-allowed"
                                  />
                                </motion.div>
                              </FormControl>
                              <FormMessage className="text-red-500 text-sm" />
                            </FormItem>
                          )}
                        />
                      </motion.div>

                      <motion.div variants={slideUp}>
                        <FormField
                          control={form.control}
                          name="bio"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2 text-gray-700">
                                <FiInfo className="text-indigo-600" />
                                Bio
                              </FormLabel>
                              <FormControl>
                                <motion.div whileHover={hoverEffect} whileTap={tapEffect}>
                                  <Textarea 
                                    placeholder="Tell us about yourself..." 
                                    {...field} 
                                    disabled={!isEditing}
                                    className="disabled:opacity-80 disabled:cursor-not-allowed min-h-[100px]"
                                  />
                                </motion.div>
                              </FormControl>
                              <FormMessage className="text-red-500 text-sm" />
                            </FormItem>
                          )}
                        />
                      </motion.div>

                      {isEditing && (
                        <motion.div 
                          variants={slideUp}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-2"
                        >
                          <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center gap-2 text-gray-700">
                                  <FiLock className="text-indigo-600" />
                                  Password (leave blank to keep current)
                                </FormLabel>
                                <FormControl>
                                  <motion.div whileHover={hoverEffect} whileTap={tapEffect}>
                                    <Input 
                                      type="password" 
                                      placeholder="Enter new password" 
                                      {...field} 
                                    />
                                  </motion.div>
                                </FormControl>
                                <FormMessage className="text-red-500 text-sm" />
                              </FormItem>
                            )}
                          />
                          {form.watch('password') && (
                            <motion.div 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="flex gap-2 items-center"
                            >
                              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <motion.div 
                                  className={`h-full ${passwordStrength >= 4 ? 'bg-green-500' : passwordStrength >= 2 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${(passwordStrength / 4) * 100}%` }}
                                  transition={{ duration: 0.5 }}
                                />
                              </div>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <div className="text-xs text-gray-500">
                                      {passwordStrength >= 4 ? 'Strong' : passwordStrength >= 2 ? 'Medium' : 'Weak'}
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Password strength indicator</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </motion.div>
                          )}
                        </motion.div>
                      )}

                      <motion.div 
                        variants={slideUp}
                        className="flex gap-4 pt-4"
                      >
                        {!isEditing ? (
                          <motion.div
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="w-full"
                          >
                            <Button
                              type="button"
                              onClick={() => setIsEditing(true)}
                              className="w-full bg-indigo-600 hover:bg-indigo-700 cursor-pointer flex items-center gap-2"
                            >
                              <FiEdit2 />
                              Edit Profile
                            </Button>
                          </motion.div>
                        ) : (
                          <>
                            <motion.div
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              className="flex-1"
                            >
                              <Button
                                type="submit"
                                className="w-full bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2"
                                disabled={isSubmitting}
                              >
                                {isSubmitting ? (
                                  <motion.span
                                    animate={rotate}
                                    className="inline-block"
                                  >
                                    <FiSave />
                                  </motion.span>
                                ) : (
                                  <>
                                    <FiSave />
                                    Save Changes
                                  </>
                                )}
                              </Button>
                            </motion.div>
                            <motion.div
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              className="flex-1"
                            >
                              <Button
                                type="button"
                                variant="outline"
                                onClick={handleCancel}
                                className="w-full"
                                disabled={isSubmitting}
                              >
                                <FiX />
                                Cancel
                              </Button>
                            </motion.div>
                          </>
                        )}
                      </motion.div>
                    </form>
                  </Form>
                </motion.div>
              </CardContent>
            </Card>

            {/* Success toast example (would be triggered by showToast) */}
            <AnimatePresence>
              {false && ( // Change to condition when you want to show toast
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
                >
                  <FiCheck />
                  Profile updated successfully!
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default Profile