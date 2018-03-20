'''
A schedule finder algorithm.
It will use a list of available shifts and students
in order to find a way to schedule everyone in accross
multiple shifts.
'''
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from student import Student
from shift import Shift
from copy import deepcopy
from collections import Counter

#postgresql_uri=os.environ['DATABASE_URL']
#engine=create_engine(postgresql_uri)

#Session = sessionmaker(bind=engine)
#db = Session()

class Schedule:
    def __init__(self, shifts):
        self.assignedShift = set()
        self.unassignedShift = set()
        for shift in shifts:
            if shift.getStudent() == None:
                self.unassignedShift.add(shift)
            else:
                self.assignedShift.add(shift)

    def getAssignedShift(self):
        return self.assignedShift

    def getUnassignedShift(self):
        return self.unassignedShift
    def __eq__(self, other):
        bool1 = len(self.assignedShift - other.getAssignedShift()) == 0
        bool2 = len(other.getAssignedShift() - self.assignedShift) == 0
        return bool1 and bool2

# this function will show how many differences that the two schedules have. differences are
# calculated based on how many different shifts each assigned schedule have
    def noDifferences(self,other):
        count = 0
        for shift in self.assignedShift:
            if shift not in other.assignedShift:
                count += 1
        return count

    def getNoStudents(self):
        students = set(shift.getStudent for shift in self.assignedShift)
        return len(students)

    def __hash__(self):
        res = ""
        unassigned = list(self.unassignedShift)
        unassigned.sort()
        if unassigned:
            for shift in unassigned:
                res += str(shift)
        assigned = list(self.assignedShift)
        assigned.sort()
        if assigned:
            for shift in assigned:
                res += str(shift)
        return hash(res)

    def getFirstUnassigned(self):
        return self.unassignedShift.pop()

    def __str__(self):
        returnStr = "Assigned Shifts: \n"
        assigned = list(self.assignedShift)
        assigned.sort()
        if assigned:
            for shift in self.assignedShift:
                returnStr += str(shift)
                returnStr += "\n"
        unassigned = list(self.unassignedShift)
        unassigned.sort()
        if unassigned:
            for shift in self.unassignedShift:
                returnStr += str(shift)
                returnStr += "\n"
        return returnStr
        #return "Assigned Shift: " + str(self.assignedShift) + " \n Unassigned Shift" + str(self.unassignedShift)
    # This function will help with jsonify the object Schedule
    def serialize(self):
        return {
            "assigned shifts": [shift.serialize() for shift in self.assignedShift],
            "unassigned shifts": [shift.serialize() for shift in self.unassignedShift]
        }

def main():
    res = db.execute("""SELECT * from shift where dept = 4 ;""")
    shiftRe = res.fetchall()
    shifts = []
    for shift in shiftRe:
        newShift = Shift(shift[2],shift[4],shift[5])
        shifts.append(newShift)

    res = db.execute("""SELECT * from student where hours > 0;""")
    studentRe = res.fetchall()
    students = []
    for student in studentRe:
        newStudent = Student(student[1],student[4])
        # print(newStudent)
        res = db.execute("""SELECT starttime, endtime from unavailability where student = %d; """%(int(student[0])))
        res = res.fetchall()
        for item in res:
            newStudent.assignedUnavailability((item[0],item[1]))
        students.append(newStudent)

    schedule = Schedule(shifts)
    scheduler2(schedule, students)

def scheduler2(schedule, students):
    # file_out = open("schedules.txt", 'w', encoding="utf-8")
    scheduleStack = [schedule]
    visited = set()
    visited_hash = set()
    complete = set()
    complete_hash = set()
    # print("in scheduler")
    # f = open('schedulerResult.txt','w')
    while len(scheduleStack)>0 and len(complete) < 80:
        currSched = scheduleStack.pop()

        if len(currSched.getUnassignedShift()) == 0:
            # print('current full Sched: ',currSched)
            # f.write('current full Sched\n')
            # f.write(str(currSched))
            if hash(currSched) not in complete_hash:
                # print('in currSched Loop')
                # print("before add length: ", len(complete))
                complete.add(currSched)
                complete_hash.add(hash(currSched))
                # print("post add length: ", len(complete))
                # file_out.write(str(currSched))
        else:
            # print("come in else")
            topShift = currSched.getFirstUnassigned() #should remove it from unassigned as well

            for student in students:
                # print("student",student)
                # print("topShift Student",topShift.getStudent())
                if student.isAvailable(topShift):
                    # hoursLeft will look at the hours that a student have and calculate how many
                    # hours a student have left for a specific schedule
                    hoursLeft = float(student.getHours())

                    # loop through the currShed's assigned shift to see how many hours that
                    # particular student has been assigned and whether the time they have left is enough to assigned new shift
                    available = True
                    for shift in currSched.getAssignedShift():
                        # print(shift)
                        if shift.getStudent() == student:
                            hoursLeft -= float(shift.getLength())
                            #check if new shift overlaps with old shift
                            if topShift.getStart() > shift.getStart() and topShift.getStart() < shift.getEnd():
                                available = False

                            if topShift.getEnd() > shift.getStart() and topShift.getEnd() < shift.getEnd():
                                available = False

                            if topShift.getStart() < shift.getStart() and topShift.getEnd() > shift.getEnd():
                                available = False

                            if topShift.getStart() < shift.getStart() and topShift.getEnd() > shift.getEnd():
                                available = False

                    if hoursLeft >= topShift.getLength() and available:
                        newTop = Shift(topShift.getId(), topShift.getDept(), topShift.getStart(),topShift.getEnd(),topShift.getStudent())
                        newTop.setStudent(student)

                        oldAssigned = deepcopy(currSched.getAssignedShift())
                        oldAssigned.add(newTop)
                        newShifts = oldAssigned.union(currSched.getUnassignedShift())

                        newSched = Schedule(newShifts)

                        if hash(newSched) not in visited_hash:
                            scheduleStack.append(newSched)
                            visited.add(newSched)
                            visited_hash.add(hash(newSched))
    #print("schedule complete")
    print("number of schedules", len(complete))
    # file_out.close()
    return getTopTenSchedule(complete)

# This function will get the top 10 "ideal" schedule. We want to look at schedule with the most student first as priority
# and then schedules that have the most uniqueness, if that makes any sense
def getTopTenSchedule(scheduleSet):
    stuSche = {}
    for schedule in scheduleSet:
        noStudent = schedule.getNoStudents()
        if noStudent not in stuSche.keys():
            stuSche[noStudent] = set()
        stuSche[noStudent].add(schedule)
    stuSche = Counter(stuSche)
    count = 0
    maxD = 0
    # f = open("schedulerResult.txt","w")
    # this takes the list of schedules that contains the most number of students
    schedules = list(stuSche[stuSche.most_common(1)[0][0]])
    res = set()
    # for i in range(0, len(schedules)):
    #     # f.write(str(schedules[i]))
    #     for j in range(i, len(schedules)):
    #         if schedules[i].noDifferences(schedules[j]) > maxD:
    #             maxD = schedules[i].noDifferences(schedules[j])
    #             shift1,shift2 = schedules[i],schedules[j]
    #     f.write(str("the different from the beforehand schedule is: "+str(maxD)+'\n'))
    #     res.add(shift1)
    #     res.add(shift2)
    # f.close()
    i = 0
    # take the shifts that have the most differences
    while i < len(schedules) and count < 10:
        for j in range(i, len(schedules)):
            if schedules[i].noDifferences(schedules[j]) > maxD:
                maxD = schedules[i].noDifferences(schedules[j])
                shift1 = schedules[i]
                shift2 = schedules[j]
        # f.write(str("the different from the beforehand schedule is: "+str(maxD)+'\n'))
        # f.write(str(schedules[i]))
        # f.write(str(schedules[j]))
        res.add(shift1)
        res.add(shift2)
        schedules.remove(shift1)
        schedules.remove(shift2)
        maxD = 0
        i += 1
        count += 2
    # f.close()
    return stuSche[stuSche.most_common(1)[0][0]]

if __name__ == "__main__":
    main()
