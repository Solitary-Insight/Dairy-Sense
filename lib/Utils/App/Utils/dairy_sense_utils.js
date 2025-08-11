import { Badge } from "@/components/ui/badge";
import { SetupStatusKeys } from "../AppSetupStatusKeys"
import { CircleX, Crown, Package, Star} from "lucide-react";

export const getExtrasBasedOnRegistrationStatus = ({ setup_status }) => {
    const setup_stages = SetupStatusKeys.ALL;
    const total_steps = setup_stages.length;
    const max_time_req_in_days = 7;

    const percentage_step = 100 / total_steps;
    const time_step = max_time_req_in_days / total_steps;

    let percentage = 0;
    let time_required = max_time_req_in_days;

    const registration_complete = setup_status == SetupStatusKeys.ACCOUNT_CREATED;
    const configuration_complete = setup_status === setup_stages[setup_stages.length - 1];

    for (let i = 0; i < total_steps; i++) {
        percentage = (i + 1) * percentage_step;

        if (setup_stages[i] === setup_status) {
            time_required = Math.round(max_time_req_in_days - (i + 1) * time_step);
            break;
        }
    }

    return {
        time_required,
        percentage: Math.round(percentage),
        registration_complete,
        configuration_complete
    };


};

export const PLAN_TYPE_CONFIG = {
    basic: { label: "Basic", icon: Package, color: "text-gray-600" },
    pro: { label: "Pro", icon: Star, color: "text-blue-600" },
    enterprise: { label: "Premium", icon: Crown, color: "text-purple-600" },
    none:{ label: "Not Purchased Yet", icon: CircleX, color: "text-red-600",bg:'bg-red-200' }
}

export const FARM_TYPE_CONFIG = {
    dairy: { label: "Dairy", color: "bg-blue-100 text-blue-800" },
    beef: { label: "Beef", color: "bg-red-100 text-red-800" },
    mixed: { label: "Mixed", color: "bg-green-100 text-green-800" },
    organic: { label: "Organic", color: "bg-green-200 text-green-900" },
    commercial: { label: "Commercial", color: "bg-yellow-100 text-yellow-800" }
};
export const SETUP_STATUS_CONFIG = {
    "farm_details_added": {
        label: "Registration Pending",
        variant: "secondary",
        color: "bg-yellow-100 text-yellow-800",
        percentage: 12.5
    },
    "account_created": {
        label: "Account Created",
        variant: "secondary",
        color: "bg-yellow-100 text-yellow-800",
        percentage: 25
    },
    "team_assigned": {
        label: "Team Assigned",
        variant: "default",
        color: "bg-blue-100 text-blue-800",
        percentage: 37.5
    },
    "site_visit_scheduled": {
        label: "Site Visit Scheduled",
        variant: "default",
        color: "bg-blue-100 text-blue-800",
        percentage: 50
    },
    "system_installation": {
        label: "System Installation",
        variant: "outline",
        color: "bg-purple-100 text-purple-800",
        percentage: 62.5
    },
    "configuration_testing": {
        label: "Configuration & Testing",
        variant: "outline",
        color: "bg-purple-100 text-purple-800",
        percentage: 75
    },
    "training_handover": {
        label: "Training & Handover",
        variant: "default",
        color: "bg-green-100 text-green-800",
        percentage: 87.5
    },
    "setup_configured": {
        label: "Setup Configured",
        variant: "default",
        color: "bg-green-100 text-green-800",
        percentage: 100
    }
};

export function getStatusChip(status) {


    const config = SETUP_STATUS_CONFIG[status];

    if (!config) return null;

    return (
        <Badge variant={config.variant} className={config.color}>
            {config.label}
        </Badge>
    );
}