'use client';
import Image from 'next/image';


const Impact = () => {
    return (
        <div className="flex flex-col items-center h-full gap-10 px-4 md:px-12 mt-6">
            <div className="w-full text-center text-3xl md:text-4xl font-bold text-purple-900">
                Fact you need to know about UV impact
            </div>
            <div className="w-full max-w-[1200px] flex flex-col gap-10">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <Image
                        src="/UVDanger.jpg"
                        alt="UV Danger"
                        className="w-full md:w-1/2 h-auto rounded-xl shadow-md"
                        width={800}
                        height={600}
                    />
                    <div className="md:w-1/2 text-left">
                        <h2 className="text-2xl font-bold mb-4 text-purple-900">
                            The danger of UV
                        </h2>
                        <p className="text-base text-gray-700 mb-2">
                            UV not only damages skin but also harms eyes and accelerates aging. It penetrates the skin layers and can cause long-term cellular damage.
                        </p>
                        <div className="text-right mt-4">
                            <a
                                href="https://mieye.com/protecting-eyes-harmful-uv-rays/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-500 hover:underline"
                            >
                                Learn more
                            </a>
                        </div>
                    </div>
                </div>

                <hr className="border-t border-gray-300 my-4" />

                <div className="flex flex-col md:flex-row items-center gap-6">
                    <Image
                        src="/skin_cancer.jpeg"
                        alt="Skin Cancer Facts"
                        className="w-full md:w-1/2 h-auto rounded-xl shadow-md"
                        width={800}
                        height={600}
                    />
                    <div className="md:w-1/2 text-left">
                        <h2 className="text-2xl font-bold mb-4 text-purple-900">
                            Skin cancer facts in Australia
                        </h2>
                        <p className="text-base text-gray-700 mb-2">
                            Australia has one of the highest rates of skin cancer in the world. Both melanoma and non-melanoma types are prevalent due to high UV exposure.
                        </p>
                        <div className="text-right mt-4">
                            <a
                                href="https://www.spotscreen.com.au/info-centre/skin-cancer-information/skin-cancer-facts/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-500 hover:underline"
                            >
                                Learn more
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {/* Learn more */}
            <div className="w-full max-w-[1200px] text-center text-md">
                <a
                    href="https://www.cancer.org.au/cancer-information/causes-and-prevention/sun-safety"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:underline"
                >
                    &gt;&gt;&gt; Learn more about how to protect your skin
                </a>
            </div>
        </div>
    );
}


export default Impact;