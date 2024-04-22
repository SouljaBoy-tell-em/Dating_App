package iffoff.production.reactspringsecurity.services;

import iffoff.production.reactspringsecurity.dto.ProfileDto;
import iffoff.production.reactspringsecurity.dto.SignupRequest;
import iffoff.production.reactspringsecurity.models.Profile;
import iffoff.production.reactspringsecurity.models.User;
import iffoff.production.reactspringsecurity.repositories.ProfileRepository;
import iffoff.production.reactspringsecurity.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
public class ProfileService {
    @Autowired(required = true)
    private AuthenticationManager authenticationManager;
    private ProfileRepository profileRepository;
    private UserRepository userRepository;

    @Autowired
    public void setProfileRepository(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<Profile> findByUsername(String username) {
        return profileRepository.findByUsername(username);
    }

    public ResponseEntity<?> saveProfile(ProfileDto profileDto) throws IOException {
        // set Username
        Authentication auth;
        Profile profile;
        try {
            auth = SecurityContextHolder.getContext().getAuthentication();
            profile = new Profile();
            profile.setUsername(auth.getName());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("USER NOT FOUND");
        }

        profile.setFirstname(profileDto.getFirstname());
        profile.setLastname(profileDto.getLastname());
        profile.setAge(profileDto.getAge());
        profile.setCountry(profileDto.getCountry());
        profile.setSex(profileDto.getSex());
        profile.setDescription(profileDto.getDescription());
        profile.setImage(profileDto.getFile().getBytes());

        //writeImageBytes(profileDto.getFile(), profile.getUsername());

        // set Email
        profile.setEmail(userRepository.findByUsername(profile.getUsername()).get().getEmail());

        profileRepository.save(profile);
        return ResponseEntity.status(HttpStatus.OK).body(profile);
    }
    private void writeImageBytes(MultipartFile file, String username) {
        String uploadDirectory = "src/main/resources/static/Web_Resources/profile_images/" + username;
        //String uploadDirectory = request.getServletContext().getRealPath(uploadFolder);
            String fileName = file.getOriginalFilename();

            String filePath = Paths.get(uploadDirectory,
                    fileName).toString();
            try {
                File dir = new File(uploadDirectory);
                if (!dir.exists()) {
                    //log.info("Folder Created");
                    dir.mkdirs();
                }
                // Save the file locally
                BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new File(filePath)));
                stream.write(file.getBytes());
                stream.close();
            } catch (Exception e) {
                //log.info("in catch");
                e.printStackTrace();
            }
    }
}

