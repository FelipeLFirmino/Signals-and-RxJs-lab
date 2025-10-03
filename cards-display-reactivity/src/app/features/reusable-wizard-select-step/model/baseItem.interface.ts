// uma interface base que o tipo T deve estender 
export interface BaseItem {
  id: number;
  name: string;
  category?: string;
  description?: string;
  [key: string]: any;
}
