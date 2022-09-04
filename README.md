It's online! chobi@test.com Feel free to sign up or alternatively you can login with credential **user:test@test.com ,pw:test@123** and share some of your awesome picture

# Introduction

**chobi**-A photo sharing app bootstrapped with **_<span style={color:red}>React </span>_** and **_Firebase_**.

# 🎯 Purpose of the Project

The salient purpose of this project is learning. While building this app i tried to have a firm grasp on below topics:

1. React, React-Hooks, Custom Hooks, Context API. <br />
2. React Router DOM v6. <br />
3. Firebase. <br />

Besides I have a plan to use this app to share photos of my family members by extending some of its feature.

# ⛲ Features

## 💻 Existing Features:

User sign Up <br />
User login with email and password.🔒<br />
User login with google. 🔒<br />
Upload Pictures with description.📸<br />
Edit a post<br />
Delete a post<br />
comment on a post<br />
Like a post <br />
Image slide show for multiple images <br />
Follow user<br />
Un-follow user<br />
View profile <br />
Edit own profile <br />
Change profile picture with crop image <br />
Change password<br />

## 💻 Features to be added:

Login with facebook <br/>
Nested comments <br/>
More Reactions

# 🧰 Technologies Used:

## 📱 Exisiting Technologies:

Front-end and Styling: HTML5, React,CSS3, Material UI <br/>
Cloud Back-end Service: Firebase.<br/>
IDE & Version Controlling: VS Code & Git <br/>

## 📱 Future plan to change in Technologies:

1. State Management with Redux instead of context API.<br/>
2. I already built a REST API with node.js for this project and will integrate it soon.

# 😇 Challenges:

The most two exciting challenges that i faced during building this project are:

## First:

Upload multiple pictures to firestore and get all the URLS of uploaded image.For one image it was easy but for multiple image it was not working as expected.
So I took help from Frank van Puffelen(Google cloud Employee) and solved the problem accordingly. [**here**](https://stackoverflow.com/questions/71702368/why-promise-all-in-below-code-returning-an-empty-array) is the link to my stackoverflow post.

## Second:

The second most exciting challenges that i faced, is while working on editing a post with multiple pictures. Because for a post with single image is easy enough to edit. But for multiple page i had to pull all the images from database populate them on the same modal that i used to for a new post and if user remove a picture from the list i had delete it before updating the post. However, though it took me some times to get around this but i solved that by myself.
