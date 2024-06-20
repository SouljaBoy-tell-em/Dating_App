# Используем за основу образ OpenJDK 11
FROM openjdk:21

# Устанавливаем переменную окружения для указания корневой директории приложения
ENV APP_HOME /app

# Создаем директорию для приложения
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

# Копируем JAR файл приложения в контейнер
COPY target/project-0.0.1-SNAPSHOT.jar ./

# Запускаем приложение при старте контейнера
CMD ["java", "-jar", "project-0.0.1-SNAPSHOT.jar"]
