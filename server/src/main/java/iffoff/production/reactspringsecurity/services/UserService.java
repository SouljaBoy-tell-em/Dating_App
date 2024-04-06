    package iffoff.production.reactspringsecurity.services;



    import iffoff.production.reactspringsecurity.dto.SignupRequest;
    import iffoff.production.reactspringsecurity.dto.UserDto;
    import iffoff.production.reactspringsecurity.models.User;
    import iffoff.production.reactspringsecurity.repositories.UserRepository;
    import jakarta.transaction.Transactional;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.security.core.authority.SimpleGrantedAuthority;
    import org.springframework.security.core.userdetails.UserDetails;
    import org.springframework.security.core.userdetails.UserDetailsService;
    import org.springframework.security.core.userdetails.UsernameNotFoundException;
    import org.springframework.security.crypto.password.PasswordEncoder;
    import org.springframework.stereotype.Service;

    import java.util.ArrayList;
    import java.util.List;
    import java.util.Optional;
    import java.util.stream.Collectors;

    @Service
    public class UserService implements UserDetailsService {

        private UserRepository userRepository;
        private RoleService roleService;
        private PasswordEncoder passwordEncoder;

        @Autowired
        public void setUserRepository(UserRepository userRepository) {
            this.userRepository = userRepository;
        }

        @Autowired
        public void setRoleService(RoleService roleService) {
            this.roleService = roleService;
        }

        @Autowired
        public void setPasswordEncoder(PasswordEncoder passwordEncoder) {
            this.passwordEncoder = passwordEncoder;
        }

        public Optional<User> findByUsername(String username) {
            return userRepository.findByUsername(username);
        }

        @Override
        @Transactional
        public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

            User user = findByUsername(username).orElseThrow(() -> new UsernameNotFoundException(
                    String.format("Пользователь '%s' не найден", username)
            ));

            return new org.springframework.security.core.userdetails.User(
                    user.getUsername(),
                    user.getPassword(),
                    user.getRoles().stream().map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList())
            );
        }

        public User createNewUser(SignupRequest signupRequest) {
            User user = new User();
            user.setUsername(signupRequest.getUsername());
            user.setEmail(signupRequest.getEmail());
            user.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
            user.setRoles(List.of(roleService.getUserRole()));
            return userRepository.save(user);
        }

        public List<User> findAllUsers() {
            return userRepository.findAll();
        }

        public User saveUser(User user) {
            return userRepository.save(user);
        }

        public void deleteUser(Long id) {
            userRepository.deleteById(id);
        }

        public List<UserDto> getAllDto() {
            List<UserDto> userDtos = new ArrayList<UserDto>();

            List<User> users = userRepository.findAll();

            for (User user: users
                 ) {
                UserDto userDto = new UserDto();
                userDto.setId(user.getId());
                userDto.setUsername(user.getUsername());
                userDto.setEmail(user.getEmail());
                userDtos.add(userDto);
            }

            return userDtos;
        }
    }
