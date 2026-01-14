export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  type: string;
  message: string;
}

export interface BlogPost {
  title: string;
  link: string;
  description: string;
  category: string;
  isPinned?: boolean;
}

