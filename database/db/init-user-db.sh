#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    create database share_my_photos
    	with owner postgres;

    grant connect, create, temporary on database share_my_photos to postgres;

    \connect share_my_photos postgres
    BEGIN;
    create schema app;

    alter schema app owner to postgres;

    create table app."user"
    (
    	id serial
    		constraint user_pk
    			primary key,
    	email varchar(300) not null,
    	firstname varchar(300),
    	lastname varchar(300),
    	password varchar
    );


    create table app.organisation
    (
    	id serial
    		constraint organisation_pk
    			primary key,
    	name varchar(300),
    	created_by_user_id int
    );


    create table app.album
    (
    	id serial
    		constraint album_pk
    			primary key,
    	organisation_id int,
    	name varchar(300),
    	creation timestamptz,
    	user_id int
    );


    create table app.comment
    (
    	id serial
    		constraint comment_pk
    			primary key,
    	user_id int,
      creation timestamptz,
    	text text,
    	photo_id int
    );


    create table app.photo
    (
    	id serial
    		constraint photo_pk
    			primary key,
    	name varchar(300),
    	url varchar,
    	user_id int,
    	album_id int,
    	creation timestamptz,
    	description text,
    	tags varchar(100) []
    );

    create table app.organisation_user
    (
        organisation_id int not null
            constraint organisation_user_organisation_id_fk
                references app.organisation
            constraint organisation_user_user_id_fk
                references app."user",
        user_id         int
    );

    COMMIT;
EOSQL