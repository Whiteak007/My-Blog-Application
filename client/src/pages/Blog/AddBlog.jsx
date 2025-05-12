import React, { useEffect, useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import slugify from 'slugify';
import { showToast } from '@/helpers/showToast';
import { getEvn } from '@/helpers/getEnv';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFetch } from '@/hooks/useFetch';
import Dropzone from 'react-dropzone';
import Editor from '@/components/Editor';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RouteBlog } from '@/helpers/RouteName';
import { Loader2, UploadCloud } from 'lucide-react';

const AddBlog = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { data: categoryData, loading, error } = useFetch(`${getEvn('VITE_API_BASE_URL')}/category/all-category`, {
    method: 'GET',
    credentials: 'include'
  });

  const [filePreview, setPreview] = useState();
  const [file, setFile] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSchema = z.object({
    category: z.string().min(1, 'Category is required'),
    title: z.string().min(3, 'Title must be at least 3 characters long'),
    slug: z.string().min(3, 'Slug must be at least 3 characters long'),
    blogContent: z.string().min(10, 'Blog content must be at least 10 characters long'),
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

  const handleEditorData = (event, editor) => {
    const data = editor.getData();
    form.setValue('blogContent', data, { shouldValidate: true });
  };

  const blogTitle = form.watch('title');

  useEffect(() => {
    if (blogTitle) {
      const slug = slugify(blogTitle, { lower: true, strict: true });
      form.setValue('slug', slug, { shouldValidate: true });
    }
  }, [blogTitle]);

  async function onSubmit(values) {
    setIsSubmitting(true);
    try {
      const newValues = { ...values, author: user.user._id };
      
      if (!file) {
        showToast('error', 'Featured image is required');
        setIsSubmitting(false);
        return;
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('data', JSON.stringify(newValues));

      const response = await fetch(`${getEvn('VITE_API_BASE_URL')}/blog/add`, {
        method: 'POST',
        credentials: 'include',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create blog');
      }

      const data = await response.json();
      form.reset();
      setFile();
      setPreview();
      navigate(RouteBlog);
      showToast('success', data.message);
    } catch (error) {
      showToast('error', error.message || 'An error occurred while creating the blog');
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleFileSelection = (files) => {
    const file = files[0];
    if (!file) return;
    
    if (!file.type.match('image.*')) {
      showToast('error', 'Please select an image file');
      return;
    }
    
    const preview = URL.createObjectURL(file);
    setFile(file);
    setPreview(preview);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-2xl font-bold text-gray-800">Create New Blog</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-sm font-medium text-gray-700 mb-1">Category</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={loading}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {loading ? (
                              <SelectItem value="loading" disabled>
                                Loading categories...
                              </SelectItem>
                            ) : error ? (
                              <SelectItem value="error" disabled>
                                Failed to load categories
                              </SelectItem>
                            ) : (
                              categoryData?.category?.map(category => (
                                <SelectItem 
                                  key={category._id} 
                                  value={category._id}
                                  className="hover:bg-gray-100 transition-colors"
                                >
                                  {category.name}
                                </SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />

                {/* Title Field */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-sm font-medium text-gray-700 mb-1">Title</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter blog title" 
                          {...field} 
                          className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />

                {/* Slug Field */}
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-sm font-medium text-gray-700 mb-1">Slug</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Slug will be generated automatically" 
                          {...field} 
                          className="bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />

                {/* Featured Image Field */}
                <div className="col-span-1 md:col-span-2">
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-700 mb-1">Featured Image</FormLabel>
                    <Dropzone 
                      onDrop={acceptedFiles => handleFileSelection(acceptedFiles)}
                      accept={{
                        'image/*': ['.jpeg', '.jpg', '.png', '.webp']
                      }}
                      maxFiles={1}
                    >
                      {({ getRootProps, getInputProps, isDragActive }) => (
                        <div 
                          {...getRootProps()}
                          className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${
                            isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <input {...getInputProps()} />
                          {filePreview ? (
                            <div className="relative group">
                              <img 
                                src={filePreview} 
                                alt="Preview" 
                                className="mx-auto max-h-48 rounded-md object-cover"
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-md transition-opacity duration-200">
                                <span className="text-white font-medium">Click to change</span>
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center space-y-2">
                              <UploadCloud className="h-10 w-10 text-gray-400" />
                              <p className="text-sm text-gray-600">
                                {isDragActive ? 
                                  'Drop the image here' : 
                                  'Drag & drop an image here, or click to select'
                                }
                              </p>
                              <p className="text-xs text-gray-500">Supports: JPEG, JPG, PNG, WEBP</p>
                            </div>
                          )}
                        </div>
                      )}
                    </Dropzone>
                    {!file && form.formState.errors.blogContent && (
                      <p className="text-xs text-red-500 mt-1">Featured image is required</p>
                    )}
                  </FormItem>
                </div>

                {/* Blog Content Field */}
                <div className="col-span-1 md:col-span-2">
                  <FormField
                    control={form.control}
                    name="blogContent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-sm font-medium text-gray-700 mb-1">Blog Content</FormLabel>
                        <FormControl>
                          <Editor 
                            props={{ 
                              initialData: field.value, 
                              onChange: handleEditorData 
                            }} 
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

               <div className="flex justify-end space-x-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate(RouteBlog)}
                  className="hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : 'Submit'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddBlog;