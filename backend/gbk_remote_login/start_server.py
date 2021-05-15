import os
import threading


def run():
    path_origin = os.path.abspath(os.path.curdir)
    os.chdir('./login_server')
    # os.system("node server.js > server_log.txt")
    os.system("node server.js")
    os.chdir(path_origin)


def start_server():
    th = threading.Thread(target=run)
    th.setDaemon(True)
    th.start()
