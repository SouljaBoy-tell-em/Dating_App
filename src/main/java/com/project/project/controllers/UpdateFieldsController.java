package com.project.project.controllers;


import com.project.project.requests.admin.*;
import com.project.project.user_config.User;
import com.project.project.user_config.UserRepository;
import com.project.project.user_config.UserRole;
import com.project.project.user_config.UserServiceManager;
import com.project.project.user_config.black_list.BlackList;
import com.project.project.user_config.black_list.BlackListRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;


@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
@RequestMapping("/profile/update")
@RequiredArgsConstructor
@RestController
public class UpdateFieldsController {

    @Autowired
    private BlackListRepository blackListRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserServiceManager userServiceManager;

    private GeneralUsernameRequest<Object, String, UserUpdateField, ResponseEntity<String>> STATUS_UPDATE = (changeField, email, way) -> {
        if(!userRepository.existsById(email))
            return new ResponseEntity<>("So user doesn't exist.",
                                               HttpStatus.BAD_REQUEST);
        if(userServiceManager.IsAccess(email)) {
            switch (way) {
                case CASE_ACTIVE_UPDATE          -> userRepository.ActiveUpdate(Boolean.parseBoolean((String) changeField), email);
                case CASE_BIRTHDAY_UPDATE        -> userRepository.BirthdayUpdate((LocalDate) changeField, email);
                case CASE_CONFIRM_UPDATE         -> userRepository.ConfirmUpdate(Boolean.parseBoolean((String) changeField), email);
                case CASE_FIRSTNAME_UPDATE       -> userRepository.FirstnameUpdate((String) changeField, email);
                case CASE_LASTNAME_UPDATE        -> userRepository.LastnameUpdate((String) changeField, email);
                case CASE_PASSWORD_UPDATE        -> userRepository.PasswordUpdate(passwordEncoder.encode((CharSequence) changeField), email);
                case CASE_PROFILE_ACCESS_UPDATE  -> userRepository.ProfileAccessUpdate((Boolean) changeField, email);
                case CASE_ROLE_UPDATE            -> {
                    switch(UserRole.valueOf(changeField.toString())) {
                        case UserRole.ROLE_USER  -> userRepository.RoleUpdate(UserRole.ROLE_USER,  email);
                        case UserRole.ROLE_ADMIN -> userRepository.RoleUpdate(UserRole.ROLE_ADMIN, email);
                    }
                }

                // BLACKLIST REQUESTS:
                case CASE_ADD_TO_BLACKLIST -> blackListRepository.save(new BlackList(email, (String)changeField));
                case CASE_GET_BLACKLIST -> {
                    User user = userServiceManager.GetAuthorizedUser();
                    System.out.println(user.getBlackList());
                }
            }
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>("Not enough rights.", HttpStatus.BAD_GATEWAY);
    };

    @PostMapping("/field")
    public ResponseEntity<String> FieldUpdate(@RequestBody GeneralUpdateRequest request) {
        return STATUS_UPDATE.apply(request.getField(), request.getEmail(), request.getType());
    }

    @PostMapping("/general")
    public ResponseEntity<String> FullUpdate(@RequestBody SecondaryInfoUserUpdateRequest request) {
        if(!userRepository.existsById(request.getEmail()))
            return new ResponseEntity<>("So user doesn't exist.",
                                               HttpStatus.BAD_REQUEST);
        if(userServiceManager.IsAccess(request.getEmail())) {
            userRepository.FirstnameUpdate(request.getFirstname(), request.getEmail());
            userRepository.LastnameUpdate(request.getLastname(), request.getEmail());
            userRepository.BirthdayUpdate(request.getBirthday(), request.getEmail());
            userRepository.ProfileAccessUpdate(request.isPrivate(), request.getEmail());
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>("Not enough rights.", HttpStatus.BAD_GATEWAY);
    }
}