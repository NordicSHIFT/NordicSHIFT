from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Table, Column, Integer, String, create_engine, Sequence, ForeignKey
from sqlalchemy.orm import sessionmaker, relationship
import os

# f = open('app/server/.env','r')
# content = f.readline().split('=')[1].strip('\n')
# os.environ['DATABASE_URL'] = content
# f.close()

postgresql_uri=os.environ['DATABASE_URL']
engine=create_engine(postgresql_uri)

Session = sessionmaker(bind=engine)
db = Session()
# Base.metadata.drop_all(engine)
# Base.metadata.create_all(engine)
def createTables():
    # delete the tables, just for this test:
    # db.execute('drop table unavailability; drop table shift; drop table student; drop table manager; drop table department;')
    # Create tables if not exists
    # db.execute("DROP table shift;")
    # db.execute("DROP table unavailability;")
    db.execute("""CREATE table if not exists department(\
                            id serial primary key,\
                            name text not null);""")
    db.execute("""CREATE table if not exists manager(\
                            id serial primary key,\
                            username text not null,\
                            password text not null,\
                            name text,\
                            dept integer references department(id));""")
    db.execute("""CREATE table if not exists student(\
                            id serial primary key,\
                            username text not null,\
                            password text not null,\
                            name text,\
                            hours float,\
                            seniority int);""")
    db.execute("""CREATE table if not exists ds(\
                            department integer references department(id),\
                            student integer references student(id)); """)
    db.execute("""CREATE table if not exists shift(\
                            id serial primary key,
                            roll text,\
                            dept integer references department(id),\
                            student integer references student(id),\
                            startTime timestamp,\
                            endTime timestamp);""")
    db.execute("""CREATE table if not exists unavailability(\
                        id serial primary key,\
                        startTime timestamp,\
                        endTime timestamp,\
                        student integer references student(id));""")
    db.commit()
