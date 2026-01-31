export interface Partner {
  id: string;
  name: string;
  logo?: string;
  url?: string;
  code?: string;
  type: 'partner' | 'affiliate';
}

export const partners: Partner[] = [
  { 
    id: 'ionos', 
    name: 'IONOS', 
    logo: '/partners/ionos.svg', 
    type: 'partner' 
  },
  { 
    id: 'aws', 
    name: 'AWS', 
    logo: '/partners/aws.svg', 
    type: 'partner' 
  },
  { 
    id: 'elevenlabs', 
    name: 'ElevenLabs', 
    logo: '/partners/elevenlabs.svg', 
    url: 'https://try.elevenlabs.io/4eohur6ossid', 
    type: 'affiliate' 
  },
  { 
    id: 'lovable', 
    name: 'Lovable', 
    logo: '/partners/lovable.svg', 
    type: 'partner' 
  },
  { 
    id: 'gamma', 
    name: 'Gamma', 
    logo: '/partners/gamma.svg', 
    type: 'partner' 
  },
  { 
    id: 'leonardo', 
    name: 'Leonardo AI', 
    logo: '/partners/leonardo.svg', 
    type: 'partner' 
  },
  { 
    id: 'oakcha', 
    name: 'Oakcha', 
    logo: '/partners/oakcha.svg', 
    url: 'https://oakcha.com',
    code: 'ISAYAH90460', 
    type: 'affiliate' 
  },
];
