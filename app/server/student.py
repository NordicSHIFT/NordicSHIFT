'''
Simple class that holds student information.
Primarily used for scheduler.py
'''

class Student:
    def __init__(self, username, hours, unavailability, shiftAssigned):
        self.username = username
        self.hours = hours
        self.unavailability = unavailability
        self.shiftAssigned = shiftAssigned

    def getUsername():
        return self.username

    def getHours():
        return self.hours

    # unavailability is a list of tuple with start time and end time of when student is unavailable
    def getUnavailability():
        return self.unavailability

    def getShiftAssigned():
        return self.shiftAssigned

    def isAvailable(time): #time passed in should be in a format of a tuple with start and end timeslots
        return not time in self.unavailable

    def assignShift(shift):
        self.hours -= shift.getLength()
        self.shiftAssigned.append(shift)

    def removeFromShift(shift):
        self.hours += shift.getLength()
        self.shiftAssigned.remove(shift)
