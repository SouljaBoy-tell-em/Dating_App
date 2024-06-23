package com.project.WebSockets.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class MessageFile {
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
    @JoinColumn(name = "message_id")
    private ChatMessage message;
}
