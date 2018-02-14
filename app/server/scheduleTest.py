from scheduler import scheduler2, Schedule
from student import Student
from shift import Shift
import datetime

def main():

    ###### Create Students ######
    students = []
    alfred = Student("alfred",10)
    students.append(alfred)
    bob = Student("bob",10)
    students.append(bob)

        
    ###### Create Shifts ######
    shifts = [] 
    shifts.append(Shift("ITS",datetime.datetime(2018, 2, 13, 8, 0),datetime.datetime(2018, 2, 13, 10, 0), alfred))
    schedule1 = Schedule(shifts)

    shifts = [] 
    shifts.append(Shift("ITS",datetime.datetime(2018, 2, 13, 8, 0),datetime.datetime(2018, 2, 13, 10, 0), alfred))
    schedule2 = Schedule(shifts)
    
    scheduleSet = set()
    scheduleSet.add(schedule1)
    scheduleSet.add(schedule2)
    print(len(scheduleSet))
    
    shifts = [] 

    shifts.append(Shift("ITS",datetime.datetime(2018, 2, 13, 8, 0),datetime.datetime(2018, 2, 13, 10, 0)))
    schedule = Schedule(shifts)
    scheduler2(schedule, students)

main() 