/**
 * Contract source: https://git.io/Jte3T
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import Bouncer from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import Organisation from 'App/Models/Organisation'
import Album from 'App/Models/Album'
import Photo from 'App/Models/Photo'
import Comment from 'App/Models/Comment'

/*
|--------------------------------------------------------------------------
| Bouncer Actions
|--------------------------------------------------------------------------
|
| Actions allows you to separate your application business logic from the
| authorization logic. Feel free to make use of policies when you find
| yourself creating too many actions
|
| You can define an action using the `.define` method on the Bouncer object
| as shown in the following example
|
| ```
| 	Bouncer.define('deletePost', (user: User, post: Post) => {
|			return post.user_id === user.id
| 	})
| ```
|
|****************************************************************
| NOTE: Always export the "actions" const from this file
|****************************************************************
*/
export const { actions } = Bouncer.define(
  'getOrganisation',
  async (authenticatedUser: User, organisation: Organisation) => {
    await authenticatedUser.load('organisations')
    return authenticatedUser.organisations.map((org) => org.id).includes(organisation.id)
  }
)
  .define(
    'patchDeleteOrganisation',
    async (authenticatedUser: User, organisation: Organisation) => {
      return organisation.createdByUserId === authenticatedUser.id
    }
  )
  .define('patchDeleteUser', async (authenticatedUser: User, userToDelete: User) => {
    // authorize only if it is the authenticated user
    return authenticatedUser.id === userToDelete.id
  })
  .define('getAlbum', async (authenticatedUser: User, album: Album) => {
    // authorize if album is in the organisation of user
    await authenticatedUser.load('organisations')
    return authenticatedUser.organisations.map((org) => org.id).includes(album.organisationId)
  })
  .define('patchDeleteAlbum', async (authenticatedUser: User, album: Album) => {
    // authorize if album belongs to user
    return authenticatedUser.id === album.userId
  })
  .define('patchDeletePhoto', async (authenticatedUser: User, photo: Photo) => {
    // authorize if photo belongs to user
    return authenticatedUser.id === photo.userId
  })
  .define('getPhoto', async (authenticatedUser: User, photo: Photo) => {
    // authorize if photo is in album that is in the organisation of user
    await authenticatedUser.load('organisations', (org) => org.preload('albums'))
    return authenticatedUser.organisations
      .map((org) => org.albums.map((alb) => alb.id))
      .flat()
      .includes(photo.albumId)
  })
  .define('patchDeleteComment', async (authenticatedUser: User, comment: Comment) => {
    // authorize if photo belongs to user
    return authenticatedUser.id === comment.userId
  })
  .define('getComment', async (authenticatedUser: User, comment: Comment) => {
    // authorize if comment of photo is in album that is in the organisation of user
    await authenticatedUser.load('organisations', (org) => org.preload('albums'))
    await comment.load('photo')
    return authenticatedUser.organisations
      .map((org) => org.albums.map((alb) => alb.id))
      .flat()
      .includes(comment.photo.albumId)
  })
/*
|--------------------------------------------------------------------------
| Bouncer Policies
|--------------------------------------------------------------------------
|
| Policies are self contained actions for a given resource. For example: You
| can create a policy for a "User" resource, one policy for a "Post" resource
| and so on.
|
| The "registerPolicies" accepts a unique policy name and a function to lazy
| import the policy
|
| ```
| 	Bouncer.registerPolicies({
|			UserPolicy: () => import('App/Policies/User'),
| 		PostPolicy: () => import('App/Policies/Post')
| 	})
| ```
|
|****************************************************************
| NOTE: Always export the "policies" const from this file
|****************************************************************
*/
export const { policies } = Bouncer.registerPolicies({})
