import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

def sendEmail(recipients, subject, message_body):

    msg = MIMEMultipart()
    msg['From'] = FROMADDR
    msg['To'] = ", ".join(recipients)
    msg['Subject'] = subject

    msg.attach(MIMEText(message_body, 'plain'))

    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login(FROMADDR, PASSWORD)
    text = msg.as_string()
    server.sendmail(FROMADDR, recipients, msg.as_string())
    server.quit()

def published_sched_notif(recipients):
    SUBJECT = "Upcoming schedule has been published"
    MESSAGE = "Management has posted the upcoming schedule.\n" +
              "Please login to your account to view the full details.\n" +
              "https://nordicshift.heroku.com/\n" +
              "Thank you."

    sendEmail(recipients, SUBJECT, MESSAGE)