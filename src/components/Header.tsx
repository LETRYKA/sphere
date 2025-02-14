"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Clapperboard, Menu } from 'lucide-react';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DataType } from "@/types/DataType";
import { GenreMenu } from "@/components"
import Link from "next/link";
import axios from "axios";

const Header = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [showInput, setShowInput] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [genreData, setGenreData] = useState([])
    const [menuToggle, setMenuToggle] = useState(false);
    const router = useRouter();

    const fetchGenre = async () => {
        try {
            setIsLoading(true);
            const genre = await axios.get(
                `${process.env.TMDB_BASE_URL}/genre/movie/list?language=en`,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
                    },
                    params: {
                        language: "en-US",
                        append_to_response: "images,credits,videos",
                        include_image_language: "en",
                    },
                }
            );
            setGenreData(genre.data.genres);
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            setErrorMessage("Failed to fetch popular movies.");
            console.error(err);
        }
    };

    const inputHandler = (e: any) => {
        setInputValue(e.target.value)
    }

    const inputShow = () => {
        setShowInput(prev => !prev);
    };


    const searchHandler = (inputValue: string) => {
        if (inputValue) {
            if (inputValue.length > 0) {
                router.push(`/search?id=${inputValue}`);
                setInputValue("");
            }
        }
    }

    const handleKeyDown = (event: any, inputValue: string) => {
        if (event.key === "Enter") {
            searchHandler(inputValue);
            inputShow();
        }
    };

    const handlerMenu = () => {
        setMenuToggle(prev => !prev);
    };

    useEffect(() => {
        fetchGenre();
    }, []);

    return (
        <div className="w-full h-20 bg-gradient-to-b from-[#0E1012]/50 to-[black]/0 flex justify-between z-30 pr-10 pl-10 lg:pl-24 lg:pr-24">
            <div className="flex flex-row h-full w-auto justify-start items-center gap-10 mt-2 z-10">
                <a href="/home"><img src="/imgs/logo.png" width={90} /></a>
                <div className="hidden sm:flex">
                    <GenreMenu />
                </div>
                <input
                    onKeyDown={(e) => handleKeyDown(e, inputValue)}
                    type="text"
                    placeholder="Search"
                    onChange={inputHandler}
                    className={`bg-transparent outline-none border-b-2 text-[--text-color] pb-1 transition-all duration-500 -ml-2 ${showInput ? 'w-20 sm:w-52' : 'w-0'}`}
                />
                <Search
                    onClick={() => (inputShow(), searchHandler(inputValue))}
                    color="white"
                    className="flex cursor-pointer -ml-6"
                />
            </div>
            <div className="flex flex-row h-full w-auto justify-start items-center mt-2">
                <Menu className="flex stroke-[--text-color] mr-5 cursor-pointer lg:hidden" />
                <p className="hidden text-base text-[--text-color] mr-4 lg:flex z-10">Hello!</p>
                <Avatar onClick={handlerMenu} className="relative cursor-pointer hidden sm:flex">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>

                <div className={`absolute ${menuToggle ? `flex` : `hidden`} top-20 right-24 rounded-lg bg-[--darker-background] flex-col justify-start items-start`}>
                    <div className="pl-5 pr-14 py-5">
                        <div className="w-full flex flex-row gap-3 justify-start items-center cursor-pointer group">
                            <Avatar className="w-9 h-9">
                                <AvatarImage src="https://ih1.redbubble.net/image.618410924.2644/flat,750x1000,075,t.u12.jpg" />
                                <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                            <p className="text-white/70 text-sm transition-all group-hover:ml-1">Default</p>
                        </div>
                        <div className="w-full flex flex-row gap-3 justify-start items-center mt-4 cursor-pointer group">
                            <Avatar className="w-9 h-9">
                                <AvatarImage src="https://cdn-icons-png.flaticon.com/512/399/399281.png" />
                                <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                            <p className="text-white/70 text-sm transition-all group-hover:ml-1">Add User</p>
                        </div>
                        <div className="w-full flex flex-col mt-6 gap-3 mb-5">
                            <Link href={`/profile`}>
                                <p className="text-[--text-color] font-regular text-sm transition-all hover:text-[--secondary-active] cursor-pointer">My Profile</p>
                            </Link>
                            <p className="text-[--text-color] font-regular text-sm transition-all hover:text-[--secondary-active] cursor-pointer">Continue Watching</p>
                            <p className="text-[--text-color] font-regular text-sm transition-all hover:text-[--secondary-active] cursor-pointer">Liked</p>
                            <p className="text-[--text-color] font-regular text-sm transition-all hover:text-[--secondary-active] cursor-pointer">Watchlist</p>
                            <hr className="my-3 border-t-white/10" />
                            <Link href={`/subscription`}>
                                <p className="text-[--text-color] font-regular text-sm transition-all hover:text-[--secondary-active] cursor-pointer">My Subscription</p>
                            </Link>
                            <p className="text-[--text-color] font-regular text-sm transition-all hover:text-[red] cursor-pointer">Logout</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Header;
