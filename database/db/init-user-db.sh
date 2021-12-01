#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$PG_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    create database share_my_photos
    	with owner postgre;

    grant connect, create, temporary on database share_my_photos to postgre;

    \connect share_my_photos postgre
    BEGIN;
    create schema app;

    alter schema app owner to postgre;

    create table app."user"
    (
    	id serial
    		constraint user_pk
    			primary key,
    	email varchar(300) not null,
    	firstname varchar(300),
    	lastname varchar(300),
    	password varchar,
    	organisation_id int
    );


    create table app.organisation
    (
    	id serial
    		constraint organisation_pk
    			primary key,
    	name varchar(300)
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
    COMMIT;
EOSQL