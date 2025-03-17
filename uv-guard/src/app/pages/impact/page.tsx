'use client';
import Image from 'next/image';


const Impact = () => {
    return (
        <div className="flex flex-col items-center h-full gap-6">
            <div className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="flex flex-col justify-center items-center text-center">
                    <h2 className="text-xl font-semibold mb-4">
                        Australia skin cancer rate ranks first among 20 countries
                    </h2>
                    <Image
                        src="/impact.png"
                        alt="Skin tone categories"
                        className="w-full h-auto rounded-xl shadow-md"
                        width={800}
                        height={600}
                    />
                </div>

                <div className="flex flex-col justify-center items-center text-center">
                    <h2 className="text-xl font-semibold mb-4">
                        Average UV index among Australia cities
                    </h2>
                    <Image
                        src="/averageUV.png"
                        alt="UV Impact"
                        className="w-full h-auto rounded-xl shadow-md"
                        width={800}
                        height={600}
                    />
                </div>
            </div>
        </div>
    );
};


export default Impact;