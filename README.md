# Sit-up!
The personalized AI posture practitioner for everyone

# AI module
Use tf-pose-estimation

### Step1: 
For download of dependencies, refer to https://medium.com/@gsethi2409/pose-estimation-with-tensorflow-2-0-a51162c095ba;

### Step2: 
Add sit-up.py to the folder "tf-pose-estimation" which should be downloaded after step 1;

### Step3: 
run with webcamera: python sit-up.py --model=mobilenet_thin --resize=432x368 --camera=0;


# Flask
## requirement 
Python version > 3.3

## start
```
$ python3 -m venv flaskApi
(linux or mac)
$ ./flaskApi/bin/activate 
(windows)
$ flaskApi\Scripts\activate
$ pip install -r requirements.txt

$ cd app
(linux or mac)
$ export FLASK_APP=main.py
(windows)
$ set FLASK_APP=main.py
$ flask run


