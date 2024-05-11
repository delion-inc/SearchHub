package com.example.backend.telegram;

import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.api.objects.Update;

public class TelegramService extends TelegramLongPollingBot {
    @Override
    public void onUpdateReceived(Update update) {
        if (update.hasMessage() && update.getMessage().hasText()) {
            String message_text = update.getMessage().getText();
            System.out.println(message_text);
        }
    }

    @Override
    public String getBotUsername() {
        return "fsdnfhsdfn_bot";
    }

    @Override
    public String getBotToken() {
        return "7009210933:AAHT8suVSaA-pL_Fa-ow1d6qOxU1S6GVfKc";
    }
}

