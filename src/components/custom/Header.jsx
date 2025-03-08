import React, {useEffect, useState} from 'react'
import {Button} from "@/components/ui/button.jsx";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
} from "@/components/ui/dialog"
import {googleLogout, useGoogleLogin} from "@react-oauth/google";
import {FcGoogle} from "react-icons/fc";
import axios from "axios";

function Header() {

    const [profile, setProfile] = useState('');
    const [openDialog, setOpenDialog] = useState(false)
    const [loading, setLoading] = useState(false)
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        console.log("user", user);
        fetch(user?.picture)
            .then(res => res.blob())
            .then(imageBlob => {
                const imageUrl = URL.createObjectURL(imageBlob)
                setProfile(imageUrl)
            })
    }, []);

    const login = useGoogleLogin({
        onSuccess: (codeResp) => getUserProfile(codeResp),
        onError: (error) => console.log(error)
    });

    const getUserProfile = (tokenInfo) => {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
            headers: {
                Authorization: `Bearer ${tokenInfo?.access_token}`,
                Accept: 'application/json',
            }
        }).then((res) => {
            console.log(res)
            localStorage.setItem('user', JSON.stringify(res.data))
            setOpenDialog(false)
            window.location.reload()
        })
    }

    return (
        <div className="p3 shadow-sm flex justify-between items-center px-5">
            <img src='/ai-trip.svg'  alt="logo"/>
            <div>
                {user ?
                    <div className="flex items-center gap-5">
                        <a href="/my-trips">
                            <Button variant="outline" className="rounded-full">My Trips</Button>
                        </a>
                        <Popover>
                            <PopoverTrigger>
                                <img src={profile ? profile : '/placeholder.png'}
                                     className="h-[35px] w-[35px] rounded-full"/>
                            </PopoverTrigger>
                            <PopoverContent>
                                <h2 className="cursor-pointer" onClick={() => {
                                    googleLogout();
                                    localStorage.clear()
                                    window.location.reload()
                                }}>Logout</h2>
                            </PopoverContent>
                        </Popover>

                    </div>
                    :
                    <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
                }
                <Dialog open={openDialog}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogDescription>
                                <img src="/ai-trip.svg" />
                                <h2 className="font-bold text-lg mt-7">Sign In with Google</h2>
                                <p>Sign in to the app securely with Google authentication</p>

                                <Button disabled={loading} onClick={login} className="w-full mt-5 flex gap-4 items-center">
                                    <FcGoogle className="h-7 w-7"/>
                                    Sign In with Google
                                </Button>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

export default Header
