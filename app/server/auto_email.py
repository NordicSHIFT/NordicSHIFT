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

    # fromaddr = os.environ['EMAIL_NAME']
    # password = os.environ['EMAIL_PASS']

    if isinstance(recipients, list):
        recipients =  ", ".join(recipients)
    msg = MIMEMultipart()
    msg['From'] = fromaddr
    msg['To'] = recipients
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
              "https://nordicshift.herokuapp.com/\n" + \
              "Thank you."

    send_email(recipients, subject, message)

def reset_password(recipient, link):
    """Sends out an email allowing the user to reset their
    password. The recipient must be provided along with
    the link to the reset password page."""

    subject = "Reset Password Link"
    message = "Hello, \n" + \
              "You have recently requested to reset your" + \
              "password for your NoridShift account. Click" + \
              "the link below in order to reset your password. \n" + \
              "If you did not request a password reset, please" + \
              "ignore this email or talk to an administrator. \n" + \
              "Link: %s \n" + \
              "Thank you, \n" + \
              "The NordicShift Team" % (link)
    for recipient in recipients:
        send_email(recipient, subject, message)

def reset_password_email(recipient, link):
    """ Sends out an email telling the recipients that
    their password is able to be reset. Passed in is
    a recipient to receive the password reset, along
    with a password reset link.
    """

    subject = "NordicSHIFT password reset request"
    message = "Your password has recently been reset.\n" + \
              "If you requested a password to be reset, follow the link below. \n" + \
              "If you did not request a password reset, ignore this email. \n" + \
              "%s \n"  % (link) + \
              "Thank you."

    send_email(recipient, subject, message)
