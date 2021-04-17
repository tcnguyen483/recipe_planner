/* eslint-disable no-unused-vars */
/*
 * Code related to the auth0 management api.
 * See: https://auth0.com/docs/api/management/v2#!/Users/get_users
 */

export const MANAGEMENT_API_URL = "https://recipe-planner.us.auth0.com/api/v2";

// Documented here: https://auth0.com/docs/api/management/v2#!/Users/get_users_by_id
export interface Auth0UserData {
  user_id: string;
  email: string;
  email_verified: boolean;
  username: string;
  phone_number: string;
  phone_verified: boolean;
  created_at: string;
  updated_at: string;
  picture: string;
  name: string;
  nickname: string;
  multifactor: Array<string>;
  last_ip: string;
  last_login: string;
  logins_count: number;
  blocked: boolean;
  given_name: string;
  family_name: string;
}

export enum ManagementApiScopes {
  READ_CLIENT_GRANTS = "read:client_grants",
  CREATE_CLIENT_GRANTS = "create:client_grants",
  DELETE_CLIENT_GRANTS = "delete:client_grants",
  UPDATE_CLIENT_GRANTS = "update:client_grants",
  READ_USERS = "read:users",
  UPDATE_USERS = "update:users",
  DELETE_USERS = "delete:users",
  CREATE_USERS = "create:users",
  READ_USERS_APP_METADATA = "read:users_app_metadata",
  UPDATE_USERS_APP_METADATA = "update:users_app_metadata",
  DELETE_USERS_APP_METADATA = "delete:users_app_metadata",
  CREATE_USERS_APP_METADATA = "create:users_app_metadata",
  READ_USER_CUSTOM_BLOCKS = "read:user_custom_blocks",
  CREATE_USER_CUSTOM_BLOCKS = "create:user_custom_blocks",
  DELETE_USER_CUSTOM_BLOCKS = "delete:user_custom_blocks",
  CREATE_USER_TICKETS = "create:user_tickets",
  READ_CLIENTS = "read:clients",
  UPDATE_CLIENTS = "update:clients",
  DELETE_CLIENTS = "delete:clients",
  CREATE_CLIENTS = "create:clients",
  READ_CLIENT_KEYS = "read:client_keys",
  UPDATE_CLIENT_KEYS = "update:client_keys",
  DELETE_CLIENT_KEYS = "delete:client_keys",
  CREATE_CLIENT_KEYS = "create:client_keys",
  READ_CONNECTIONS = "read:connections",
  UPDATE_CONNECTIONS = "update:connections",
  DELETE_CONNECTIONS = "delete:connections",
  CREATE_CONNECTIONS = "create:connections",
  READ_RESOURCE_SERVERS = "read:resource_servers",
  UPDATE_RESOURCE_SERVERS = "update:resource_servers",
  DELETE_RESOURCE_SERVERS = "delete:resource_servers",
  CREATE_RESOURCE_SERVERS = "create:resource_servers",
  READ_DEVICE_CREDENTIALS = "read:device_credentials",
  UPDATE_DEVICE_CREDENTIALS = "update:device_credentials",
  DELETE_DEVICE_CREDENTIALS = "delete:device_credentials",
  CREATE_DEVICE_CREDENTIALS = "create:device_credentials",
  READ_RULES = "read:rules",
  UPDATE_RULES = "update:rules",
  DELETE_RULES = "delete:rules",
  CREATE_RULES = "create:rules",
  READ_RULES_CONFIGS = "read:rules_configs",
  UPDATE_RULES_CONFIGS = "update:rules_configs",
  DELETE_RULES_CONFIGS = "delete:rules_configs",
  READ_HOOKS = "read:hooks",
  UPDATE_HOOKS = "update:hooks",
  DELETE_HOOKS = "delete:hooks",
  CREATE_HOOKS = "create:hooks",
  READ_ACTIONS = "read:actions",
  UPDATE_ACTIONS = "update:actions",
  DELETE_ACTIONS = "delete:actions",
  CREATE_ACTIONS = "create:actions",
  READ_EMAIL_PROVIDER = "read:email_provider",
  UPDATE_EMAIL_PROVIDER = "update:email_provider",
  DELETE_EMAIL_PROVIDER = "delete:email_provider",
  CREATE_EMAIL_PROVIDER = "create:email_provider",
  BLACKLIST_TOKENS = "blacklist:tokens",
  READ_STATS = "read:stats",
  READ_TENANT_SETTINGS = "read:tenant_settings",
  UPDATE_TENANT_SETTINGS = "update:tenant_settings",
  READ_LOGS = "read:logs",
  READ_LOGS_USERS = "read:logs_users",
  READ_SHIELDS = "read:shields",
  CREATE_SHIELDS = "create:shields",
  UPDATE_SHIELDS = "update:shields",
  DELETE_SHIELDS = "delete:shields",
  READ_ANOMALY_BLOCKS = "read:anomaly_blocks",
  DELETE_ANOMALY_BLOCKS = "delete:anomaly_blocks",
  UPDATE_TRIGGERS = "update:triggers",
  READ_TRIGGERS = "read:triggers",
  READ_GRANTS = "read:grants",
  DELETE_GRANTS = "delete:grants",
  READ_GUARDIAN_FACTORS = "read:guardian_factors",
  UPDATE_GUARDIAN_FACTORS = "update:guardian_factors",
  READ_GUARDIAN_ENROLLMENTS = "read:guardian_enrollments",
  DELETE_GUARDIAN_ENROLLMENTS = "delete:guardian_enrollments",
  CREATE_GUARDIAN_ENROLLMENT_TICKETS = "create:guardian_enrollment_tickets",
  READ_USER_IDP_TOKENS = "read:user_idp_tokens",
  CREATE_PASSWORDS_CHECKING_JOB = "create:passwords_checking_job",
  DELETE_PASSWORDS_CHECKING_JOB = "delete:passwords_checking_job",
  READ_CUSTOM_DOMAINS = "read:custom_domains",
  DELETE_CUSTOM_DOMAINS = "delete:custom_domains",
  CREATE_CUSTOM_DOMAINS = "create:custom_domains",
  UPDATE_CUSTOM_DOMAINS = "update:custom_domains",
  READ_EMAIL_TEMPLATES = "read:email_templates",
  CREATE_EMAIL_TEMPLATES = "create:email_templates",
  UPDATE_EMAIL_TEMPLATES = "update:email_templates",
  READ_MFA_POLICIES = "read:mfa_policies",
  UPDATE_MFA_POLICIES = "update:mfa_policies",
  READ_ROLES = "read:roles",
  CREATE_ROLES = "create:roles",
  DELETE_ROLES = "delete:roles",
  UPDATE_ROLES = "update:roles",
  READ_PROMPTS = "read:prompts",
  UPDATE_PROMPTS = "update:prompts",
  READ_BRANDING = "read:branding",
  UPDATE_BRANDING = "update:branding",
  DELETE_BRANDING = "delete:branding",
  READ_LOG_STREAMS = "read:log_streams",
  CREATE_LOG_STREAMS = "create:log_streams",
  DELETE_LOG_STREAMS = "delete:log_streams",
  UPDATE_LOG_STREAMS = "update:log_streams",
  CREATE_SIGNING_KEYS = "create:signing_keys",
  READ_SIGNING_KEYS = "read:signing_keys",
  UPDATE_SIGNING_KEYS = "update:signing_keys",
  READ_LIMITS = "read:limits",
  UPDATE_LIMITS = "update:limits",
  CREATE_ROLE_MEMBERS = "create:role_members",
  READ_ROLE_MEMBERS = "read:role_members",
  DELETE_ROLE_MEMBERS = "delete:role_members",
  READ_ENTITLEMENTS = "read:entitlements",
  READ_ORGANIZATIONS = "read:organizations",
  UPDATE_ORGANIZATIONS = "update:organizations",
  CREATE_ORGANIZATIONS = "create:organizations",
  DELETE_ORGANIZATIONS = "delete:organizations",
  CREATE_ORGANIZATION_MEMBERS = "create:organization_members",
  READ_ORGANIZATION_MEMBERS = "read:organization_members",
  DELETE_ORGANIZATION_MEMBERS = "delete:organization_members",
  CREATE_ORGANIZATION_CONNECTIONS = "create:organization_connections",
  READ_ORGANIZATION_CONNECTIONS = "read:organization_connections",
  UPDATE_ORGANIZATION_CONNECTIONS = "update:organization_connections",
  DELETE_ORGANIZATION_CONNECTIONS = "delete:organization_connections",
  CREATE_ORGANIZATION_MEMBER_ROLES = "create:organization_member_roles",
  READ_ORGANIZATION_MEMBER_ROLES = "read:organization_member_roles",
  DELETE_ORGANIZATION_MEMBER_ROLES = "delete:organization_member_roles",
  CREATE_ORGANIZATION_INVITATIONS = "create:organization_invitations",
  READ_ORGANIZATION_INVITATIONS = "read:organization_invitations",
  DELETE_ORGANIZATION_INVITATIONS = "delete:organization_invitations",
}
