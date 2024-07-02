package com.project.security.mail;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Random;


@Service
public class ConfirmEmailConfig {

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private ConfirmEmailRepository confirmEmailRepository;

    private static final long CONFIRM_CODE_MIN_VALUE = 100000;
    private static final long CONFIRM_CODE_MAX_VALUE = 999999;
    private static final long CONFIRM_TIME = 600 * 1000;
    public static final String CONFIRM_SUBJECT_MESSAGE = "Confirm your account.";
    public static final String CONFIRM_BODY_MESSAGE = "Your confirm code: ";
    public static final String MAIL = "phystechdate@gmail.com";
    public static final String WELCOME_MESSAGE_SUBJECT = "Welcome to Phystech Date !!!";
    public static final String WELCOME_MESSAGE_BODY = "You confirmed your mail. Start to use Phystech Date already now.";

    public void GenerateCode(String username) {
        long confirmCode = (new Random()).nextLong(CONFIRM_CODE_MAX_VALUE  -
                                                   CONFIRM_CODE_MIN_VALUE) +
                                                   CONFIRM_CODE_MIN_VALUE;

        Date currentTime = new Date();
        currentTime.setTime(new Date().getTime() + CONFIRM_TIME);
        confirmEmailRepository.save(new ConfirmCode(username,
                                                    confirmCode,
                                                    currentTime));
        Send(username, CONFIRM_SUBJECT_MESSAGE, CONFIRM_BODY_MESSAGE +
                                                confirmCode);
    }

    public void Send(String toEmail, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(MAIL);
        message.setTo(toEmail);
        message.setText(body);
        message.setSubject(subject);
        javaMailSender.send(message);
    }

}
