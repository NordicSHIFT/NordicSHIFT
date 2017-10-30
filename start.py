import subprocess

subprocess.check_call('npm run build',
                      cwd='./app/static',
                      shell=True)

subprocess.check_call('python3 app.py',
                       cwd='./app/server/',
                       shell=True)