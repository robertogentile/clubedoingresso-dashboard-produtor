export interface Producer {
  id: string;
  email: string;
  phone: string;
  contact: string;
  fantasy_name: string;
  permissions: Record<string, string>;
  features: Record<string, string>;
  app_permission: string;
  current_status: string;
}

export interface SelectedEvent {
  id: number;
  name: string;
  date: string;
  location: string;
  status: string;
}

export interface LoginData {
  access_token: string;
  refresh_token: string;
  id: string;
  email: string;
  phone: string;
  contact: string;
  fantasy_name: string;
  permissions: Record<string, string>;
  features: Record<string, string>;
  app_permission: string;
  current_status: string;
}
