create database share_my_photos
with owner postgres;

grant connect, create, temporary on database share_my_photos to postgres;

\connect share_my_photos postgres

create schema app;

alter schema app owner to postgres;

create table app."user"
(
    id        serial
        constraint user_pk
            primary key,
    email     varchar(300) not null,
    firstname varchar(300),
    lastname  varchar(300),
    password  varchar
);

alter table app."user"
    owner to postgres;

create table app.organisation
(
    id                 serial
        constraint organisation_pk
            primary key,
    name               varchar(300),
    created_by_user_id integer,
    color              varchar(9)
);

alter table app.organisation
    owner to postgres;

create table app.album
(
    id              serial
        constraint album_pk
            primary key,
    organisation_id integer
        constraint album_organisation_id_fk
            references app.organisation
            on update cascade on delete cascade,
    name            varchar(300),
    creation        timestamp with time zone,
    user_id         integer,
    color           varchar(9)
);

alter table app.album
    owner to postgres;

create table app.photo
(
    id          serial
        constraint photo_pk
            primary key,
    name        varchar(300),
    url         varchar,
    user_id     integer,
    album_id    integer
        constraint photo_album_id_fk
            references app.album
            on update cascade on delete cascade,
    creation    timestamp with time zone,
    description text,
    tags        varchar(100)[]
);

alter table app.photo
    owner to postgres;

create table app.comment
(
    id       serial
        constraint comment_pk
            primary key,
    user_id  integer,
    creation timestamp with time zone,
    text     text,
    photo_id integer
        constraint comment_photo_id_fk
            references app.photo
            on update cascade on delete cascade
);

alter table app.comment
    owner to postgres;

create table app.organisation_user
(
    organisation_id integer not null
        constraint organisation_user_organisation_id_fk
            references app.organisation
            on update cascade on delete cascade,
    user_id         integer
        constraint organisation_user_user_id_fk
            references app."user"
            on update cascade on delete cascade
);

alter table app.organisation_user
    owner to postgres;

