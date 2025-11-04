import { Testimonial } from '../../entities/Testimonial';
import { GetTestimonials } from '../../use-cases/GetTestimonials';

export function useTestimonials() {
  const useCase = new GetTestimonials();
  const testimonials: Testimonial[] = useCase.execute();

  return {
    testimonials,
    loading: false,
  };
}
