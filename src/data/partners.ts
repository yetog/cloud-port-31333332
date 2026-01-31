export interface Partner {
  id: string;
  name: string;
  logo?: string;
  url: string;
}

export const partners: Partner[] = [
  { 
    id: 'ionos', 
    name: 'IONOS', 
    logo: '/partners/ionos.svg', 
    url: 'https://www.ionos.com'
  },
  { 
    id: 'aws', 
    name: 'AWS', 
    logo: '/partners/aws.svg', 
    url: 'https://aws.amazon.com'
  },
  { 
    id: 'elevenlabs', 
    name: 'ElevenLabs', 
    logo: '/partners/elevenlabs.svg', 
    url: 'https://elevenlabs.io'
  },
  { 
    id: 'lovable', 
    name: 'Lovable', 
    logo: '/partners/lovable.svg', 
    url: 'https://lovable.dev'
  },
  { 
    id: 'gamma', 
    name: 'Gamma', 
    logo: '/partners/gamma.svg', 
    url: 'https://gamma.app'
  },
  { 
    id: 'leonardo', 
    name: 'Leonardo AI', 
    logo: '/partners/leonardo.svg', 
    url: 'https://leonardo.ai'
  },
  { 
    id: 'oakcha', 
    name: 'Oakcha', 
    logo: '/partners/oakcha.svg', 
    url: 'https://oakcha.com'
  },
];
