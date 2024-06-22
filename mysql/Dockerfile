# Используем за основу образ MySQL
FROM mysql:latest

# Устанавливаем переменные окружения для настройки базы данных при запуске контейнера
ENV MYSQL_ROOT_PASSWORD=55_Rjhjkm_55
ENV MYSQL_DATABASE=test
ENV MYSQL_USER=ilya
ENV MYSQL_PASSWORD=55_Rjhjkm_55

# Копируем SQL скрипт для инициализации базы данных при запуске контейнера
COPY init.sql /docker-entrypoint-initdb.d/

# Запускаем контейнер с MySQL базой данных
CMD ["mysqld"]
