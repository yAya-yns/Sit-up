# Sit-up!
The personalized AI posture practitioner for everyone

# Run the App on your browser
make sure you installed [ionic](https://ionicframework.com/docs/intro/cli)
```bash
cd SitUpFrontEnd 
npm i
ionic serve
```

# AI module
Use tf-pose-estimation

### Step1(For Mac Users): 
For download of dependencies, refer to https://medium.com/@gsethi2409/pose-estimation-with-tensorflow-2-0-a51162c095ba;

### Step1(For Windows Users):
For download of dependencies, refer to https://github.com/satyaborg/pose-estimation-detection;

### Step2: 
Add sit-up.py and sit_analysis.py to the folder "tf-pose-estimation"(For mac users)/"pose-estimation-detection"(for windows users) which should be downloaded after step 1;

### Step3: 
For mac users: run with webcamera: ```python sit-up.py --model=mobilenet_thin --os=macos --resize=432x368 --camera=0```;

For windows users: run with webcamera: ```python sit-up.py --model=mobilenet_thin --resize=432x368 --camera=0```;

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


