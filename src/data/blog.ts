export type BlogCategory = 'reflection' | 'technical' | 'career' | 'personal';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  image: string;
  date: string;
  category: BlogCategory;
  readingTime: string;
  url?: string;
  tags: string[];
}

export const categoryLabels: Record<BlogCategory, string> = {
  reflection: 'Reflection',
  technical: 'Technical',
  career: 'Career',
  personal: 'Personal',
};

export const categoryColors: Record<BlogCategory, string> = {
  reflection: 'bg-purple-500/20 text-purple-300',
  technical: 'bg-blue-500/20 text-blue-300',
  career: 'bg-amber-500/20 text-amber-300',
  personal: 'bg-emerald-500/20 text-emerald-300',
};

export const blogPosts: BlogPost[] = [
  {
    id: 'journey-to-cloud',
    title: 'My Journey to Cloud Architecture',
    excerpt: 'Reflecting on the path from traditional infrastructure to modern cloud-native solutions.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop',
    date: '2026-01-15',
    category: 'career',
    readingTime: '5 min read',
    tags: ['cloud', 'career', 'aws'],
  },
  {
    id: 'ai-infrastructure-lessons',
    title: 'Lessons from Building AI Infrastructure',
    excerpt: 'Key takeaways from deploying LLMs at scale and what I learned along the way.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
    date: '2026-01-10',
    category: 'technical',
    readingTime: '8 min read',
    tags: ['ai', 'infrastructure', 'llm'],
  },
  {
    id: 'work-life-balance',
    title: 'Finding Balance in Tech',
    excerpt: 'Personal reflections on maintaining well-being while working in a demanding industry.',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=400&fit=crop',
    date: '2026-01-05',
    category: 'personal',
    readingTime: '4 min read',
    tags: ['wellness', 'personal', 'balance'],
  },
  {
    id: 'kubernetes-production',
    title: 'Kubernetes in Production: A Deep Dive',
    excerpt: 'Practical insights and patterns for running Kubernetes workloads in production.',
    image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&h=400&fit=crop',
    date: '2025-12-28',
    category: 'technical',
    readingTime: '10 min read',
    tags: ['kubernetes', 'devops', 'infrastructure'],
  },
  {
    id: 'mentorship-matters',
    title: 'Why Mentorship Matters',
    excerpt: 'Thoughts on giving back to the tech community and the value of sharing knowledge.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop',
    date: '2025-12-20',
    category: 'reflection',
    readingTime: '6 min read',
    tags: ['mentorship', 'community', 'growth'],
  },
  {
    id: 'automation-everything',
    title: 'Automating Everything: My DevOps Philosophy',
    excerpt: 'How I approach automation and why it is the foundation of reliable systems.',
    image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=600&h=400&fit=crop',
    date: '2025-12-15',
    category: 'technical',
    readingTime: '7 min read',
    tags: ['automation', 'devops', 'ci-cd'],
  },
];
