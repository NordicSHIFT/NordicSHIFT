'''
Simple class that holds student information.
Primarily used for scheduler.py
'''

class Student:
    def __init__(self, username, hours, shiftAssigned = None, unavailability = set()):
        self.username = username
        self.hours = float(hours)
        self.unavailability = unavailability
        self.shiftAssigned = shiftAssigned

    def getUsername(self):
        return self.username

    def assignedUnavailability(self, content):
        for time in content:
            self.unavailability.add(content)

    def getHours(self):
        return self.hours

    # unavailability is a list of tuple with datetime object with start time and end time of when student is unavailable
    def getUnavailability(self):
        return self.unavailability

    def getShiftAssigned(self):
        return self.shiftAssigned

    def isAvailable(self, time): #time passed in should be in a format of a tuple with start and end timeslots
        return not (time in self.unavailability)

    def assignShift(self, shift):
        self.hours -= shift.getLength()
        self.shiftAssigned.append(shift)

    def removeFromShift(self, shift):
        self.hours += shift.getLength()
        self.shiftAssigned.remove(shift)

    def __eq__(self, other):
        if other == None:
            return False
        return self.username == other.username

    def __str__(self):
        return self.username

    def serialize(self):
        return self.username
