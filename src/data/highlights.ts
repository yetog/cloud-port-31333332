export interface Highlight {
  id: string;
  type: 'linkedin' | 'event' | 'achievement' | 'media';
  title: string;
  description: string;
  image: string;
  date: string;
  url?: string;
  icon: string;
}

export const highlights: Highlight[] = [
  {
    id: 'cloud-migration-success',
    type: 'achievement',
    title: 'Enterprise Cloud Migration',
    description: 'Successfully led a multi-cloud migration project, reducing infrastructure costs by 40% while improving system reliability.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop',
    date: '2024',
    url: 'https://www.linkedin.com/in/young-burke/',
    icon: 'Cloud',
  },
  {
    id: 'kubernetes-workshop',
    type: 'event',
    title: 'Kubernetes Workshop Speaker',
    description: 'Presented advanced container orchestration strategies to 100+ DevOps professionals at the regional tech summit.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop',
    date: '2024',
    url: 'https://www.linkedin.com/in/young-burke/',
    icon: 'Presentation',
  },
  {
    id: 'ai-infrastructure',
    type: 'linkedin',
    title: 'AI Infrastructure Insights',
    description: 'Shared best practices for building scalable AI/ML infrastructure using modern cloud-native technologies.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop',
    date: '2024',
    url: 'https://www.linkedin.com/in/young-burke/',
    icon: 'Brain',
  },
  {
    id: 'security-certification',
    type: 'achievement',
    title: 'Cloud Security Certification',
    description: 'Achieved advanced cloud security certification, demonstrating expertise in protecting enterprise infrastructure.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop',
    date: '2024',
    url: 'https://www.linkedin.com/in/young-burke/',
    icon: 'Shield',
  },
];
