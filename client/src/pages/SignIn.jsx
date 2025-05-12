import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Card } from '@/components/ui/card'
import { RouteIndex, RouteSignUp } from '@/helpers/RouteName'
import { Link, useNavigate } from 'react-router-dom'
import { showToast } from '@/helpers/showToast'
import { getEvn } from '@/helpers/getEnv'
import { useDispatch } from 'react-redux'
import { setUser } from '@/redux/user/user.slice'
import GoogleLogin from '@/components/GoogleLogin'
import logo from '@/assets/images/logo-white.png'
import { motion } from 'framer-motion'

// Motion variants defined directly in the component
const fadeIn = (direction, type, delay, duration) => ({
  hidden: {
    x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
    y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type,
      delay,
      duration,
      ease: 'easeOut',
    },
  },
});

const slideIn = (direction, type, delay, duration) => ({
  hidden: {
    x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
    y: direction === 'up' ? '100%' : direction === 'down' ? '-100%' : 0,
  },
  show: {
    x: 0,
    y: 0,
    transition: {
      type,
      delay,
      duration,
      ease: 'easeOut',
    },
  },
});

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const SignIn = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const formSchema = z.object({
        email: z.string().email(),
        password: z.string().min(3, 'Password field required.')
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    async function onSubmit(values) {
        try {
            const response = await fetch(`${getEvn('VITE_API_BASE_URL')}/auth/login`, {
                method: 'post',
                headers: { 'Content-type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(values)
            })
            const data = await response.json()
            if (!response.ok) {
                return showToast('error', data.message)
            }
            dispatch(setUser(data.user))
            navigate(RouteIndex)
            showToast('success', data.message)
        } catch (error) {
            showToast('error', error.message)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen w-full bg-gradient-to-br from-blue-500 to-purple-600 flex justify-center items-center p-4"
        >
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                className="w-full max-w-md"
            >
                <motion.div variants={fadeIn('up', 'tween', 0.2, 1)}>
                    <Card className="w-full p-6 sm:p-8 rounded-xl shadow-2xl border-0 bg-white/10 backdrop-blur-md">
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            className='flex justify-center items-center mb-6'
                        >
                            <Link to={RouteIndex}>
                                <motion.img 
                                    src={logo} 
                                    alt="Logo"
                                    className="h-12 sm:h-16"
                                    whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                                    transition={{ duration: 0.5 }}
                                />
                            </Link>
                        </motion.div>

                        <motion.h1 
                            variants={slideIn('down', 'tween', 0.3, 1)}
                            className='text-2xl sm:text-3xl font-bold text-center mb-6 text-white'
                        >
                            Login Into Account
                        </motion.h1>

                        <motion.div variants={fadeIn('up', 'tween', 0.4, 1)}>
                            <GoogleLogin />
                            <div className='relative my-6'>
                                <div className='border-t border-white/30'></div>
                                <motion.span 
                                    className='absolute left-1/2 -translate-x-1/2 -top-3 bg-transparent px-3 text-sm text-white/80'
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    Or
                                </motion.span>
                            </div>
                        </motion.div>

                        <Form {...form}>
                            <motion.form 
                                onSubmit={form.handleSubmit(onSubmit)}
                                variants={staggerContainer}
                                initial="hidden"
                                animate="show"
                            >
                                <motion.div 
                                    variants={fadeIn('up', 'tween', 0.5, 1)}
                                    className='mb-4'
                                >
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-white/80">Email</FormLabel>
                                                <FormControl>
                                                    <motion.div whileHover={{ scale: 1.01 }}>
                                                        <Input 
                                                            placeholder="Enter your email address" 
                                                            {...field} 
                                                            className="bg-white/10 border-white/20 text-white placeholder-white/50 focus-visible:ring-white/50"
                                                        />
                                                    </motion.div>
                                                </FormControl>
                                                <FormMessage className="text-red-300" />
                                            </FormItem>
                                        )}
                                    />
                                </motion.div>

                                <motion.div 
                                    variants={fadeIn('up', 'tween', 0.6, 1)}
                                    className='mb-6'
                                >
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-white/80">Password</FormLabel>
                                                <FormControl>
                                                    <motion.div whileHover={{ scale: 1.01 }}>
                                                        <Input 
                                                            type="password" 
                                                            placeholder="Enter your password" 
                                                            {...field} 
                                                            className="bg-white/10 border-white/20 text-white placeholder-white/50 focus-visible:ring-white/50"
                                                        />
                                                    </motion.div>
                                                </FormControl>
                                                <FormMessage className="text-red-300" />
                                            </FormItem>
                                        )}
                                    />
                                </motion.div>

                                <motion.div 
                                    variants={fadeIn('up', 'tween', 0.7, 1)}
                                    className='mt-6'
                                >
                                    <Button 
                                        type="submit" 
                                        className="w-full bg-white text-blue-600 hover:bg-white/90 h-11 text-sm font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Sign In
                                    </Button>

                                    <motion.div 
                                        className='mt-6 text-sm flex justify-center items-center gap-2 text-white/80'
                                        variants={fadeIn('up', 'tween', 0.8, 1)}
                                    >
                                        <p>Don&apos;t have account?</p>
                                        <Link 
                                            className='text-white font-semibold hover:underline hover:text-white/90 cursor-pointer transition-colors duration-300'
                                            to={RouteSignUp}
                                        >
                                            Sign Up
                                        </Link>
                                    </motion.div>
                                </motion.div>
                            </motion.form>
                        </Form>
                    </Card>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}

export default SignIn