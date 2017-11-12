'''
Simple class that holds shift information.
Primarily used for scheduler.py
'''

class Shift:
    def __init__(dept, student, start, end):
        self.dept = dept
        self.student = student
        self.start = start
        self.end = end

    def getDept():
        return self.dept

    def getStudent():
        return self.student

    def getStart():
        return self.start

    def getEnd():
        return self.end