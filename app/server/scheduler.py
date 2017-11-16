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

class Scheduler:
    def __init__(self, shifts):
        self.assignedShift = ()
        self.unassignedShift = ()
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

    def __eq__(self, other):
        if self.assignedShift == other.getAssignedShift()

def main():
    res = db.execute("""SELECT * from shift;""")
    shiftRe = res.fetchall()
    shifts = []
    for shift in shiftRe:
        newShift = Shift(shift[2],shift[4],shift[5])
        shifts.append(newShift)

    res = db.execute("""SELECT * from student;""")
    studentRe = res.fetchall()
    students = []
    for student in studentRe:
        newStudent = Student(student[1],student[4])
        res = db.execute("""SELECT starttime, endtime from unavailability where student = %d; """%(int(student[0])))
        newStudent.assignedUnavailability(res)

    schedule = Scheduler()
    schedule.scheduler(shifts, students)
if __name__ == "__main__":
    main()
