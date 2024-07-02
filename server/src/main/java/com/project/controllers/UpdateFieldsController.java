package com.project.controllers;


import com.project.requests.admin.GeneralUpdateRequest;
import com.project.requests.admin.GeneralUsernameRequest;
import com.project.requests.admin.SecondaryInfoUserUpdateRequest;
import com.project.requests.admin.UserUpdateField;
import com.project.user_config.main.PersonalType;
import com.project.user_config.main.UserRole;
import com.project.user_config.main.UserServiceManager;
import com.project.user_config.main.ZodiacSign;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;


@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
@RequestMapping("/profile/update")
@RequiredArgsConstructor
@RestController
public class UpdateFieldsController {

    @Autowired
    private UserServiceManager userServiceManager;

    private GeneralUsernameRequest<Object, String, UserUpdateField, ResponseEntity<?>> STATUS_UPDATE = (changeField, email, way) -> {
        if(email == null && userServiceManager.GetAuthorizedUser().getRole() == UserRole.ROLE_ADMIN)
            return new ResponseEntity<>("This user doesn't exist.", HttpStatus.BAD_REQUEST);
        if(userServiceManager.GetAuthorizedUser().getRole() == UserRole.ROLE_USER)
            email = userServiceManager.GetEmail();
        if(userServiceManager.IsAccess(email)) {
            switch (way) {
                case CASE_ACTIVE_UPDATE          -> userServiceManager.ActiveUpdate((String)                       changeField,  email); // ACCESS: ADMIN, USER;
                case CASE_BAN                    -> userServiceManager.Ban(email);
                case CASE_BIRTHDAY_UPDATE        -> userServiceManager.BirthdayUpdate((LocalDate)                  changeField);         // ACCESS: USER;
                case CASE_CITY_UPDATE            -> userServiceManager.CityUpdate((String) changeField);                                 // ACCESS: USER;
                case CASE_CONFIRM_UPDATE         -> userServiceManager.ConfirmUpdate(Boolean.parseBoolean((String) changeField), email); // ACCESS: ADMIN, USER;
                case CASE_FIRSTNAME_UPDATE       -> userServiceManager.FirstnameUpdate((String)                    changeField);         // ACCESS: USER;
                case CASE_GENDER                 -> userServiceManager.GenderUpdate(Boolean.parseBoolean((String) changeField));         // ACCESS: USER;
                case CASE_LASTNAME_UPDATE        -> userServiceManager.LastnameUpdate((String)                     changeField);         // ACCESS: USER;
                case CASE_PASSWORD_UPDATE        -> userServiceManager.PasswordUpdate((String)                     changeField);         // ACCESS: USER;
                case CASE_PERSONAL_TYPE_UPDATE   -> userServiceManager.PersonalTypeUpdate(PersonalType.valueOf((String) changeField));   // ACCESS: USER;
                case CASE_PROFILE_ACCESS_UPDATE  -> userServiceManager.ProfileAccessUpdate((Boolean)               changeField,  email); // ACCESS: ADMIN, USER;
                case CASE_ROLE_UPDATE            -> {
                    switch(UserRole.valueOf(changeField.toString())) {
                        case UserRole.ROLE_USER  -> userServiceManager.RoleUpdate(UserRole.ROLE_USER,  email);                           // ACCESS: ADMIN, USER;
                        case UserRole.ROLE_ADMIN -> userServiceManager.RoleUpdate(UserRole.ROLE_ADMIN, email);                           // ACCESS: ADMIN, USER;
                    }
                }
                case CASE_ZODIAC_SIGN_UPDATE     -> userServiceManager.ZodiacSignUpdate(ZodiacSign.valueOf(changeField.toString()));     // ACCESS: USER;

                // BLACKLIST REQUESTS:
                case CASE_ADD_TO_BLACKLIST -> {
                    return userServiceManager.AddToBlackList((String) changeField);                                                      // ACCESS: USER;
                }
                case CASE_CHECK_IN_BLACKLIST -> {                                                                                        // ACCESS: USER;
                    return new ResponseEntity<>((userServiceManager.CheckInBlackList((String) changeField) == -1) ?
                            "This user doesn't contain in blacklist." :
                            "This user contains in blacklist.",
                            HttpStatus.OK);
                }
                case CASE_DELETE_FROM_BLACKLIST -> {                                                                                     // ACCESS: USER;
                    return userServiceManager.DeleteFromBlackList((String) changeField);
                }
                case CASE_GET_BLACKLIST -> {                                                                                             // ACCESS: USER;
                    return new ResponseEntity<>(userServiceManager.GetBlackList(), HttpStatus.OK);
                }
            }
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>("Not enough rights.", HttpStatus.BAD_GATEWAY);
    };


    @PostMapping("/field")
    public ResponseEntity<?> FieldUpdate(@RequestBody GeneralUpdateRequest request) {
        return STATUS_UPDATE.apply(request.getField(), request.getEmail(), request.getType());
    }

    @PostMapping("/general")
    public ResponseEntity<String> FullUpdate(@RequestBody SecondaryInfoUserUpdateRequest request) {
        if(!userServiceManager.IsExist(userServiceManager.GetEmail()))
            return new ResponseEntity<>("So user doesn't exist.", HttpStatus.BAD_REQUEST);

        if(userServiceManager.IsAccess(userServiceManager.GetEmail())) {
            userServiceManager.FirstnameUpdate(request.getFirstname());
            userServiceManager.LastnameUpdate(request.getLastname());
            userServiceManager.CityUpdate(request.getCity());
            userServiceManager.ZodiacSignUpdate(request.getZodiacSign());
            userServiceManager.BirthdayUpdate(request.getBirthday());
            userServiceManager.ProfileAccessUpdate(request.isPrivate(), userServiceManager.GetEmail());
            userServiceManager.ProfileFilledUpdate(true, userServiceManager.GetEmail());
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>("Not enough rights.", HttpStatus.BAD_GATEWAY);
    }
}