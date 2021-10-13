#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER pg;
    CREATE DATABASE photos;
    GRANT ALL PRIVILEGES ON DATABASE photos TO pg;
EOSQL