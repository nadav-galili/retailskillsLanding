export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  badge?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export interface Store {
  id: string;
  name: string;
  city: string;
  sales: number;
  target: number;
  employees: number;
}

export interface WhatsAppMessage {
  sender: string;
  content: string;
  time: string;
  group: string;
}

export interface Competitor {
  name: string;
  promo: string;
  source: string;
}

export interface Task {
  id: string;
  description: string;
  assignee: string;
  due: string;
  status: "open" | "in_progress" | "done";
}

export interface Scenario {
  label: string;
  message: string;
}

export interface ContactFormData {
  name: string;
  company: string;
  phone: string;
  email: string;
  interests: string[];
  notes: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}
