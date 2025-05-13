from datetime import date

class DateRange:
    def __init__(self, start: date, end: date):
        if end < start:
            raise ValueError("La date de fin doit être postérieure ou égale à la date de début")
        self.start = start
        self.end = end

    def collides(self, other: 'DateRange') -> bool:
        return (
            (self.start <= other.start <= self.end) or
            (self.start <= other.end <= self.end)
        )

    def __str__(self):
        return f"{self.start.isoformat()} à {self.end.isoformat()}"
