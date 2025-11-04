/**
 * Testimonials Data
 * Jony Ive's reflections on James Herr's work
 */

export interface Testimonial {
  id: string;
  quote: string;
  context: string;
  category: 'craft' | 'vision' | 'execution' | 'innovation';
  sentiment?: 'positive' | 'critical';
}

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: '1',
    quote: "There's a remarkable attention to detail in James's work. It's not just about making things function—it's about making them feel inevitable.",
    context: "On the overall portfolio",
    category: 'craft',
  },
  {
    id: '2',
    quote: "What strikes me most is the clarity of thought. Each project demonstrates a deep understanding of both the problem and the most elegant path to its solution.",
    context: "Reviewing the project architecture",
    category: 'vision',
  },
  {
    id: '3',
    quote: "The user experience James creates isn't an afterthought—it's the foundation. This is someone who truly understands that design is not just what it looks like, but how it works.",
    context: "On user-centered design",
    category: 'execution',
  },
  {
    id: '4',
    quote: "I see a developer who doesn't just write code—they craft experiences. There's a purity in the approach that reminds me of our work at Apple.",
    context: "On development philosophy",
    category: 'craft',
  },
  {
    id: '5',
    quote: "The integration of form and function here is exceptional. James understands that true innovation lies not in complexity, but in thoughtful simplicity.",
    context: "On design principles",
    category: 'innovation',
  },
  {
    id: '6',
    quote: "Every pixel, every interaction, every transition—they all serve a purpose. This is the kind of intentionality that separates good work from great work.",
    context: "Examining the interface details",
    category: 'craft',
  },
  {
    id: '7',
    quote: "James has that rare ability to see beyond the immediate problem to the broader experience. This is systems thinking at its finest.",
    context: "On holistic design approach",
    category: 'vision',
  },
  {
    id: '8',
    quote: "The technical execution is flawless, but what's more impressive is the restraint. Knowing what not to do is just as important as knowing what to do.",
    context: "On technical expertise",
    category: 'execution',
  },
  {
    id: '9',
    quote: "I'm particularly impressed by the consistency. Every component, every interaction follows the same design language. This is the mark of a mature designer.",
    context: "On design system implementation",
    category: 'craft',
  },
  {
    id: '10',
    quote: "James approaches problems with both creativity and rigor. The balance between innovation and practicality is exceptional.",
    context: "On problem-solving approach",
    category: 'innovation',
  },
  {
    id: '11',
    quote: "There's a genuine care for the end user evident in every decision. This isn't design for the sake of design—it's design in service of people.",
    context: "On user empathy",
    category: 'vision',
  },
  {
    id: '12',
    quote: "The performance optimization, the accessibility considerations, the attention to edge cases—this is someone who cares about craft at every level.",
    context: "On technical craftsmanship",
    category: 'execution',
  },
  {
    id: '13',
    quote: "What impresses me is the ability to take complex problems and distill them into simple, elegant solutions. This is design thinking at its core.",
    context: "On simplification",
    category: 'innovation',
  },
  {
    id: '14',
    quote: "James has cultivated a design sensibility that values both aesthetics and utility in equal measure. This is increasingly rare.",
    context: "On design philosophy",
    category: 'craft',
  },
  {
    id: '15',
    quote: "The portfolio itself is a testament to James's capabilities—not just as a showcase, but as a working example of exceptional design and engineering.",
    context: "On the portfolio website",
    category: 'execution',
  },
  {
    id: '16',
    quote: "I call this design 'minimalism.' James calls it 'I ran out of ideas on a Tuesday.'",
    context: "Weekend Update: Design Trends",
    category: 'craft',
    sentiment: 'critical',
  },
  {
    id: '17',
    quote: "This portfolio screams innovation—specifically, it's screaming 'help, I'm trapped in 2015!'",
    context: "Weekend Update: Tech Review",
    category: 'innovation',
    sentiment: 'critical',
  },
];
