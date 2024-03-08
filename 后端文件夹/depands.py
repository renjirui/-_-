from fastapi import Depends
import jwt
from security_token import ALGORITHMS, SECURITY_KEY, oauth2_scheme, credentials_exception

def get_current_username(token: str = Depends(oauth2_scheme)):
    try:
        username = None
        token_data = jwt.decode(token, SECURITY_KEY, ALGORITHMS)
        if token_data:
            username = token_data.get('username', None)
    except Exception as e:
        raise credentials_exception

    if not username:
        raise credentials_exception

    return username
