export class DateRange {
    public start: Date;
    public end: Date;
  
    constructor(start: Date, end: Date) {
      if (end < start) {
        throw new Error("La date de fin doit être postérieure ou égale à la date de début");
      }
  
      this.start = start;
      this.end = end;
    }
  
    public collides(range: DateRange): boolean {
      return (
        (this.start <= range.start && range.start <= this.end) ||
        (this.start <= range.end && range.end <= this.end)
      );
    }
  }
