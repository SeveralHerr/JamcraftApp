import { BaseCard } from './BaseCard';

export function MinecraftCard() {
  return (
    <BaseCard 
      imageSrc="/assets/minecraft.webp"
      imageAlt="Minecraft"
      title="Minecraft Server"
      description="Experience Minecraft like never before on our custom server. Join a thriving community, build amazing creations, and embark on epic adventures."
      onClick={() => window.open('your-minecraft-server-link', '_blank')}
    />
  );
}