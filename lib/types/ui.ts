import { RoleTypes } from "@/components/contexts/AuthContext";

export interface CompanyDataTypes {
  name: string;
  website: string;
  email: string;
  phone: string;
  description: string;
  assistant_name: string;
}
export interface BasicInfoData {
  fullName: string;
}
export interface TeamMember {
  name: string;
  email: string;
  _id: string;
  phone: string;
  roles: RoleTypes[];
  user_joined: boolean;
}
export enum ContactStatus {
  NEW = 'NEW',
  IN_PROGRESS = 'IN_PROGRESS',
  SCHEDULED = 'SCHEDULED',
  RESCHEDULED = 'RESCHEDULED',
  NOT_INTERESTED = 'NOT_INTERESTED',
  NOT_QUALIFIED = 'NOT_QUALIFIED',
  JUNK = 'JUNK',
  NO_SHOW = 'NO_SHOW',
  CANCELLED = 'CANCELLED',
  CONVERTED = 'CONVERTED',
  // Add more statuses here
}


export enum MessageTemplateType {
  SMS = "SMS",
  WHATSAPP = "WHATSAPP"
}
export enum ChatChannelType {
  SMS = 'SMS',
  EMAIL = 'EMAIL',
  WHATSAPP = 'WHATSAPP',
  INSTAGRAM = 'INSTAGRAM',
  VOICE = 'VOICE',
}
export interface MessageTemplateResponseType {
  org_id?: string;
  template_name: string;
  template_type: MessageTemplateType;
  status: string;
  components: any[];
  assigned_number_or_id: string;
  id: string;
  template_data: MessageTemplateData;
}
export interface MessageTemplateData {
  category: string;
  allow_category_change: boolean;
  language: string;
  text_content: string;
  sample_values: string[];
}
export interface IAgentUseCase {
  id: string;
  name: string;
  org_id: string;
  unique_id: string;
  version: number;
  is_deleted: boolean;
  main_agent_data: any;
  lead_qualification_requirement_check: string;
  default_followup_message: string;
  default_not_interested_message: string;
  default_not_qualified_message: string;
}

export interface CommunicationChannelTypes {
  _id: string;
  org_id: string;
  friendly_name: string;
  phone_number: string;
  connection_type: ChatChannelType;
  email_metadata: EmailMetadata;
  instagram_id: string;
  voice_id: string;
  WHATSAPP_METADATA?: WhatsAppMetadata;
  updated_at_timestamp: number;

  created_at_timestamp: number;

  is_deleted: boolean;
}
export interface WhatsAppMetadata {
  waba_id: string;

  waba_number_id: string;
  waba_display_number: string;
  waba_number_name: string;
  waba_quality_rating: string;
  waba_verification_status: string;
}
export interface EmailMetadata {
  user: string;
  password: string;
  imap_host: string;
  smtp_host: string;
  imap_port: string;
  smtp_port: string;
  tls: string;
}
export interface IntegrationAuth {
  _id: string;
  integration_account_indentifier: string;
  integration_unique_id: string;
  logo_url?: string;
}
export interface OrgProjectDataTypes {
  _id: string;
  title: string;
  description: string;
  contacts_count?: number;
}
export interface OrgAgentDataTypes {
  _id: string;
  title: string;
  description: string;
  agent_use_case_id: string;
  is_sms_enabled: boolean;
  is_whatsapp_enabled: boolean;
  is_instagram_enabled: boolean;
  is_email_enabled: boolean;
  is_voice_enabled: boolean;
  is_website_chat_enabled: boolean;
  assigned_sms_number: string;
  assigned_whatsapp_number: string;
  assigned_instagram_id: string;
  assigned_email_id: string;
  assigned_voice_id: string;
  status: string;
  contacts_count?: number;
  custom_values: any;
}
export interface ContactTypes {
  _id: string;
  full_name: string;
  email: string;
  phone: string;
  stop_ai_processing?: boolean;
  notes?: string;
  status: string;
  contact_stage?: string;
  created_at_timestamp?: number;
  updated_at_timestamp?: number;
  org_agent_id?: string;
  org_project_id?: string;
}


export interface phoneNumberTypes {
  _id: string;
  phoneNumber: string;
  sms_setup_completed: boolean;
  whatsapp_setup_completed: boolean;
}
