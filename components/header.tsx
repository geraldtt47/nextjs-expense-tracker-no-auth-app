import Image from "next/image";
import React from "react";
import { Separator } from "./ui/separator";
import Link from "next/link";

export default function Header() {
  return (
    <div className="bg-white text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          {/* Logo on the left */}
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="#">
              <span className="sr-only">Your Company</span>
              <Image
                src="/next.svg"
                alt="Your Company Logo"
                width={120}
                height={120}
              />
            </a>
          </div>

          {/* Navigation links in the center */}
          <nav className="hidden md:flex space-x-10">
            <Link
              href="/how-it-works"
              className="text-base font-medium text-black hover:text-gray-800"
            >
              How It Works
            </Link>
            <Link
              href="/pricing"
              className="text-base font-medium text-black hover:text-gray-800"
            >
              Pricing
            </Link>
            <Link
              href="/about-the-company"
              className="text-base font-medium text-black hover:text-gray-800"
            >
              About The Company
            </Link>
          </nav>

          {/* Button on the right */}
          <div className="flex items-center justify-end lg:flex-1 lg:w-0">
            <Link
              href="/sign-in"
              className="whitespace-nowrap text-base font-medium text-black hover:text-gray-800"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-slate-900 hover:bg-slate-700"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      <Separator />
    </div>
  );
}

//<Image src="/next.svg" alt="Your Company Logo" width={120} height={120} />;
