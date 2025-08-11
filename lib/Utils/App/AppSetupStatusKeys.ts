export class SetupStatusKeys {
  static readonly FARM_DETAIL_ADDED = "farm_details_added"
  static readonly ACCOUNT_CREATED = "account_created"
  static readonly TEAM_ASSIGNED = "team_assigned"
  static readonly SITE_VISIT_SCHEDULED = "site_visit_scheduled"
  static readonly SYSTEM_INSTALLATION = "system_installation"
  static readonly CONFIGURATION_TESTING = "configuration_testing"
  static readonly TRAINING_HANDOVER = "training_handover"
  static readonly CONFIGURED = "setup_configured"
  static statuses = () => [
    { key: SetupStatusKeys.FARM_DETAIL_ADDED, label: "Registration Pending" },
    { key: SetupStatusKeys.ACCOUNT_CREATED, label: "Account Created" },
    { key: SetupStatusKeys.TEAM_ASSIGNED, label: "Team Assigned" },
    { key: SetupStatusKeys.SITE_VISIT_SCHEDULED, label: "Site Visit Scheduled" },
    { key: SetupStatusKeys.SYSTEM_INSTALLATION, label: "System Installation" },
    { key: SetupStatusKeys.CONFIGURATION_TESTING, label: "Configutration Testing" },
    { key: SetupStatusKeys.TRAINING_HANDOVER, label: "Traing Handover" },
    { key: SetupStatusKeys.CONFIGURED, label: "Configured" },
  ]

  static readonly ALL = [
    SetupStatusKeys.FARM_DETAIL_ADDED,
    SetupStatusKeys.ACCOUNT_CREATED,
    SetupStatusKeys.TEAM_ASSIGNED,
    SetupStatusKeys.SITE_VISIT_SCHEDULED,
    SetupStatusKeys.SYSTEM_INSTALLATION,
    SetupStatusKeys.CONFIGURATION_TESTING,
    SetupStatusKeys.TRAINING_HANDOVER,
    SetupStatusKeys.CONFIGURED,
  ] as const


  
}

export type SetupStatusKey = (typeof SetupStatusKeys.ALL)[number]
