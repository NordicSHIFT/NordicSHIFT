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

    def getUnavailability():
        return self.unavailability

    def getShiftAssigned():
        return self.shiftAssigned