package com.project.page.services;

import com.project.page.dto.PostFileDTO;
import com.project.page.models.PostFile;
import com.project.page.repositories.PostFileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostFileService {

    @Autowired
    private PostFileRepository fileRepository;

    public Resource loadFileAsResource(Long fileId) {
        try {
            PostFile postFile = fileRepository.findById(fileId)
                    .orElseThrow(() -> new RuntimeException("File not found with id: " + fileId));

            InputStreamResource resource = new InputStreamResource(new ByteArrayInputStream(postFile.getFileContent()));

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
    public PostFile saveFile(MultipartFile file) {
        try {
            String fileName = file.getOriginalFilename();
            byte[] fileContent = file.getBytes();
            String fileType = file.getContentType();

            PostFile postFile = new PostFile();
            postFile.setFileName(fileName);
            postFile.setFileType(fileType);
            postFile.setFileContent(fileContent);

            return fileRepository.save(postFile);
        } catch (IOException ex) {
            throw new RuntimeException("Failed to store file " + file.getOriginalFilename(), ex);
        }
    }

    public PostFile getFileById(Long id) {
        return fileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("File not found with id: " + id));
    }

    public PostFile saveFile(PostFile file){
        return fileRepository.save(file);
    }

    public PostFileDTO getPostFileDTO(PostFile file){
        return PostFileDTO.builder()
                .fileName(file.getFileName())
                .fileType(file.getFileType())
                .id(file.getId())
                .fileURL(getURL(file))
                .build();
    }

    public List<PostFileDTO> getPostFileDTO(List<PostFile> files){
        if (!files.isEmpty()) {//if (files != null) {
            return files.stream()
                    .map(this::getPostFileDTO).collect(Collectors.toList());
        } else {
            return null;
        }

    }

    public String getURL(PostFile file) {
        if (file != null)
            return "http://localhost:8081/post/files/"+file.getId();
        return null;
    }
}
