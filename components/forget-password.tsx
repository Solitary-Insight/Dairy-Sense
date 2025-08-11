"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Mail, AlertCircle, CheckCircle } from "lucide-react"
import { useLanguage } from "@/hooks/useLanguage"
import { OwnController } from "@/app/register/controller/Owner.Controller"

type FormState = "initial" | "loading" | "success" | "error"

class ErrType{
    static NOT_FOUND="NOT_FOUND"
    static SERVER_ERROR="SERVER_ERROR"
    static FOUND="FOUND"
}

export default function ForgotPassword() {
    const [email, setEmail] = useState("")
    const [state, setState] = useState<FormState>("initial")
    const [errorMessage, setErrorMessage] = useState("")
    const { language_strings, meta, dir } = useLanguage()
    const [err,setErrType] =useState('')
    
    const FORGET_MESSAGE_TEXTS = language_strings['forgot_password']

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setState("loading")

        // Simulate API call
        const controller = new OwnController()
        await controller.forgotPassword(
            {
                email,
                onSent: () => {
                    setState("success")
                    setErrType(ErrType.FOUND)
                },
                onNoAccountFound: () => {
                    setState("error")
                    setErrType(ErrType.NOT_FOUND)

                },
                onSendFailure: () => {
                    setState("error")
                    setErrType(ErrType.SERVER_ERROR)

                }
            })

       
    }

    const resetForm = () => {
        setState("initial")
        setEmail("")
        setErrorMessage("")
    }

    return (
        <div className="min-h-screen w-100  ">


            <main className="container mx-auto px-4 py-16">
                <div className="max-w-md mx-auto">
                    <Card className="border-0 shadow-lg">
                        <CardHeader className="text-center pb-6">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Mail className="w-6 h-6 text-green-600" />
                            </div>
                            <CardTitle className="text-2xl font-bold text-gray-900">
                                {state === "success" ? FORGET_MESSAGE_TEXTS.label_check_your_email : FORGET_MESSAGE_TEXTS.label_forgot_password}
                            </CardTitle>
                            <CardDescription className="text-gray-600">
                                {state === "success"
                                    ? FORGET_MESSAGE_TEXTS.label_email_sent
                                    : FORGET_MESSAGE_TEXTS.label_enter_your_email}
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            {state === "success" ? (
                                <div className="space-y-6">
                                    <Alert className="border-green-200 bg-green-50">
                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                        <AlertDescription className="text-green-800">
                                            {FORGET_MESSAGE_TEXTS.label_email_sent_to_email_pre}  <strong>{email}</strong> {FORGET_MESSAGE_TEXTS.label_email_sent_to_email_post}
                                        </AlertDescription>
                                    </Alert>

                                    <div className="text-center space-y-4">
                                        <p className="text-sm text-gray-600">
                                            {FORGET_MESSAGE_TEXTS.didnt_receive_email}
                                        </p>
                                        <Button variant="outline" onClick={resetForm} className="w-full bg-transparent">
                                            {FORGET_MESSAGE_TEXTS.try_dif_email}
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {state === "error" && (
                                        <Alert className="border-red-200 bg-red-50">
                                            <AlertCircle className="h-4 w-4 text-red-600" />
                                            <AlertDescription className="text-red-800">{err==ErrType.NOT_FOUND?FORGET_MESSAGE_TEXTS.message_no_account:FORGET_MESSAGE_TEXTS.email_sent_failed}</AlertDescription>
                                        </Alert>
                                    )}

                                    <div className="space-y-2">
                                        <Label htmlFor="email">{FORGET_MESSAGE_TEXTS.label_email}</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="Enter your email address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="h-11"
                                        />
                                    </div>

                                    <Button type="submit" className="w-full bg-green-600 text-white h-11" disabled={state === "loading"}>
                                        {state === "loading" ? FORGET_MESSAGE_TEXTS.action_sending : FORGET_MESSAGE_TEXTS.action_send_link}
                                    </Button>
                                </form>
                            )}

                            <div className="mt-6 text-center">
                                <Link href="/login" className="inline-flex items-center text-sm text-green-600 font-medium">
                                    <ArrowLeft className="w-4 h-4 mr-1" />
                                    {FORGET_MESSAGE_TEXTS.action_back}
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Trust indicators */}
                    <div className="flex items-center justify-center space-x-6 mt-8 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                            <span>{FORGET_MESSAGE_TEXTS.f_secure}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                            <span>{FORGET_MESSAGE_TEXTS.f_iso_cert}</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
