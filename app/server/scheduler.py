'''
A schedule finder algorithm.
It will use a list of available shifts and students
in order to find a way to schedule everyone in accross
multiple shifts.
'''

class Scheduler:
    def __init__():
        self.bad_schedules = set()
        self.good_schedules = set()
        self.available_shifts = [] #stack, top of stack == end of list
        self.assigned_shifts = [] #stack
    
    def getBadSchedules():
        '''
        Returns the list of failed schedules
        '''
        return self.bad_schedules

    def getGoodSchedules():
        '''
        Returns the list of successfull schedules
        '''
        return self.good_schedules

    def scheduler(shifts, students): #where it all goes down 
        while (self.good_schedules.length() < 3): 
          self.available_shifts = shifts 
          while self.available_shifts.length() != 0: 
            shift = self.available_shifts.pop()
            i = 0
            while shift.getStudent() == None and i < students.length(): 
              student = students[i]
              if student.isAvailable(shift): 
                #add student to shift
                shift.setStudent(student)
                student.assignShift(shift)
                self.assigned_shifts.append(shift)
                if (self.assigned_shifts in self.bad_schedules or self.assigned_shifts in self.good_schedules):
                  '''This schedule has already been tried, so we want to remove the shift we 
                    just assigned, and then look for another student
                  '''
                  self.assigned_shifts.remove(-1)
                  student.removeFromShift(shift) 
                  shift.setStudent(None)
                  i += 1
              else:
                '''that student was not availabel, so we move onto the next'''
                i += 1

            if shift.getStudent() == None:
              '''we could not find an available student, the schedule we attempted won't work,
              we add it to the bad schedules, and remove the last assigned shift '''
              self.bad_schedules.add(self.assigned_shifts)
              lastAssigned = self.assigned_shifts.pop()
              student.removeFromShift(lastAssigned)
              lastAssigned.setStudent(None)
              self.available_shifts.append(lastAssigned)
          '''if we make it here, every shift has been assigned a student, we add the schedule
          to the list of good schedules'''
          self.good_schedules.add(self.assigned_shifts) 