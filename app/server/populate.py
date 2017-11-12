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

EX_STRING = """INSERT INTO student\
            (username, password, name, hours, seniority)\
            VALUES ('%s', '%s', '%s', %d, %d);
            """

DB.execute(EX_STRING%('thomas', hash_pw('baseball'), 'thomas', 10, 1))
DB.execute(EX_STRING%('billy', hash_pw('icecream'), 'billy', 10, 1))
DB.execute(EX_STRING%('ben', hash_pw('puppies'), 'ben', 10, 1))
DB.execute(EX_STRING%('rob', hash_pw('robots'), 'rob', 10, 1))
DB.execute(EX_STRING%('zach', hash_pw('unicorns'), 'zach', 10, 1))
DB.execute(EX_STRING%('anne', hash_pw('robots'), 'anne', 10, 1))
DB.execute(EX_STRING%('sam', hash_pw('password'), 'sam', 10, 1))
DB.execute(EX_STRING%('kylie', hash_pw('pw'), 'kylie', 10, 1))
DB.execute(EX_STRING%('lisa', hash_pw('notpass'), 'lisa', 10, 1))
DB.execute(EX_STRING%('katie', hash_pw('secret'), 'katie', 10, 1))

EX_STRING = """INSERT INTO unavailability\
            (starttime, endtime, student)\
            VALUES ('%s', '%s', %d)
            """

DB.execute(EX_STRING%('2017-11-07 15:45:00', '2017-11-07 16:45:00', 1))
DB.execute(EX_STRING%('2017-11-07 15:45:00', '2017-11-07 16:45:00', 2))
DB.execute(EX_STRING%('2017-11-07 16:45:00', '2017-11-07 17:45:00', 1))
DB.execute(EX_STRING%('2017-11-07 16:45:00', '2017-11-07 17:45:00', 3))
DB.execute(EX_STRING%('2017-11-07 11:45:00', '2017-11-07 12:45:00', 2))
DB.execute(EX_STRING%('2017-11-08 15:45:00', '2017-11-08 16:45:00', 1))
DB.execute(EX_STRING%('2017-11-08 15:45:00', '2017-11-08 16:45:00', 2))
DB.execute(EX_STRING%('2017-11-08 16:45:00', '2017-11-08 17:45:00', 1))
DB.execute(EX_STRING%('2017-11-08 16:45:00', '2017-11-08 17:45:00', 3))
DB.execute(EX_STRING%('2017-11-08 11:45:00', '2017-11-08 12:45:00', 2))

EX_STRING = """INSERT INTO shift\
            (starttime, endtime)\
            VALUES ('%s', '%s')
            """
DB.execute(EX_STRING%('2017-11-07 10:00:00', '2017-11-07 11:00:00'))
DB.execute(EX_STRING%('2017-11-07 11:00:00', '2017-11-07 12:00:00'))
DB.execute(EX_STRING%('2017-11-07 12:00:00', '2017-11-07 13:00:00'))
DB.execute(EX_STRING%('2017-11-07 13:00:00', '2017-11-07 14:00:00'))
DB.execute(EX_STRING%('2017-11-07 15:00:00', '2017-11-07 16:00:00'))
DB.execute(EX_STRING%('2017-11-07 16:00:00', '2017-11-07 17:00:00'))
DB.execute(EX_STRING%('2017-11-07 17:00:00', '2017-11-07 18:00:00'))

DB.execute(EX_STRING%('2017-11-08 10:00:00', '2017-11-08 11:00:00'))
DB.execute(EX_STRING%('2017-11-08 11:00:00', '2017-11-08 12:00:00'))
DB.execute(EX_STRING%('2017-11-08 12:00:00', '2017-11-08 13:00:00'))
DB.execute(EX_STRING%('2017-11-08 13:00:00', '2017-11-08 14:00:00'))
DB.execute(EX_STRING%('2017-11-08 15:00:00', '2017-11-08 16:00:00'))
DB.execute(EX_STRING%('2017-11-08 16:00:00', '2017-11-08 17:00:00'))
DB.execute(EX_STRING%('2017-11-08 17:00:00', '2017-11-08 18:00:00'))

DB.commit()
