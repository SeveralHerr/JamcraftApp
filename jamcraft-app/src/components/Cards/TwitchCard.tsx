import { BaseCard } from './BaseCard';

export function TwitchCard() {
  return (
    <BaseCard 
      imageSrc="/assets/twitch.gif"
      imageAlt="Twitch"
      title="Twitch"
      description="Twitch stuff blah blah"
      onButtonClick={() => window.open('your-minecraft-server-link', '_blank')}
    />
  );
}