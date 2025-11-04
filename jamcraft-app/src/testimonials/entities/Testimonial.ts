export interface Testimonial {
  id: string;
  quote: string;
  context: string;
  category: 'craft' | 'vision' | 'execution' | 'innovation';
  sentiment?: 'positive' | 'critical';
}
