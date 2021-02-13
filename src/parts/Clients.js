import React from "react";

export default function Clients() {
    return (
        <div className="flex justify-center items-center">
            <div className="w-1/6">
                <img
                    src="/images/logo-amazon.svg"
                    alt="amazon"
                    className="mx-auto"
                />
            </div>
            <div className="w-1/6">
                <img
                    src="/images/logo-microsoft.svg"
                    alt="microsoft"
                    className="mx-auto"
                />
            </div>
            <div className="w-1/6">
                <img
                    src="/images/logo-tesla.svg"
                    alt="tesla"
                    className="mx-auto"
                />
            </div>
            <div className="w-1/6">
                <img
                    src="/images/logo-google.svg"
                    alt="google"
                    className="mx-auto"
                />
            </div>
            <div className="w-1/6">
                <img
                    src="/images/logo-facebook.svg"
                    alt="facebook"
                    className="mx-auto"
                />
            </div>
        </div>
    );
}
