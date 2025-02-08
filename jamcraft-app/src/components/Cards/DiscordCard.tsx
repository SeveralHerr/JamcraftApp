import { BaseCard } from '../Cards/BaseCard';

export function DiscordCard() {
  return (
    <BaseCard 
      imageSrc="/assets/discord.gif"
      imageAlt="Discord"
      title="Jamcraft Discord"
      description="Connect with gamers, devs, IT pros, and hobbyists. Learn, share, and have fun! Plus, check out our Minecraft server and get the latest Jamcraft news."
      onButtonClick={() => window.open('your-discord-link', '_blank')}
    />
  );
}