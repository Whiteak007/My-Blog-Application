import React, { useEffect } from 'react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import slugify from 'slugify';
import { showToast } from '@/helpers/showToast';
import { getEvn } from '@/helpers/getEnv';
import { useParams } from 'react-router-dom';
import { useFetch } from '@/hooks/useFetch';
import { motion } from 'framer-motion'; // Import Framer Motion

const formAnimation = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 },
};

const inputAnimation = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.2, delay: 0.1 },
};

const buttonAnimation = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
};

const EditCategory = () => {
    const { category_id } = useParams();
    const { data: categoryData, loading, error } = useFetch(
        `${getEvn('VITE_API_BASE_URL')}/category/show/${category_id}`,
        {
            method: 'get',
            credentials: 'include',
        },
        [category_id]
    );

    const formSchema = z.object({
        name: z.string().min(3, 'Name must be at least 3 character long.'),
        slug: z.string().min(3, 'Slug must be at least 3 character long.'),
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            slug: '',
        },
    });

    const categoryName = form.watch('name');

    useEffect(() => {
        if (categoryName) {
            const slug = slugify(categoryName, { lower: true });
            form.setValue('slug', slug);
        }
    }, [categoryName, form]);

    useEffect(() => {
        if (categoryData) {
            form.setValue('name', categoryData.category.name);
            form.setValue('slug', categoryData.category.slug);
        }
    }, [categoryData, form]);

    async function onSubmit(values) {
        try {
            const response = await fetch(
                `${getEvn('VITE_API_BASE_URL')}/category/update/${category_id}`,
                {
                    method: 'put',
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify(values),
                }
            );
            const data = await response.json();
            if (!response.ok) {
                return showToast('error', data.message);
            }
            showToast('success', data.message);
        } catch (error) {
            showToast('error', error.message);
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-50 py-10" // Example background
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.Card
                    variants={formAnimation}
                    initial="initial"
                    animate="animate"
                    className="pt-8 md:pt-10 lg:pt-12 shadow-lg rounded-md bg-white max-w-screen-sm mx-auto" // Centered and with max width
                >
                    <CardContent className="p-6 md:p-8 lg:p-10">
                        <motion.h1
                            className="text-2xl font-bold mb-6 text-gray-800" // Updated typography
                            initial={{ opacity: 0, y: -15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            Edit Category
                        </motion.h1>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <div className="mb-4">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-700 font-semibold">Name</FormLabel>
                                                <FormControl>
                                                    <motion.div variants={inputAnimation} initial="initial" animate="animate">
                                                        <Input
                                                            placeholder="Enter category name"
                                                            {...field}
                                                            className="bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500 shadow-sm" // Input styling
                                                        />
                                                    </motion.div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="mb-6">
                                    <FormField
                                        control={form.control}
                                        name="slug"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-700 font-semibold">Slug</FormLabel>
                                                <FormControl>
                                                    <motion.div variants={inputAnimation} initial="initial" animate="animate">
                                                        <Input
                                                            placeholder="Slug (auto-generated)"
                                                            {...field}
                                                            className="bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500 shadow-sm" // Input styling
                                                            readOnly // Indicate it's auto-generated
                                                        />
                                                    </motion.div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <motion.div whileHover="hover" whileTap="tap" variants={buttonAnimation}>
                                    <Button
                                        type="submit"
                                        className="w-full bg-violet-500 hover:bg-violet-600 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-violet-400"
                                    >
                                        Update Category
                                    </Button>
                                </motion.div>
                            </form>
                        </Form>
                    </CardContent>
                </motion.Card>
            </div>
        </motion.div>
    );
};

export default EditCategory;