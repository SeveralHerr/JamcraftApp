const VIDEO_HOSTS = ['youtube.com', 'www.youtube.com', 'youtu.be'];

/** Whether an episode link is something to watch (video) or listen to (audio). */
export function episodeMediaLabel(episodeUrl: string): 'Watch' | 'Listen' {
  try {
    return VIDEO_HOSTS.includes(new URL(episodeUrl).hostname) ? 'Watch' : 'Listen';
  } catch {
    return 'Listen';
  }
}
