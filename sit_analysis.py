class analysis_tool:
    """
    Input a dictionary of <partname, position> and output a list of messages
    Messages are warning messages if the sitting pose is not correct
    Else messages should be only including affirm
    """
    
    def __init__(self, dic):
        self.dir = dic
        
    # Assumptuib: Nose and Neck should be in self.dir
    # angle between head and vertical line should be smaller than 45 degree
    def _analysis_head_orientation(self, messages):
        nosex, nosey = self.dir["Nose"]
        neckx, necky = self.dir["Neck"]
        if nosey != necky:
            tan = (nosex - neckx) / (nosey - necky)
            if tan > 1.73:
                messages.append("Please straight up your head ;)")
        
    # Assumption: Neck and (RHip) or (LHip) should be in self.dir
    # angle between back and verticl line should be between 0 to 15 degree
    # Considering detection error, extending the angle to -10 to 20 degree
    def _analysis_back_orientation(self, messages):
        if "LHip" in self.dir:
            hipx, hipy = self.dir["LHip"]
        else:
            hipx, hipy = self.dir["RHip"]
        neckx, necky = self.dir["Neck"]
        if hipy != necky:
            tan = (hipx - neckx) / (necky - hipy)
            if tan < -0.176 or tan > 0.364:
                messages.append("Please straight up your back ;)")
    
    
    # Asssumption: (LElbow, LWrist, LShoulder) or (RElbow, RWrist, RShoulder) should be in self.dir
    # ELbow angle should be between 90 to 105 degree
    # Considering detection error, extending the angle to 80 to 110 degree
    def _analysis_Elbow_angle(self, messages):
        if "LElbow" in self.dir:
            elbowx, elbowy = self.dir["LElbow"]
            wristx, wristy = self.dir["LWrist"]
            shoulderx, shouldery = self.dir["LShoulder"]
        else:
            elbowx, elbowy = self.dir["RElbow"]
            wristx, wristy = self.dir["RWrist"]
            shoulderx, shouldery = self.dir["RShoulder"]
        # Calculating the elbow angle using dot product
        dot = (wristx - elbowx) * (shoulderx - elbowx) + (wristy - elbowy) * (shouldery - elbowy)
        wrist_len = pow((pow((wristx - elbowx), 2) + pow((wristy - elbowy),2)),0.5)
        shoulder_len = pow((pow((shoulderx - elbowx),2) + pow((shouldery - elbowy),2)),0.5)
        if wrist_len * shoulder_len != 0:
            cos = dot / (wrist_len * shoulder_len)
            if cos < -0.342 or cos > 0.173:
                messages.append("Please keep your elbow perpendicular ;)")
        
        
    # Assumption: (LHip, LKnee, LAnkle) or (RHip, RKnee, RAnkle) should be in self.dir
    # Knee angle should be between 90 to 120 degree
    # Considering detection error, extending the angle to 75 to 120 degree
    def _analysis_knee_angle(self, messages):
        if "LHip" in self.dir:
            hipx, hipy = self.dir["LHip"]
            kneex, kneey = self.dir["LKnee"]
            anklex, ankley = self.dir["LAnkle"]
        else:
            hipx, hipy = self.dir["RHip"]
            kneex, kneey = self.dir["RKnee"]
            anklex, ankley = self.dir["RAnkle"]
        # Calculating the knee angle using dot product
        dot = (anklex - kneex) * (hipx - kneex) + (ankley - kneey) * (hipy - kneey)
        hip_len = pow((pow((hipx - kneex),2) + pow((hipy - kneey), 2)), 0.5)
        ankle_len = pow((pow((anklex - kneex),2) + pow((ankley - kneey), 2)), 0.5)
        if hip_len * ankle_len != 0:
            cos = dot / (ankle_len * hip_len)
            if cos < -0.573 or cos > 0.258:
                messages.append("Please keep your knee straight down ;)")
                
                
    # Should be calling this method to do the overall analysis
    def analysis(self):
        messages = []
        # check nose founded
        if not "Nose" in self.dir:
            messages.append("Could not find your nose :<")
        # check neck founded
        if not "Neck" in self.dir:
            messages.append("Could not find your neck :<")
        if "Neck" in self.dir and "Nose" in self.dir:
            self._analysis_head_orientation(messages)
        # check hip founded
        if not ("LHip" in self.dir or "RHip" in self.dir):
            messages.append("Could not find your hip :<")
        if "Neck" in self.dir and ("LHip" in self.dir or "RHip" in self.dir):
            self._analysis_back_orientation(messages)
        # check elbow founded
        if not ("LElbow" in self.dir or "RELbow" in self.dir):
            messages.append("Could not find your elbow :<")
        # check shoulder founded
        if not ("LShoulder" in self.dir or "RShoulder" in self.dir):
            messages.append("Could not find your shoulder :<")
        # check wrist founded
        if not ("LWrist" in self.dir or "RWrist" in self.dir):
            messages.append("Could not find your wrist :<")
        if ("LShoulder" in self.dir and "LElbow" in self.dir and "LWrist" in self.dir) or ("RShoulder" in self.dir and "RElbow" in self.dir and "RWrist" in self.dir):
            self._analysis_Elbow_angle(messages)
        # check ankle founded
        if not ("LAnkle" in self.dir or "RAnkle" in self.dir):
            messages.append("Could not find your ankle :<")
        if ("LAnkle" in self.dir and "LKnee" in self.dir and "LHip" in self.dir) or ("RAnkle" in self.dir and "RKnee" in self.dir and "RHip" in self.dir):
            self._analysis_knee_angle(messages)
        if (len(messages) == 0):
            messages.append("NICE SIT !!! KEEP IT UP ;)")
        return messages


class front_analysis_tool:
    """
    Input a dictionary of <partname, position> and output a list of messages
    Messages are warning messages if the sitting pose is not correct
    Else messages should be only including affirm
    
    This is for the case where camera is right in front of the user
    """
    def __init__(self, dir):
        self.dir = dir
        
        
    # Assumption: LEar and REar should be in self.dir
    # angle between head and vertical line should be within -15 to 15 degree
    def _analysis_head_orientation(self, messages):
        lx, ly = self.dir["LEar"]
        rx, ry = self.dir["REar"]
        if lx != rx:
            tan = (ry - ly) / (rx - lx)
            if tan < - 0.15 or tan > 0.15:
                messages.append("Please keep your head straight ;)")
                
    # Assumption: LShoulder and RShoulder should be in self.dir
    # angle bewteen shoulders and horizontal line should be winthin -10 to 10 degree
    def _analysis_shoulder_orientation(self, messages):
        lx, ly = self.dir["LShoulder"]
        rx, ry = self.dir["RShoulder"]
        if lx != rx:
            tan = (ry - ly) / (rx - lx)
            if tan < - 0.15 or tan > 0.15:
                messages.append("Please keep your shoulder horizontal ;)")
                
        
    # Assumptions: LElbow and LShoulder should be in self.dir
    # angle between elbow and vertical line should be less than 45 degree
    def _analysis_left_elbow(self, messages):
        shoulderx, shouldery = self.dir["LShoulder"]
        elbowx, elbowy = self.dir["LElbow"]
        if elbowy != shouldery:
            tan = (elbowx - shoulderx) / (elbowy - shouldery)
            if tan < 0:
                tan = -tan
            if tan > 0.5 :
                messages.append("Please keep your left elbow down")
        else:
            messages.append("Please keep your left elbow down")
            
    
    # Assumptions: RElbow and RShoulder should be in self.dir
    # angle between elbow and vertical line should be less than 45 degree
    def _analysis_left_elbow(self, messages):
        shoulderx, shouldery = self.dir["RShoulder"]
        elbowx, elbowy = self.dir["RElbow"]
        if elbowy != shouldery:
            tan = (elbowx - shoulderx) / (elbowy - shouldery)
            if tan < 0:
                tan = -tan
            if tan > 1 :
                messages.append("Please keep your right elbow down")
        else:
            messages.append("Please keep your right elbow down")


    # Overall analysis
    def analysis(self):
        messages = []
        # check LEar founded
        if not "LEar" in self.dir:
            messages.append("Could not find your left ear :<")
        # check REar founded
        if not "REar" in self.dir:
            messages.append("Could not find your right ear :<")
        if "LEar" in self.dir and "REar" in self.dir:
            self._analysis_head_orientation(messages)
        # check left shoulder founded
        if not "LShoulder" in self.dir:
            messages.append("Could not find your left shoulder :<")
        # check right shoulder founded
        if not "RShoulder" in self.dir:
            messages.append("Could not find your right shoulder :<")
        if "LShoulder" in self.dir and "RShoulder" in self.dir:
            self._analysis_shoulder_orientation(messages)
        if len(messages) == 0:
            messages.append("Nice Sit !!! Keep it up ;)")
        return messages
