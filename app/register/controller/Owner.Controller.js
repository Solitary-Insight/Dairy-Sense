
import React from 'react'
import { NameValidator, PhoneValidator, EmailValidator, PasswordStrengthValidator, PasswordValidator } from '@/lib/Utils/App/Validators/FormValidators'
import { OwnerService } from './OwnerService';
import { FLAG_SAVE_LOGIN_MAIL, FLAG_SAVE_LOGIN_PASS } from '@/lib/Constants/App/Keys.js';
import { HttpStatusCode } from 'axios';


export class OwnController {
    constructor() { }

    // INFO: Validate Owner Data ----------------
    validateOwnerPersonalInfo(data) {
        const { firstName, lastName, email, phone, password, confirmPassword, onResponse, } = data;
        if (!NameValidator(firstName, () => {
            onResponse(['err_msg', 'INVALID_NAME'], "ERROR");


        })) return false;

        if (!NameValidator(lastName, () => {
            onResponse(['err_msg', 'INVALID_NAME'], "ERROR");


        })) return false;

        if (!EmailValidator(email, () => {
            onResponse(['err_msg', 'INVALID_EMAIL'], "ERROR");

        })) return false;

        if (!PhoneValidator(phone, () => {
            onResponse(['err_msg', 'INVALID_PHONE'], "ERROR");
        })) return false;

        if (!PasswordStrengthValidator(password, confirmPassword, (KEY) => {
            onResponse(['err_msg', KEY], "ERROR");
        })) return false;




        return true;
    }





    // INFO: OWNER ACCOUTN REGISTRATION 
    async register({ firstName, lastName, phone, email, password, confirmPassword, onResponse = ({ message, type }) => { }, onSuccess = (id) => { } }) {
        if (!this.validateOwnerPersonalInfo({ firstName, lastName, phone, email, password, confirmPassword, onResponse })) return
        const owner_service = new OwnerService()
        try {
            const response = await owner_service.createOwner({ firstName, lastName, phone, email, password });
            console.log("Owner Created:", response);
            onSuccess({ uid: response.userId, otpSendTime: response.otpTime })

        } catch (err) {

            console.error("Create failed:", err.response?.data || err.message);
            onResponse(['http_messages', `${err.status}`], "ERROR")
        }
    }


    // INFO: VALIDATE OTP 

  async  validateOtp({ otp, onResponse = ({ message, type }) => { }, onSuccess = () => { } }) {
        const owner_service = new OwnerService()

        try {
            const response = await owner_service.validateOwnerOtp({ otp });
            console.log("Owner Validated:", response);
            onResponse(['otp', 'otp_msgs', `${response.status}`], "SUCCESS")

            onSuccess()

        } catch (err) {

            console.error("Valiation failed:", err.response?.data || err.message);
            onResponse(['otp', 'otp_msgs', `${err.status}`], "ERROR")
        }
    }



    // INFO: VALIDATE EMAIL AND PASSWORD:
  async  validateLoginForm(payload) {
        const { email, password, onResponse } = payload

        const field_params = [
            { value: email, validator: EmailValidator, faild_msg_seq: ['err_msg', 'INVALID_EMAIL'] },
            { value: password, validator: PasswordValidator, faild_msg_seq: ['err_msg', 'PASS_MIN_LENGTH'] },
        ]

        for (const field of field_params) {
            if (!field.validator(field.value)) {
                console.log(`Failed at field: ${field.faild_msg_seq[1]}`);
                onResponse(field.faild_msg_seq, "ERROR");
                return false; // stop on first failure
            }
        }
        return true;

    }




    // INFO: OWNER ACCOUNT LOGIN

    login = async (payload) => {
        const { email, password, rememberMe, onResponse, onSuccess } = payload

        if (this.validateLoginForm(payload)) {
            setTimeout(() => {
                if (rememberMe) {
                    localStorage.setItem(FLAG_SAVE_LOGIN_MAIL, email)
                    localStorage.setItem(FLAG_SAVE_LOGIN_PASS, password)
                } else {
                    localStorage.setItem(FLAG_SAVE_LOGIN_MAIL, '')
                    localStorage.setItem(FLAG_SAVE_LOGIN_PASS, '')
                }


            })
            try {
                const owner_service = new OwnerService()

                const response = await owner_service.signin({ email, password });
                console.log("Owner Logged In:", response);
                onResponse(['normal_msg', 'LOGIN_SUCCESS', 'message'], "SUCCESS")

                onSuccess()

            } catch (err) {
                if (!err.status) {
                    err.status = 500
                }
                console.log('err.status', err.status)
                console.error("Valiation failed:", err.response?.data || err.message);
                onResponse(['http_messages', `LOGIN_${err.status}`], "ERROR")
            }
        }
    }


    //INFO FORGET PASSWORD: 
    async forgotPassword({email,onSent,onNoAccountFound,onSendFailure}){
        try {
            const owner_service = new OwnerService()

            const response = await owner_service.forgetPassword({ email });
            console.log("Link sent:", response);

            onSent()

        } catch (err) {
            
            if (!err.status) {
                err.status = 500
                onSendFailure()

            }
            if(err.status==HttpStatusCode.NotFound){
                onNoAccountFound()
                return
            }
            console.log('err.status', JSON.stringify(err))
            console.error("RESET PASS REQ:  failed:", err.response?.data || err.message);
            onSendFailure()
        }

    }


    //INFO FORGET PASSWORD: 
    async resetPassword({password,token,onSuccess,onFailure,onTokenInvalid}){
        try {
            const owner_service = new OwnerService()

            const response = await owner_service.resetPassword({ token,password });
            console.log("Link sent:", response);

            onSuccess()

        } catch (err) {
            
            if (!err.status) {
                err.status = 500
                onFailure()

            }
            if(err.status==HttpStatusCode.Forbidden){
                onTokenInvalid()
                return
            }
            console.log('err.status', JSON.stringify(err))
            console.error("RESET PASS REQ:  failed:", err.response?.data || err.message);
            onFailure()
        }

    }






}
