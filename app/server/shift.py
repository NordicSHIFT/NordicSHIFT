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
      return round(float((self.end - self.start).seconds / 3600),2)

    def __eq__(self, other):
        return (other.getStudent() == self.student and other.getDept() == self.dept and other.getStart() == self.start and other.getEnd() == self.end)

    def __str__(self):
        pass

    def __hash__(self):
        res = str(self.start)+str(self.end)+str(self.dept)
        if self.student!=None:
            res+=str(self.student)
        return hash(res)
