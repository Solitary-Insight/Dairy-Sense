import { CattleCountValidator, CityOrStateValidator, FarmAddressValidator, FarmNameValidator, FarmSizeValidator, FarmTypeValidator, PostalCodeValidator } from '@/lib/Utils/App/Validators/FormValidators'
import { createFarm, FarmService, updateFarm } from '@/app/register/controller/FarmService'
import { FARM_STATUS_UPDATE_FAILED, FARM_STATUS_UPDATE_SUCCESS, FARMS_EXPORT_FAILED, FARMS_EXPORT_SUCCESS } from '@/lib/Constants/Debugging/LogKeys'
import {saveAs} from 'file-saver'
export class FarmController {
    constructor() {

    }
    validateFormFields = (data) => {
        const { farmName, farmAddress, city, state, postalCode, cattleCount, farmSize, farmType, onResponse } = data

        const field_params = [
            { value: farmName, validator: FarmNameValidator, faild_msg_seq: ['err_msg', 'INVALID_FARM_NAME'] },
            { value: farmAddress, validator: FarmAddressValidator, faild_msg_seq: ['err_msg', 'INVALID_FARM_ADDRESS'] },
            { value: city, validator: CityOrStateValidator, faild_msg_seq: ['err_msg', 'INVALID_CITY'] },
            { value: state, validator: CityOrStateValidator, faild_msg_seq: ['err_msg', 'INVALID_STATE'] },
            { value: postalCode, validator: PostalCodeValidator, faild_msg_seq: ['err_msg', 'INVALID_POSTAL_CODE'] },
            { value: cattleCount, validator: CattleCountValidator, faild_msg_seq: ['err_msg', 'INVALID_CATTLE_COUNT'] },
            { value: farmSize, validator: FarmSizeValidator, faild_msg_seq: ['err_msg', 'INVALID_FARM_SIZE'] },
            { value: farmType, validator: FarmTypeValidator, faild_msg_seq: ['err_msg', 'INVALID_FARM_TYPE'] },
        ]

        for (const field of field_params) {
            if (!field.validator(field.value)) {
                console.log(`Failed at field: ${field.faild_msg_seq[1]}`);
                onResponse(field.faild_msg_seq, "ERROR");
                return false; // stop on first failure
            }
        }
        return true; // all fields valid




    }


    // INFO VALIDATE IF USER HAS CHECKED ALL CHECK BOXES 

    validatePlanAgreement = (data) => {
        const { planType, requestDemo, installmentInterest, agreeTerms, agreeMarketing, onResponse } = data
        const field_params = [
            { value: planType, validator: (value) => (value || value.trim() != ""), faild_msg_seq: ['err_msg', 'PLAN_TYPE_ERR'] },
            // { value: requestDemo, validator: (value) => value, faild_msg_seq: ['err_msg', 'REQUEST_DEMO_ERR'] },
            // { value: installmentInterest, validator: (value) => value, faild_msg_seq: ['err_msg', 'INSTALLMENT_INTEREST_ERR'] },
            { value: agreeTerms, validator: (value) => value, faild_msg_seq: ['err_msg', 'AGREE_TERMS_ERR'] },
            { value: agreeMarketing, validator: (value) => value, faild_msg_seq: ['err_msg', 'AGREE_MARKETING_ERR'] },
        ]
        for (const field of field_params) {
            if (!field.validator(field.value)) {
                console.log(`Failed at field: ${field.faild_msg_seq[1]}`);
                onResponse(field.faild_msg_seq, "ERROR", field.value,);
                return false; // stop on first failure
            }
        }
        return true; // all fields valid


    };


    // INFO SAVE STAGE 2  INFO 

    completeFarmRegistration = async (data) => {
        const { planType, requestDemo, installmentInterest, agreeTerms, agreeMarketing, farmId, onResponse, onSuccess } = data
        const payload = { planType, requestDemo, installmentInterest, agreeTerms, agreeMarketing }
        const farm_service = new FarmService()

        if (this.validatePlanAgreement(data)) {
            try {
                const response = await farm_service.updateFarm(farmId, payload)
                console.log("Farm info added:", response);
                onSuccess()

                console.log('Update respose', response)
                return
            } catch (error) {
                const statusCode = error?.response?.status || 500;
                console.log('error', error)
                onResponse(['http_messages', `${statusCode}`], "ERROR");
                return;
            }

        }

        return


    }


    // INFO SAVE SATGE 1 INFO 

    saveFarmBasicInfo = async (data) => {
        const { farmName, farmAddress, city, state, postalCode, cattleCount, farmSize, farmType, onResponse, onSuccess } = data
        if (this.validateFormFields(data)) {
            // TODO: CALL API HERE TO  ADD FARM INFO
            const payload = { farmName, farmAddress, city, state, postalCode, cattleCount, farmSize, farmType }
            const farm_service = new FarmService()
            try {
                const result = await farm_service.createFarm(payload)
                console.log("Farm Created:", result);
                onSuccess({ farmId: result.farmId })

                console.log('result', result)
                return
            } catch (error) {
                const statusCode = error?.response?.status || 500;
                console.log('farm basic error', error)
                onResponse(['http_messages', `${statusCode}`], "ERROR");
                return;
            }
        } else {
            console.log("FAILED VALIDATION")
        }


    }

    // INFO GET DATA FOR ADMINISTRATOR
    getAllFarmsAlongWithOWner = async ({ onResponse, onSuccess }) => {
        try {
            const farm_service = new FarmService()

            const result = await farm_service.getAllFarmsWithOwners()
            onSuccess({ farms: result.data })

            return
        } catch (error) {
            const statusCode = error?.response?.status || 500;
            console.log('farm basic error', error)
            onResponse(['http_messages', `${statusCode}`], "ERROR");
            return;
        }
    }



    // INFO ADMINSTARTOR CHANGE FARM STATUS  
    updateStatus = async (payload) => {
        const { farm_id, setup_status, onSuccess, onFailed } = payload
        const f_servive = new FarmService()
        try {
            const res = await f_servive.updateFarmStatus({ farm_id, setup_status })


            console.log(FARM_STATUS_UPDATE_SUCCESS, res.data)
            onSuccess(setup_status)

        } catch (e) {
            console.log(FARM_STATUS_UPDATE_FAILED, e)
            onFailed()
        }
    }

    // INFO ADMINSTARTOR CHANGE FARM STATUS  
    exportFarms = async (payload) => {
        const { farms_data, onSuccess, onFailed } = payload
        try {
            const blob = new Blob(
                [JSON.stringify(farms_data, null, 2)],
                { type: "application/json;charset=utf-8" }
            );
    
            saveAs(blob, `farms_export_${Date.now()}.json`);
            onSuccess()
        } catch (e) {
            console.error("FARMS_EXPORT_FAILED", e);
            onFailed()
        }
    }
}