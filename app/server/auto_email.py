'''
Allows NordicShift@gmail.com to send emails.
'''
import smtplib
import os
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

def send_email(recipients, subject, message_body):
    """ Sends out an email with the subject and message
    provided to the recipients provided. Recipients may
    take form as a string or a list. The emails will be
    send through NordicShift@gmail.com
    """
    fromaddr = os.environ['EMAIL_NAME']
    password = os.environ['EMAIL_PASS']

    msg = MIMEMultipart()
    msg['From'] = fromaddr
    msg['To'] = ", ".join(recipients)
    msg['Subject'] = subject

    msg.attach(MIMEText(message_body, 'plain'))

    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login(fromaddr, password)
    server.sendmail(fromaddr, recipients, msg.as_string())
    server.quit()

def published_sched_notif(recipients):
    """ Sends out an email telling the recipients that
    they have been scheduled to work. Recipients may
    be provided as a string or an email. The email is
    sent through NordicShift@gmail.com

    """

    subject = "Upcoming schedule has been published"
    message = "Management has posted the upcoming schedule.\n" + \
              "Please login to your account to view the full details.\n" + \
              "https://nordicshift.heroku.com/\n" + \
              "Thank you."

    send_email(recipients, subject, message)
