import { CategoryCount } from './category-count.model';
import { EventResponse } from './event-response.model';

export interface HomeResponse {
  categories: CategoryCount[];
  upcomingEvents: EventResponse[];
}
