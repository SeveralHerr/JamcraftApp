import { Testimonial } from '../entities/Testimonial';
import { TESTIMONIALS_DATA } from '../data/testimonials-data';

export class GetTestimonials {
  execute(): Testimonial[] {
    return TESTIMONIALS_DATA;
  }
}
