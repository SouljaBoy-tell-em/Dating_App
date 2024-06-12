package com.project.WebSockets.controllers;

import com.project.WebSockets.models.MessageFile;
import com.project.WebSockets.services.MessageFileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/chat")
public class MessageFileController {

    @Autowired
    private MessageFileService messageFileService;

    @GetMapping("/files/{id}")
    public ResponseEntity<Resource> downloadFile(@PathVariable Long id) {
        MessageFile messageFile = messageFileService.getFileById(id);
        if (messageFile == null) {
            return ResponseEntity.notFound().build();
        }

        Resource file = messageFileService.loadFileAsResource(id);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(messageFile.getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                .body(file);
    }

    @PostMapping("/files")
    public ResponseEntity<?> uploadFile(@RequestParam("file") List<MultipartFile> files) {

        List<Long> Ids = new ArrayList<>();

        for (MultipartFile file: files) {
            MessageFile savedFile = messageFileService.saveFile(file);
            Ids.add(savedFile.getId());
        }
        return ResponseEntity.ok(Ids);
    }
}
