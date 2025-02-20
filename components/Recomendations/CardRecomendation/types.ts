export interface ICardRecomendationProps {
  items: {
    name: string;
    description: string;
    date: string;
    image: string;
    href: string;
    qualification: number;
    largeText?: boolean;
  }[];
}
