import React from "react";
import { Pencil, Plus } from "lucide-react";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";

const ProfilePage = () => {
    const location = useLocation();

    const { userData } = location.state || {};
    
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <div className="text-center mt-14">
                <div className="relative inline-block">
                    <img
                        src="https://images.unsplash.com/photo-1618641986557-1ecd230959aa?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Profile"
                        className="w-36 h-36 rounded-full border-2 border-blue-500 object-cover mx-auto"
                    />
                    <button className="absolute bottom-2 right-2 bg-red-400 text-white p-2 rounded-full shadow">
                        <Pencil size={14} />
                    </button>
                </div>

                <h2 className="text-xl font-semibold mt-4">{userData?.name}</h2>
                <p className="text-gray-500 text-sm">{userData?.email}</p>
            </div>


            <div className="w-[1232px] h-[560px] bg-gray-50 rounded-[16px] opacity-100 mx-auto mt-14 shadow-sm pt-8 pr-6 pb-8 pl-6 flex flex-col gap-8">
                <h3 className="text-2xl font-semibold bg-white">Account</h3>

                <div className="space-y-8 bg-white">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-gray-500">Name</p>
                            <p className="font-medium mt-1">{userData?.name}</p>
                        </div>
                        <button className="flex items-center gap-1 border border-blue-600 text-blue-600 px-3 py-1.5 rounded-md text-sm hover:bg-blue-50 transition">
                            <Pencil size={14} />
                            Change
                        </button>
                    </div>

                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium mt-1">{userData?.email}</p>
                        </div>
                        <div className="flex gap-3">
                            <button className="flex items-center gap-1 border border-blue-600 text-blue-600 px-3 py-1.5 rounded-md text-sm hover:bg-blue-50 transition">
                                <Pencil size={14} />
                                Change
                            </button>
                            <button className="flex items-center gap-1 border border-blue-600 text-blue-600 px-3 py-1.5 rounded-md text-sm hover:bg-blue-50 transition">
                                <Plus size={14} />
                                Add another email
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-gray-500">Password</p>
                            <p className="font-medium mt-1">***************</p>
                        </div>
                        <button className="flex items-center gap-1 border border-blue-600 text-blue-600 px-3 py-1.5 rounded-md text-sm hover:bg-blue-50 transition">
                            <Pencil size={14} />
                            Change
                        </button>
                    </div>

                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-gray-500">Phone number</p>
                            <p className="font-medium mt-1">+91 99999 99999</p>
                        </div>
                        <button className="flex items-center gap-1 border border-blue-600 text-blue-600 px-3 py-1.5 rounded-md text-sm hover:bg-blue-50 transition">
                            <Pencil size={14} />
                            Change
                        </button>
                    </div>

                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-gray-500">Address</p>
                            <p className="font-medium mt-1">
                                St 32 main downtown, Los Angeles, California, USA
                            </p>
                        </div>
                        <button className="flex items-center gap-1 border border-blue-600 text-blue-600 px-3 py-1.5 rounded-md text-sm hover:bg-blue-50 transition">
                            <Pencil size={14} />
                            Change
                        </button>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Date of birth</p>
                        <p className="font-medium mt-1">01-01-1992</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;