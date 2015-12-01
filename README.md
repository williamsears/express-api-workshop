# ExpressJS API Workshop for DecodeMTL Full-Stack Bootcamp
*Your express way to the web development world!*

## Basic instructions
* You are **ENCOURAGED** to work in teams of two or three students on this workshop! Here, encouraged is a euphemism ;)
* Fork this repository and create a new Cloud9 project by cloning your fork
* For this workshop you can do all your work in the `master` branch :)
* After each part, **make sure to commit AND push your work**!

## Overview
*please take the time to read this carefully, and ask us questions if you do not understand what you are reading*

In this workshop, we will be creating our first tiny API. This API -- or interface -- will be the point of contact between our users and a database of address books (contact information).

We will present the user with a few URL patterns that they will use with different HTTP verbs (GET/POST/PUT/DELETE). Using the **uniform interface** that is the HTTP protocol, we will enable a variety of standard, compatible clients to connect to our API and use it to manage their contacts. The API will therefore be available to web browsers, iPhone/Android apps, and any other system that can connect to the internet and has web access.

Our API will be **stateless**: this means that every new request that comes in will be met with a response, independently of other requests. To give the illusion that our users are "signed in" to the application, we will be giving them a token when they login successfully, and they will have to give us back that token with every subsequent request they make. This is the **only way** we will be able to create an illusion of continuity.

Our API will be based on the **client-server model**: this will allow us to separate our concerns and concentrate on simply building a good interface. Someone else can take care of building a web app, iPhone/Android apps and any other wild ideas they can come up with, and all these ideas can evolve separately as long as our API is maintained.

Our API will be **resource-based**, and will be sending and receiving **representations** of these resources. Resources are already a familiar concept on the web, where every resource gets its own URL. For example, the website of DecodeMTL is at http://www.decodemtl.com/ and the about page is at http://www.decodemtl.com/about/. In our case, the resources that we are dealing with will not be web pages and images. Rather, they will be accounts and address books, entries and emails, ...

We will make these resources available using different URL patterns and HTTP verbs. One common way of doing that is making each resource available as /<ResourceName> and use HTTP verbs to describe what we want to do with the resource. Here is how part of our API could look during its development:

```
GET /Accounts --> retrieve all accounts in the DB (which the user is authorized to look at)
GET /Accounts/:id --> retrieve an account by its ID (if the user is authorized to look at it)
POST /Accounts --> create a new account using form data
PUT /Accounts/:id --> modify an account by its ID
DELETE /Accounts/:id --> delete an account by its ID
```

The `GET /Accounts` endpoint could further be improved by letting the user pass in **query string** parameters, such as `?sort=firstName&limit=10` to get back the results differently.

Whenever we are asked for a certain resource, it should be clear to consumers of our API that we are simply sending a **representation** of the resource, not the resource itself. For instance, in the case of an account, we have a MySQL Accounts table with some columns, but we will be sending a representation of an account as a JSON string. We could choose to send XML instead, or maybe even an HTML page with the account data. In our case we will be choosing JSON, which is lightweight, and intelligible to any modern programming language.

## Part 1: Getting Started!
In later stages, we will be adding signup/login to our app. Before doing that, we'd still like to get some basic things going, so we will be faking that our users are "signed in" to the system. To do this, create a new ExpressJS app, and add one middleware to it. The middleware will simply add the `accountId` property to the `request` object, set it to value `1`, and pass control to the next middleware using `next()`.

Any operation we do from here on will be using `request.accountId` to figure out who is the logged in user. Later on, we'll take care of filling that with the actual user ID.

## Part 2: Listing some addressbooks
Create a new endpoint `GET /AddressBooks`. When this endpoint is requested, it should respond with a list of address books for the currently logged in user, in JSON format. The listing should be an array of addressbook objects, like this:

```js
{
  id: 3,
  name: 'business contacts'
}
```

## Part 3: Listing a specific addressbook
Create a new endpoint `GET /AddressBooks/:id`. When it is requested, it will respond with a single addressbook by its ID. If the requested addressbook does not exist, or if it belongs to an account other than the logged in account, you should return a `404 Not Found` response to the user.

## Part 4: Creating a new addressbook
Create a new endpoint `POST /AddressBooks`. When it is requested, it will look at the `request.body` and find out if it has a `name` property. Then, if the user is logged in, create a new address book with that name, and assign it to the currently logged in account. If the user is not logged in, this endpoint should return a `404 Not Found` instead.

## Part 5: Deleting an addressbook
Create a new endpoint `DELETE /AddressBooks/:id`. When it is requested, it will delete the addressbook by its ID, only if it belongs to the logged in user. Otherwise it will return a `404 Not Found` message.

## Part 6: Modifying an addressbook
Create a new endpoint `PUT /AddressBooks/:id`. When it is requested, it will look at the `request.body` and modify the addressbook based on the passed in form data, only if the addressbook belongs to the currently logged in user. Otherwise it will return a `404 Not Found` message.

## Look back on what we did
After having completed all these endpoints, we are now exposing functionality that enables us to manage AddressBook resources: we can create them, list them, update them and delete them. This is commonly referred to as CRUD -- short for **C**reate, **R**ead, **U**pdate, **D**elete -- and forms the basis of our API. We could eventually add new functionalty on top of that to do more complex things, but just being able to do basic CRUD can get us pretty far!

## Part 7: copy/pasta!
In this part, we are going to create a similar set of endpoints that we did for `/AddressBooks`, but for `/Entries` instead. Create the same endpoints for adding new entries, simply focusing on the `firstName`, `lastName` and `birthday` properties. You will also need the `addressbookId` to be passed to you in the form data. **Make sure to check whether the passed in addressbook belongs to the currently logged in user!**

## Part 8: more copy/pasta!
Here, we are going to create the same CRUD endpoints for addresses/emails/phones. As always, we want to make sure that we are only adding these objects if the user is authorized to do it. Otherwise, we might as well give them access to our database :)

## Part 9: adding user signup and login!
