import { BaseCard } from './BaseCard';

export function TwitchCard() {
  return (
    <BaseCard 
      imageSrc="/assets/twitch.gif"
      imageAlt="Twitch"
      title="Twitch"
      description="Join our live streams where we dive into collaborative game development and mob programming. Watch as we code together, share tips, and bring new learners from our Discord into the process!"
      onButtonClick={() => window.open('your-minecraft-server-link', '_blank')}
    />
  );
}