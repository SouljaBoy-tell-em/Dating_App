enum UserUpdateField {
    personalityTest = "CASE_PERSONALITY_TEST",
}

export {UserUpdateField};

export default interface GeneralUpdateRequest{
    email:string;
    field:string;
    type: UserUpdateField;
}

