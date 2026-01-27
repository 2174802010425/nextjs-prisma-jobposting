import React from "react";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
export default async function Dashboard ({children} : {children : React.ReactNode}) {
    const session = await auth()

    if(!session) {
        redirect('/auth/signin')
    }
    if (session.user.role !== "ADMIN") {
        redirect('/')
    }

    return (
        <div className="min-h-screen flex bg-zinc-50 dark:bg-zinc-950">
            <Sidebar/>
            <div className="flex-1 flex flex-col">
                <Header/>
                {children}
            </div>
        </div>
    )
}