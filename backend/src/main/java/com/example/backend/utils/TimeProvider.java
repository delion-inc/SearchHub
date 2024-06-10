package com.example.backend.utils;

import org.springframework.stereotype.Component;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class TimeProvider {

    private static final String ZONE_ID = "Europe/Kiev";
    private static final String DATA_TIME_FORMAT = "yyyy-MM-dd HH:mm:ss";

    public String getCurrentTime() {
        ZonedDateTime now = ZonedDateTime.now(ZoneId.of(ZONE_ID));
        return now.format(DateTimeFormatter.ofPattern(DATA_TIME_FORMAT));
    }
}
