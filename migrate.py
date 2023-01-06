# importing required packages
from pathlib import Path
import shutil
import os

def migrate_test_files():
    # defining source and destination
    # paths
    src = 'test_add-on'
    trg = 'deployed_add-on'

    files=os.listdir(src)


    # iterating over all the files in
    # the source directory
    for fname in files:
        if fname != '.clasp.json':
        # copying the files to the
        # destination directory
            shutil.copy2(os.path.join(src,fname), trg)


migrate_test_files()
