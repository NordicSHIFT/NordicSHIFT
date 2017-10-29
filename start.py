import subprocess

install = "npm install"
build = 'npm run build'
execute = "python3 app.py"

processes = []

processes.append(subprocess.Popen(['npm','install'], 
                                stdout=subprocess.PIPE, 
                                cwd='./app/static',
                                shell=True))


processes.append(subprocess.Popen(['npm', 'run', 'build'], 
                                stdout=subprocess.PIPE, 
                                cwd='./app/static',
                                shell=True))


processes.append(subprocess.Popen(['python3','app.py'], 
                                stdout=subprocess.PIPE, 
                                cwd='./app/server/',
                                shell=True))

for process in processes:
    output, error = process.communicate()
