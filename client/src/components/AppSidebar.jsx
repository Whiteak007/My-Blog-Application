import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import logo from '@/assets/images/logo-white.png';
import { IoHomeOutline } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
import { GrBlog } from "react-icons/gr";
import { FaRegComments } from "react-icons/fa6";
import { LuUsers } from "react-icons/lu";
import { GoDot } from "react-icons/go";
import { RouteBlog, RouteBlogByCategory, RouteCategoryDetails, RouteCommentDetails, RouteIndex, RouteUser } from "@/helpers/RouteName";
import { useFetch } from "@/hooks/useFetch";
import { getEvn } from "@/helpers/getEnv";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const AppSidebar = () => {
    const user = useSelector(state => state.user);
    const { data: categoryData } = useFetch(`${getEvn('VITE_API_BASE_URL')}/category/all-category`, {
        method: 'get',
        credentials: 'include'
    });
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const location = useLocation();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth < 768) {
                setIsCollapsed(true);
            } else {
                setIsCollapsed(false);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <Sidebar isCollapsed={isCollapsed} className="transition-all duration-300 ease-in-out">
            <SidebarHeader className="bg-gradient-to-tr from-gray-300 to-red-300 py-4 flex items-center justify-center">
                <Link to={RouteIndex} onClick={() => window.scrollTo(0, 0)} className="block">
                    <img src={logo} width={isCollapsed ? 60 : 120} alt="App Logo" className="transition-all duration-300 ease-in-out" />
                </Link>
                {isMobile && (
                    <button
                        onClick={toggleCollapse}
                        className="absolute top-2 right-2 p-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                    >
                        {isCollapsed ? <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 11-2 0v-3a1 1 0 000-2h2zm-1 4a1 1 0 102 0v-1a1 1 0 10-2 0v1z" clipRule="evenodd" />
                        </svg>}
                    </button>
                )}
            </SidebarHeader>
            <SidebarContent className="bg-gradient-to-r from-blue-300 to-pink-200 py-4">
                <SidebarGroup>
                    <SidebarMenu>
                        <SidebarMenuItem className={`rounded-md transition-colors duration-200 ${location.pathname === RouteIndex ? 'bg-blue-400 text-white' : 'hover:bg-blue-400'}`}>
                            <SidebarMenuButton className={`mt-2 py-2 px-4 flex items-center text-red-600 ${location.pathname === RouteIndex ? 'text-white font-bold' : 'text-gray-700 hover:text-red-600 hover:font-bold'}`}>
                                <IoHomeOutline className="mr-2" />
                                <Link to={RouteIndex} onClick={() => window.scrollTo(0, 0)} className={`${isCollapsed && 'hidden'} text-sm font-medium`}>Home</Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        {user && user.isLoggedIn && (
                            <>
                                <SidebarMenuItem className={`rounded-md transition-colors duration-200 ${location.pathname === RouteBlog ? 'bg-blue-400 text-white' : 'hover:bg-blue-400'}`}>
                                    <SidebarMenuButton className={`py-2 px-4 flex items-center ${location.pathname === RouteBlog ? 'text-white font-bold' : 'text-gray-700 hover:text-red-600 hover:font-bold'}`}>
                                        <GrBlog className="mr-2" />
                                        <Link to={RouteBlog} onClick={() => window.scrollTo(0, 0)} className={`${isCollapsed && 'hidden'} text-sm font-medium`}>Blogs</Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem className={`rounded-md transition-colors duration-200 ${location.pathname === RouteCommentDetails ? 'bg-blue-400 text-white' : 'hover:bg-blue-400'}`}>
                                    <SidebarMenuButton className={`py-2 px-4 flex items-center ${location.pathname === RouteCommentDetails ? 'text-white font-bold' : 'text-gray-700 hover:text-red-600 hover:font-bold'}`}>
                                        <FaRegComments className="mr-2" />
                                        <Link to={RouteCommentDetails} onClick={() => window.scrollTo(0, 0)} className={`${isCollapsed && 'hidden'} text-sm font-medium`}>Comments</Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </>
                        )}

                        {user && user.isLoggedIn && user.user.role === 'admin' && (
                            <>
                                <SidebarMenuItem className={`rounded-md transition-colors duration-200 ${location.pathname === RouteCategoryDetails ? 'bg-blue-400 text-white' : 'hover:bg-blue-400'}`}>
                                    <SidebarMenuButton className={`py-2 px-4 flex items-center ${location.pathname === RouteCategoryDetails ? 'text-white font-bold' : 'text-gray-700 hover:text-red-600 hover:font-bold'}`}>
                                        <BiCategoryAlt className="mr-2" />
                                        <Link to={RouteCategoryDetails} onClick={() => window.scrollTo(0, 0)} className={`${isCollapsed && 'hidden'} text-sm font-medium`}>Categories</Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>

                                <SidebarMenuItem className={`rounded-md transition-colors duration-200 ${location.pathname === RouteUser ? 'bg-blue-400 text-white' : 'hover:bg-blue-400'}`}>
                                    <SidebarMenuButton className={`py-2 px-4 flex items-center ${location.pathname === RouteUser ? 'text-white font-bold' : 'text-gray-700 hover:text-red-600 hover:font-bold'}`}>
                                        <LuUsers className="mr-2" />
                                        <Link to={RouteUser} onClick={() => window.scrollTo(0, 0)} className={`${isCollapsed && 'hidden'} text-sm font-medium`}>Users</Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </>
                        )}
                    </SidebarMenu>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel className={`${isCollapsed && 'hidden'} text-xs font-semibold text-gray-600 uppercase tracking-wider`}>
                        Categories
                    </SidebarGroupLabel>
                    <SidebarMenu>
                        {categoryData && categoryData.category.length > 0 &&
                            categoryData.category.map(category => (
                                <SidebarMenuItem
                                    key={category._id}
                                    className={`rounded-md transition-colors duration-200 ${location.pathname === RouteBlogByCategory(category.slug) ? 'bg-blue-400 text-white' : 'hover:bg-blue-400'}`}
                                >
                                    <SidebarMenuButton className={`py-2 px-4 flex items-center ${location.pathname === RouteBlogByCategory(category.slug) ? 'text-white font-bold' : 'text-gray-700 hover:text-red-600 hover:font-bold'}`}>
                                        <GoDot className="mr-2 text-blue-500" />
                                        <Link
                                            to={RouteBlogByCategory(category.slug)}
                                            onClick={() => window.scrollTo(0, 0)}
                                            className={`${isCollapsed && 'hidden'} text-sm font-medium truncate`}
                                        >
                                            {category.name}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
};

export default AppSidebar;