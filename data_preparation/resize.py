from PIL import Image
import os, sys

path = "/Users/siddharthrajan/Users/siddharthrajan/dataset/validation/wart_viral_infections/"
dirs = os.listdir( path )

def resize():
    print("Resizing...")
    for item in dirs:
        if os.path.isfile(path+item):
            print("Processing: " + item)
            im = Image.open(path+item)
            imResize = im.resize((244,244), Image.ANTIALIAS)
            imResize.save("/Users/siddharthrajan/dataset/validation/wart_viral_infections/" + item, 'JPEG', quality=90)
    print("Done.")

resize()

