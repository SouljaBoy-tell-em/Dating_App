package com.project.project.page.models;

import com.project.project.WebSockets.models.ChatMessage;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class PostFile {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String fileName;

    private String fileType;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    @Column(name = "fileContent", length = 1073741824)
    private byte[] fileContent;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public byte[] getFileContent() {
        return fileContent;
    }

    public void setFileContent(byte[] fileContent) {
        this.fileContent = fileContent;
    }

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;
}
