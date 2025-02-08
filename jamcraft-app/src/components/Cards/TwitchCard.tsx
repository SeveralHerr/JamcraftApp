import { BaseCard } from './BaseCard';
import { EXTERNAL_LINKS } from '../../config/routes';

export function TwitchCard() {
  return (
    <BaseCard 
      imageSrc="/assets/twitch.gif"
      imageAlt="Twitch"
      title="Twitch"
      description="Join our live streams where we dive into collaborative game development and mob programming. Watch as we code together, share tips, and bring new learners from our Discord into the process!"
      onButtonClick={() => window.open(EXTERNAL_LINKS.twitch, '_blank')}
    />
  );
}