import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useSidebar } from './sidebarContext';
import { Button } from '../../base';

export default function SideBar() {
    const router = useRouter();
    const { pathname } = router;
    const { isCollapsed, toggleSidebar, isProductExpanded, toggleProductExpansion, isReportExpanded, toggleReportExpansion } = useSidebar();

    const isActiveRoute = (route: string) => pathname === route || pathname.startsWith(route);

    const getNavLinkClass = (route: string) => {
        const baseClass = 'stroke-gray-600 hover:stroke-purple-1 hover:text-purple-1 hover:bg-white text-gray-3';
        const activeClass = 'text-purple-1 bg-purple-3 stroke-purple-1';

        if (isCollapsed) {
            return isActiveRoute(route) ? activeClass : baseClass;
        } else {
            return pathname === route ? activeClass : baseClass;
        }
    };

    return (
        <div 
            className={`fixed h-screen bg-gray-6 transition-all duration-300 z-50
            ${ isCollapsed ? 'w-[100px]' : 'w-[300px]' }`}
        >
            {/* TOP SIDEBAR */}
            <Link
                href={'/dashboard/home'}
            >
                <div 
                    className={`w-full h-[100px] bg-purple-2 p-6 flex gap-2 items-center 
                    ${ isCollapsed ? 'justify-start' : 'justify-start' }`}
                >
                        <Image
                            src="/logo.svg"
                            alt="elola logo"
                            width="50"
                            height="50"
                        />
                        {!isCollapsed && (
                            <svg 
                                width="100" 
                                height="50" 
                                viewBox="0 0 212 66" 
                                fill="white"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M136.96 66C135.958 66 135.457 65.5874 135.457 64.7622V1.23781C135.457 0.412604 135.958 0 136.96 0H155.954C156.956 0 157.457 0.412604 157.457 1.23781V64.7622C157.457 65.5874 156.956 66 155.954 66H136.96Z"/>
                                <path d="M96.3366 66C95.4166 66 94.6166 65.66 93.9366 64.98L81.9366 52.98C81.2966 52.34 80.9766 51.54 80.9766 50.58V15.42C80.9766 14.46 81.2966 13.66 81.9366 13.02L93.9366 1.02C94.6166 0.339998 95.4166 0 96.3366 0H114.577C115.497 0 116.297 0.339998 116.977 1.02L128.977 13.02C129.617 13.66 129.937 14.46 129.937 15.42V50.58C129.937 51.54 129.617 52.34 128.977 52.98L116.977 64.98C116.297 65.66 115.497 66 114.577 66H96.3366ZM105.337 46.02H105.457C106.257 46.02 106.877 45.8 107.317 45.36C107.757 44.92 107.977 44.3 107.977 43.5V22.5C107.977 21.7 107.757 21.08 107.317 20.64C106.877 20.2 106.257 19.98 105.457 19.98H105.277C104.477 19.98 103.877 20.2 103.477 20.64C103.117 21.08 102.937 21.7 102.937 22.5V43.5C102.937 44.3 103.137 44.92 103.537 45.36C103.977 45.8 104.577 46.02 105.337 46.02Z"/>
                                <path d="M55.9598 66C54.9579 66 54.457 65.5874 54.457 64.7622V1.23781C54.457 0.412604 54.9579 0 55.9598 0H74.9543C75.9561 0 76.457 0.412604 76.457 1.23781V64.7622C76.457 65.5874 75.9561 66 74.9543 66H55.9598Z"/>
                                <path d="M24.48 66C24.2 66 23.9 65.96 23.58 65.88C23.3 65.8 23 65.68 22.68 65.52L11.7 60.3L1.08 55.2C0.36 54.88 0 54.08 0 52.8V15.42C0 14.46 0.32 13.66 0.96 13.02L12.96 1.02C13.64 0.339998 14.44 0 15.36 0H33.6C34.52 0 35.32 0.339998 36 1.02L48 13.02C48.64 13.66 48.96 14.46 48.96 15.42V40.02H22.8V42.3L27.78 44.52L39.3 47.82C39.74 47.86 39.96 48.48 39.96 49.68V64.5C39.96 65.5 39.46 66 38.46 66H24.48ZM25.26 28.62H25.38C26.9 28.62 28.04 28.18 28.8 27.3C29.6 26.42 30 25.12 30 23.4V23.22C30 21.5 29.6 20.2 28.8 19.32C28.04 18.44 26.9 18 25.38 18H25.2C23.8 18 22.7 18.44 21.9 19.32C21.14 20.2 20.76 21.5 20.76 23.22V23.4C20.76 25.12 21.14 26.42 21.9 27.3C22.66 28.18 23.78 28.62 25.26 28.62Z"/>
                                <path d="M186.938 2.14011e-06C187.218 2.11563e-06 187.518 0.040003 187.838 0.120005C188.118 0.200007 188.418 0.320002 188.738 0.480005L199.718 5.7L210.338 10.8C211.058 11.12 211.418 11.92 211.418 13.2L211.418 50.58C211.418 51.54 211.098 52.34 210.458 52.98L198.458 64.98C197.778 65.66 196.978 66 196.058 66L177.818 66C176.898 66 176.098 65.66 175.418 64.98L163.418 52.98C162.778 52.34 162.458 51.54 162.458 50.58L162.458 25.98L188.618 25.98L188.618 23.7L183.638 21.48L172.118 18.18C171.678 18.14 171.458 17.52 171.458 16.32L171.458 1.5C171.458 0.500003 171.958 3.4497e-06 172.958 3.36228e-06L186.938 2.14011e-06ZM186.158 37.38L186.038 37.38C184.518 37.38 183.378 37.82 182.618 38.7C181.818 39.58 181.418 40.88 181.418 42.6L181.418 42.78C181.418 44.5 181.818 45.8 182.618 46.68C183.378 47.56 184.518 48 186.038 48L186.218 48C187.618 48 188.718 47.56 189.518 46.68C190.278 45.8 190.658 44.5 190.658 42.78L190.658 42.6C190.658 40.88 190.278 39.58 189.518 38.7C188.758 37.82 187.638 37.38 186.158 37.38Z"/>
                            </svg>
                        )}
                </div>
            </Link>
            {/* SIDEBAR BUTTON */}
            <button
                className={`absolute top-[50px] transform -translate-y-1/2 p-2 bg-purple-2 drop-shadow-xl font-black text-white rounded transition-transform duration-300 hover:brightness-110
                ${ isCollapsed ? 'translate-x-[85px]' : 'translate-x-[285px]' }`}
                onClick={toggleSidebar}
            >
                {isCollapsed ? '>' : '<'}
            </button>


            {/* SIDEBAR NAVIGATION */}
            <div className={`text-xl font-semibold p-6 w-full flex flex-col items-center justify-start}`}>

                <Link href='/dashboard/home' className='w-full'>
                    <div className={`p-2 flex items-center gap-2 w-auto rounded-xl transition-transform duration-1000 ${getNavLinkClass('/dashboard/home')}`}>
                        <div className='p-1 items-center'>
                            <svg 
                                width="28" 
                                height="24" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path 
                                    d="M2.25 12L11.204 3.04501C11.644 2.60601 12.356 2.60601 12.795 3.04501L21.75 12M4.5 9.75001V19.875C4.5 20.496 5.004 21 5.625 21H9.75V16.125C9.75 15.504 10.254 15 10.875 15H13.125C13.746 15 14.25 15.504 14.25 16.125V21H18.375C18.996 21 19.5 20.496 19.5 19.875V9.75001M8.25 21H16.5" 
                                    stroke="currentColor"
                                    strokeWidth="1.5" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <span className={`transition duration-100 delay-100 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}> Dashboard</span>
                    </div>
                </Link>

                <Link href='/dashboard/product' className='w-full'>
                    <div
                        className={`p-2 flex items-center gap-2 w-auto rounded-xl transition-transform duration-1000 
                        ${getNavLinkClass('/dashboard/product')}`}
                        onClick={toggleProductExpansion}
                    >
                        <div className='p-1 items-center'>
                            <svg 
                                width="28" 
                                height="24" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path 
                                    d="M20.25 7.5L19.625 18.132C19.5913 18.705 19.3399 19.2436 18.9222 19.6373C18.5045 20.031 17.952 20.2502 17.378 20.25H6.622C6.04796 20.2502 5.49555 20.031 5.07783 19.6373C4.66011 19.2436 4.40868 18.705 4.375 18.132L3.75 7.5M10 11.25H14M3.375 7.5H20.625C21.246 7.5 21.75 6.996 21.75 6.375V4.875C21.75 4.254 21.246 3.75 20.625 3.75H3.375C2.754 3.75 2.25 4.254 2.25 4.875V6.375C2.25 6.996 2.754 7.5 3.375 7.5Z" 
                                    stroke="currentColor" 
                                    strokeWidth="1.5" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        <span className={`transition duration-100 delay-100 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>Product</span>
                        {!isCollapsed && (
                            <div className='w-full flex justify-end items-end'>
                                <svg
                                className={`transform transition-transform duration-300 ${isProductExpanded ? 'rotate-0' : 'rotate-90'}`}
                                width="24" 
                                height="24" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path 
                                        d="M19.5 8.25L12 15.75L4.5 8.25" 
                                        stroke="currentColor" 
                                        strokeWidth="1.5" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        )}
                    </div>

                    {/* Sub-links */}
                    {isProductExpanded && !isCollapsed && (
                        <div className='border-gray-5 border-l-2 ml-6 pl-3'>
                            <Link href='/dashboard/product/category' className='w-full'>
                                <div 
                                    className={`pl-3 p-2 flex items-center gap-2 w-auto rounded-xl transition-transform duration-1000 
                                    ${getNavLinkClass('/dashboard/product/category')}`}
                                >
                                    <span>Category</span>
                                </div>
                            </Link>
                            <Link href='/dashboard/product/product' className='w-full'>
                                <div 
                                    className={`pl-3 p-2 flex items-center gap-2 w-auto rounded-xl transition-transform duration-1000 
                                    ${getNavLinkClass('/dashboard/product/product')}`}
                                >
                                    <span>Product</span>
                                </div>
                            </Link>
                        </div>
                    )}
                </Link>

                <Link href='/dashboard/tax' className='w-full'>
                    <div 
                        className={`p-2 flex items-center gap-2 w-auto rounded-xl transition-transform duration-1000 
                        ${getNavLinkClass('/dashboard/tax')}`}
                    >
                        <div className='p-1 items-center'>
                            <svg
                                width="28" 
                                height="24" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path 
                                    d="M7.848 8.24999L9.384 9.13699M7.848 8.24999C7.65245 8.59392 7.39081 8.89578 7.07812 9.13819C6.76544 9.38059 6.4079 9.55875 6.02608 9.66242C5.64426 9.76608 5.24571 9.79319 4.85337 9.74219C4.46103 9.6912 4.08265 9.5631 3.74002 9.36528C3.39739 9.16745 3.09727 8.90381 2.85694 8.58952C2.61662 8.27524 2.44083 7.91652 2.3397 7.53402C2.23858 7.15153 2.21411 6.7528 2.26771 6.36081C2.3213 5.96882 2.45191 5.5913 2.652 5.24999C3.05265 4.56657 3.70736 4.06936 4.47325 3.86687C5.23913 3.66438 6.05402 3.77305 6.74008 4.16916C7.42615 4.56527 7.92768 5.21667 8.13525 5.98119C8.34281 6.74572 8.23955 7.56131 7.848 8.24999ZM9.384 9.13699C9.70799 9.32386 9.97805 9.59148 10.1678 9.91377C10.3576 10.2361 10.4607 10.602 10.467 10.976C10.472 11.327 10.521 11.671 10.607 12M9.384 9.13699L11.461 10.336M10.607 12C10.521 12.33 10.472 12.673 10.467 13.025C10.4605 13.3988 10.3574 13.7645 10.1676 14.0866C9.97781 14.4087 9.70785 14.6762 9.384 14.863M10.607 12C10.767 11.3897 11.0585 10.8218 11.461 10.336M11.461 10.336C12.0005 9.68378 12.7195 9.20429 13.529 8.95699L18.854 7.32899C19.6602 7.08228 20.5195 7.06704 21.334 7.28499L22.137 7.49999L14.343 12M7.848 15.75L9.384 14.863M7.848 15.75C8.04809 16.0913 8.1787 16.4688 8.2323 16.8608C8.28589 17.2528 8.26142 17.6515 8.1603 18.034C8.05917 18.4165 7.88339 18.7752 7.64306 19.0895C7.40273 19.4038 7.10262 19.6675 6.75998 19.8653C6.41735 20.0631 6.03897 20.1912 5.64664 20.2422C5.2543 20.2932 4.85574 20.2661 4.47392 20.1624C4.09211 20.0588 3.73456 19.8806 3.42188 19.6382C3.1092 19.3958 2.84755 19.0939 2.652 18.75C2.26045 18.0613 2.15719 17.2457 2.36476 16.4812C2.57232 15.7167 3.07386 15.0653 3.75992 14.6692C4.44598 14.2731 5.26087 14.1644 6.02676 14.3669C6.79264 14.5694 7.44735 15.0666 7.848 15.75ZM9.384 14.863L11.461 13.664M11.461 13.664C12.0005 14.3161 12.7196 14.7956 13.529 15.043L18.855 16.672C19.6613 16.9184 20.5206 16.9333 21.335 16.715L22.137 16.5L14.343 12M11.461 13.664L14.343 12" 
                                    stroke="currentColor" 
                                    strokeWidth="1.5" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        <span className={`transition duration-100 delay-100 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}> Tax</span>
                    </div>
                </Link>

                <Link href='/dashboard/payment' className='w-full'>
                    <div 
                        className={`p-2 flex items-center gap-2 w-auto rounded-xl transition-transform duration-1000 
                        ${getNavLinkClass('/dashboard/payment')}`}
                    >
                        <div className='p-1 items-center'>
                            <svg 
                                width="28" 
                                height="24" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path 
                                    d="M12 6V18M9 15.182L9.879 15.841C11.05 16.72 12.949 16.72 14.121 15.841C15.293 14.962 15.293 13.538 14.121 12.659C13.536 12.219 12.768 12 12 12C11.275 12 10.55 11.78 9.997 11.341C8.891 10.462 8.891 9.038 9.997 8.159C11.103 7.28 12.897 7.28 14.003 8.159L14.418 8.489M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z"                                    
                                    stroke="currentColor" 
                                    strokeWidth="1.5" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"                                    
                                />
                            </svg>
                        </div>
                        <span className={`transition duration-100 delay-100 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}> Payment</span>
                    </div>
                </Link>

                <Link href='/dashboard/driverpartner' className='w-full'>
                    <div 
                        className={`p-2 flex items-center gap-2 w-auto rounded-xl transition-transform duration-1000 
                        ${getNavLinkClass('/dashboard/driverpartner')}`}
                    >
                        <div className='p-1 items-center'>
                            <svg 
                                width="28" 
                                height="24" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path 
                                    d="M15.75 6C15.75 6.99456 15.3549 7.94839 14.6516 8.65165C13.9484 9.35491 12.9945 9.75 12 9.75C11.0054 9.75 10.0516 9.35491 9.34833 8.65165C8.64506 7.94839 8.24998 6.99456 8.24998 6C8.24998 5.00544 8.64506 4.05161 9.34833 3.34835C10.0516 2.64509 11.0054 2.25 12 2.25C12.9945 2.25 13.9484 2.64509 14.6516 3.34835C15.3549 4.05161 15.75 5.00544 15.75 6ZM4.50098 20.118C4.53311 18.1504 5.33731 16.2742 6.74015 14.894C8.14299 13.5139 10.0321 12.7405 12 12.7405C13.9679 12.7405 15.857 13.5139 17.2598 14.894C18.6626 16.2742 19.4668 18.1504 19.499 20.118C17.1464 21.1968 14.5881 21.7535 12 21.75C9.32398 21.75 6.78398 21.166 4.50098 20.118Z"
                                    stroke="currentColor" 
                                    strokeWidth="1.5" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        <span className={`transition duration-200 delay-100 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}> Partner</span>
                    </div>
                </Link>

                <Link href='/dashboard/promo' className='w-full'>
                    <div 
                        className={`p-2 flex items-center gap-2 w-auto rounded-xl transition-transform duration-1000 
                        ${getNavLinkClass('/dashboard/promo')}`}
                    >
                        <div className='p-1 items-center'>
                            <svg
                                width="28" 
                                height="24" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path 
                                    d="M8.98999 14.993L14.99 8.99301M20.99 11.994C20.99 13.262 20.36 14.384 19.397 15.063C19.5007 15.6558 19.46 16.2648 19.2784 16.8385C19.0969 17.4123 18.7798 17.9338 18.354 18.359C17.9288 18.7849 17.4073 19.102 16.8335 19.2836C16.2598 19.4651 15.6508 19.5058 15.058 19.402C14.7122 19.8945 14.2528 20.2964 13.7188 20.5737C13.1847 20.851 12.5917 20.9955 11.99 20.995C10.722 20.995 9.59999 20.365 8.92199 19.402C8.32922 19.5058 7.72018 19.4651 7.14644 19.2836C6.5727 19.102 6.05116 18.7849 5.62599 18.359C5.20003 17.9337 4.88284 17.412 4.70129 16.8381C4.51973 16.2642 4.47915 15.6549 4.58299 15.062C4.09057 14.7162 3.68872 14.2568 3.41143 13.7228C3.13414 13.1887 2.98958 12.5957 2.98999 11.994C2.98999 10.726 3.61999 9.60401 4.58299 8.92601C4.47915 8.33309 4.51973 7.72387 4.70129 7.14996C4.88284 6.57605 5.20003 6.05434 5.62599 5.62901C6.05126 5.20331 6.57284 4.88635 7.14657 4.70497C7.72031 4.52359 8.3293 4.48313 8.92199 4.58701C9.26766 4.09435 9.72698 3.69225 10.261 3.41478C10.7951 3.13731 11.3882 2.99264 11.99 2.99301C13.258 2.99301 14.38 3.62301 15.058 4.58601C15.6508 4.48226 16.2598 4.52288 16.8335 4.70443C17.4073 4.88599 17.9288 5.20314 18.354 5.62901C18.78 6.05434 19.0971 6.57605 19.2787 7.14996C19.4603 7.72387 19.5008 8.33309 19.397 8.92601C19.8894 9.27186 20.2913 9.73123 20.5686 10.2653C20.8458 10.7993 20.9904 11.3923 20.99 11.994ZM9.73999 9.74301H9.74799V9.75001H9.73999V9.74301ZM10.115 9.74301C10.115 9.84247 10.0755 9.93785 10.0052 10.0082C9.93483 10.0785 9.83945 10.118 9.73999 10.118C9.64053 10.118 9.54515 10.0785 9.47483 10.0082C9.4045 9.93785 9.36499 9.84247 9.36499 9.74301C9.36499 9.64356 9.4045 9.54817 9.47483 9.47785C9.54515 9.40752 9.64053 9.36801 9.73999 9.36801C9.83945 9.36801 9.93483 9.40752 10.0052 9.47785C10.0755 9.54817 10.115 9.64356 10.115 9.74301ZM14.24 14.243H14.248V14.251H14.24V14.243ZM14.615 14.243C14.615 14.3425 14.5755 14.4379 14.5052 14.5082C14.4348 14.5785 14.3394 14.618 14.24 14.618C14.1405 14.618 14.0452 14.5785 13.9748 14.5082C13.9045 14.4379 13.865 14.3425 13.865 14.243C13.865 14.1436 13.9045 14.0482 13.9748 13.9778C14.0452 13.9075 14.1405 13.868 14.24 13.868C14.3394 13.868 14.4348 13.9075 14.5052 13.9778C14.5755 14.0482 14.615 14.1436 14.615 14.243Z" 
                                    stroke="currentColor" 
                                    strokeWidth="1.5" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        <span className={`transition duration-100 delay-100 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}> Promo</span>
                    </div>
                </Link>

                <Link href='/dashboard/staff' className='w-full'>
                    <div 
                        className={`p-2 flex items-center gap-2 w-auto rounded-xl transition-transform duration-1000 
                        ${getNavLinkClass('/dashboard/staff')}`}
                    >
                        <div className='p-1 items-center'>
                            <svg 
                                width="28" 
                                height="24" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path 
                                    d="M15 19.128C15.853 19.3757 16.7368 19.5009 17.625 19.5C19.0534 19.5021 20.4633 19.1764 21.746 18.548C21.7839 17.6517 21.5286 16.7675 21.0188 16.0293C20.509 15.2912 19.7724 14.7394 18.9207 14.4575C18.0691 14.1757 17.1487 14.1791 16.2992 14.4674C15.4497 14.7557 14.7173 15.313 14.213 16.055M15 19.128V19.125C15 18.012 14.714 16.965 14.213 16.055M15 19.128V19.234C13.0755 20.3931 10.8706 21.0038 8.62402 21C6.29302 21 4.11202 20.355 2.25002 19.234L2.24902 19.125C2.24826 17.7095 2.71864 16.3339 3.58601 15.2153C4.45338 14.0966 5.6684 13.2984 7.03951 12.9466C8.41063 12.5948 9.85985 12.7093 11.1587 13.2721C12.4575 13.8349 13.5321 14.814 14.213 16.055M12 6.375C12 7.27011 11.6444 8.12855 11.0115 8.76149C10.3786 9.39442 9.52013 9.75 8.62502 9.75C7.72992 9.75 6.87147 9.39442 6.23854 8.76149C5.6056 8.12855 5.25002 7.27011 5.25002 6.375C5.25002 5.47989 5.6056 4.62145 6.23854 3.98851C6.87147 3.35558 7.72992 3 8.62502 3C9.52013 3 10.3786 3.35558 11.0115 3.98851C11.6444 4.62145 12 5.47989 12 6.375ZM20.25 8.625C20.25 9.32119 19.9735 9.98887 19.4812 10.4812C18.9889 10.9734 18.3212 11.25 17.625 11.25C16.9288 11.25 16.2612 10.9734 15.7689 10.4812C15.2766 9.98887 15 9.32119 15 8.625C15 7.92881 15.2766 7.26113 15.7689 6.76884C16.2612 6.27656 16.9288 6 17.625 6C18.3212 6 18.9889 6.27656 19.4812 6.76884C19.9735 7.26113 20.25 7.92881 20.25 8.625Z"                                    
                                    stroke="currentColor" 
                                    strokeWidth="1.5" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"                                    
                                />
                            </svg>
                        </div>
                        <span className={`transition duration-100 delay-100 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}> Staff</span>
                    </div>
                </Link>

                <Link 
                    href='/dashboard/report'
                    className='w-full'
                >
                    <div 
                        className={`p-2 flex items-center gap-2 w-auto rounded-xl transition-transform duration-1000 
                        ${getNavLinkClass('/dashboard/report')}`}
                        onClick={toggleReportExpansion}
                    >
                        <div className='p-1 items-center'>
                            <svg 
                                width="28" 
                                height="24" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path 
                                    d="M9 12H12.75M9 15H12.75M9 18H12.75M15.75 18.75H18C18.5967 18.75 19.169 18.5129 19.591 18.091C20.0129 17.669 20.25 17.0967 20.25 16.5V6.108C20.25 4.973 19.405 4.01 18.274 3.916C17.9 3.88498 17.5256 3.85831 17.151 3.836M17.151 3.836C17.2174 4.05109 17.2501 4.27491 17.25 4.5C17.25 4.69891 17.171 4.88968 17.0303 5.03033C16.8897 5.17098 16.6989 5.25 16.5 5.25H12C11.586 5.25 11.25 4.914 11.25 4.5C11.25 4.269 11.285 4.046 11.35 3.836M17.151 3.836C16.868 2.918 16.012 2.25 15 2.25H13.5C13.0192 2.25011 12.5511 2.40414 12.1643 2.68954C11.7774 2.97493 11.492 3.3767 11.35 3.836M11.35 3.836C10.974 3.859 10.6 3.886 10.226 3.916C9.095 4.01 8.25 4.973 8.25 6.108V8.25M8.25 8.25H4.875C4.254 8.25 3.75 8.754 3.75 9.375V20.625C3.75 21.246 4.254 21.75 4.875 21.75H14.625C15.246 21.75 15.75 21.246 15.75 20.625V9.375C15.75 8.754 15.246 8.25 14.625 8.25H8.25ZM6.75 12H6.758V12.008H6.75V12ZM6.75 15H6.758V15.008H6.75V15ZM6.75 18H6.758V18.008H6.75V18Z"                                    
                                    stroke="currentColor" 
                                    strokeWidth="1.5" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        <span className={`transition duration-100 delay-100 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}> Report</span>
                        {!isCollapsed && (
                            <div className='w-full flex justify-end items-end'>
                                <svg
                                className={`transform transition-transform duration-300 ${isReportExpanded ? 'rotate-0' : 'rotate-90'}`}
                                width="24" 
                                height="24" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path 
                                        d="M19.5 8.25L12 15.75L4.5 8.25" 
                                        stroke="currentColor" 
                                        strokeWidth="1.5" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        )}
                    </div>

                    {/* Sub-links */}
                    {isReportExpanded && !isCollapsed && (
                        <div className='border-gray-5 border-l-2 ml-6 pl-3'>
                            <Link href='/dashboard/report/transaction' className='w-full'>
                                <div 
                                    className={`pl-3 p-2 flex items-center gap-2 w-auto rounded-xl transition-transform duration-1000 
                                    ${getNavLinkClass('/dashboard/report/transaction')}`}
                                >
                                    <span>Transaction</span>
                                </div>
                            </Link>
                            <Link href='/dashboard/report/payment' className='w-full'>
                                <div 
                                    className={`pl-3 p-2 flex items-center gap-2 w-auto rounded-xl transition-transform duration-1000 
                                    ${getNavLinkClass('/dashboard/report/payment')}`}
                                >
                                    <span>Payment</span>
                                </div>
                            </Link>
                            <Link href='/dashboard/report/openclose' className='w-full'>
                                <div 
                                    className={`pl-3 p-2 flex items-center gap-2 w-auto rounded-xl transition-transform duration-1000 
                                    ${getNavLinkClass('/dashboard/report/openclose')}`}
                                >
                                    <span>Open/Close</span>
                                </div>
                            </Link>
                            <Link href='/dashboard/report/promo' className='w-full'>
                                <div 
                                    className={`pl-3 p-2 flex items-center gap-2 w-auto rounded-xl transition-transform duration-1000 
                                    ${getNavLinkClass('/dashboard/report/promo')}`}
                                >
                                    <span>Promo</span>
                                </div>
                            </Link>
                            <Link href='/dashboard/report/tax' className='w-full'>
                                <div 
                                    className={`pl-3 p-2 flex items-center gap-2 w-auto rounded-xl transition-transform duration-1000 
                                    ${getNavLinkClass('/dashboard/report/tax')}`}
                                >
                                    <span>Tax</span>
                                </div>
                            </Link>
                            <Link href='/dashboard/report/driverpartner' className='w-full'>
                                <div 
                                    className={`pl-3 p-2 flex items-center gap-2 w-auto rounded-xl transition-transform duration-1000 
                                    ${getNavLinkClass('/dashboard/report/driverpartner')}`}
                                >
                                    <span>Driver Partner</span>
                                </div>
                            </Link>
                        </div>
                    )}
                </Link>
            </div>

            {/* LOGOUT */}
            <div className='flex bottom-0 items-end justify-start pt-24 p-6'>
                <Button 
                    className='flex justify-between items-center p-0 h-[50px] bg-red-300 rounded-[10px] hover:bg-red-300/75'
                    
                >
                    <div>
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            strokeWidth="1.5" 
                            stroke="currentColor"
                            className='p-2 h-[50px] stroke-red-500'
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                        </svg>
                    </div>
                    <span 
                    className={`text-xl transition px-6 text-red-500
                    ${isCollapsed ? 'duration-100 ease-in opacity-0' : 'delay-300 duration-600 ease-out opacity-100'}`}
                    >
                        Log Out
                    </span>
                </Button>
            </div>
        </div>
    );
}