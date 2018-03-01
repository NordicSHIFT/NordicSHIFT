'''
Simple class that holds shift information.
Primarily used for scheduler.py
'''

class Shift:
    def __init__(self,sid, dept, start, end, student = None):
        self.id  = sid
        self.dept = dept
        self.start = start
        self.end = end
        self.student = student

    def __lt__(self, other):
        if self.student != other.student:
            return self.student < other.student
        if self.start != other.start:
             return self.start < other.start
        if self.end != other.end:
            return self.end < other.end
        if self.dept != other.dept:
            return self.dept < other.dept

    def __gt__(self, other):
        if self.student != other.student:
            return self.student > other.student
        if self.start != other.start:
            return self.start > other.start
        if self.end != other.end:
            return self.end > other.end
        if self.dept != other.dept:
            return self.dept > other.dept
    def getId(self):
        return self.id

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
        res = 'id '+str(self.id)+" start "+str(self.start) + " end " +str(self.end)+" dept "+str(self.dept)
        if self.student!=None:
            res+=" student "+str(self.student)
        return res

    def __hash__(self):
        res = str(self.id) + str(self.start)+str(self.end)+str(self.dept)
        if self.student!=None:
            res+=str(self.student)
        return hash(res)

# this function help with jsonify
    def serialize(self):
        if (None != self.student):
            student = self.student.serialize()
        else:
            student = ""
        return {
        "id" :self.id,
        "start" : self.start,
        "end" : self.end,
        "dept": self.dept,
        "student" : student
    }
