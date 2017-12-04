'''
Python script that populates the database with test users.
'''

import hashlib
import os
import datetime
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

def hash_pw(password):
    '''
    A hashing function.
    Pass in a plain text password that will get hashed and salted.
    Returns hashed password.
    '''
    return hashlib.sha512(password.encode('utf-8') + SALT.encode('utf-8')).hexdigest()

POSTGRESQL_URI = os.environ['DATABASE_URL']
ENGINE = create_engine(POSTGRESQL_URI)

SESSION = sessionmaker(bind=ENGINE)
DB = SESSION()

SALT = os.environ['SALT']
# DB.execute("""INSERT into department(name) VALUES ('LIS');""")
# DB.commit()
# EX_STRING = """INSERT INTO student\
#             (username, password, name, hours, seniority)\
#             VALUES ('%s', '%s', '%s', %d, %d);
#             """
#
# DB.execute(EX_STRING%('thomas', hash_pw('baseball'), 'thomas', 10, 1))
# DB.execute(EX_STRING%('billy', hash_pw('icecream'), 'billy', 10, 1))
# DB.execute(EX_STRING%('ben', hash_pw('puppies'), 'ben', 10, 1))
# DB.execute(EX_STRING%('rob', hash_pw('robots'), 'rob', 10, 1))
# DB.execute(EX_STRING%('zach', hash_pw('unicorns'), 'zach', 10, 1))
# DB.execute(EX_STRING%('anne', hash_pw('robots'), 'anne', 10, 1))
# DB.execute(EX_STRING%('sam', hash_pw('password'), 'sam', 10, 1))
# DB.execute(EX_STRING%('kylie', hash_pw('pw'), 'kylie', 10, 1))
# DB.execute(EX_STRING%('lisa', hash_pw('notpass'), 'lisa', 10, 1))
# DB.execute(EX_STRING%('katie', hash_pw('secret'), 'katie', 10, 1))

# DB.commit()
EX_STRING = """INSERT INTO unavailability\
            (starttime, endtime, student)\
            VALUES ('%s', '%s', (SELECT id from student where username = '%s'))
            """
# Thomas
DB.execute(EX_STRING%('2017-11-07 11:00:00', '2017-11-07 12:30:00', 'thomas'))
DB.execute(EX_STRING%('2017-11-07 12:45:00', '2017-11-07 14:15:00', 'thomas'))
DB.execute(EX_STRING%('2017-11-07 18:00:00', '2017-11-07 20:30:00', 'thomas'))
DB.execute(EX_STRING%('2017-11-07 23:00:00', '2017-11-07 24:00:00', 'thomas'))
DB.execute(EX_STRING%('2017-11-07 16:45:00', '2017-11-07 17:45:00', 'thomas'))

DB.execute(EX_STRING%('2017-11-08 08:00:00', '2017-11-08 09:00:00', 'thomas'))
DB.execute(EX_STRING%('2017-11-08 09:15:00', '2017-11-08 10:15:00', 'thomas'))
DB.execute(EX_STRING%('2017-11-08 11:00:00', '2017-11-08 12:00:00', 'thomas'))
DB.execute(EX_STRING%('2017-11-08 16:30:00', '2017-11-08 18:30:00', 'thomas'))
DB.execute(EX_STRING%('2017-11-08 20:00:00', '2017-11-08 21:00:00', 'thomas'))

# Billy
DB.execute(EX_STRING%('2017-11-07 08:00:00', '2017-11-07 09:30:00', 'billy'))
DB.execute(EX_STRING%('2017-11-07 14:30:00', '2017-11-07 16:00:00', 'billy'))
DB.execute(EX_STRING%('2017-11-07 16:00:00', '2017-11-07 17:00:00', 'billy'))
DB.execute(EX_STRING%('2017-11-07 18:00:00', '2017-11-07 19:00:00', 'billy'))

DB.execute(EX_STRING%('2017-11-08 08:00:00', '2017-11-08 09:00:00', 'billy'))
DB.execute(EX_STRING%('2017-11-08 11:00:00', '2017-11-08 12:00:00', 'billy'))
DB.execute(EX_STRING%('2017-11-08 12:15:00', '2017-11-08 01:15:00', 'billy'))
DB.execute(EX_STRING%('2017-11-08 15:00:00', '2017-11-08 17:00:00', 'billy'))
DB.execute(EX_STRING%('2017-11-08 18:00:00', '2017-11-08 19:30:00', 'billy'))

# ben
DB.execute(EX_STRING%('2017-11-07 06:00:00', '2017-11-07 07:30:00', 'ben'))
DB.execute(EX_STRING%('2017-11-07 09:45:00', '2017-11-07 11:00:00', 'ben'))
DB.execute(EX_STRING%('2017-11-07 11:00:00', '2017-11-07 12:00:00', 'ben'))
DB.execute(EX_STRING%('2017-11-07 12:45:00', '2017-11-07 14:15:00', 'ben'))
DB.execute(EX_STRING%('2017-11-07 17:00:00', '2017-11-07 18:00:00', 'ben'))

DB.execute(EX_STRING%('2017-11-08 09:15:00', '2017-11-08 10:15:00', 'ben'))
DB.execute(EX_STRING%('2017-11-08 10:15:00', '2017-11-08 11:00:00', 'ben'))
DB.execute(EX_STRING%('2017-11-08 11:00:00', '2017-11-08 11:45:00', 'ben'))
DB.execute(EX_STRING%('2017-11-08 13:30:00', '2017-11-08 14:30:00', 'ben'))
DB.execute(EX_STRING%('2017-11-08 14:45:00', '2017-11-08 15:45:00', 'ben'))
DB.execute(EX_STRING%('2017-11-08 16:30:00', '2017-11-08 18:30:00', 'ben'))

# rob
DB.execute(EX_STRING%('2017-11-07 12:00:00', '2017-11-07 13:00:00', 'rob'))
DB.execute(EX_STRING%('2017-11-07 18:45:00', '2017-11-07 19:45:00', 'rob'))
DB.execute(EX_STRING%('2017-11-07 20:00:00', '2017-11-07 22:00:00', 'rob'))
DB.execute(EX_STRING%('2017-11-07 22:15:00', '2017-11-07 24:00:00', 'rob'))
DB.execute(EX_STRING%('2017-11-07 14:45:00', '2017-11-07 15:45:00', 'rob'))

DB.execute(EX_STRING%('2017-11-08 08:00:00', '2017-11-08 09:00:00', 'rob'))
DB.execute(EX_STRING%('2017-11-08 09:15:00', '2017-11-08 10:15:00', 'rob'))
DB.execute(EX_STRING%('2017-11-08 11:00:00', '2017-11-08 12:00:00', 'rob'))
DB.execute(EX_STRING%('2017-11-08 13:30:00', '2017-11-08 14:30:00', 'rob'))
DB.execute(EX_STRING%('2017-11-08 14:45:00', '2017-11-08 15:45:00', 'rob'))
DB.execute(EX_STRING%('2017-11-08 19:30:00', '2017-11-08 21:00:00', 'rob'))

# zach
DB.execute(EX_STRING%('2017-11-07 09:45:00', '2017-11-07 11:30:00', 'zach'))
DB.execute(EX_STRING%('2017-11-07 12:45:00', '2017-11-07 14:15:00', 'zach'))
DB.execute(EX_STRING%('2017-11-07 18:00:00', '2017-11-07 20:30:00', 'zach'))
DB.execute(EX_STRING%('2017-11-07 23:00:00', '2017-11-07 24:00:00', 'zach'))
DB.execute(EX_STRING%('2017-11-07 16:45:00', '2017-11-07 17:45:00', 'zach'))

DB.execute(EX_STRING%('2017-11-08 08:00:00', '2017-11-08 09:00:00', 'zach'))
DB.execute(EX_STRING%('2017-11-08 11:00:00', '2017-11-08 12:00:00', 'zach'))
DB.execute(EX_STRING%('2017-11-08 12:15:00', '2017-11-08 01:15:00', 'zach'))
DB.execute(EX_STRING%('2017-11-08 15:00:00', '2017-11-08 17:00:00', 'zach'))
DB.execute(EX_STRING%('2017-11-08 18:00:00', '2017-11-08 19:30:00', 'zach'))

# anne
DB.execute(EX_STRING%('2017-11-07 08:00:00', '2017-11-07 09:30:00', 'anne'))
DB.execute(EX_STRING%('2017-11-07 14:30:00', '2017-11-07 16:00:00', 'anne'))
DB.execute(EX_STRING%('2017-11-07 16:00:00', '2017-11-07 17:00:00', 'anne'))
DB.execute(EX_STRING%('2017-11-07 18:00:00', '2017-11-07 19:00:00', 'anne'))

DB.execute(EX_STRING%('2017-11-08 06:30:00', '2017-11-08 08:30:00', 'anne'))
DB.execute(EX_STRING%('2017-11-08 09:15:00', '2017-11-08 10:15:00', 'anne'))
DB.execute(EX_STRING%('2017-11-08 11:00:00', '2017-11-08 12:00:00', 'anne'))
DB.execute(EX_STRING%('2017-11-08 14:45:00', '2017-11-08 15:45:00', 'anne'))
DB.execute(EX_STRING%('2017-11-08 19:30:00', '2017-11-08 21:00:00', 'anne'))

# sam
DB.execute(EX_STRING%('2017-11-07 10:30:00', '2017-11-07 12:00:00', 'sam'))
DB.execute(EX_STRING%('2017-11-07 12:45:00', '2017-11-07 14:15:00', 'sam'))
DB.execute(EX_STRING%('2017-11-07 18:00:00', '2017-11-07 20:30:00', 'sam'))
DB.execute(EX_STRING%('2017-11-07 23:00:00', '2017-11-07 24:00:00', 'sam'))
DB.execute(EX_STRING%('2017-11-07 20:45:00', '2017-11-07 21:45:00', 'sam'))

DB.execute(EX_STRING%('2017-11-08 06:00:00', '2017-11-08 07:30:00', 'sam'))
DB.execute(EX_STRING%('2017-11-08 09:45:00', '2017-11-08 11:00:00', 'sam'))
DB.execute(EX_STRING%('2017-11-08 11:00:00', '2017-11-08 12:00:00', 'sam'))
DB.execute(EX_STRING%('2017-11-08 12:45:00', '2017-11-08 14:15:00', 'sam'))
DB.execute(EX_STRING%('2017-11-08 17:00:00', '2017-11-08 18:00:00', 'sam'))

# kylie
DB.execute(EX_STRING%('2017-11-07 08:00:00', '2017-11-07 09:30:00', 'kylie'))
DB.execute(EX_STRING%('2017-11-07 14:30:00', '2017-11-07 16:00:00', 'kylie'))
DB.execute(EX_STRING%('2017-11-07 16:15:00', '2017-11-07 17:15:00', 'kylie'))
DB.execute(EX_STRING%('2017-11-07 18:15:00', '2017-11-07 19:00:00', 'kylie'))

DB.execute(EX_STRING%('2017-11-08 08:00:00', '2017-11-08 09:00:00', 'kylie'))
DB.execute(EX_STRING%('2017-11-08 10:15:00', '2017-11-08 11:00:00', 'kylie'))
DB.execute(EX_STRING%('2017-11-08 11:00:00', '2017-11-08 11:45:00', 'kylie'))
DB.execute(EX_STRING%('2017-11-08 13:30:00', '2017-11-08 14:30:00', 'kylie'))
DB.execute(EX_STRING%('2017-11-08 17:45:00', '2017-11-08 18:45:00', 'kylie'))
DB.execute(EX_STRING%('2017-11-08 21:30:00', '2017-11-08 23:00:00', 'kylie'))

# lisa
DB.execute(EX_STRING%('2017-11-07 09:15:00', '2017-11-07 10:15:00', 'anne'))
DB.execute(EX_STRING%('2017-11-07 11:00:00', '2017-11-07 12:00:00', 'anne'))
DB.execute(EX_STRING%('2017-11-07 14:45:00', '2017-11-07 15:45:00', 'anne'))
DB.execute(EX_STRING%('2017-11-07 15:45:00', '2017-11-07 16:00:00', 'anne'))

DB.execute(EX_STRING%('2017-11-08 09:45:00', '2017-11-08 11:00:00', 'sam'))
DB.execute(EX_STRING%('2017-11-08 11:00:00', '2017-11-08 12:30:00', 'sam'))
DB.execute(EX_STRING%('2017-11-08 12:45:00', '2017-11-08 14:15:00', 'sam'))
DB.execute(EX_STRING%('2017-11-08 14:45:00', '2017-11-08 15:45:00', 'sam'))

# katie
DB.execute(EX_STRING%('2017-11-07 06:00:00', '2017-11-07 07:30:00', 'katie'))
DB.execute(EX_STRING%('2017-11-07 09:45:00', '2017-11-07 11:00:00', 'katie'))
DB.execute(EX_STRING%('2017-11-07 12:45:00', '2017-11-07 14:15:00', 'katie'))
DB.execute(EX_STRING%('2017-11-07 16:00:00', '2017-11-07 18:00:00', 'katie'))

DB.execute(EX_STRING%('2017-11-08 09:15:00', '2017-11-08 10:15:00', 'katie'))
DB.execute(EX_STRING%('2017-11-08 10:15:00', '2017-11-08 11:00:00', 'katie'))
DB.execute(EX_STRING%('2017-11-08 13:30:00', '2017-11-08 14:30:00', 'katie'))
DB.execute(EX_STRING%('2017-11-08 16:30:00', '2017-11-08 18:30:00', 'katie'))
DB.execute(EX_STRING%('2017-11-08 19:00:00', '2017-11-08 21:00:00', 'katie'))

DB.commit()
# EX_STRING = """INSERT INTO shift\
#             (starttime, endtime, dept)\
#             VALUES ('%s', '%s', (SELECT id from department where name = 'LIS'));
#             """
# DB.execute(EX_STRING%('2017-11-07 10:00:00', '2017-11-07 11:00:00'))
# DB.execute(EX_STRING%('2017-11-07 11:00:00', '2017-11-07 12:00:00'))
# DB.execute(EX_STRING%('2017-11-07 12:00:00', '2017-11-07 13:00:00'))
# DB.execute(EX_STRING%('2017-11-07 13:00:00', '2017-11-07 14:00:00'))
# DB.execute(EX_STRING%('2017-11-07 15:00:00', '2017-11-07 16:00:00'))
# DB.execute(EX_STRING%('2017-11-07 16:00:00', '2017-11-07 17:00:00'))
# DB.execute(EX_STRING%('2017-11-07 17:00:00', '2017-11-07 18:00:00'))
#
# DB.execute(EX_STRING%('2017-11-08 10:00:00', '2017-11-08 11:00:00'))
# DB.execute(EX_STRING%('2017-11-08 11:00:00', '2017-11-08 12:00:00'))
# DB.execute(EX_STRING%('2017-11-08 12:00:00', '2017-11-08 13:00:00'))
# DB.execute(EX_STRING%('2017-11-08 13:00:00', '2017-11-08 14:00:00'))
# DB.execute(EX_STRING%('2017-11-08 15:00:00', '2017-11-08 16:00:00'))
# DB.execute(EX_STRING%('2017-11-08 16:00:00', '2017-11-08 17:00:00'))
# DB.execute(EX_STRING%('2017-11-08 17:00:00', '2017-11-08 18:00:00'))

# DB.execute(EX_STRING%('2017-11-07 08:00:00', '2017-11-07 10:00:00'))
# DB.execute(EX_STRING%('2017-11-07 10:00:00', '2017-11-07 12:00:00'))
# DB.execute(EX_STRING%('2017-11-07 12:00:00', '2017-11-07 15:00:00'))
# DB.execute(EX_STRING%('2017-11-07 15:00:00', '2017-11-07 17:00:00'))
# DB.execute(EX_STRING%('2017-11-07 17:00:00', '2017-11-07 19:00:00'))
# DB.execute(EX_STRING%('2017-11-07 19:00:00', '2017-11-07 21:00:00'))
# DB.execute(EX_STRING%('2017-11-07 21:00:00', '2017-11-07 23:00:00'))
# DB.execute(EX_STRING%('2017-11-07 23:00:00', '2017-11-07 24:00:00'))
#
# DB.execute(EX_STRING%('2017-11-08 08:00:00', '2017-11-08 10:00:00'))
# DB.execute(EX_STRING%('2017-11-08 10:00:00', '2017-11-08 12:00:00'))
# DB.execute(EX_STRING%('2017-11-08 12:00:00', '2017-11-08 15:00:00'))
# DB.execute(EX_STRING%('2017-11-08 15:00:00', '2017-11-08 17:00:00'))
# DB.execute(EX_STRING%('2017-11-08 17:00:00', '2017-11-08 19:00:00'))
# DB.execute(EX_STRING%('2017-11-08 19:00:00', '2017-11-08 21:00:00'))
# DB.execute(EX_STRING%('2017-11-08 21:00:00', '2017-11-08 23:00:00'))
# DB.execute(EX_STRING%('2017-11-08 23:00:00', '2017-11-08 24:00:00'))
# EX_STRING = """INSERT INTO ds\
#             (department, student)\
#             VALUES (4, '%d');"""
# for i in range(22,31):
#     DB.execute(EX_STRING%(i))
#     DB.commit()
