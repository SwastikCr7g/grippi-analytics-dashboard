import CampaignDashboard from '../components/CampaignDashboard';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

// This is the default root page component
export default function Home() {
  return (
    // We use the full width and height with Inter font class from Next.js setup
    <main className={`min-h-screen ${inter.className}`}>
      {/* Render the Campaign Dashboard Component */}
      <CampaignDashboard />
    </main>
  );
}