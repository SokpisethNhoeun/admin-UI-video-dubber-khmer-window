"use client";
import { Button } from "@/components/ui/button";
export default function ErrorPage({reset}:{error:Error;reset:()=>void}){return <div className="card mx-auto mt-24 max-w-lg p-8 text-center"><div className="text-3xl">!</div><h1 className="mt-3 text-lg font-semibold">We couldn’t load this page</h1><p className="mt-2 text-sm text-gray-500">Check that the API is online and your server environment is configured.</p><Button className="mt-5" onClick={reset}>Try again</Button></div>}
