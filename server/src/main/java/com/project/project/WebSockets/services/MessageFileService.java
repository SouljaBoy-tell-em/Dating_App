package com.project.project.WebSockets.services;

import com.project.project.WebSockets.dto.MessageFileDTO;
import com.project.project.WebSockets.models.MessageFile;
import com.project.project.WebSockets.repositories.MessageFileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MessageFileService {

    @Autowired
    private MessageFileRepository fileRepository;

    public Resource loadFileAsResource(Long fileId) {
        try {
            MessageFile messageFile = fileRepository.findById(fileId)
                    .orElseThrow(() -> new RuntimeException("File not found with id: " + fileId));

            InputStreamResource resource = new InputStreamResource(new ByteArrayInputStream(messageFile.getFileContent()));

            return resource;
        } catch (Exception ex) {
            throw new RuntimeException("File not found with id: " + fileId, ex);
        }
    }
//    public MessageFile saveFile(MultipartFile file) {
//        try {
//            MessageFile messageFile = new MessageFile(file.getOriginalFilename(), file.getContentType(), file.getBytes());
//            return fileRepository.save(messageFile);
//        } catch (IOException ex) {
//            throw new RuntimeException("Failed to store file " + file.getOriginalFilename(), ex);
//        }
//    }
    public MessageFile saveFile(MultipartFile file) {
        try {
            String fileName = file.getOriginalFilename();
            byte[] fileContent = file.getBytes();
            String fileType = file.getContentType();

            MessageFile messageFile = new MessageFile();
            messageFile.setFileName(fileName);
            messageFile.setFileType(fileType);
            messageFile.setFileContent(fileContent);

            return fileRepository.save(messageFile);
        } catch (IOException ex) {
            throw new RuntimeException("Failed to store file " + file.getOriginalFilename(), ex);
        }
    }

    public MessageFile getFileById(Long id) {
        return fileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("File not found with id: " + id));
    }

    public MessageFile saveFile(MessageFile file){
        return fileRepository.save(file);
    }

    public MessageFileDTO getMessageFileDTO(MessageFile file){
        return MessageFileDTO.builder()
                .fileName(file.getFileName())
                .fileType(file.getFileType())
                .id(file.getId())
                .fileURL(getURL(file))
                .build();
    }

    public List<MessageFileDTO> getMessageFileDTO(List<MessageFile> files){
        if (files != null) {
            return files.stream()
                    .map(this::getMessageFileDTO).collect(Collectors.toList());
        } else {
            return null;
        }

    }

    public String getURL(MessageFile file) {
        return "http://localhost:8081/chat/files/"+file.getId();
    }
}
