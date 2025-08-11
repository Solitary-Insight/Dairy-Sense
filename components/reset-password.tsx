"use client"

import type React from "react"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Lock, CheckCircle, AlertCircle } from "lucide-react"
import { useLanguage } from "@/hooks/useLanguage"
import { OwnController } from "@/app/register/controller/Owner.Controller"

type FormState = "initial" | "loading" | "success" | "error"

class ErrKey {
    static PASS_MIN_LENGTH = "PASS_MIN_LENGTH"
    static PASS_WEAK = "PASS_WEAK"
    static RESET_EXPIRED = "RESET_EXPIRED"
    static PASS_MISMATCH = "PASS_MISMATCH"
    static RESET_SUCCESS = "RESET_SUCCESS"
    static RESET_FAILED = "RESET_FAILED"
}

export default function ResetPassword() {
    const searchParams = useSearchParams()
    const token = searchParams.get("token")

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [state, setState] = useState<FormState>("initial")
    const [errorMessageKey, setErrorMessage] = useState("")

    const { language_strings, language, meta } = useLanguage()
    const RESET_PASS_TEXTS = language_strings['reset_password']
    const PASS_MSGS = language_strings.err_msg
    const validatePassword = (pwd: string) => {
        if (pwd.length < 8) return "PASS_MIN_LENGTH"
        if (!/(?=.*[a-z])/.test(pwd)) return "PASS_WEAK"
        if (!/(?=.*[A-Z])/.test(pwd)) return "PASS_WEAK"
        if (!/(?=.*\d)/.test(pwd)) return "PASS_WEAK"
        return null
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setState("loading")

        // Validate passwords
        const passwordErrorKEY = validatePassword(password)
        if (passwordErrorKEY) {
            setState("error")
            setErrorMessage(passwordErrorKEY)
            return
        }

        if (password !== confirmPassword) {
            setState("error")
            setErrorMessage(ErrKey.PASS_MISMATCH)
            return
        }

        const owner_controller = new OwnController()
        console.log('token', token)
        await owner_controller.resetPassword(
            {
                password,
                token,
                onSuccess: () => {
                    setState("success")
                }
                , onFailure: () => {
                    setState("error")
                    setErrorMessage(ErrKey.RESET_FAILED)
                    return
                }
                ,
                onTokenInvalid: () => {
                    setState("error")
                    setErrorMessage(ErrKey.RESET_EXPIRED)
                    return
                }
            })


        // Simulate token validation (replace with actual logic)
        if (!token || token === "invalid") {


        }


    }

    if (!token) {
        return (
            <div className="min-h-screen bg-green-50 flex items-center justify-center">
                <Card className="w-full max-w-md">
                    <CardContent className="pt-6">
                        <Alert className="border-red-200 bg-red-50">
                            <AlertCircle className="h-4 w-4 text-red-600" />
                            <AlertDescription className="text-red-800">
                                {RESET_PASS_TEXTS.alert_invalid_token}
                            </AlertDescription>
                        </Alert>
                        <div className="mt-4 text-center">
                            <Button asChild className="bg-green-600 text-white">
                                <Link href="/forgot-password">{RESET_PASS_TEXTS.alert_button_request_reset}</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <main className="container mx-auto px-4 py-16">
                <div className="max-w-md mx-auto">
                    <Card className="border-0 shadow-lg">
                        <CardHeader className="text-center pb-6">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                {state === "success" ? (
                                    <CheckCircle className="w-6 h-6 text-green-600" />
                                ) : (
                                    <Lock className="w-6 h-6 text-green-600" />
                                )}
                            </div>
                            <CardTitle className="text-2xl font-bold text-gray-900">
                                {state === "success" ? RESET_PASS_TEXTS.title_success : RESET_PASS_TEXTS.title_reset}
                            </CardTitle>
                            <CardDescription className="text-gray-600">
                                {state === "success"
                                    ? RESET_PASS_TEXTS.description_success
                                    : RESET_PASS_TEXTS.description_reset}
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            {state === "success" ? (
                                <div className="space-y-6">
                                    <Alert className="border-green-200 bg-green-50">
                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                        <AlertDescription className="text-green-800">
                                            {RESET_PASS_TEXTS.alert_success}
                                        </AlertDescription>
                                    </Alert>

                                    <Button asChild className="w-full bg-green-600 text-white h-11">
                                        <Link href="/login">{RESET_PASS_TEXTS.button_continue_login}</Link>
                                    </Button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {state === "error" && (
                                        <Alert className="border-red-200 bg-red-50">
                                            <AlertCircle className="h-4 w-4 text-red-600" />
                                            <AlertDescription className="text-red-800">
                                                {PASS_MSGS[errorMessageKey]}
                                            </AlertDescription>
                                        </Alert>
                                    )}

                                    <div className="space-y-2">
                                        <Label htmlFor="password">{RESET_PASS_TEXTS.input_password_label}</Label>
                                        <div className="relative">
                                            <Input
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                placeholder={RESET_PASS_TEXTS.input_password_placeholder}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                                className="h-11 pr-10"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="w-4 h-4" />
                                                ) : (
                                                    <Eye className="w-4 h-4" />
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="confirmPassword">{RESET_PASS_TEXTS.input_confirm_password_label}</Label>
                                        <div className="relative">
                                            <Input
                                                id="confirmPassword"
                                                type={showConfirmPassword ? "text" : "password"}
                                                placeholder={RESET_PASS_TEXTS.input_confirm_password_placeholder}
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                required
                                                className="h-11 pr-10"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                            >
                                                {showConfirmPassword ? (
                                                    <EyeOff className="w-4 h-4" />
                                                ) : (
                                                    <Eye className="w-4 h-4" />
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="text-xs text-gray-600 space-y-1">
                                        <p>{RESET_PASS_TEXTS.password_requirements_label}</p>
                                        <ul className="list-disc list-inside space-y-1 ml-2">
                                            <li>{RESET_PASS_TEXTS.password_requirements.min_length}</li>
                                            <li>{RESET_PASS_TEXTS.password_requirements.uppercase}</li>
                                            <li>{RESET_PASS_TEXTS.password_requirements.lowercase}</li>
                                            <li>{RESET_PASS_TEXTS.password_requirements.number}</li>
                                        </ul>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full bg-green-600 text-white h-11"
                                        disabled={state === "loading"}
                                    >
                                        {state === "loading"
                                            ? RESET_PASS_TEXTS.button_updating
                                            : RESET_PASS_TEXTS.button_update_password}
                                    </Button>
                                </form>
                            )}
                        </CardContent>
                    </Card>

                    {/* Trust indicators */}
                    <div className="flex items-center justify-center space-x-6 mt-8 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                            <span>{RESET_PASS_TEXTS.trust.secure_private}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                            <span>{RESET_PASS_TEXTS.trust.iso_certified}</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
