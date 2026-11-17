import './styles.css';
import { COURSES, EVENT } from './signup/data/menu-config';
import type { DishRepository } from './signup/services/DishRepository';
import { InMemoryDishRepository } from './signup/services/InMemoryDishRepository';
import { createLocalIdentity } from './signup/services/localIdentity';
import { startApp } from './signup/ui/app';
import { DEMO_DISHES } from './signup/data/demo-dishes';

// amplify_outputs.json is written by the Amplify build (`ampx pipeline-deploy`); absent in local dev.
const outputs = Object.values(import.meta.glob<{ default: Record<string, unknown> }>('../amplify_outputs.json', { eager: true }))[0]?.default;

async function makeRepo(): Promise<DishRepository> {
  if (!outputs) return new InMemoryDishRepository(import.meta.env.DEV && location.search.includes('demo') ? DEMO_DISHES : []);
  const [{ Amplify }, { AmplifyDishRepository }] = await Promise.all([
    import('aws-amplify'),
    import('./signup/services/AmplifyDishRepository'),
  ]);
  Amplify.configure(outputs);
  return new AmplifyDishRepository();
}

makeRepo().then((repo) => startApp({
  repo,
  identity: createLocalIdentity(),
  event: EVENT,
  courses: COURSES,
  host: location.hash === '#host',
  preview: !outputs,
}));
