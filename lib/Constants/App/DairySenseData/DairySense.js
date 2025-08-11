import { SetupStatusKeys } from '../../../Utils/App/AppSetupStatusKeys';
import { LANG_STRINGS } from '../language.js'
import { Heart, Activity, Milk, ShoppingCart, Users, Truck, BarChart3, MapPin, Plus, Wifi } from "lucide-react";



export class DairySense {
    constructor(lang) {
        this.lang = lang

    }


    getCattleCountDropDown() {
        return [
            { key: '1-50', value: LANG_STRINGS[this.lang].global.texts.cattle_count['1-50'] },
            { key: '51-100', value: LANG_STRINGS[this.lang].global.texts.cattle_count['51-100'] },
            { key: '101-200', value: LANG_STRINGS[this.lang].global.texts.cattle_count['101-200'] },
            { key: '201-500', value: LANG_STRINGS[this.lang].global.texts.cattle_count['201-500'] },
            { key: '500+', value: LANG_STRINGS[this.lang].global.texts.cattle_count['500+'] },
        ]
    }


    getFarmTypeDropDown() {
        return [
            { key: "dairy", value: LANG_STRINGS[this.lang]?.global?.texts?.farm_types?.dairy || dairy, },
            { key: "mixed", value: LANG_STRINGS[this.lang]?.global?.texts?.farm_types?.mixed || mixed, },
            { key: "organic", value: LANG_STRINGS[this.lang]?.global?.texts?.farm_types?.organic || organic, },
            { key: "commercial", value: LANG_STRINGS[this.lang]?.global?.texts?.farm_types?.commercial || commercial, },
        ];
    }


    getDSFeatures() {
        return [
            {
                title: LANG_STRINGS[this.lang]?.global?.features.lifecycle?.title || "Cattle Lifecycle Management",
                description: LANG_STRINGS[this.lang]?.global?.features.lifecycle?.description || "Complete animal profiles with breed info...",
                icon: Heart,
                color: "text-red-500",
            },
            {
                title: LANG_STRINGS[this.lang]?.global?.features.behavior?.title || "Smart Behavior Monitoring",
                description: LANG_STRINGS[this.lang]?.global?.features.behavior?.description || "IMU sensors track eating, walking...",
                icon: Activity,
                color: "text-blue-500",
            },
            {
                title: LANG_STRINGS[this.lang]?.global?.features.milk?.title || "Milk Production & Feed Management",
                description: LANG_STRINGS[this.lang]?.global?.features.milk?.description || "Track daily yield per animal...",
                icon: Milk,
                color: "text-yellow-500",
            },
            {
                title: LANG_STRINGS[this.lang]?.global?.features.marketplace?.title || "Integrated Marketplace",
                description: LANG_STRINGS[this.lang]?.global?.features.marketplace?.description || "Buy and sell farm products...",
                icon: ShoppingCart,
                color: "text-indigo-500",
            },
            {
                title: LANG_STRINGS[this.lang]?.global?.features.hr?.title || "HR & Payroll Management",
                description: LANG_STRINGS[this.lang]?.global?.features.hr?.description || "Manage employee attendance...",
                icon: Users,
                color: "text-purple-500",
            },
            {
                title: LANG_STRINGS[this.lang]?.global?.features.dealership?.title || "Dealership & Supply Chain",
                description: LANG_STRINGS[this.lang]?.global?.features.dealership?.description || "Integrated network for medicines...",
                icon: Truck,
                color: "text-orange-500",
            },
            {
                title: LANG_STRINGS[this.lang]?.global?.features.finance?.title || "Financial Dashboard",
                description: LANG_STRINGS[this.lang]?.global?.features.finance?.description || "Comprehensive income vs expense reports...",
                icon: BarChart3,
                color: "text-green-500",
            },
            {
                title: LANG_STRINGS[this.lang]?.global?.features.geo?.title || "Geo-Location Tracking",
                description: LANG_STRINGS[this.lang]?.global?.features.geo?.description || "Monitor cattle location and movement...",
                icon: MapPin,
                color: "text-teal-500",
            },
        ];

    }


    getConfigurationSteps() {
        return [
            {
                icon: Plus,
                color: "bg-green-500",
                step: "step 1",
                title: LANG_STRINGS[this.lang].global.configuration_steps.add_farm?.title || "Add Your Farm",
                description: LANG_STRINGS[this.lang].global.configuration_steps.add_farm?.description || "Register your farm details, add cattle profiles...",
            },
            {
                icon: Wifi,
                color: "bg-blue-500",
                step: "step 2",
                title: LANG_STRINGS[this.lang].global.configuration_steps.connect_devices?.title || "Connect Devices",
                description: LANG_STRINGS[this.lang].global.configuration_steps.connect_devices?.description || "Install smart collars on your cattle...",
            },
            {
                icon: BarChart3,
                color: "bg-purple-500",
                step: "step 3",
                title: LANG_STRINGS[this.lang].global.configuration_steps.get_insights?.title || "Get Real-Time Insights",
                description: LANG_STRINGS[this.lang].global.configuration_steps.get_insights?.description || "Access comprehensive analytics and alerts...",
            },
        ]
    }


    getSetupSteps() {
        const texts = LANG_STRINGS[this.lang]?.global.setup_steps || {}

        return [
            {
                key: SetupStatusKeys.FARM_DETAIL_ADDED,
                title: texts.FARM_DETAIL_ADDED?.title || "Farm Information Added",
                desc: texts.FARM_DETAIL_ADDED?.desc || "Your farm is not registered fully yet...",
            },
            {
                key: SetupStatusKeys.ACCOUNT_CREATED,
                title: texts.ACCOUNT_CREATED?.title || "Account Created",
                desc: texts.ACCOUNT_CREATED?.desc || "Your farm account has been successfully created",
            },
            {
                key: SetupStatusKeys.TEAM_ASSIGNED,
                title: texts.TEAM_ASSIGNED?.title || "Team Assignment",
                desc: texts.TEAM_ASSIGNED?.desc || "Technical team assigned to your location",
            },
            {
                key: SetupStatusKeys.SITE_VISIT_SCHEDULED,
                title: texts.SITE_VISIT_SCHEDULED?.title || "Site Visit Scheduled",
                desc: texts.SITE_VISIT_SCHEDULED?.desc || "Our team will contact you within 24-48 hours",
            },
            {
                key: SetupStatusKeys.SYSTEM_INSTALLATION,
                title: texts.SYSTEM_INSTALLATION?.title || "System Installation",
                desc: texts.SYSTEM_INSTALLATION?.desc || "Smart collars and sensors installation",
            },
            {
                key: SetupStatusKeys.CONFIGURATION_TESTING,
                title: texts.CONFIGURATION_TESTING?.title || "Configuration & Testing",
                desc: texts.CONFIGURATION_TESTING?.desc || "System setup and initial testing",
            },
            {
                key: SetupStatusKeys.TRAINING_HANDOVER,
                title: texts.TRAINING_HANDOVER?.title || "Training & Handover",
                desc: texts.TRAINING_HANDOVER?.desc || "Staff training and system handover",
            },
        ]
    }


    getSystemOptions = () => {
        const texts = LANG_STRINGS[this.lang]?.global.texts.system_types || {}

        return [
            { key: 'manual', value: texts["manual"] || 'Manual/Paper-based' },
            { key: 'basic-software', value: texts['basic-software'] || 'Basic Farm Software' },
            { key: 'spreadsheets', value: texts["spreadsheets"] || 'Excel/Spreadsheets' },
            { key: 'other-platform', value: texts['other-platform'] || 'Other Digital Platform' },
            { key: 'none', value: texts["none"] || 'No System Currently' },
        ];
    };

    getTimeSlotOptions = () => {
        const times = LANG_STRINGS?.[this.lang]?.global?.texts.time_slots ?? {};

        return [
            { key: "morning", value: times.morning || "Morning (9 AM - 12 PM)" },
            { key: "afternoon", value: times.afternoon || "Afternoon (12 PM - 5 PM)" },
            { key: "evening", value: times.evening || "Evening (5 PM - 8 PM)" },
        ];
    };



    getFeaturesRequiredOptions = () => {
        const features = LANG_STRINGS?.[this.lang]?.global?.texts?.features_required ?? {};

        return [
            { key: "cattleHealthMonitoringRequired", label: features.cattleHealthMonitoring || "Cattle Health Monitoring" },
            { key: "milkProductionTrackingRequired", label: features.milkProductionTracking || "Milk Production Tracking" },
            { key: "smartCollarTechnologyRequired", label: features.smartCollarTechnology || "Smart Collar Technology" },
            { key: "financeManagementRequired", label: features.financeManagement || "Financial Management" },
            { key: "hrAndPayrolRequired", label: features.hrAndPayrol || "HR & Payroll" },
            { key: "marketPlaceIntegrationRequired", label: features.marketPlaceIntegration || "Marketplace Integration" },
            { key: "feedManagementRequired", label: features.feedManagement || "Feed Management" },
            { key: "breedingRecordsRequired", label: features.breedingRecords || "Breeding Records" },
        ];
    };


}
