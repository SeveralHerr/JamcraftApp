import { BaseCard } from '../Cards/BaseCard';
import { EXTERNAL_LINKS } from '../../config/routes';
export function DiscordCard() {
  return (
    <BaseCard 
      imageSrc="/assets/discord.gif"
      imageAlt="Discord"
      title="Discord"
      description="Connect with gamers, devs, IT pros, and hobbyists. Learn, share, and have fun! Plus, check out our Minecraft server and get the latest Jamcraft news."
      onClick={() => window.open(EXTERNAL_LINKS.discord, '_blank')}
    />
  );
}