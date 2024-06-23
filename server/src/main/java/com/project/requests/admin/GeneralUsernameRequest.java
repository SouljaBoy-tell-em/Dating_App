package com.project.requests.admin;


public interface GeneralUsernameRequest<CHANGE_FIELD, EMAIL, WAY, RETURN_TYPE> {
    RETURN_TYPE apply(CHANGE_FIELD changeField, EMAIL email, WAY way);
}
