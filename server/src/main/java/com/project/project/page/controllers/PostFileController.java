package com.project.project.page.controllers;

import com.project.project.WebSockets.models.MessageFile;
import com.project.project.WebSockets.services.MessageFileService;
import com.project.project.page.models.PostFile;
import com.project.project.page.services.PostFileService;
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
@RequestMapping("/post")
public class PostFileController {

    @Autowired
    private PostFileService postFileService;

    @GetMapping("/files/{id}")
    public ResponseEntity<Resource> downloadFile(@PathVariable Long id) {
        PostFile postFile = postFileService.getFileById(id);
        if (postFile == null) {
            return ResponseEntity.notFound().build();
        }

        Resource file = postFileService.loadFileAsResource(id);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(postFile.getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                .body(file);
    }

    @PostMapping("/files")
    public ResponseEntity<?> uploadFile(@RequestParam("file") List<MultipartFile> files) {

        List<Long> Ids = new ArrayList<>();

        for (MultipartFile file: files) {
            PostFile savedFile = postFileService.saveFile(file);
            Ids.add(savedFile.getId());
        }
        return ResponseEntity.ok(Ids);
    }
}
