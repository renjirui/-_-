from fastapi import APIRouter, Depends, HTTPException
from database import get_db_connection
from depands import get_current_username
from models import PositionUpdate
from models import UpdateResponseModel

# router = APIRouter(dependencies=[Depends(get_current_username)])
router = APIRouter()

# 分配/更新学生职位
@router.patch("/students/{student_account}/position", response_model=UpdateResponseModel, tags=["position"])
def update_student_position(student_account: int, position_update: PositionUpdate):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE students SET position = %s WHERE account = %s", 
                   (position_update.position, student_account))
    updated = cursor.rowcount
    cursor.close()
    conn.close()
    if updated == 0:
        raise HTTPException(status_code=404, detail="Student not found")
    return {"message": "Student's position updated successfully", "position": position_update.position}

# 删除学生职位
@router.delete("/students/{student_account}/position", response_model=UpdateResponseModel, tags=["position"])
def delete_student_position(student_account: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE students SET position = %s WHERE account = %s", 
                   ("None", student_account))
    updated = cursor.rowcount
    cursor.close()
    conn.close()
    if updated == 0:
        raise HTTPException(status_code=404, detail="Student not found")
    return {"message": "Student's position updated successfully", "position": "None"}