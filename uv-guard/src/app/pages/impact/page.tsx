'use client';
import Image from 'next/image';


const Impact = () => {
    return (
        <div className="flex flex-col items-center h-full gap-6">
            <div className="w-full max-w-[900px]">
                <Image
                    src="/impact.png"
                    alt="Skin tone categories"
                    className="w-full h-auto rounded-xl shadow-md"
                    width={800}
                    height={600}
                />
            </div>
        </div>
    );
};


export default Impact;