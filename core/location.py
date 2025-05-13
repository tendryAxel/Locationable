from typing import List
from core.date_range import DateRange

class Locationable:
    def __init__(self, name: str):
        self.name = name
        self.location_dates: List[DateRange] = []

    def louer(self, date_range: DateRange):
        for date_de_location in self.location_dates:
            if date_range.collides(date_de_location):
                raise ValueError(f"Locationable {self.name} déjà loué pour la période {date_de_location}")
        self.location_dates.append(date_range)

    def __str__(self):
        return f"Locationable: {self.name}, Nombre de location: {len(self.location_dates)}"
