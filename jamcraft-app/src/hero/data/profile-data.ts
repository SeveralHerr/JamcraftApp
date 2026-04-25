import type { Profile } from '../entities/Profile';
import jamesHerr from '../../james-herr.png';

export const profile: Profile = {
  name: 'James Herr',
  shortBio: 'Full stack engineer. Mob programmer. Godot 4 game designer.',
  longBio: 'Full stack engineer at Flexion Inc., where I help modernize CDC and state agency applications and co-lead a mob programming squad. I design games in Godot 4 exploring procedural generation and AI systems — the same curiosity that drives my professional craft.',
  quote: "Suckin' at something is the first step to being sorta good at something.",
  quoteAuthor: 'Jake, the Dog',
  stack: ['Go', 'C#', 'React', 'Azure', 'Terraform', 'CI/CD', 'Godot 4'],
  portraitSrc: jamesHerr,
  portraitAlt: 'James Herr portrait',
};
