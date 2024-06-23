package com.project.user_config.photos;


import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;


@Data
@Entity
@Table(name = "photos")
@NoArgsConstructor
public class Photo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String email;
    private boolean isAvatar;

    @Basic(fetch = FetchType.LAZY)
    @Lob
    @Column(name = "content", length = 1073741824) // LENGTH: 1GB
    private byte[] content;

    public Photo(String email, boolean isAvatar, byte[] content) {
        this.email = email;
        this.isAvatar = isAvatar;
        this.content = content;
    }

    public static byte[] Convert(String param) {
        try(FileInputStream fis = new FileInputStream(new File(param))) {
            return fis.readAllBytes();
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
