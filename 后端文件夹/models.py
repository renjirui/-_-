from pydantic import BaseModel
from typing import Optional, List
from enum import Enum

class PeriodNum(str, Enum):
    None_ = "未登记"
    six = "六期"
    seven = "七期"
    eight = "八期"
    admin = "管理员"

class Department(str, Enum):
    None_ = "未登记"
    data_science = "数据科学"
    Full_stack = "全栈"
    CPU_OS = "CPU&OS"
    JAVA = "JAVA"
    devise = "设计"
    secretariat = "秘书处"

class Student(BaseModel):
    name: Optional[str] = "未登记"
    position: Optional[str] = "无"
    awards: Optional[str] = "无"
    account: str
    pwd: str
    periodNum: Optional[PeriodNum] = "未登记"
    department: Optional[Department] = "未登记"

class AwardsInfo(BaseModel):
    account: str
    name: Optional[str] = "无"
    awards: Optional[str] = "无"
    experience: Optional[str] = "无"

class AwardsInfo_AwardsID(BaseModel):
    AwardsInfo_model: AwardsInfo
    id: str
    
class UpdateResponseModel(BaseModel):
    message: str
    position: str
    
class PositionUpdate(BaseModel):
    position: str

class UserInfo(BaseModel):
    account: str
    pwd: str

class Student_AwardsInfo(BaseModel):
    student_Model: Student
    awardsInfo_Model: List[AwardsInfo]

class Token(BaseModel):
    access_token: str
    token_type: str