create table "user"
(
	id serial
		constraint user_pk
			primary key,
	email varchar(300) not null,
	firstname varchar(300),
	lastname varchar(300),
	password varchar
);

alter table "user" owner to postgres;

create table organisation
(
	id serial
		constraint organisation_pk
			primary key,
	name varchar(300),
	created_by_user_id integer,
	color varchar(100)
);

alter table organisation owner to postgres;

create table album
(
	id serial
		constraint album_pk
			primary key,
	organisation_id integer
		constraint album_organisation_id_fk
			references organisation
				on update cascade on delete cascade,
	name varchar(300),
	creation timestamp with time zone,
	user_id integer
);

alter table album owner to postgres;

create table photo
(
	id serial
		constraint photo_pk
			primary key,
	name varchar(300),
	url varchar,
	user_id integer,
	album_id integer
		constraint photo_album_id_fk
			references album
				on update cascade on delete cascade,
	creation timestamp with time zone,
	description text,
	tags varchar(100) []
);

alter table photo owner to postgres;

create table comment
(
	id serial
		constraint comment_pk
			primary key,
	user_id integer,
	creation timestamp with time zone,
	text text,
	photo_id integer
		constraint comment_photo_id_fk
			references photo
				on update cascade on delete cascade
);

alter table comment owner to postgres;

create table organisation_user
(
	organisation_id integer not null
		constraint organisation_user_organisation_id_fk
			references organisation
				on update cascade on delete cascade,
	user_id integer
		constraint organisation_user_user_id_fk
			references "user"
				on update cascade on delete cascade
);

alter table organisation_user owner to postgres;

