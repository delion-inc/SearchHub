import { formatDistanceToNow, parseISO } from 'date-fns';
import { uk } from 'date-fns/locale';

export default function formatDate(dateString: string): string {
   const date = parseISO(dateString);
   const now = new Date(); 

   if (now.toDateString() === date.toDateString()) {
      return `Сьогодні, ${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`;
   } 

   const yesterday = new Date(now);
   yesterday.setDate(yesterday.getDate() - 1);
   if (yesterday.toDateString() === date.toDateString()) {
      return `Вчора, ${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`;
   } 
   
   return `${formatDistanceToNow(date, { addSuffix: true, locale: uk })}`;
}
