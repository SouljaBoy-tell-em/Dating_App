/* eslint-disable indent */
import { UserInf } from "../models/UserInf";

enum AccessLevels {
  LEVEL0,
  LEVEL1,
  LEVEL2,
  LEVEL3,
}

class AccessLevel {
  private isAuth: boolean = false;
  private isConfirm: boolean = false;
  private isProfileFilled: boolean = false;
  private accessLvl: AccessLevels = AccessLevels.LEVEL0;

  update = (userInf: UserInf | null) => {
    if (userInf) {
      this.isAuth = true;
      this.isConfirm = userInf.confirmed;
      this.isProfileFilled = userInf.profileFilled;
    } else {
      this.isAuth = false;
      this.isConfirm = false;
      this.isProfileFilled = false;
    }

    switch (true) {
      case !this.isAuth:
        this.accessLvl = AccessLevels.LEVEL0;
        break;
      case !this.isConfirm:
        this.accessLvl = AccessLevels.LEVEL1;
        break;
      case !this.isProfileFilled:
        this.accessLvl = AccessLevels.LEVEL2;
        break;
      default:
        this.accessLvl = AccessLevels.LEVEL3;
        break;
    }
  };

  getLevel = (): AccessLevels => this.accessLvl;
}

export { AccessLevel, AccessLevels };
