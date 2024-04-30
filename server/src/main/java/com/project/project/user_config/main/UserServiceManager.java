package com.project.project.user_config.main;


import com.project.project.user_config.black_list.BlackList;
import com.project.project.user_config.black_list.BlackListRepository;
import com.project.project.user_config.photos.Photo;
import com.project.project.user_config.photos.UserPhotoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@Configuration
@Service
public class UserServiceManager {

    @Autowired
    private BlackListRepository blackListRepository;

    @Autowired
    private UserPhotoRepository userPhotoRepository;

    @Autowired
    private UserRepository userRepository;

    /**
     * The Add(User) adds a new user in the DB.
     * @param user user.
     */
    public void Add(User user) {
        if(userRepository.existsById(user.getUsername()))
            return;
        userRepository.save(user);
    }

    /**
     * The GetAuthorizedUser() is a method, that checks user authorization.
     * @return link to the UserDetailsService method.
     */

    public void ConfirmUser(String username) {
        userRepository.Confirmed(username);
    }

    public User GetAuthorizedUser() {
        Authentication authentication = SecurityContextHolder
                .getContext()
                .getAuthentication();
        if(GetById(authentication.getName()) != null)
            return GetById(authentication.getName());
        return null;
    }

    /**
     * The GetById(String) gets a user by id.
     * @param username username.
     * @return user, if user exists in the DB.
     */
    public User GetById(String username) {
        return userRepository
                .findById(username)
                .get();
    }

    public String GetEmail() {
        if(GetAuthorizedUser() == null)
            return null;
        return GetAuthorizedUser().getUsername();
    }

    public boolean IsAccess(String email) {
        try {
            if(GetEmail().equals(email) || GetAuthorizedUser().getRole() == UserRole.ROLE_ADMIN)
                return true;
            return false;
        } catch (Exception exception) {
            exception.printStackTrace();
            return false;
        }
    }

    /**
     * The IsExist(String) checks a user in the DB.
     * @param username username.
     * @return true if user exists.
     */
    public boolean IsExist(String username) {
        return userRepository.existsById(username);
    }

    /**
     * The PasswordEncoder() creates bean that contains cryptographic key(BCrypt).
     * @return cryptographic key for password encoding.
     */
    @Bean
    public PasswordEncoder PasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * The UserDetailsService() is a service data explorer.
     * @return link to the UserDetailsService method.
     */
    public UserDetailsService UserDetailsService() {
        return this::GetById;
    }

    // UPDATE USER FIELDS:
    public void ActiveUpdate(String changeField, String email) { // ACCESS: ADMIN, USER;
        userRepository.ActiveUpdate(Boolean.parseBoolean(changeField), email);
    }

    public void BirthdayUpdate(LocalDate changeField) { // ACCESS: USER;
        userRepository.BirthdayUpdate(changeField, GetEmail());
    }

    public void ConfirmUpdate(boolean changeField, String email) { // ACCESS: ADMIN, USER;
        userRepository.ConfirmUpdate(changeField, email);
    }

    public void FirstnameUpdate(String changeField) { // ACCESS: USER;
        userRepository.FirstnameUpdate(changeField, GetEmail());
    }

    public void LastnameUpdate(String changeField) { // ACCESS: USER;
        userRepository.LastnameUpdate(changeField, GetEmail());
    }

    public void PasswordUpdate(String changeField) { // ACCESS: USER;
        userRepository.PasswordUpdate(PasswordEncoder().encode(changeField), GetEmail());
    }

    public void ProfileAccessUpdate(boolean changeField, String email) { // ACCESS: ADMIN, USER;
        userRepository.ProfileAccessUpdate(changeField, email);
    }

    public void RoleUpdate(UserRole role, String email) { // ACCESS: ADMIN, USER;
        userRepository.RoleUpdate(role, email);
    }

    // BLACKLIST:
    public ResponseEntity<?> AddToBlackList(String blockedEmail) {
        if(IsExist(blockedEmail)) {
            if(User.CheckUniqueBlacklist(GetBlackList(), blockedEmail) == -1)
                return new ResponseEntity<>(blackListRepository.save(new BlackList(GetEmail(), blockedEmail)), HttpStatus.OK);
            else
                return new ResponseEntity<>("This user already contains in a blacklist.", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("Blockable user doesn't exist.", HttpStatus.BAD_REQUEST);
    }

    public long CheckInBlackList(String changeField) {
        return User.CheckUniqueBlacklist(GetBlackList(), changeField);
    }

    public ResponseEntity<?> DeleteFromBlackList(String blockedEmail) {
        System.out.println(CheckInBlackList(blockedEmail));
        if(CheckInBlackList(blockedEmail) > 0) {
            blackListRepository.DeleteById(CheckInBlackList(blockedEmail));
            return new ResponseEntity<>("User was deleted from blacklist.", HttpStatus.OK);
        }
        return new ResponseEntity<>("This user doesn't contain in blacklist.", HttpStatus.BAD_REQUEST);
    }

    public List<BlackList> GetBlackList() {
        return GetAuthorizedUser().getBlackList();
    }

    // PHOTOS:
    public ResponseEntity<?> AddPhoto(MultipartFile multipartFile, boolean isAvatar) throws IOException {
        if(isAvatar && userPhotoRepository.count() > 0) {
            try {
                long id = userPhotoRepository.GetAvatarPhotoId(GetEmail());
                userPhotoRepository.SetAvatarPhotoId(id);
            } catch (NullPointerException exception) {
                return new ResponseEntity<>("Avatar is null.", HttpStatus.BAD_REQUEST);
            }
        }

        userPhotoRepository.save(new Photo(GetEmail(), isAvatar, multipartFile.getBytes()));
        return new ResponseEntity<>("Added successfully.", HttpStatus.OK);
    }

    public ResponseEntity<?> TestAddPhoto(boolean isAvatar) throws IOException {
        if(isAvatar && userPhotoRepository.count() > 0) {
            try {
                long id = userPhotoRepository.GetAvatarPhotoId(GetEmail());
                userPhotoRepository.SetAvatarPhotoId(id);
            } catch (NullPointerException exception) {
                System.out.println(exception.fillInStackTrace());
            }
        }

        FileInputStream fis = new FileInputStream(new File("image.jpg"));
        byte[] content = fis.readAllBytes();
        userPhotoRepository.save(new Photo(GetEmail(), isAvatar, content));
        return new ResponseEntity<>("Added successfully.", HttpStatus.OK);
    }

    public ResponseEntity<?> DeletePhoto(long id) {
        if(!userPhotoRepository.existsById(id))
            return new ResponseEntity<>("This photo with id = " + id + " doesn't exist.", HttpStatus.BAD_REQUEST);
        userPhotoRepository.deleteById(id);
        return new ResponseEntity<>("Deleted successfully.", HttpStatus.OK);
    }

    public ResponseEntity<?> GetAllPhoto() {
        return new ResponseEntity<>(GetAuthorizedUser().getPhotos(), HttpStatus.OK);
    }
}