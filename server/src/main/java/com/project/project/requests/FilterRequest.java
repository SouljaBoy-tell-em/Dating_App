package com.project.project.requests;


import lombok.Getter;
import lombok.Setter;

public class FilterRequest {
    public static final int MAX_AGE = 100;
    public static final int MIN_AGE = 0;
    @Getter
    @Setter
    private int minAge = MIN_AGE;
    @Getter
    @Setter
    private int maxAge = MAX_AGE;
    private boolean preferedIsMan = true;
    public boolean PreferedIsMan() {
        return preferedIsMan;
    }

    public void setPreferedIsMan(boolean preferedIsMan) {
        this.preferedIsMan =preferedIsMan;
    }




}
