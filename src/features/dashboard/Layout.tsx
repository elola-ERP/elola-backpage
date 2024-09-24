import SideBar from '../dashboard/SideBar'
import { ReactNode } from "react";
import { useSidebar } from './SideBar/sidebarContext';

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const { isCollapsed } = useSidebar();

    return (
        <div className='flex h-full'>
            <SideBar />
            <main
                className={`flex-1 p-[20px] h-full transition-all duration-700 ${isCollapsed ? 'ml-[100px]' : 'ml-[300px]'}`}
            >
                {children}
            </main>
        </div>
    )
}
