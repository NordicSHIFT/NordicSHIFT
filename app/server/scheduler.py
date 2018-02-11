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

postgresql_uri=os.environ['DATABASE_URL']
engine=create_engine(postgresql_uri)

Session = sessionmaker(bind=engine)
db = Session()

class Schedule:
    def __init__(self, shifts):
        self.assignedShift = set()
        self.unassignedShift = set()
        for shift in shifts:
            if shift.getStudent() == None:
                self.unassignedShift.add(shift)
            else:
                self.assignedShift.add(shift)
        # TODO make bad_schedules and good_schedules sets
    # def getBadSchedules(self):
    #     '''
    #     Returns the list of failed schedules
    #     '''
    #     return self.bad_schedules
    #
    # def getGoodSchedules(self):
    #     '''
    #     Returns the list of successfull schedules
    #     '''
    #     return self.good_schedules
    #
    # def scheduler(self, shifts, students): #where it all goes down
    #     while (len(self.good_schedules) < 3):
    #       self.available_shifts = shifts
    #       while len(self.available_shifts) != 0:
    #         shift = self.available_shifts.pop()
    #         i = 0
    #         while shift.getStudent() == None and i < len(students):
    #           student = students[i]
    #           if student.isAvailable(shift):
    #             #add student to shift
    #             shift.setStudent(student)
    #             student.assignShift(shift)
    #             self.assigned_shifts.append(shift)
    #             if (self.assigned_shifts in self.bad_schedules or self.assigned_shifts in self.good_schedules):
    #               '''This schedule has already been tried, so we want to remove the shift we
    #                 just assigned, and then look for another student
    #               '''
    #               self.assigned_shifts.remove(-1)
    #               student.removeFromShift(shift)
    #               shift.setStudent(None)
    #               i += 1
    #           else:
    #             '''that student was not availabel, so we move onto the next'''
    #             i += 1
    #
    #         if shift.getStudent() == None:
    #           '''we could not find an available student, the schedule we attempted won't work,
    #           we add it to the bad schedules, and remove the last assigned shift '''
    #           self.bad_schedules.append(self.assigned_shifts)
    #           lastAssigned = self.assigned_shifts.pop()
    #           student.removeFromShift(lastAssigned)
    #           lastAssigned.setStudent(None)
    #           self.available_shifts.append(lastAssigned)
    #       '''if we make it here, every shift has been assigned a student, we add the schedule
    #       to the list of good schedules'''
    #       self.good_schedules.add(self.assigned_shifts)
    def getAssignedShift(self):
        return self.assignedShift

    def getUnassignedShift(self):
        return self.unassignedShift

    def __eq__(self, other):
        return self.assignedShift == other.getAssignedShift()

    def __hash__(self):
        res = ""
        unassigned = list(self.unassignedShift).sort() 
        if unassigned:
            for shift in unassigned:
                res += str(shift)
        assigned = list(self.assignedShift).sort() 
        if assigned: 
            for shift in assigned:
                res += str(shift)
        return hash(res)

    def getFirstUnassigned(self):
        return self.unassignedShift.pop()

    def __str__(self):
        returnStr = "Assigned Shifts: \n"
        for shift in self.assignedShift:
            returnStr += str(shift)
            returnStr += "\n"
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
    scheduleStack = [schedule]
    visited = set()
    complete = set()
    print("in scheduler")
    # f = open('schedulerResult.txt','w')
    while len(scheduleStack)>0:
        currSched = scheduleStack.pop()
        if len(currSched.getUnassignedShift()) == 0:
            # print('current full Sched: ',currSched)
            # f.write('current full Sched\n')
            # f.write(str(currSched))
            if currSched not in complete:
                complete.add(currSched)
        else:
            # print("come in else")
            topShift = currSched.getFirstUnassigned() #should remove it from unassigned as well
            for student in students:
                # print(student)
                if student.isAvailable(topShift):
                    # if (student.username == "ben"):
                        # print("ben is available")
                    #print('student is available at this time')
                    # hoursLeft will look at the hours that a student have and calculate how many
                    # hours a student have left for a specific schedule
                    hoursLeft = float(student.getHours())

                    # loop through the currShed's assigned shift to see how many hours that
                    # particular student has been assigned and whether the time they have left is enough to assigned new shift
                    # also check if assigned shifts overlap 
                    available = True 
                    for shift in currSched.getAssignedShift():
                        #print(shift)
                        if shift.getStudent() == student:
                            hoursLeft -= float(shift.getLength())
                            #TODO check if new shift overlaps with old shift 
                            if topShift.getStart() > shift.getStart() and topShift.getStart() < shift.getEnd():
                                available = False 

                            if topShift.getEnd() > shift.getStart() and topShift.getEnd() < shift.getEnd():
                                available = False 

                            if topShift.getStart() < shift.getStart() and topShift.getEnd() > shift.getEnd():
                                available = False 

                    if hoursLeft >= topShift.getLength() and available:
                        # if (student.username == "ben"):
                            # print("ben had hours")
                        topShift.setStudent(student)
                        currSched.getAssignedShift().add(topShift)
                        currSched.getUnassignedShift()
                        newShifts = currSched.getAssignedShift().union(currSched.getUnassignedShift())

                        newSched = Schedule(newShifts)
                        #print("new schedule: ", newSched)
                        if newSched not in visited:
                            scheduleStack.append(newSched)
                            visited.add(newSched)
    print("schedule complete")
    print("number of schedules", len(complete))
    return complete 

if __name__ == "__main__":
    main()
