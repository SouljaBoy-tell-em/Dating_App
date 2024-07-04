enum UserUpdateField {
    personalityTest = "CASE_PERSONAL_TYPE_UPDATE",
    gender = "CASE_GENDER",
    description = "CASE_DESCRIPTION"
}

export {UserUpdateField};

export default interface GeneralUpdateRequest{
    email:string;
    field:string;
    type: UserUpdateField;
};;;;;;;;;;

