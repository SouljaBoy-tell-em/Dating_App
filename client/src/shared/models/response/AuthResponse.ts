import { UserDTO } from "../UserDTO";

export interface AuthResponse {
  jwtRefreshToken: string;
  jwtToken: string;
  user: UserDTO;
}
