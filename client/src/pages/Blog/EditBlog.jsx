import React, { useEffect, useState } from 'react';
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useFetch } from '@/hooks/useFetch';
import Dropzone from 'react-dropzone';
import Editor from '@/components/Editor';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RouteBlog } from '@/helpers/RouteName';
import { decode } from 'entities';
import Loading from '@/components/Loading';
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

const EditBlog = () => {
    const { blogid } = useParams();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const { data: categoryData } = useFetch(
        `${getEvn('VITE_API_BASE_URL')}/category/all-category`,
        {
            method: 'get',
            credentials: 'include',
        }
    );

    const { data: blogData, loading: blogLoading } = useFetch(
        `${getEvn('VITE_API_BASE_URL')}/blog/edit/${blogid}`,
        {
            method: 'get',
            credentials: 'include',
        },
        [blogid]
    );

    const [filePreview, setPreview] = useState();
    const [file, setFile] = useState();

    const formSchema = z.object({
        category: z.string().min(3, 'Category must be at least 3 character long.'),
        title: z.string().min(3, 'Title must be at least 3 character long.'),
        slug: z.string().min(3, 'Slug must be at least 3 character long.'),
        blogContent: z.string().min(3, 'Blog content must be at least 3 character long.'),
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            category: '',
            title: '',
            slug: '',
            blogContent: '',
        },
    });

    useEffect(() => {
        if (blogData) {
            setPreview(blogData.blog.featuredImage);
            form.setValue('category', blogData.blog.category._id);
            form.setValue('title', blogData.blog.title);
            form.setValue('slug', blogData.blog.slug);
            form.setValue('blogContent', decode(blogData.blog.blogContent));
        }
    }, [blogData, form]);

    const handleEditorData = (event, editor) => {
        const data = editor.getData();
        form.setValue('blogContent', data);
    };

    const blogTitle = form.watch('title');

    useEffect(() => {
        if (blogTitle) {
            const slug = slugify(blogTitle, { lower: true });
            form.setValue('slug', slug);
        }
    }, [blogTitle, form]);

    async function onSubmit(values) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('data', JSON.stringify(values));

            const response = await fetch(
                `${getEvn('VITE_API_BASE_URL')}/blog/update/${blogid}`,
                {
                    method: 'put',
                    credentials: 'include',
                    body: formData,
                }
            );
            const data = await response.json();
            if (!response.ok) {
                return showToast('error', data.message);
            }
            form.reset();
            setFile();
            setPreview();
            navigate(RouteBlog);
            showToast('success', data.message);
        } catch (error) {
            showToast('error', error.message);
        }
    }

    const handleFileSelection = (files) => {
        const file = files[0];
        const preview = URL.createObjectURL(file);
        setFile(file);
        setPreview(preview);
    };

    if (blogLoading) return <Loading />;

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
                    className="pt-8 md:pt-10 lg:pt-12 shadow-lg rounded-md bg-white" // Added shadow and rounded corners
                >
                    <CardContent className="p-6 md:p-8 lg:p-10">
                        <motion.h1 className="text-2xl font-bold mb-6 text-gray-800" // Updated typography
                            initial={{ opacity: 0, y: -15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            Edit Blog
                        </motion.h1>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <div className="mb-4">
                                    <FormField
                                        control={form.control}
                                        name="category"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-700 font-semibold">Category</FormLabel>
                                                <FormControl>
                                                    <motion.div variants={inputAnimation} initial="initial" animate="animate">
                                                        <Select onValueChange={field.onChange} value={field.value}>
                                                            <SelectTrigger className="bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500 shadow-sm">
                                                                <SelectValue placeholder="Select" />
                                                            </SelectTrigger>
                                                            <SelectContent className="rounded-md shadow-md bg-white">
                                                                {categoryData &&
                                                                    categoryData.category.length > 0 &&
                                                                    categoryData.category.map((category) => (
                                                                        <SelectItem
                                                                            key={category._id}
                                                                            value={category._id}
                                                                            className="hover:bg-violet-100 focus:bg-violet-100" // Hover effect
                                                                        >
                                                                            {category.name}
                                                                        </SelectItem>
                                                                    ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </motion.div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="mb-4">
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-700 font-semibold">Title</FormLabel>
                                                <FormControl>
                                                    <motion.div variants={inputAnimation} initial="initial" animate="animate">
                                                        <Input
                                                            placeholder="Enter blog title"
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
                                <div className="mb-4">
                                    <FormField
                                        control={form.control}
                                        name="slug"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-700 font-semibold">Slug</FormLabel>
                                                <FormControl>
                                                    <motion.div variants={inputAnimation} initial="initial" animate="animate">
                                                        <Input
                                                            placeholder="Slug"
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
                                <div className="mb-4">
                                    <span className="mb-2 block text-gray-700 font-semibold">Featured Image</span>
                                    <Dropzone onDrop={acceptedFiles => handleFileSelection(acceptedFiles)}>
                                        {({ getRootProps, getInputProps }) => (
                                            <motion.div
                                                {...getRootProps()}
                                                className="flex justify-center items-center w-full h-32 border-2 border-dashed rounded-md border-gray-400 bg-gray-100 cursor-pointer hover:border-violet-500 transition-colors duration-200" // Dropzone styling with hover
                                            >
                                                <input {...getInputProps()} />
                                                {filePreview ? (
                                                    <img src={filePreview} alt="Preview" className="max-h-full max-w-full rounded-md object-contain" />
                                                ) : (
                                                    <span className="text-gray-500">Drag 'n' drop an image here, or click to select files</span>
                                                )}
                                            </motion.div>
                                        )}
                                    </Dropzone>
                                </div>
                                <div className="mb-6">
                                    <FormField
                                        control={form.control}
                                        name="blogContent"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-700 font-semibold">Blog Content</FormLabel>
                                                <FormControl>
                                                    <motion.div variants={inputAnimation} initial="initial" animate="animate">
                                                        <Editor
                                                            props={{
                                                                initialData: field.value,
                                                                onChange: handleEditorData,
                                                            }}
                                                        />
                                                    </motion.div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <motion.div whileHover="hover" whileTap="tap" variants={buttonAnimation}>
                                    <Button type="submit" className="w-full bg-violet-500 hover:bg-violet-600 cursor-alias text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-violet-400">
                                        Update Blog
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

export default EditBlog;