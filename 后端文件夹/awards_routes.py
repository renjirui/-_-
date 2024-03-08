from fastapi import APIRouter, Depends, HTTPException
from depands import get_current_username
from models import AwardsInfo, AwardsInfo_AwardsID
import pymysql
from database import get_db_connection
from typing import List

# router = APIRouter(dependencies=[Depends(get_current_username)])
router = APIRouter()

# 查看所有学生获奖信息
@router.get("/awardsinfo/", response_model=List[AwardsInfo_AwardsID], tags=["awards"])
def read_student_awards():
    conn = get_db_connection()
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    cursor.execute("SELECT * FROM awardsinfo")
    awards_ = cursor.fetchall()
    combined_info = []  
    for award in awards_:
        AwardsInfo_model_get = AwardsInfo.parse_obj({
            'account': str(award.get('account', '')),
            'name': award.get('name', '无'),
            'awards': award.get('awards', '无'),
            'experience': award.get('experience', '无')
        })
        combined_info.append(AwardsInfo_AwardsID(AwardsInfo_model=AwardsInfo_model_get, id=str(award["id"])))
    cursor.close()
    conn.close()
    return combined_info

# 获取单个学生获奖信息
@router.get("/awardsinfo/{AwardsInfo_account}", response_model=List[AwardsInfo_AwardsID], tags=["awards"])
def read_student_awards(AwardsInfo_account: int):
    conn = get_db_connection()
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    # 查询是否存在账号
    cursor.execute("SELECT account FROM students WHERE account = %s", (AwardsInfo_account,))
    if not cursor.fetchone():
        raise HTTPException(status_code=404, detail="Student not found")
    cursor.execute("SELECT * FROM awardsinfo WHERE account = %s", (AwardsInfo_account,))
    awards_ = cursor.fetchall()
    combined_info = []  
    for award in awards_:
        AwardsInfo_model_get = AwardsInfo.parse_obj({
            'account': str(award.get('account', '')),
            'name': award.get('name', '无'),
            'awards': award.get('awards', '无'),
            'experience': award.get('experience', '无')
        })
        combined_info.append(AwardsInfo_AwardsID(AwardsInfo_model=AwardsInfo_model_get, id=str(award["id"])))
    cursor.close()
    conn.close()
    if combined_info == []:
        raise HTTPException(status_code=404, detail="Student has no awards")
    return combined_info

#添加获奖信息及经历
@router.post("/awardsinfo/", tags=["awards"])
def create_awards(Students_awards: AwardsInfo):
    conn = get_db_connection()
    cursor = conn.cursor()
    # 查询是否存在账号
    cursor.execute("SELECT account FROM students WHERE account = %s", (Students_awards.account,))
    if not cursor.fetchone():
        raise HTTPException(status_code=404, detail="Student account not found")
    # 添加奖项信息
    cursor.execute("INSERT INTO awardsinfo (account ,name, awards, experience) VALUES (%s, %s, %s, %s)",
                   (Students_awards.account,Students_awards.name, Students_awards.awards, Students_awards.experience))
    # 同步所有awardsinfo表中的所有关联experience字段
    cursor.execute("SELECT * FROM awardsinfo WHERE account = %s", (Students_awards.account,))
    awards_ = cursor.fetchall()
    for award in awards_:
        cursor.execute("UPDATE awardsinfo SET experience = %s WHERE id = %s",
                    (Students_awards.experience, award[0]))
    # 同步修改students表awards字段
    cursor.execute("UPDATE students SET awards = %s WHERE account = %s",
                    (Students_awards.experience, Students_awards.account))
    cursor.close()
    conn.close()
    return {"message": "Student's awards added successfully"}

#更新获奖信息
@router.put("/awardsinfo/{AwardsInfo_id}", tags=["awards"], summary="更新获奖信息 路径参数为对应获奖信息id, 请求体为name, exeperience, awards(不允许修改account)")
def update_awards(AwardsInfo_id: int, Students_awards: AwardsInfo):
    conn = get_db_connection()
    cursor = conn.cursor()
    # 查询是否存在学生账号
    cursor.execute("SELECT account FROM students WHERE account = %s", (Students_awards.account,))
    if not cursor.fetchone():
        raise HTTPException(status_code=404, detail="Student account not found")
    # 执行修改
    cursor.execute("UPDATE awardsinfo SET name = %s, experience = %s, awards = %s WHERE id = %s",
                   (Students_awards.name, Students_awards.experience, Students_awards.awards, AwardsInfo_id))
    # 检查是否存在相应获奖信息或是否经行修改
    updated = cursor.rowcount
    if updated == 0:
        raise HTTPException(status_code=404, detail="Student awards not found/No changes have occurred")
    # 同步所有awardsinfo表中的所有关联experience字段
    cursor.execute("SELECT * FROM awardsinfo WHERE account = %s", (Students_awards.account,))
    awards_ = cursor.fetchall()
    for award in awards_:
        cursor.execute("UPDATE awardsinfo SET experience = %s WHERE id = %s",
                    (Students_awards.experience, award[0]))
    # 同步修改students表awards字段
    cursor.execute("UPDATE students SET awards = %s WHERE account = %s",
                    (Students_awards.experience, Students_awards.account))
    cursor.close()
    conn.close()
    return {"message": "Student's awards updated successfully"}

#删除获奖经历
@router.delete("/awardsinfo/{AwardsInfo_id}", tags=["awards"], summary="更新获奖信息 路径参数为对应获奖信息id")
def delete_awards(AwardsInfo_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM awardsInfo WHERE id = %s", (AwardsInfo_id,))
    deleted = cursor.rowcount
    cursor.close()
    conn.close()
    if deleted == 0:
        raise HTTPException(status_code=404, detail="Student's awards not found")
    return {"message": "Student's awards deleted successfully"}