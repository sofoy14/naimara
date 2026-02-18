import { createClient } from 'contentful';

const client = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID || '',
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN || '',
});

export async function getSiteConfig() {
  try {
    const entry = await client.getEntry('siteConfig');
    return entry.fields;
  } catch (error) {
    console.error('Error fetching site config:', error);
    return null;
  }
}

export async function getHeroContent() {
  try {
    const entry = await client.getEntry('heroContent');
    return entry.fields;
  } catch (error) {
    console.error('Error fetching hero content:', error);
    return null;
  }
}

export async function getContactInfo() {
  try {
    const entry = await client.getEntry('contactInfo');
    return entry.fields;
  } catch (error) {
    console.error('Error fetching contact info:', error);
    return null;
  }
}
