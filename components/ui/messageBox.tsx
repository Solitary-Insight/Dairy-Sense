'use client'
import { useLanguage } from '@/hooks/useLanguage';
import { reduceArraytoObject } from '@/lib/Utils/Browser/browserUtils';
import clsx from 'clsx'
import { AlertCircle, AlertTriangle, CheckCircle, X } from 'lucide-react';
import React from 'react'

const ICONS = {
    SUCCESS: <CheckCircle className="m-2  text-green-600 w-8 h-8 mr-2" />,
    ERROR: <AlertCircle className="m-2  text-red-600 w-8 h-8 mr-2" />,
    WARNING: <AlertTriangle className=" m-2  text-yellow-600 w-8 h-8 mr-2" />,
    BLANK: <></>
};

const STYLES = {
    SUCCESS: "bg-green-50 text-green-800 border-green-300",
    BLANK: "bg-green-50 text-green-800 border-green-300",
    ERROR: "bg-red-50 text-red-800 border-red-300",
    WARNING: "bg-yellow-50 text-yellow-800 border-yellow-300",
};
export default function MessageBox({ closeMessage, message }) {

    const { language } = useLanguage()
    return (
        <div className="w-full mt-1 mb-1">
            {/* ------------------------------------------------------ */}
            {/* ----- Message Box -------------- */}
            {message?.message && message?.type && (
                <div
                    className={clsx(
                        "flex w-full items-center justify-between px-4 py-3 rounded-lg border shadow-md transition-all duration-300 animate-fadeIn",
                        STYLES[message.type]
                    )}
                >
                    <div className="flex items-center">
                        {ICONS[message.type]}
                        <span className="text-sm font-medium">
                            {reduceArraytoObject(language, message.message)}
                        </span>
                    </div>
                    {!message.collapsable && (
                        <button onClick={() => closeMessage()}>
                            <X className="bg-gray-900 p-1 h-5 w-5 rounded-full text-gray-100 hover:bg-red-800" />
                        </button>
                    )}
                </div>
            )}
            {/* ------------------------------------------------------ */}
        </div>
    );
}
