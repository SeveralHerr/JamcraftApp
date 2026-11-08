import { Badge, Button, Text, Title } from '@mantine/core';
import { IconExternalLink } from '@tabler/icons-react';
import { Commission, CommissionMedia } from '../../entities/Commission';
import { isSafeExternalUrl } from '../../../social-presence/use-cases/isSafeExternalUrl';
import { colors, typography } from '../../../theme';
import classes from './CommissionShowcase.module.css';

function MediaTile({ item }: { item: CommissionMedia }) {
  if (item.kind === 'video') {
    return (
      <figure className={`${classes.tile} ${classes.videoTile}`}>
        {/* Click-to-play: no autoplay and no preload, so the page stays light. */}
        <video src={item.src} poster={item.posterSrc} controls playsInline preload="none" aria-label={item.alt} />
        <figcaption className={classes.caption}>{item.caption}</figcaption>
      </figure>
    );
  }
  return (
    <figure className={classes.tile}>
      <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
      <figcaption className={classes.caption}>{item.caption}</figcaption>
    </figure>
  );
}

/** Case-study layout for one commission: hero photo, write-up, facts, links, media row. */
export function CommissionShowcase({ commission }: { commission: Commission }) {
  const { heroImage } = commission;
  const links = commission.links.filter((link) => isSafeExternalUrl(link.url));
  const badge = [commission.badge, commission.year].filter(Boolean).join(' · ');

  return (
    <article className={classes.showcase}>
      <div className={classes.spot}>
        <img
          className={classes.hero}
          src={heroImage.src}
          alt={heroImage.alt}
          width={heroImage.width}
          height={heroImage.height}
          loading="lazy"
          decoding="async"
        />
        <div className={classes.body}>
          <Badge variant="light" size="md" radius="xl" w="fit-content">
            {badge}
          </Badge>
          <Title order={3} c={colors.text.primary} style={{ fontSize: typography.fontSize['2xl'], lineHeight: typography.lineHeight.snug }}>
            {commission.title}
          </Title>
          <Text c={colors.text.dimmed} style={{ lineHeight: typography.lineHeight.relaxed }}>
            {commission.summary}
          </Text>
          <dl className={classes.facts}>
            <dt>Client</dt>
            <dd>{commission.client}</dd>
            <dt>Built</dt>
            <dd>{commission.deliverables}</dd>
            <dt>Role</dt>
            <dd>{commission.role}</dd>
          </dl>
          <div className={classes.links}>
            {links.map((link, index) => (
              <Button
                key={link.url}
                component="a"
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                variant={index === 0 ? 'filled' : 'default'}
                size="sm"
                rightSection={<IconExternalLink size={14} aria-hidden="true" />}
              >
                {link.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <ul className={classes.media} aria-label={`${commission.title} photos and reel`}>
        {commission.media.map((item) => (
          <li key={item.src}>
            <MediaTile item={item} />
          </li>
        ))}
      </ul>
    </article>
  );
}
