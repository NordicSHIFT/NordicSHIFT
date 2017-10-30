import subprocess

subprocess.check_call('python3 app.py',
                       cwd='./app/server/',
                       shell=True)