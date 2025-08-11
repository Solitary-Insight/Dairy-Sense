import { CattleCountValidator, EmailValidator, FarmAddressValidator, FarmNameValidator, NameValidator, NotEmptyValidator, PhoneValidator } from "@/lib/Utils/App/Validators/FormValidators";
import { DemoService } from '@/app/demo/demo-service'
export class DemoController {
    constructor(formData) {
        this.initPersonalInfo(formData);
        this.initFarmInfo(formData);
        this.initFeatureInterests(formData);
    }

    initPersonalInfo({ firstName, lastName, email, phone }) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
    }

    initFarmInfo({
        farmName,
        location,
        cattleCount,
        preferredDate,
        preferredTime,
        currentSystem,
        additionalNotes,
        installmentInterest,
    }) {
        this.farmName = farmName;
        this.location = location;
        this.cattleCount = cattleCount;
        this.preferredDate = preferredDate;
        this.preferredTime = preferredTime;
        this.additionalNotes = additionalNotes;
        this.installmentInterest = installmentInterest;
        this.currentSystem = currentSystem
    }

    initFeatureInterests({
        cattleHealthMonitoringRequired,
        milkProductionTrackingRequired,
        smartCollarTechnologyRequired,
        financeManagementRequired,
        hrAndPayrolRequired,
        feedManagementRequired,
        breedingRecordsRequired,
        marketPlaceIntegrationRequired,


    }) {
        this.cattleHealthMonitoringRequired = cattleHealthMonitoringRequired;
        this.milkProductionTrackingRequired = milkProductionTrackingRequired;
        this.smartCollarTechnologyRequired = smartCollarTechnologyRequired;
        this.financeManagementRequired = financeManagementRequired;
        this.hrAndPayrolRequired = hrAndPayrolRequired;
        this.feedManagementRequired = feedManagementRequired;
        this.marketPlaceIntegrationRequired = marketPlaceIntegrationRequired;
        this.breedingRecordsRequired = breedingRecordsRequired;
    }

    async saveDemo({ onSuccess, onResponse, onFailed }) {
        const demo_service = new DemoService()
        const payload = {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            phone: this.phone,
            farmName: this.farmName,
            location: this.location,
            cattleCount: this.cattleCount,
            preferredDate: this.preferredDate,
            preferredTime: this.preferredTime,
            currentSystem: this.currentSystem,
            additionalNotes: this.additionalNotes,
            installmentInterest: this.installmentInterest,
            cattleHealthMonitoringRequired: this.cattleHealthMonitoringRequired,
            milkProductionTrackingRequired: this.milkProductionTrackingRequired,
            smartCollarTechnologyRequired: this.smartCollarTechnologyRequired,
            financeManagementRequired: this.financeManagementRequired,
            hrAndPayrolRequired: this.hrAndPayrolRequired,
            feedManagementRequired: this.feedManagementRequired,
            breedingRecordsRequired: this.breedingRecordsRequired,
            marketPlaceIntegrationRequired: this.marketPlaceIntegrationRequired,

        }
        try {
            const result = await demo_service.createDemo(payload)
            console.log('[SAVE DEMO RESULT] : ', JSON.stringify(result, null, 2))
            onSuccess()
        } catch (error) {
            const statusCode = error?.response?.status || 500;
            console.log('error', error)
            onResponse(['http_messages', `${statusCode}`], "ERROR", 2);
        }
    }


    validateFileds({ onResponse }) {
        const validation_tasks = [
            { value: this.firstName + this.lastName, validator: NameValidator, validation_failed_message_seq: ['err_msg', 'INVALID_NAME'], stage: 0 },
            { value: this.email, validator: EmailValidator, validation_failed_message_seq: ['err_msg', 'INVALID_EMAIL'], stage: 0 },
            { value: this.phone, validator: PhoneValidator, validation_failed_message_seq: ['err_msg', 'INVALID_PHONE'], stage: 0 },
            { value: this.farmName, validator: FarmNameValidator, validation_failed_message_seq: ['err_msg', 'INVALID_FARM_NAME'], stage: 1 },
            { value: this.location, validator: FarmAddressValidator, validation_failed_message_seq: ['err_msg', 'INVALID_FARM_ADDRESS'], stage: 1 },
            { value: this.cattleCount, validator: CattleCountValidator, validation_failed_message_seq: ['err_msg', 'INVALID_CATTLE_COUNT'], stage: 1 },
            { value: this.preferredDate, validator: NotEmptyValidator, validation_failed_message_seq: ['err_msg', 'INVALID_DATE_REQ'], stage: 2 },
            { value: this.preferredTime, validator: NotEmptyValidator, validation_failed_message_seq: ['err_msg', 'INVALID_TIME_REQ'], stage: 2 },

        ]
        for (const field of validation_tasks) {
            if (!field.validator(field.value)) {
                console.log(`Failed at field: ${field.validation_failed_message_seq[1]}`);
                onResponse(field.validation_failed_message_seq, "ERROR", field.stage);
                return false; // stop on first failure
            }


        }
        return true; // all fields valid

    }



    // INFO: -save demo record-----------------------
    saveDemoRecord(
        {
            onSuccess = () => {
                console.log("DEMO RECORD SAVED")
            },
            onFailed = () => {
                console.log("DEMO RECORD SAVING FAILED")
            },
            onResponse }) {
        if (this.validateFileds({ onResponse })) {
            // INFO: FIELDS ARE VALID CALL API 
            this.saveDemo({ onSuccess, onFailed, onResponse })

        } else {
            return
        }
    }
}
