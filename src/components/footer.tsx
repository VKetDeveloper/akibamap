import { Layout } from 'antd';
import Link from 'next/link';
import { useEffect } from 'react';
import Image from 'next/image';

const { Footer: AntFooter } = Layout;

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://images.dmca.com/Badges/DMCABadgeHelper.min.js';
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <AntFooter className="bg-gray-800 text-white py-6">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/img/logo.png"
                            alt="VRUGD Logo"
                            width={120}
                            height={40}
                            className="h-auto"
                        />
                    </Link>
                </div>
                <div className="text-center md:text-right">
                    <p className="text-white text-sm mt-4">
                        Copyright © 2024 - {currentYear} VketReal Unofficial Garage Developers. All Rights Reserved.
                    </p>
                </div>
            </div>
        </AntFooter>
    );
};

export default Footer;
