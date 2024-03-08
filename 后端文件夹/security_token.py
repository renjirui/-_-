from fastapi import HTTPException, status, Depends
from fastapi.security import OAuth2PasswordBearer
from database import get_db_connection
from models import UserInfo

# 定义UNAUTHORIZED为认证报错
credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"},  # 指示客户端认证类型为Bearer
)

SECURITY_KEY = "yunyi"
ALGORITHMS = "HS256"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login/")

def validate_user(info: UserInfo):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT pwd FROM students WHERE account = %s", (info.account,))
    student_pwd = cursor.fetchone()
    cursor.close()
    conn.close()
    if student_pwd is None:
        return None
    if student_pwd[0] != int(info.pwd):
        return None
    return info.account