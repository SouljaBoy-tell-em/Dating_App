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

    public ResponseEntity<?> saveProfile(ProfileDto profileDto) {
        // set Username
        Authentication auth;
        Profile profile;
        try {
            auth = SecurityContextHolder.getContext().getAuthentication();
            profile = new Profile();
            profile.setUsername(auth.getName());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("EMAIL NOT FOUND");
        }

        profile.setFirstname(profileDto.getFirstname());
        profile.setLastname(profileDto.getLastname());
        profile.setAge(profileDto.getAge());
        profile.setCountry(profileDto.getCountry());
        profile.setSex(profileDto.getSex());
        profile.setDescription(profileDto.getDescription());

        // set Email
        profile.setEmail(userRepository.findByUsername(profile.getUsername()).get().getEmail());

        profileRepository.save(profile);
        return ResponseEntity.status(HttpStatus.OK).body(profile);
    }
}

