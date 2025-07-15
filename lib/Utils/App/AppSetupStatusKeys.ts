export class SetupStatusKeys {
  static readonly ACCOUNT_CREATED = "account_created"
  static readonly TEAM_ASSIGNED = "team_assigned"
  static readonly SITE_VISIT_SCHEDULED = "site_visit_scheduled"
  static readonly SYSTEM_INSTALLATION = "system_installation"
  static readonly CONFIGURATION_TESTING = "configuration_testing"
  static readonly TRAINING_HANDOVER = "training_handover"

  static readonly ALL = [
    SetupStatusKeys.ACCOUNT_CREATED,
    SetupStatusKeys.TEAM_ASSIGNED,
    SetupStatusKeys.SITE_VISIT_SCHEDULED,
    SetupStatusKeys.SYSTEM_INSTALLATION,
    SetupStatusKeys.CONFIGURATION_TESTING,
    SetupStatusKeys.TRAINING_HANDOVER,
  ] as const
}

export type SetupStatusKey = (typeof SetupStatusKeys.ALL)[number]
