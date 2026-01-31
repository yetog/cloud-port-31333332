import { Bot, Globe, Mail, Cloud } from 'lucide-react';

export interface Service {
  id: string;
  title: string;
  icon: typeof Bot;
  description: string;
  features: string[];
  pricing?: string;
  cta: string;
}

export const services: Service[] = [
  {
    id: 'ai-services',
    title: 'AI Services',
    icon: Bot,
    description: 'Harness the power of artificial intelligence to transform your business operations and customer experiences.',
    features: [
      'GPT Training & Fine-tuning',
      'AI Integration Consulting',
      'Custom AI Assistants',
      'AI Infrastructure Setup',
      'LLM Deployment & Optimization',
    ],
    cta: 'Get AI Solutions',
  },
  {
    id: 'web-hosting',
    title: 'Web Hosting',
    icon: Globe,
    description: 'Reliable, scalable hosting solutions designed for performance and security.',
    features: [
      'Cloud-native hosting',
      'WordPress hosting',
      'Custom domain setup',
      'SSL & security certificates',
      '99.9% uptime guarantee',
    ],
    cta: 'Start Hosting',
  },
  {
    id: 'email-services',
    title: 'Email Services',
    icon: Mail,
    description: 'Professional email solutions to keep your business communications secure and efficient.',
    features: [
      'Business email setup',
      'Email migration services',
      'Email marketing integration',
      'SPF/DKIM/DMARC configuration',
      'Spam & security filtering',
    ],
    cta: 'Setup Email',
  },
  {
    id: 'cloud-services',
    title: 'Cloud Services',
    icon: Cloud,
    description: 'Modern cloud architecture and infrastructure solutions for scalable, resilient applications.',
    features: [
      'Cloud architecture design',
      'Migration consulting',
      'DevOps & CI/CD pipelines',
      'Infrastructure optimization',
      'Kubernetes & containerization',
    ],
    cta: 'Go Cloud',
  },
];
