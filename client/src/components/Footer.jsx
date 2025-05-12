import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import logo from '@/assets/images/logo-white.png'
import logoDemo from '../assets/blogverse.png'

const Footer = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut",
            },
        },
    };

    const hoverEffect = {
        scale: 1.05,
        transition: { duration: 0.2 },
    };

    const tapEffect = {
        scale: 0.95,
    };

    return (
        <motion.footer
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
            className="bg-gradient-to-r from-green-200 to-purple-200 text-gray-600 pt-12 px-6 md:px-16 lg:px-24 xl:px-32"
        >
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-wrap justify-between gap-12 md:gap-8">
                    {/* Logo and Description */}
                    <motion.div
                        variants={itemVariants}
                        className="max-w-80"
                    >
                        <motion.img
                            src={logoDemo}
                            alt="logo"
                            className="mb-[-90px] h-[250px] "
                            whileHover={{ rotate: [-2, 2, -2], transition: { duration: 0.6 } }}
                        />
                        <p className="text-sm leading-relaxed">
                            Discover a world of knowledge at Coderak-blog. We believe that understanding complex subjects shouldn't be complicated. That's why we're dedicated to providing easy-to-grasp explanations across a diverse range of categories..
                        </p>
                        <div className="flex items-center gap-3 mt-4">
                            {['Instagram', 'Facebook', 'Twitter', 'LinkedIn'].map((social) => (
                                <motion.a
                                    key={social}
                                    href="https://github.com/Whiteak007"
                                    aria-label={social}
                                    className="text-gray-500 hover:text-gray-800 transition-colors"
                                    whileHover={hoverEffect}
                                    whileTap={tapEffect}
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        {social === 'Instagram' && (
                                            <path d="M7.75 2A5.75 5.75 0 002 7.75v8.5A5.75 5.75 0 007.75 22h8.5A5.75 5.75 0 0022 16.25v-8.5A5.75 5.75 0 0016.25 2h-8.5zM4.5 7.75A3.25 3.25 0 017.75 4.5h8.5a3.25 3.25 0 013.25 3.25v8.5a3.25 3.25 0 01-3.25 3.25h-8.5a3.25 3.25 0 01-3.25-3.25v-8.5zm9.5 1a4 4 0 11-4 4 4 4 0 014-4zm0 1.5a2.5 2.5 0 102.5 2.5 2.5 2.5 0 00-2.5-2.5zm3.5-.75a.75.75 0 11.75-.75.75.75 0 01-.75.75z" />
                                        )}
                                        {social === 'Facebook' && (
                                            <path d="M13.5 9H15V6.5h-1.5c-1.933 0-3.5 1.567-3.5 3.5v1.5H8v3h2.5V21h3v-7.5H16l.5-3h-3z" />
                                        )}
                                        {social === 'Twitter' && (
                                            <path d="M22 5.92a8.2 8.2 0 01-2.36.65A4.1 4.1 0 0021.4 4a8.27 8.27 0 01-2.6 1A4.14 4.14 0 0016 4a4.15 4.15 0 00-4.15 4.15c0 .32.04.64.1.94a11.75 11.75 0 01-8.52-4.32 4.14 4.14 0 001.29 5.54A4.1 4.1 0 013 10v.05a4.15 4.15 0 003.33 4.07 4.12 4.12 0 01-1.87.07 4.16 4.16 0 003.88 2.89A8.33 8.33 0 012 19.56a11.72 11.72 0 006.29 1.84c7.55 0 11.68-6.25 11.68-11.67 0-.18 0-.35-.01-.53A8.18 8.18 0 0022 5.92z" />
                                        )}
                                        {social === 'LinkedIn' && (
                                            <path d="M4.98 3.5C3.88 3.5 3 4.38 3 5.48c0 1.1.88 1.98 1.98 1.98h.02c1.1 0 1.98-.88 1.98-1.98C6.98 4.38 6.1 3.5 4.98 3.5zM3 8.75h3.96V21H3V8.75zm6.25 0h3.8v1.68h.05c.53-.98 1.82-2.02 3.75-2.02 4.01 0 4.75 2.64 4.75 6.07V21H17v-5.63c0-1.34-.03-3.07-1.88-3.07-1.88 0-2.17 1.47-2.17 2.98V21H9.25V8.75z" />
                                        )}
                                    </svg>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Company Links */}
                    <motion.div variants={itemVariants}>
                        <motion.p
                            className="text-lg font-medium text-gray-800 mb-3"
                            whileHover={{ x: 2 }}
                        >
                            COMPANY
                        </motion.p>
                        <ul className="flex flex-col gap-3">
                            {['Artificial Intelligence', 'Books & Literature', 'Business', 'Cloud Computing', 'Cybersecurity', ' Latest News', 'Programming', 'Tutorials & Guides'].map((link) => (
                                <motion.li
                                    key={link}
                                    variants={itemVariants}
                                >
                                    <motion.a
                                        href="#"
                                        className="text-sm hover:text-gray-900 transition-colors flex items-center"
                                        whileHover={{ x: 5 }}
                                    >
                                        <motion.span
                                            className="inline-block mr-2 text-xs"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            whileHover={{ scale: 1.5 }}
                                        >
                                            →
                                        </motion.span>
                                        {link}
                                    </motion.a>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Support Links */}
                    <motion.div variants={itemVariants}>
                        <motion.p
                            className="text-lg font-medium text-gray-800 mb-3"
                            whileHover={{ x: 2 }}
                        >
                            SUPPORT
                        </motion.p>
                        <ul className="flex flex-col gap-3">
                            {['Help Center', 'Safety Information', 'Cancellation Options', 'Contact Us', 'Accessibility'].map((link) => (
                                <motion.li
                                    key={link}
                                    variants={itemVariants}
                                >
                                    <motion.a
                                        href="#"
                                        className="text-sm hover:text-gray-900 transition-colors flex items-center"
                                        whileHover={{ x: 5 }}
                                    >
                                        <motion.span
                                            className="inline-block mr-2 text-xs"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            whileHover={{ scale: 1.5 }}
                                        >
                                            →
                                        </motion.span>
                                        {link}
                                    </motion.a>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Newsletter */}
                    <motion.div
                        variants={itemVariants}
                        className="max-w-80"
                    >
                        <motion.p
                            className="text-lg font-medium text-gray-800 mb-3"
                            whileHover={{ x: 2 }}
                        >
                            STAY UPDATED
                        </motion.p>
                        <p className="text-sm leading-relaxed mb-4">
                            Subscribe to our newsletter for inspiration and special offers.
                        </p>
                        <motion.div
                            className="flex items-center"
                            whileHover={{ scale: 1.02 }}
                        >
                            <motion.input
                                type="email"
                                className="bg-white rounded-l-lg border border-gray-300 h-10 px-4 outline-none w-full focus:border-gray-500 focus:ring-1 focus:ring-gray-300 transition-all"
                                placeholder="Your email"
                                aria-label="Email for newsletter subscription"
                                whileFocus={{
                                    scale: 1.02,
                                    boxShadow: "0px 0px 5px rgba(0,0,0,0.1)"
                                }}
                            />
                            <motion.button
                                className="flex items-center justify-center bg-gray-800 hover:bg-gray-900 text-white h-10 w-12 aspect-square rounded-r-lg transition-colors"
                                whileHover={hoverEffect}
                                whileTap={tapEffect}
                                aria-label="Subscribe to newsletter"
                            >
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                                </svg>
                            </motion.button>
                        </motion.div>
                        <motion.p
                            className="text-xs mt-2 text-gray-500"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            We respect your privacy. Unsubscribe at any time.
                        </motion.p>
                    </motion.div>
                </div>

                {/* Divider */}
                <motion.hr
                    className="border-gray-200 my-8"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.8 }}
                />

                {/* Bottom Section */}
                <motion.div
                    className="flex flex-col md:flex-row gap-4 items-center justify-between py-6"
                    variants={containerVariants}
                >
                    <motion.p
                        variants={itemVariants}
                        className="text-sm"
                    >
                        © {new Date().getFullYear()} Coderak-blog. All rights reserved.
                    </motion.p>
                    <motion.ul
                        className="flex items-center gap-4"
                        variants={itemVariants}
                    >
                        {['Privacy', 'Terms', 'Sitemap'].map((link) => (
                            <motion.li
                                key={link}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <a
                                    href="#"
                                    className="text-sm hover:text-gray-900 transition-colors"
                                >
                                    {link}
                                </a>
                            </motion.li>
                        ))}
                    </motion.ul>
                </motion.div>
            </div>
        </motion.footer>
    );
};

export default Footer;