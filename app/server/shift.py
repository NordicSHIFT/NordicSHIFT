'''
Simple class that holds shift information.
Primarily used for scheduler.py
'''

class Shift:
    def __init__(self, dept, start, end, student = None):
        self.dept = dept
        self.student = student
        self.start = start
        self.end = end

    def getDept(self):
        return self.dept

    def getStudent(self):
        return self.student

    def setStudent(self, student):
        self.student = student

    def getStart(self):
        return self.start

    def getEnd(self):
        return self.end

    def getLength(self):
      return self.end - self.start
